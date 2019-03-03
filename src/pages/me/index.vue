<template>
  <div class="me-container">
    <a href="/pages/profile/main">
      <div class="head">
        <div class="avatar">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="nickName">{{userinfo.nickName}}</div>
        <img src="/static/images/icon/more.png" alt="更多" class="more-img">
      </div>
    </a>

    <div class="options">
      <a href="/pages/myPost/main">
        <div class="tab-btn">
          <img src="/static/images/icon/post.png" class="icon-img">
          <div class="btn-text">我的发布</div>
        </div>
      </a>
      
      <a href="/pages/myFavorite/main">
        <div class="tab-btn">
          <img src="/static/images/icon/favorite.png" class="icon-img">
          <div class="btn-text">我的收藏</div>
        </div>
      </a>
      
      <a href="/pages/setting/main">
        <div class="tab-btn">
          <img src="/static/images/icon/setting.png" class="icon-img">
          <div class="btn-text">设置</div>
        </div>
      </a>
    </div>
    <button class="btn" v-if="!isLogin" open-type="getUserInfo" lang="zh_CN" @click="getUserInfo">登录</button>
    <button class="red-btn" @click="logout" v-if="isLogin">退出当前账号</button>
  </div>
</template>

<script>
import qcloud from "wafer2-client-sdk";
import { numberValidate, showSuccess, showModal, get } from "@/utils/index.js";
import config from "@/config";
export default {
  data() {
    return {
      userinfo: {
        nickName: "请先登录"
      },
      isLogin: false
    };
  },

  methods: {
    async getAdditionalUserInfo(oepnId) {
      const data = await get(config.getAddUserInfoUrl, { openId: oepnId });
      const addInfo = data.data.list;
      return addInfo;
    },
    logout() {
      this.isLogin = false;
      wx.removeStorageSync("userinfo");
      this.userinfo.nickName = "请先登录";
    },
    login(userinfo) {
      this.isLogin = true;
      wx.setStorageSync("userinfo", userinfo);
      showSuccess("登录成功");
    },
    getUserInfo(e) {
      const that = this;
      const session = qcloud.Session.get();
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        console.log("second time log in");
        qcloud.loginWithCode({
          async success(res) {
            let userinfo = wx.getStorageSync("userinfo");
            if (userinfo) {
              userinfo = Object.assign(userinfo, res);
            } else {
              userinfo = res;
            }
            const addInfo = await that.getAdditionalUserInfo(userinfo.openId);
            console.log(addInfo);

            if (addInfo.length !== 0) {
              that.userinfo.nickName = userinfo.nickName;
              Object.assign(userinfo, addInfo[0]);
              that.login(userinfo);
            } else {
              that.login(userinfo);
              that.userinfo.nickName = "请完善信息";
            }
          },
          fail: err => {
            console.error(err);
            showModal("获取失败", "请检查网络连接状态");
          }
        });
      } else {
        // 首次登录
        console.log("first time log in");
        qcloud.login({
          async success(res) {
            console.log("first time login success, res:", res);
            let userinfo = wx.getStorageSync("userinfo");
            if (userinfo) {
              userinfo = Object.assign(userinfo, res);
            } else {
              userinfo = res;
            }
            const addInfo = await that.getAdditionalUserInfo(userinfo.openId);
            console.log(addInfo);
            if (addInfo.length !== 0) {
              that.userinfo.nickName = userinfo.nickName;
              Object.assign(userinfo, addInfo[0]);
              that.login(userinfo);
            } else {
              that.login(userinfo);
              that.userinfo.nickName = "请完善信息";
            }
          },
          fail: err => {
            console.error(err);
            showModal("获取失败", "请检查网络连接状态");
          }
        });
      }
    }
  },
  onShow() {
    console.log("me page showed");
    let userinfo = wx.getStorageSync("userinfo");
    if (userinfo.openId) {
      this.userinfo = userinfo;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    if (!userinfo.QQId || !userinfo.phone) {
      this.userinfo.nickName = "请完善信息";
    } else {
      this.userinfo.nickName = userinfo.nickName;
    }
  }
};
</script>

<style>
.me-container {
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  height: 1100rpx;
}

.head {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  margin-top: 15px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 20rpx;
  overflow: hidden;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.nickName {
  font-size: 18px;
  margin-top: 10px;
}

.options {
  margin-top: 15px;
  background: #f2f2f2;
}
.tab-btn {
  margin-top: 1px;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 48px;
}
.icon-img {
  width: 48rpx;
  height: 48rpx;
  align-self: center;
  margin-left: 20rpx;
}
.btn-text {
  margin-left: 20rpx;
  font-size: 14px;
  line-height: 48px;
}
.me-footer {
  margin-top: 20rpx;
  padding: 3px 40rpx 0 40rpx;
  font-size: 10px;
  color: #777;
}
</style>


