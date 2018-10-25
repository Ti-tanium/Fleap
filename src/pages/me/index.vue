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
        <div class='tab-btn'>
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
    <button class="btn" @click="clearStorage">清除缓存</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {
        nickName: '请完善信息'
      }
    }
  },
  methods: {
    clearStorage () {
      wx.clearStorageSync()
    }
  },
  onShow () {
    console.log('me page showed')
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    if (!userinfo.openId || !userinfo.QQId || !userinfo.phone) {
      this.nickName = userinfo.nickName
    }
  }
}
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
.me-footer {
  margin-top: 20rpx;
  padding: 3px 40rpx 0 40rpx;
  font-size: 10px;
  color: #777;
}
</style>


