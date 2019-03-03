<template>
  <div class="card-wrapper">
      <div class="checkbox" :hidden="!checkbox">
          <van-checkbox>
          </van-checkbox>
      </div>
      <div class="thumb">
          <img :src="thumb" class="thumb-image">
      </div>
      <div class="content">
          <div id="title">{{this.title}}</div>
          <div id="price">{{this.price}}</div>
      </div>
      <div class="footer">
          <div id="postTime">{{this.postTime}}</div>
      </div>
  </div>
</template>

<script>
import { Checkbox} from '/static/vant';
export default {
  props:["checkbox","thumb","title","price","tag","postTime"]
};
</script>

<style>
.main-wrapper{
  width: 85%;
  height: auto;
  border-radius: 8px;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.checkbox{
  margin: 8rpx;
  width: 10%;
}
.thumb{
  width: 20%;
}
.content{
  width: 70%;
  padding: 8rpx;
  display: flex;
  flex-direction: column;
}
</style>
