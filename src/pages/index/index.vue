<template>
  <div class="index-container">

    <swiper indicator-dots autoplay circular>
        <block v-for="swiperPicture in swiperPictures" :key="index">
            <swiper-item>
                <image mode='aspectFill' :src="swiperPicture" class="swiperPicture"></image>
            </swiper-item>
        </block>
    </swiper>

    <van-search id="search" placeholder="请输入搜索关键词" background="#fff" use-action-slot :value="keywords" @search="onSearch">
       <view slot="action" @click="onSearch">搜索</view>
    </van-search>

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
          <PostCard :postList='post' :complete="false" :location="true"></PostCard>
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
import { get, showModal } from '@/utils/index'
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
      keywords:'',
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
      userinfo:{}
    }
  },
  onLoad () {
    console.log("index loaded");
    wx.showLoading({
      title: '加载中...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {}
    })
    this.getPosts()
    wx.hideLoading();
  },
  onReachBottom(){
    console.log("scroll lower tricked.")
    wx.showLoading({
      title: '加载中...', //提示的内容,
      mask: true, //显示透明蒙层，防止触摸穿透,
      success: res => {}
    });
    this.getPosts("Replace")
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },
  methods: {
    onSearch(){
      //TODO:search code
    },
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
      if(this.category==="near"){
        wx.getSetting({
          success(res) {
            if (!res.authSetting["scope.userLocation"]) {
              wx.authorize({
                scope: "scope.userLocation",
                success() {
                  //同意获取地理位置
                  wx.getLocation({
                    type: "wgs84",
                    success(res) {
                      wx.setStorageSync("latitude", res.latitude);
                      wx.setStorageSync("longitude", res.longitude);
                    }
                  });
                },
                fail() {
                  console.log("failed to get location information");
                  showModal("提示","查看附近信息需要进行地理位置授权")
                  wx.hideLoading();
                }
              });
            }
          }
        });
      }else if (this.category==="recommend"){
        this.userinfo=wx.getStorageSync('userinfo');
        if(!this.userinfo.openId){
          showModal("提示","请先登录")
        }
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
    async getPosts(actioin){
      const latitude = wx.getStorageSync('latitude');
      const longitude = wx.getStorageSync('longitude');
      const response=await get(config.getPostsUrl,{
          category:this.category,
          count:this.CountPerGet,
          start:this.postCount[this.category],
          latitude:latitude?latitude:null,
          longitude:longitude?longitude:null,
          openId:this.userinfo.openId?this.userinfo.openId:null
      })
      const posts=response.data.posts;
      console.log("category:",this.category+".","posts:",this.posts[this.category]);
      console.log("post count before:",this.postCount[this.category])
      if(actioin==="Replace"&&this.category=="new"){
        this.posts[this.category]=posts;
        this.postCount[this.category]=posts.length;
      }else{
        this.posts[this.category]=this.posts[this.category].concat(posts);
        this.postCount[this.category]+=posts.length;
      }
      console.log("post count after:",this.postCount[this.category])
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  },
  onPullDownRefresh () {
    var that=this;
    wx.showLoading({
      title: '加载中...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success :res => {
        this.posts[this.category]=[]
        this.getPosts("Replace")
        wx.hideLoading();
      }
    })

  },
  onShareAppMessage () {
    return {
      title: '蚤小跳',
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
.van-cell{
  background-color: #f2f2f2;
}

</style>

