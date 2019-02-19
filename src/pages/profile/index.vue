<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-background-image" mode="aspectFill">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="profile-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="profile-nickName">
        <open-data type="userNickName"></open-data>
      </div>
    </div>

    <div class="profile-cell-group">
      <form @submit="onSaveChange">
        <van-cell-group>
          <van-field
            :value="QQId"
            name="QQId"
            label="QQ:"
            required
            type="number"
            placeholder="请输入QQ号"
            :error-message="QQErrorMessage"
            @confirm="onQQConfirm"
          />
          <van-field
            :value="phone"
            name="phone"
            label="手机号:"
            required
            placeholder="请输入手机号"
            :error-message="phoneErrorMessage"
            @confirm="onPhoneConfirm"
            @change="onPhoneChange"
          />
          <picker @change="MajorPickerChange" :value="index" :range="majorArray">
            <van-field :value="major" label="专业:" name="major" placeholder="请选择专业类别"/>
          </picker>
        </van-cell-group>
        <button formType="submit" class="btn">保存信息</button>
      </form>
    </div>

    <div class="profile-footer">
      <SplitLine></SplitLine>注：完善联系方式以方便买家联系，专业信息用于个性化推荐，为您提供更好的服务.
    </div>
  </div>
</template>

<script>
import { numberValidate, showSuccess, showModal, post } from "@/utils/index.js";
import SplitLine from "@/components/SplitLine";
import config from "../../config";
export default {
  components: {
    SplitLine
  },
  data() {
    return {
      major: "",
      username: "",
      phone: "",
      phoneErrorMessage: "",
      QQErrorMessage: "",
      QQId: "",
      userinfo: {},
      majorArray: [
        "哲学类",
        "经济学类",
        "财政学类",
        "金融学类",
        "经济与贸易类",
        "法学类",
        "政治学类",
        "社会学类",
        "民族学类",
        "马克思主义理论类",
        "公安学类",
        "教育学类",
        "体育学类",
        "中国语言文学类",
        "外国语言文学类",
        "新闻传播学类",
        "历史学类",
        "数学类",
        "物理学类",
        "化学类",
        "天文学类",
        "地理科学类",
        "大气科学类",
        "海洋科学类",
        "地球物理学类",
        "地质学类",
        "生物科学类",
        "心理学类",
        "统计学类",
        "力学类",
        "机械类",
        "仪器类",
        "材料类",
        "能源动力类",
        "电气类",
        "电子信息类",
        "自动化类",
        "计算机类",
        "土木类",
        "水利类",
        "测绘类",
        "化工与制药类",
        "地质类",
        "矿业类",
        "纺织类",
        "轻工类",
        "交通运输类",
        "海洋工程类",
        "航空航天类",
        "兵器类",
        "核工程类",
        "农业工程类",
        "林业工程类",
        "环境科学与工程类",
        "生物医学工程类",
        "食品科学与工程类",
        "建筑类",
        "安全科学与工程类",
        "生物工程类",
        "公安技术类",
        "植物生产类",
        "自然保护与环境生态类",
        "动物生产类",
        "动物医学类",
        "林学类",
        "水产类",
        "草学类",
        "基础医学类",
        "临床医学类",
        "口腔医学类",
        "公共卫生与预防医学类",
        "中医学类",
        "法医学类",
        "医药学技术类",
        "护理学类",
        "管理科学与工程类",
        "工商管理类",
        "农业经济管理类",
        "公共管理类",
        "图书情报与档案管理类",
        "物流管理与工程类",
        "电子商务类",
        "旅游管理类",
        "艺术学理论类",
        "音乐与舞蹈学类",
        "戏剧与影视学类",
        "美术学类",
        "设计学类"
      ],
      index: ""
    };
  },
  mounted() {
    console.log("mounted");
    const userinfo = wx.getStorageSync("userinfo");
    this.userinfo = userinfo;
    if (userinfo.QQId) {
      this.QQId = userinfo.QQId;
    }
    if (userinfo.phone) {
      this.phone = userinfo.phone;
    }
    if (userinfo.major) {
      this.major = userinfo.major;
    }
  },
  computed: {},
  methods: {
    MajorPickerChange(e) {
      this.index = e.target.value;
      this.major = this.majorArray[this.index];
    },
    onPhoneConfirm(event) {
      console.log(event);
      const phoneNumber = event.mp.detail;
      console.log(phoneNumber.length);
      if (phoneNumber.length !== 11) {
        this.phoneErrorMessage = "请输入正确的手机号码";
        return;
      } else if (phoneNumber === "") {
        this.phoneErrorMessage = "";
      } else {
        this.phoneErrorMessage = "";
      }
      this.phone = phoneNumber;
    },
    onPhoneChange(event) {
      const phoneNumber = event.mp.detail;
      if (!numberValidate(phoneNumber) || phoneNumber.length > 11) {
        this.phoneErrorMessage = "请输入正确的手机号码";
      } else {
        this.phoneErrorMessage = "";
      }
    },
    onQQConfirm(event) {
      const QQ = event.mp.detail;
      if (!numberValidate(QQ)) {
        this.QQErrorMessage = "请输入正确QQ号";
      } else {
        this.QQErrorMessage = "";
      }
    },
    async onSaveChange(event) {
      const info = event.mp.detail.value;
      var userinfo = wx.getStorageSync("userinfo");
      if (!userinfo.openId) {
        showModal("提示", "请先登录");
        return;
      }
      // 若之前有保存过信息
      if (userinfo.QQId !== undefined) {
        userinfo.QQId = info.QQId;
        userinfo.phone = info.phone;
        userinfo.major = info.major;
        wx.setStorageSync("userinfo", userinfo);
      } else {
        Object.assign(userinfo, info);
        wx.setStorageSync("userinfo", userinfo);
      }
      try {
        await post(config.saveuserinfoUrl, userinfo);
        showSuccess("保存成功");
      } catch (e) {
        showModal("错误", "请检查网络状况");
      }
    }
  }
};
</script>

<style>
.profile-container {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 300rpx;
  width: 100%;
}
.profile-background-image {
  -webkit-filter: blur(20px);
  width: 100%;
  height: 300rpx;
}
.profile-avatar {
  position: absolute;
  overflow: hidden;
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  top: 200rpx;
}
.profile-nickName {
  position: absolute;
  top: 375rpx;
}
.profile-cell-group {
  position: absolute;
  top: 440rpx;
}
.profile-footer {
  padding: 3px 40rpx 0 40rpx;
  position: absolute;
  top: 930rpx;
  font-size: 10px;
  color: #777;
}
</style>
