<script>
import qcloud from "wafer2-client-sdk";
import config from "./config";
export default {
  created() {
    qcloud.setLoginUrl(config.loginUrl);
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
                  wx.setStorageSync("latitude", res.latitude);
                  wx.setStorageSync("longitude", res.longitude);
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
};
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
  background-color: #3398da;
  margin-top: 30rpx;
  width: 90%;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
}
.red-btn {
  color: white;
  background-color: #e64340;
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

page {
  height: 100%;
  background: #f2f2f2;
}
</style>
