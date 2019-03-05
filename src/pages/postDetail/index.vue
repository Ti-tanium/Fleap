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
import { get,id2Category,showModal,showSuccess } from '@/utils/index'
import config from '@/config'
import displayCell from '@/components/displayCell'
import SplitLine from '@/components/SplitLine'
export default {
  data () {
    return {
      itemId: '',
      postDetail: {},
      pictures: [],
      collected:false
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
  onLoad(){
    Object.assign(this, this.$options.data());
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
      // acquire openid for view history data
      const userinfo=wx.getStorageSync('userinfo');
      const openId=userinfo.openId;
      const postDetail = await get(config.host + '/weapp/postdetail', {
        itemId: this.itemId,
        openId: openId
      })
      this.postDetail = postDetail.data;
      this.pictures = this.postDetail.images.split(',')
      console.log('get post detail of id=' + this.itemId)
      console.log('post detail:', this.postDetail)

      // get collect record
      if(openId){
        const response=await get(config.collectUrl,{openId:openId,id:this.postDetail.id,action:"query"})
        console.log(response)
        const collected=response.data.collected
        this.collected=collected;
      }
    },
    previewImage (image, index) {
      wx.previewImage({
        urls: this.pictures, // 需要预览的图片链接列表,
        current: this.pictures[index]
      })
    },
    async onCollect(){
      // check openId
      const userinfo=wx.getStorageSync('userinfo');
      const openId=userinfo.openId
      if(!openId){
        showModal("提示","请先登录")
        return;
      }

      
      if(this.collected){
        this.collected=false;
        const response=await get(config.collectUrl,{openId:openId,id:this.postDetail.id,action:"discollect"})
        if(response.code===0){
          showSuccess("取消成功")
        }else{
          showModal("错误",'请检查网络状态')
        }
      }else{
        this.collected=true;
        const response=await get(config.collectUrl,{openId:openId,id:this.postDetail.id,action:"collect"})
        if(response.code===0){
          showSuccess("收藏成功")
        }else{
          showModal("错误",'请检查网络状态')
        }
      }
    }
  }
}
</script>

<style>
.postDetail-container {
  font-size: 15px;
  padding: 32rpx;
  background: #fff;
  border-radius: 5px;
  box-shadow:2px 2px 5px #888888;
  margin: 8px;
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
  border-radius: 5px;
}

</style>
