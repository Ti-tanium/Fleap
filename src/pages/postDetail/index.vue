<template>
  <div class="postDetail-container">

    <div class="head">
      <div class="headtitle-favorite">
        <div class="title">{{postDetail.title}}</div>
        <div class="favorite">
          <img src="/static/images/icon/favorite.png" class="favorite-img">
          <div class="favorite-txt">收藏</div>
        </div>
      </div>
      <div class="footer">
        <div class="postTime">{{postDetail.postTime}}</div>
        <div class="viewCount">浏览{{postDetail.viewCount}}人</div>
      </div>
    </div>

    <div class="content">


      <div class="image-cell">
        <div class="icon-container">
          <img src="/static/images/icon/post.png" class="icon">
        </div>
        <div class="img-container">
          <img :src="picture" class="item-image" v-for="picture in pictures" :key="index" mode="aspectFill" @click="previewImage(pictrue,index)">
        </div>
      </div>
      <displayCell iconUrl="/static/images/icon/price.png" :content="postDetail.price"></displayCell>
      <displayCell iconUrl="/static/images/icon/detail.png" :content="postDetail.detail"></displayCell>
      <displayCell iconUrl="/static/images/icon/tag.png" content="#生活用品" :border="true"></displayCell>
    </div>

    <div class="contact">
      <displayCell iconUrl="/static/images/icon/qq.png" :content="postDetail.QQId" v-if="postDetail.QQId"></displayCell>
      <displayCell iconUrl="/static/images/icon/" :content="postDetail.phoneNumber" v-if="postDetail.phoneNumber"></displayCell>
    </div>

    <div class="message">

    </div>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import config from '@/config'
import displayCell from '@/components/displayCell'
export default {
  data () {
    return {
      itemId: '',
      postDetail: {},
      pictures: []
    }
  },
  components: {
    displayCell
  },
  mounted () {
    this.itemId = this.$root.$mp.query.id
    this.getPostDetail()
  },
  onShareAppMessage () {
    return {
      title: this.postDetail.title,
      path: '/pages/postDetail/main',
      success: res => {},
      fail: () => {},
      complete: () => {}
    }
  },
  methods: {
    async getPostDetail () {
      const postDetail = await get(config.host + '/weapp/postdetail', {
        itemId: this.itemId
      })
      this.postDetail = postDetail.data
      this.pictures = this.postDetail.image.split(',')
      console.log('get post detail of id=' + this.itemId)
      console.log('post detail:', this.postDetail)
    },
    previewImage (image, index) {
      wx.previewImage({
        urls: this.pictures, // 需要预览的图片链接列表,
        current: this.pictures[index]
      })
    }
  }
}
</script>

<style>
.postDetail-container {
  font-size: 15px;
  background: #f2f2f2;
}
.price-container {
  display: flex;
  flex-direction: row;
}
.image-cell {
  display: flex;
  flex-direction: row;
}
.price {
  line-height: 36px;
  height: 36px;
  margin-left: 5px;
}
.favorite-img {
  width: 18px;
  height: 18px;
}
.favorite-txt {
  color: #666;
  font-size: 12px;
  margin-left: 5px;
}
.headtitle-favorite {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.favorite {
  display: flex;
  flex-direction: row;
  line-height: 18px;
  height: 18px;
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 13px;
  color: #888;
}
.head {
  background: #fff;
  padding: 10rpx 40rpx;
  margin: 2px 0;
}
.content {
  background: #fff;
  padding: 10rpx 40rpx;
  margin: 2px 0;
  width: 100%;
}
.contact {
  background: #fff;
  padding: 10rpx 40rpx;
  margin: 2px 0;
}
.item-image {
  height: 80px;
  width: 80px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #f2f2f2;
}
.img-container {
  margin-left: 10rpx;
  display: flex;
  flex-wrap: wrap;
}
</style>
