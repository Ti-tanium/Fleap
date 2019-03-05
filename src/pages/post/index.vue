<template>
  <div class="post-container">
    <form @submit="formSubmit">
      <picker @change="bindPickerChange" :value="pickerIndex" name="category" :range="options">
        <van-field label="类别:" :value="category" placeholder="请选择类别" disabled></van-field>
      </picker>
      <div class="post-upload">
        <wux-upload
          listType="picture-card"
          :defaultFileList="fileList"
          name="file"
          count="9"
          max="9"
          :sizeType="['compressed']"
          :url="getUploadUrl"
          @success="onSuccess"
          @fail="onFail"
          @complete="onComplete"
          @preview="onPreview"
          @remove="onRemove"
        >
          <text>+</text>
        </wux-upload>
      </div>
      <van-cell-group>
        <van-field
          :value="price"
          name="price"
          label="价格(元):"
          type="digit"
          placeholder="请输入价格"
          :error-message="priceErrorMessage"
          @confirm="onPriceConfirm"
        />
        <van-field
          :value="title"
          name="title"
          label="标题:"
          placeholder="请输入商品名称，20字以内~"
          :error-message="titleErrorMessage"
          @change="onTitleChange"
        />
        <van-field
          :value="detail"
          name="detail"
          type="textarea"
          :autosize="true"
          label="详细描述:"
          placeholder="200字以内~"
          :error-message="detailErrorMessage"
          @change="onDetailChange"
        />
        <van-cell title="位置" :center="true" id="location-cell">
          <van-switch :checked="locationChecked" size="24px" @change="onSwitchChange"></van-switch>
        </van-cell>
      </van-cell-group>
      <button class="btn" formType="submit">发布</button>
    </form>
  </div>
</template>

