<template>
  <div class="search-container">
    <icon
      type="search"
      size="18">
    </icon>
    <input type="text" v-model="query" placeholder="请输入查询内容">
  </div>
</template>

<script>
export default {
  data () {}
}
</script>

<style>
.search-container {
  margin: 10px;
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 4px;
  border-radius: 7px;
  font-size: 18px;
  height: 20px;
  line-height: 20px;
}
icon {
  margin: 2px;
  margin-right: 5px;
}
</style>
