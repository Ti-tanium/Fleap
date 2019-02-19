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

    <van-tabs :active="activeTabIndex" @change="onTabChange">
      <van-tab title="附近">附近</van-tab>
      <van-tab title="推荐">推荐</van-tab>
      <van-tab title="教材">教材</van-tab>
      <van-tab title="日常用品">日常用品</van-tab>
      <van-tab title="电子产品">电子产品</van-tab>
      <van-tab title="盆栽">盆栽</van-tab>
      <van-tab title="服装">服装</van-tab>
      <van-tab title="拼车">拼车</van-tab>
      <van-tab title="其他">其他</van-tab>
    </van-tabs>

    <div class="postList" v-for="post in postList" :key="index">
      <PostCard :postList='post'></PostCard>
    </div>

    <div class="index-bottom" :hidden="postList">
        (ノ｀Д)ノ 什么内容都没有！
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
      category: '',
      activeTabIndex:''
    }
  },
  mounted () {
    wx.showLoading({
      title: '加载中...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {}
    })
    this.getPostList()
  },
  methods: {
    async getPostList () {
      const postList = await get(config.host + '/weapp/postlist', {
        category: 'all'
      })

      this.postList = postList.data.list
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(this.postList.data.list)
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
  },
  onShareAppMessage () {
    return {
      title: '易书',
      path: '/pages/index/main',
      success: res => {},
      fail: () => {},
      complete: () => {}
    }
  },
  onTabChange(e){

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
.index-bottom {
  font-size: 14px;
  margin: 10rpx 20rpx;
  color: #888;
  text-align: center;
}
</style>

