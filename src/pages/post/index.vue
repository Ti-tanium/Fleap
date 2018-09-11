<template>
  <div class="post-container">
    <form @submit="formSubmit">
      <div class="properties">

        <div class="sell-give">
          <div class="prompt">属性</div>
          <radio-group name="properties" class="radio-group" @change="radioChange">
            <label class="radio">
              <radio value="sell" checked="true"/> 售卖
            </label>
            <label class="radio">
            <radio value="give" :checked="false"/> 赠送
            </label>
          </radio-group>
        </div>

        <div class="category">
          <div class="prompt">类别</div>
          <radio-group class="radio-group" name="category">
            <label class="radio">
              <radio
                value="textBook"
                checked="true"
                />
              教材
            </label>
            <label class="radio">
              <radio
                value="daily-necessities"
                :checked="false"
                />
              日常用品
            </label>
           <label class="radio">
              <radio
                value="electronics"
                :checked="false"
                />
              电子产品
            </label>
            <label class="radio">
              <radio
                value="other"
                :checked="false"
                />
              其他
            </label>

          </radio-group>
        </div>

        <SplitLine></SplitLine>

      </div>

    <div class="price">
      <div class="prompt">价格(元):</div>
      <input name="price" type="text" v-model="price" placeholder="0.00">
    </div>

    <SplitLine></SplitLine>

    <textarea name="title" id="title-txt" rows="1" maxlength="20" placeholder="输入商品名称,20字以内"></textarea>

    <SplitLine></SplitLine>

    <textarea name="detail" id="detail-txt" placeholder="输入描述,200字以内"></textarea>

    <SplitLine></SplitLine>

    <div class="add" @click="addImage">
      <block :v-for="picture in pictures" :key="index" v-if="picture">
        <img src="picture" class="add-img">
      </block>
      <img src="/static/images/icon/add-image.png" alt="添加图片" class="add-image">
    </div>

    <button class="btn" formType="submit">发布</button>

    </form>
  </div>
</template>

<script>
import SplitLine from '@/components/SplitLine'
import config from '@/config'
export default {
  components: { SplitLine },
  data () {
    return {
      postInfo: {},
      pictures: []
    }
  },
  methods: {
    addImage () {
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFilePaths)
          this.pictures = res.tempFilePaths
        }
      })
    },
    radioChange (e) {
      console.log(e)
    },
    formSubmit (e) {
      var formInfo = e.target.value
      this.postInfo = {
        formInfo,
        image: this.pictures.join(',')
      }
      console.log(e)
    }
  }
}
</script>

<style>
.price {
  display: flex;
  flex-direction: row;
  background: #fff;
  font-size: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.radio-group {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.prompt {
  font-size: 15px;
  color: #666;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 26.25px;
  height: 26.26px;
}
#title-txt {
  width: 100%;
  height: 20px;
  padding: 8px 0 8px 10px;
  font-size: 15px;
  background: #fff;
}
#detail-txt {
  background: #fff;
  padding: 5px 0 5px 10px;
  font-size: 15px;
  width: 100%;
}
.add {
  height: 100px;
  width: 100px;
  background: #f2f2f2;
  margin: 10px;
  line-height: 100px;
  text-align: center;
}

.add-image {
  width: 20px;
  height: 20px;
}
</style>
