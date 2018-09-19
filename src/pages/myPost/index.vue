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
      const postList = await get(config.host + '/weapp/postlist', {
        category: 'all',
        openId: openId
      })
      console.log(postList.data.list)
      this.postList = postList.data.list
    }
  }
}
</script>

<style>
</style>
