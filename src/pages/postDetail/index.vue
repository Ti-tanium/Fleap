<template>
  <div class="postDetail-container">
   post-detail {{itemId}}
  </div>
</template>

<script>
import { get } from '@/utils/index'
import config from '@/config'
export default {
  data () {
    return {
      itemId: ''
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
      console.log(postDetail)
    }
  }
}
</script>

<style>
</style>
