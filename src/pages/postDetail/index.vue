<template>
  <div class="postDetail-container">
    <div class="post-head">
      <div class="title-container">
        <div id="title">{{postDetail.title}}</div>
        <img src="/static/images/icon/icon_star.png" alt="" class="collect" @click="onCollect" :hidden="collected">
        <img src="/static/images/icon/icon_star_fill.png" alt="" class="collect" @click="onCollect" :hidden="!collected" />
      </div>
      <SplitLine></SplitLine>
      <div class="price-container">
        <b id="dollar">
          ￥<span id="number">{{postDetail.price}}</span>
          <span id="postTime">发布时间:{{postDetail.postTime}}</span>
          <span id="viewCount">浏览{{postDetail.viewCount}}</span>
        </b>
      </div>

      <div class="category-container">
        <van-tag type="primary">{{category}}</van-tag>
      </div>
    </div>
    <div class="post-body">
      <div id="images-container" v-for="image in pictures" :key="index" :hidden="!image">
        <img :src="image"  @click.stop="previewImage(image,index)" id="image"/>
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
import { get,id2Category } from '@/utils/index'
import config from '@/config'
import displayCell from '@/components/displayCell'
import SplitLine from '@/components/SplitLine'
export default {
  data () {
    return {
      itemId: '',
      postDetail: {},
      pictures: [],
      collected:''
    }
  },
  components: {
    displayCell
  },
  computed:{
    category(){
      return id2Category(this.postDetail.category);
    }
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
      this.pictures = this.postDetail.images.split(',')
      console.log('get post detail of id=' + this.itemId)
      console.log('post detail:', this.postDetail)
    },
    previewImage (image, index) {
      wx.previewImage({
        urls: this.pictures, // 需要预览的图片链接列表,
        current: this.pictures[index]
      })
    },
    onCollect(){

    }
  }
}
</script>

<style>
.postDetail-container {
  font-size: 15px;
  padding: 32rpx;
  
}
.title-container{
  display:flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  justify-content: space-between;
  

}
.price-container{
  display: flex;
  flex-direction: row;
  color: #e74c3c;
  margin: 16px 0;
  }
.category-container{
  margin: 16px 0;
}

.post-body{
  margin: 16px 0;
}

#dollar{
  font-size: 14px;
  height: 14px;
  line-height: 14px;
  width: 100%;  
}
#number{
  font-size: 32px;
}
#viewCount{
  margin-left: 32rpx;
  color: #888;
  font-size: 12px;
}

#postTime{
  font-size: 12px;
  color: #999;
  margin-left: 32rpx;
}

#title{
  font-size: 24px;
  color: #344;
}

.collect{
  width: 18px;
  height: 18px;
  padding-left: 32rpx;
}

#image{
  width: 200rpx;
  height: 200rpx;
}

</style>
