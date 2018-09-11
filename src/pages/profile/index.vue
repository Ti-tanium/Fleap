<template>
  <div class="profile-container">

    <div class="head"  open-type="getUserInfo" @click="doLogin">
      <img :src="userinfo.avatarUrl" class="avatar">
      <div class="nickName">{{userinfo.nickName}}</div>
      <img src="/static/images/icon/more.png" alt="更多" class="more-img">
    </div>
    <div class="options">

      <div class="tab-btn">
        <img src="/static/images/icon/post.png" class="icon-img">
        <div class="btn-text">我的发布</div>
      </div>

      <div class='tab-btn'>
        <img src="/static/images/icon/favorite.png" class="icon-img">
        <div class="btn-text">我的收藏</div>
      </div>

      <div class="tab-btn">
        <img src="/static/images/icon/setting.png" class="icon-img">
        <div class="btn-text">设置</div>
      </div>

    </div>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess, showModal } from '@/utils/index'
export default {
  data () {
    return {
      userinfo: {
        avatarUrl: '/static/images/alt-avatar.png',
        nickName: '点击登录'
      }
    }
  },
  methods: {
    doLogin () {
      const session = qcloud.Session.get()
      console.log(session)
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            this.userinfo = res
            this.logged = true
            wx.setStorageSync('userinfo', res)
            showSuccess('登录成功')
            console.log(this.userinfo)
          },
          fail: err => {
            console.error(err)
            showModal('登录失败', '请检查网络连接状态')
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.userinfo = res
            this.logged = true
            wx.setStorageSync('userinfo', res)
            console.log(res)
            showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            showModal('登录错误', '请检查网络连接状态')
          }
        })
      }
    }
  },
  created () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style>
.profile-container {
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
}

.nickName {
  font-size: 18px;
  margin-top: 10px;
  margin-left: 10px;
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
  height: 30px;
}
.icon-img {
  width: 36rpx;
  height: 36rpx;
  align-self: center;
  margin-left: 20rpx;
}
.btn-text {
  margin-left: 20rpx;
  font-size: 34rpx;
  line-height: 30px;
}
</style>


