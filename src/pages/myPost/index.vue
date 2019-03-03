<template>
  <div class="myPost-container">
    <!-- <div class="postList" v-for="post in postList" :key="index"> -->
      <checkbox-group @change="checkboxChange">
        <label v-for="post in postList" :key="index" class="checkbox">
          <checkbox
            :name="completed" />
          <PostCard :postList="post"></PostCard>
        </label>
      </checkbox-group>
    <!-- </div> -->
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import { get } from '@/utils/index'
import config from '@/config'
export default {
  components: {
    PostCard
  },
  data () {
    return {
      postList: {}
    }
  },
  mounted () {
    this.getMyPosts()
  },
  methods: {
    async getMyPosts() {
      const userinfo = wx.getStorageSync("userinfo");
      const openId = userinfo.openId;
      wx.showLoading({
        title: "加载中...", // 提示的内容,
        mask: true, // 显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
      const postList = await get(config.getMyPostsUrl, {
        openId: openId
      });
      console.log("my posts:",postList.data.posts);
      this.postList = postList.data.posts;
      if(this.postList.length==0){
        this.empty=true;
      }else{
        this.empty=false;
      }
      wx.hideLoading();
    }
  },
  onPullDownRefresh () {
    wx.showLoading({
      title: '加载中...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {
        this.getPostList()
      }
    })
  }
}
</script>

<style>
.checkbox{
  display: flex;
  align-items: center;
  margin-left: 8rpx;
}

</style>
