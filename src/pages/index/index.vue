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

    <van-tabs :active="activeTabIndex" @change="onTabChange" color="#3398da" :swipeable="true" animated>
      <van-tab title="最新">
        <div class="postList" v-for="post in posts.new" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="posts.new">
          暂无任何内容
        </div>
      </van-tab>
      <van-tab title="附近">
        <div class="postList" v-for="post in posts.near" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div>
      </van-tab>
      <van-tab title="推荐">
        <div class="postList" v-for="post in posts.recommend" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div>
      </van-tab>
      <van-tab title="教材">
        <div class="postList" v-for="post in posts.textbook" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div>
      </van-tab>
      <van-tab title="日常用品">
        <div class="postList" v-for="post in posts.dailyuse" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div>
      </van-tab>
      <van-tab title="电子产品">        
        <div class="postList" v-for="post in posts.electronics" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div></van-tab>
      <van-tab title="盆栽">        
        <div class="postList" v-for="post in posts.plant" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div></van-tab>
      <van-tab title="服装">        
        <div class="postList" v-for="post in posts.clothes" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div></van-tab>
      <van-tab title="拼车">        
        <div class="postList" v-for="post in posts.carshare" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div></van-tab>
      <van-tab title="其他">        
        <div class="postList" v-for="post in posts.other" :key="index">
          <PostCard :postList='post' :complete="false"></PostCard>
        </div>
        <div class="index-bottom" :hidden="postCount[category]!==0">
          暂无任何内容
        </div></van-tab>
    </van-tabs>
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
      category: 'new',
      activeTabIndex:'',
      postList:{
      },
      posts: {
        new:[],
        near:[],
        recommend:[],
        textbook:[],
        dailyuse:[],
        electronics:[],
        plant:[],
        clothes:[],
        carshare:[],
        other:[]
      },
      CountPerGet:20,
      postCount:{
        new:0,
        near:0,
        recommend:0,
        textbook:0,
        dailyuse:0,
        electronics:0,
        plant:0,
        clothes:0,
        carshare:0,
        other:0
      },
    }
  },
  mounted () {
    wx.showLoading({
      title: '加载中...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {}
    })
    this.getPosts()
  },
  methods: {
    async onTabChange(e){
      this.activeTabIndex=e.target.index;
      switch(this.activeTabIndex){
        case 0:
        this.category="new"
        break;
        case 1:
        this.category="near"
        break;
        case 2:
        this.category="recommend"
        break;
        case 3:
        this.category="textbook"
        break;
        case 4:
        this.category="dailyuse"
        break;
        case 5:
        this.category="electronics"
        break;
        case 6:
        this.category="plant"
        break;
        case 7:
        this.category="clothes"
        break;
        case 8:
        this.category="carshare"
        break;
        case 9:
        this.category="other"
        break;
      }
      wx.showLoading({
        title: '加载中...', //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
      if(this.postCount[this.category]===0){
        await this.getPosts();
      }
      wx.hideLoading();
    },
    async getPostList () {
      const postList = await get(config.host + '/weapp/postlist', {
        category: 'all'
      })
      this.postList = postList.data.list
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(this.postList.data.list)
    },

    async getPosts(){
      const response=await get(config.getPostsUrl,{
          category:this.category,
          count:this.CountPerGet,
          start:this.postCount[this.category]
      })
      const posts=response.data.posts;
      this.posts[this.category]=this.posts[this.category].concat(posts);
      console.log("category:",this.category+".","posts:",this.posts[this.category]);
      this.postCount[this.category]+=posts.length;
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  },
  onPullDownRefresh () {
    wx.showLoading({
      title: '加载中...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {
        this.getPosts()
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

