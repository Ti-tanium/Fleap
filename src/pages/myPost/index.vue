<template>
  <div class="myPost-container">
    <div class="postList" v-for="post in postList" :key="index">
      <PostCard :postList="post"></PostCard>
    </div>
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
    this.getPostList()
  },
  methods: {
    async getPostList () {
      const userinfo = wx.getStorageSync('userinfo')
      const openId = userinfo.openId
      wx.showLoading({
        title: '加载中...', // 提示的内容,
        mask: true, // 显示透明蒙层，防止触摸穿透,
        success: res => {}
      })
      const postList = await get(config.host + '/weapp/postlist', {
        category: 'all',
        openId: openId
      })
      console.log(postList.data.list)
      this.postList = postList.data.list
      wx.hideLoading()
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
</style>
