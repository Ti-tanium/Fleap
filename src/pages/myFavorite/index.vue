<template>
  <div class="myFavorite-container">
    <div class="postList" v-for="post in postList" :key="index">
        <PostCard :postList="post" :complete="false"></PostCard>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import { get,showModal } from '@/utils/index'
import config from '@/config'
export default {
  components: {
    PostCard
  },
  data(){
    return {
      postList:[]
    }
  },  
  mounted () {
    this.getMyCollection()
  },
  methods:{
      async getMyCollection(){
      // acquire openId
      const userinfo=wx.getStorageSync('userinfo');
      const openId=userinfo.openId;
      const response= await get(config.getMyCollectionUrl,{openId:openId})
      if(response.code===0){
        this.postList=response.data.postList
        console.log("my collection:",this.postList)
      }else{
        showModal("提示","网络错误")
      }
  }  
  }
}
</script>

<style>
</style>
