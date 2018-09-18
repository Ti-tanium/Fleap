<template>
  <div class="addPicture-container">
    <div class="frame" v-for="picture in localPictures" :key="index">
      <img :src="picture" class="picture" mode="aspectFill">
    </div>
    <div class="add-frame" @click="chooseImage" :hidden="hideAdd">
      <img src="/static/images/icon/add-image.png" class="add-image">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hideAdd: false,
      localPictures: [],
      count: 0
    }
  },
  methods: {
    chooseImage () {
      wx.chooseImage({
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        count: '9', // 最多可以选择的图片张数,
        async: false,
        success: res => {
          // 本地图片地址
          let pictures = res.tempFilePaths
          this.count = this.count + pictures.length
          if (this.count >= 9) {
            this.hideAdd = true
          } else {
            this.hideAdd = false
          }
          this.localPictures = this.localPictures.concat(pictures)
          // 将图片数据发送给调用组件
          this.$emit('addPicture', this.localPictures)
        },
        fail: () => {}
      })
    }
  }
}
</script>

<style>
.addPicture-container {
  display: flex;
  flex-wrap: wrap;
}
.add-image {
  width: 20px;
  height: 20px;
}
.add-frame {
  height: 100px;
  width: 100px;
  background: #f2f2f2;
  margin: 10px;
  line-height: 100px;
  text-align: center;
}
.frame {
  height: 100px;
  width: 100px;
  background: #f2f2f2;
  margin: 10px;
  display: inline-block;
}
.picture {
  width: 100%;
  height: 100%;
}
</style>
