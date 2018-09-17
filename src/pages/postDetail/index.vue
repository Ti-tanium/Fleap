<template>
  <div class="postDetail-container">

    <div class="head">
      <div class="title">{{postDetail.title}}</div>
      <div class="postTime">{{postDetail.postTime}}</div>
      <div class="viewCount">浏览{{postDetail.viewCount}}人</div>
      <div class="favorite">
      </div>
    </div>

    <div class="content">

      <div class="prompt">图片详情</div>
      <div class="img-container">
        <img :src="picture" class="item-image" v-for="picture in pictures" :key="index" mode="aspectFill" @click="previewImage(pictrue,index)">
      </div>
      <div class="prompt">详细描述</div>
      <div class="detail">{{postDetail.detail}}</div>
      <div class="prompt">类型标签</div>
    </div>

    <div class="contact">
      <div class="name"></div>
      <div class="weChatId"></div>
      <div class="QQId"></div>
      <div class="phoneNumber"></div>
    </div>

    <div class="message">

    </div>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import config from '@/config'
export default {
  data () {
    return {
      itemId: '',
      postDetail: {},
      pictures: []
    }
  },
  mounted () {
    this.itemId = this.$root.$mp.query.id
    this.getPostDetail()
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
.head {
  background: #fff;
  padding: 10rpx 40rpx;
  margin: 2px 0;
}
.content {
  background: #fff;
  padding: 10rpx 40rpx;
  margin: 2px 0;
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
}
.img-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
