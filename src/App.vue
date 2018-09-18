<script>
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  created () {
    qcloud.setLoginUrl(config.loginUrl)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.btn {
  color: white;
  background-color: #1296db;
  margin-top: 30rpx;
  width: 90%;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
}
.more-img {
  width: 15px;
  height: 15px;
  margin-left: 400rpx;
}

.icon {
  width: 15px;
  height: 15px;
}
.prompt {
  color: #666;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
