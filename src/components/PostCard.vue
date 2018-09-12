<template>
<a :href="postDetailUrl">
  <div class="PostCard-container">
    <div class="body">
      <div class="avatar">
        <img :src="postList.avatarUrl" class="avatar-img">
      </div>
      <div class="content">
        <div class="nickName">{{postList.nickName}}</div>
        <div class="title">{{postList.title}}</div>
        <div class="image-container">
          <img :src="image" v-for="image in images" :key="index" class="item-image" @click.stop="previewImage(image,index)">
        </div>
        <div class="footer">
          <div class="postTime">{{postList.postTime}}</div>
          <div class="viewCount">
            <img src="/static/images/icon/view.png" class="icon">
            <div class="count">{{postList.viewCount}}</div>
          </div>
        </div>
      </div>
    </div>
    <SplitLine></SplitLine>
  </div>
</a>
</template>

<script>
import SplitLine from '@/components/SplitLine'

export default {
  components: {
    SplitLine
  },
  props: ['postList'],
  data () {
    return {
      images: this.postList.image.split(',')
    }
  },
  computed: {
    postDetailUrl () {
      return '/pages/postDetail/main?id=' + this.postList.id
    }
  },
  methods: {
    previewImage (image, index) {
      wx.previewImage({
        urls: this.images, // 需要预览的图片链接列表,
        current: this.images[index]
      })
    }
  }
}
</script>

<style>
.PostCard-container {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  font-size: 15px;
  color: #111;
  margin-bottom: 10px;
}
.body {
  display: flex;
  flex-direction: row;
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.viewCount {
  display: flex;
  flex-direction: row;
  height: 17px;
  line-height: 17px;
}
.count {
  margin-left: 5px;
}
.content {
  display: flex;
  flex-direction: column;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.nickName {
  color: rgb(11, 63, 175);
  margin-bottom: 5px;
}
.image-container {
  display: flex;
  flex-wrap: wrap;
}
.item-image {
  height: 80px;
  width: 80px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.footer {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 13px;
  color: #888;
}
</style>
