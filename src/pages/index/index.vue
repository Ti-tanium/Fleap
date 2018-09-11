<template>
  <div class="index-container">

    <swiper indicator-dots autoplay circular>
        <block v-for="swiperPicture in swiperPictures" :key="index">
            <swiper-item>
                <image mode='aspectFill' :src="swiperPicture" class="swiperPicture"></image>
            </swiper-item>
        </block>
    </swiper>

    <Search></Search>

    <div class="postList" v-for="post in postList" :key="index">
      <PostCard :postList='post'></PostCard>
    </div>


  </div>
</template>

<script>
import Search from '@/components/Search'
import PostCard from '@/components/PostCard'
import SplitLine from '@/components/SplitLine'
import config from '@/config'
import { get } from '@/utils/index'
export default {
  components: { Search, SplitLine, PostCard },
  data () {
    return {
      swiperPictures: [
        '/static/images/csu/csu1.jpg',
        '/static/images/csu/csu2.jpg',
        '/static/images/csu/csu3.jpg'
      ],
      postList: {},
      category: ''
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    async getPostList () {
      const postList = await get(config.host + '/weapp/postlist', {
        category: 'textBook',
        Free: ''
      })

      this.postList = postList.data.list
      console.log(this.postList.data.list)
    }
  }
}
</script>

<style>
.index-container {
  background: #f2f2f2;
}
swiper-item {
  text-align: center;
}
.swiperPicture {
  width: 100%;
  height: 100%;
}
</style>

