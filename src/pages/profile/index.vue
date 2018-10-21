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
        <van-field
          :value="major"
          label="专业:"
          name="major"
          placeholder="请输入专业全称"
        />
      </van-cell-group>
      <button
        class="btn"
        formType="submit"
        open-type="getUserInfo"
        lang="zh_CN"
        >
        保存信息
      </button>
      </form>
    </div>

    <div class="profile-footer">
      <SplitLine></SplitLine>
      注：完善联系方式以方便买家联系，专业信息用于个性化推荐，为您提供更好的服务，保存信息的同时会获取用户标识、头像、昵称等公开信息。
    </div>

  </div>
</template>

<script>
import { numberValidate, showSuccess, showModal } from '@/utils/index.js'
import SplitLine from '@/components/SplitLine'
import qcloud from 'wafer2-client-sdk'
export default {
  components: {
    SplitLine
  },
  data () {
    return {
      major: '',
      username: '',
      phone: '',
      phoneErrorMessage: '',
      QQErrorMessage: '',
      QQId: '',
      userinfo: {}
    }
  },
  mounted () {
    console.log('mounted')
    const userinfo = wx.getStorageSync('userinfo')
    this.userinfo = userinfo
    if (userinfo.QQId) {
      this.QQId = userinfo.QQId
    }
    if (userinfo.phone) {
      this.phone = userinfo.phone
    }
    if (userinfo.major) {
      this.major = userinfo.major
    }
  },
  computed: {},
  methods: {
    getUserInfo (e) {
      console.log(e)
      const session = qcloud.Session.get()
      console.log('qcloud session:', session)
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            let userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
              userinfo = Object.assign(userinfo, res)
            } else {
              userinfo = res
            }
            wx.setStorageSync('userinfo', userinfo)
            console.log(this.userinfo)
          },
          fail: err => {
            console.error(err)
            showModal('获取失败', '请检查网络连接状态')
          }
        })
      } else {
        // 首次登录
        console.log('first time log in')
        qcloud.login({
          success: res => {
            console.log('first time login success, res:', res)
            let userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
              userinfo = Object.assign(userinfo, res)
            } else {
              userinfo = res
            }
            wx.setStorageSync('userinfo', userinfo)
          },
          fail: err => {
            console.error(err)
            showModal('获取失败', '请检查网络连接状态')
          }
        })
      }
    },
    onPhoneConfirm (event) {
      console.log(event)
      const phoneNumber = event.mp.detail
      console.log(phoneNumber.length)
      if (phoneNumber.length !== 11) {
        this.phoneErrorMessage = '请输入正确的手机号码'
        return
      } else if (phoneNumber === '') {
        this.phoneErrorMessage = ''
      } else {
        this.phoneErrorMessage = ''
      }
      this.phone = phoneNumber
    },
    onPhoneChange (event) {
      const phoneNumber = event.mp.detail
      if (!numberValidate(phoneNumber) || phoneNumber.length > 11) {
        this.phoneErrorMessage = '请输入正确的手机号码'
      } else {
        this.phoneErrorMessage = ''
      }
    },
    onQQConfirm (event) {
      const QQ = event.mp.detail
      if (!numberValidate(QQ)) {
        this.QQErrorMessage = '请输入正确QQ号'
      } else {
        this.QQErrorMessage = ''
      }
    },
    onSaveChange (event) {
      console.log(event)
      this.getUserInfo()
      const info = event.mp.detail.value
      var userinfo = wx.getStorageSync('userinfo')
      let combinedUserinfo
      console.log('form:', info, 'from cache:', userinfo)
      // 若之前有保存过信息
      if (userinfo.QQId) {
        userinfo.QQId = info.QQId
        userinfo.phone = info.phone
        userinfo.major = info.major
        wx.setStorageSync('userinfo', userinfo)
      } else {
        combinedUserinfo = Object.assign(info, userinfo)
        wx.setStorageSync('userinfo', combinedUserinfo)
      }
      showSuccess('保存成功')
    }
  }
}
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
