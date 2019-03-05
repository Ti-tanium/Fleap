<template>
  <div class="PostCard-container">
    <a :href="postDetailUrl">
      <div class="body">
        <div class="avatar">
          <img :src="postList.avatarUrl" class="avatar-img">
        </div>
        <div class="content">
          <div class="header">
            <div class="nickName">{{postList.nickName}}</div>
            <div class="price">¥{{postList.price}}</div>
          </div>
          <div class="title">{{postList.title}}</div>
          <div class="image-container">
            <img
              :src="image"
              v-if="image"
              v-for="image in images"
              :key="index"
              class="item-image"
              @click.stop="previewImage(image,index)"
            >
          </div>
          <div class="footer">
            <div class="postTime">{{postList.postTime}}</div>
            <div class="viewCount">
              <img src="/static/images/icon/view.png" class="icon">
              <div class="count">{{postList.viewCount}}</div>
            </div>
          </div>
        </div>
      </div>
    </a>
    <button class="btn" :hidden="!complete" @click="onComplete" :disabled="sold">完成交易</button>
    <SplitLine></SplitLine>
  </div>
</template>

<script>
import SplitLine from "@/components/SplitLine";
import { showSuccess, showModal, post } from "@/utils/index";
import config from "@/config";
export default {
  components: {
    SplitLine
  },
  props: ["postList", "complete"],
  data() {
    return {
      images: this.postList.images ? this.postList.images.split(",") : "",
      sold: this.postList.sold === "0" ? false : true
    };
  },
  computed: {
    postDetailUrl() {
      return "/pages/postDetail/main?id=" + this.postList.id;
    }
  },
  methods: {
    onComplete() {
      var that = this;
      wx.showModal({
        title: "提示", //提示的标题,
        content: "完成交易，将从系统中删除此条发布信息", //提示的内容,
        showCancel: true, //是否显示取消按钮,
        cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: "#000000", //取消按钮的文字颜色,
        confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: "#3CC51F", //确定按钮的文字颜色,
        success(res) {
          if (res.confirm) {
            wx.request({
              url: config.soldUrl, //开发者服务器接口地址",
              data: { id: that.postList.id },
              method: "POST",
              dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
              success: res => {
                that.sold = true;
                showSuccess("交易完成");
              },
              fail: () => {
                showModal("提示", "网络错误");
              },
              complete: () => {}
            });
          } else if (res.cancel) {
            that.sold = false;
          }
        }
      });
    },
    previewImage(image, index) {
      wx.previewImage({
        urls: this.images, // 需要预览的图片链接列表,
        current: this.images[index]
      });
    }
  }
};
</script>

<style>
.PostCard-container {
  width: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 16rpx 32rpx;
  font-size: 15px;
  color: #111;
  margin: 8px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #888888;
}
.body {
  display: flex;
  flex-direction: row;
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #888;
}
.viewCount {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.icon {
  margin-right: 2px;
}
.count {
  margin-left: 4rpx;
}
.content {
  width: 85%;
  display: flex;
  flex-direction: column;
}
.avatar {
  width: 100rpx;
  height: 100rpx;
  margin-right: 10rpx;
}
.avatar-img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.nickName {
  color: rgb(11, 63, 175);
  margin-bottom: 5px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.price {
  color: #333;
}
.image-container {
  display: flex;
  flex-wrap: wrap;
}
.item-image {
  height: 80px;
  width: 80px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #f2f2f2;
  border-radius: 5px;
}
</style>
