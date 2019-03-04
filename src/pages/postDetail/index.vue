<template>
  <div class="postDetail-container">
    <div class="post-head">
      <div id="title-container">
        <div id="title">{{postDetail.title}}</div>
        <img src="" alt="" id="collect">
      </div>
      <div class="price-container">
        <div id="price">{{postDetail.price}}</div>
        <div id="postTime">{{postDetail.postTime}}</div>
        <div id="viewCount">{{postDetail.viewCount}}</div>
      </div>
      <div class="category-container">
        <!-- tag -->
      </div>
    </div>
    <div class="post-body">
      <div id="images-container">

      </div>
      <div id="detail">{{postDetail.detail}}</div>
    </div>
    <div class="post-contact">
      <displayCell iconUrl="/static/images/icon/qq.png" :content="postDetail.QQId"></displayCell>
      <displayCell iconUrl="/static/images/icon/phone.png" :content="postDetail.phone"></displayCell>
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
      this.postDetail = postDetail.data;
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

</style>
