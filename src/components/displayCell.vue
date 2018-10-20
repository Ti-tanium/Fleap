<template>
  <div class="displayCell-container">
    <div class="icon-container">
      <img :src="iconUrl" class="icon">
    </div>
    <div class="cell-content">{{content}}</div>
  </div>
</template>

<script>
import SplitLine from '@/components/SplitLine'
export default {
  props: ['iconUrl', 'content', 'border'],
  components: {
    SplitLine
  }
}
</script>

<style>
.displayCell-container {
  display: flex;
  flex-direction: row;
  font-size: 15px;
  color: #666;
  margin: 5px 0 5px 0;
}
.cell-content {
  line-height: 18px;
  height: 18px;
  width: 100%;
  margin-left: 10rpx;
}
</style>