<script>
import {
  post,
  showModal,
  showSuccess,
  formatTime,
  numberValidate
} from "@/utils/index";
import config from "@/config";
export default {
  data() {
    return {
      sizeType: ["compressed"],
      postInfo: {},
      detail: "",
      detailErrorMessage: "",
      title: "",
      titleErrorMessage: "",
      price: "",
      priceErrorMessage: "",
      category: "",
      uploadImageUrls: [],
      fileList: [],
      options: [
        "教辅资料",
        "日常用品",
        "电子产品",
        "盆栽",
        "服装",
        "拼车",
        "其他"
      ],
      pickerIndex: "",
      imageUrl: "",
      userinfo: "",
      locationChecked: false,
      latitude: 0,
      longitude: 0
    };
  },
  computed: {
    getUploadUrl() {
      return config.uploadUrl;
    }
  },
  onLoad() {
    console.log("post page loaded");
    const userinfo = wx.getStorageSync("userinfo");
    this.userinfo = userinfo;
  },
  onShow() {
    if (!this.userinfo.openId) {
      showModal("提示", "请先登录");
    } else if (!this.userinfo.phone || !this.userinfo.QQId) {
      showModal("提示", "请先完善信息");
    }
  },
  methods: {
    onSwitchChange() {
      const that = this;
      this.locationChecked = !this.locationChecked;
      if (this.locationChecked) {
        //TODO: 获取地理位置信息，若是已有则不获取
        wx.getSetting({
          success(res) {
            if (!res.authSetting["scope.userLocation"]) {
              wx.authorize({
                scope: "scope.userLocation",
                success() {
                  //同意获取地理位置
                  wx.getLocation({
                    type: "wgs84",
                    success(res) {
                      that.latitude = res.latitude;
                      that.longitude = res.longitude;
                    }
                  });
                },
                fail() {
                  console.log("failed to get location information");
                }
              });
            }
          }
        });
      }
    },
    bindPickerChange(e) {
      console.log(e);
      this.pickerIndex = e.target.value;
      this.category = this.options[this.pickerIndex];
    },
    checkFormInfo(formInfo) {
      if (!formInfo.category) {
        showModal("信息不完全", "请选择商品类别");
        wx.hideLoading();
        return false;
      } else if (!formInfo.price) {
        showModal("信息不完全", "请填写商品价格");
        wx.hideLoading();
        return false;
      } else if (!formInfo.title) {
        showModal("信息不完全", "请填写标题");
        wx.hideLoading();
        return false;
      } else if (!formInfo.detail) {
        showModal("信息不完全", "请填写详细描述");
        wx.hideLoading();
        return false;
      }
      return true;
    },
    formReset() {
      this.price = "";
      this.title = "";
      this.detail = "";
      this.category = "";
      //TODO: cannot remove preview picture(thumb picture)
      this.fileList = [];
      this.uploadImageUrls = [];
      console.log("reset form and picture");
    },
    async formSubmit(e) {
      const that = this;
      if (!this.userinfo.openId) {
        showModal("提示", "请先登录");
        return;
      } else if (!this.userinfo.phone || !this.userinfo.QQId) {
        showModal("提示", "请先完善信息");
        return;
      }

      console.log("latitude:", this.latitude, "longitude:", this.longitude);

      var formInfo = e.target.value;
      //将category的ID和服务器的ID对应起来
      formInfo.category = parseInt(formInfo.category) + 1;
      const time = formatTime(new Date());
      const userinfo = wx.getStorageSync("userinfo");
      wx.showLoading({
        title: "上传中...", // 提示的内容,
        mask: true, // 显示透明蒙层，防止触摸穿透,
        success: res => {}
      });

      // check form information not null
      if (!this.checkFormInfo(formInfo)) {
        console.log("Form information not complete.");
        return;
      }

      Object.assign(this.postInfo, formInfo, {
        openId: userinfo.openId,
        images: this.uploadImageUrls.join(","),
        postTime: time,
        location: this.latitude + "," + this.longitude
      });

      console.log("post data:", this.postInfo);
      try {
        await post(config.host + "/weapp/post", this.postInfo);
        this.uploadPictures = [];
        showSuccess("发布成功");
        this.formReset();
      } catch (e) {
        console.log(e);
        showModal("发布失败", "请检查您的网络状态");
      }
    },
    onPriceConfirm(event) {
      const price = event.mp.detail;
      console.log("price is number?", numberValidate(price));
      if (!numberValidate(price)) {
        this.priceErrorMessage = "请输入正确的价格";
      } else {
        this.priceErrorMessage = "";
      }
    },
    onTitleChange(event) {
      const title = event.mp.detail;
      console.log("title is over 20 character?", title.length > 20);
      if (title.length > 20) {
        this.titleErrorMessage = "标题过长";
      } else {
        this.titleErrorMessage = "";
      }
    },
    onDetailChange(event) {
      const detail = event.mp.detail;
      console.log("detail is over 20 character?", detail.length > 20);
      if (detail.length > 200) {
        this.titleErrorMessage = "标题过长";
      } else {
        this.titleErrorMessage = "";
      }
    },
    onSuccess(e) {
      console.log("wux-upload onSuccess:", e);
    },
    onFail(e) {
      console.log("upload onFail:", e);
    },
    onComplete(e) {
      console.log("upload onComplete:");
      const datastr = e.target.data;
      const imageUrl = JSON.parse(datastr).data.imgUrl;
      console.log(imageUrl);
      this.uploadImageUrls.push(imageUrl);
    },
    onPreview(e) {
      console.log("onPreview", e);
      const { file, fileList } = e.target;
      wx.previewImage({
        current: file.url,
        urls: fileList.map(n => n.url)
      });
    },
    onRemove(e) {
      console.log("onRemove");
      console.log(e);
      const { file, fileList, index } = e.target;
      this.fileList = fileList.filter(n => n.uid !== file.uid);
      this.uploadImageUrls.splice(index, 1);
    }
  }
};
</script>

<style>
.post-upload {
  padding: 32rpx 40rpx;
  background: #fff;
}
#post-category-picker {
  display: flex;
  flex-direction: row;
  margin: 34rpx;
  font-size: 15px;
  color: #323233;
}
.price {
  display: flex;
  flex-direction: row;
  background: #fff;
  font-size: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.radio-group {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.price-prompt {
  font-size: 15px;
  color: #666;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 26.25px;
  height: 26.26px;
}
#title-txt {
  width: 100%;
  height: 20px;
  padding: 8px 0 8px 10px;
  font-size: 15px;
  background: #fff;
}
#detail-txt {
  background: #fff;
  padding: 5px 0 5px 10px;
  font-size: 15px;
  width: 100%;
}
</style>
