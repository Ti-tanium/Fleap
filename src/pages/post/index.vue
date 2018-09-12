<template>
  <div class="post-container">
    <form @submit="formSubmit">
      <div class="properties">

        <div class="category">
          <div class="price-prompt">类别</div>
          <radio-group class="radio-group" name="category" v-model="category">
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
      <div class="price-prompt">价格(元):</div>
      <input name="price" type="text" v-model="price" placeholder="0.00">
    </div>

    <SplitLine></SplitLine>

    <textarea v-model="title" name="title" id="title-txt" rows="1" maxlength="20" placeholder="输入商品名称,20字以内"></textarea>

    <SplitLine></SplitLine>

    <textarea v-model="detail" name="detail" id="detail-txt" placeholder="输入描述,200字以内"></textarea>

    <SplitLine></SplitLine>
    <addPicture @addPicture="addPicture"></addPicture>



    <button class="btn" formType="submit">发布</button>

    </form>
  </div>
</template>

<script>
import SplitLine from '@/components/SplitLine'
import addPicture from '@/components/addPicture'
import { post, showModal, showSuccess, formatTime } from '@/utils/index'
import config from '@/config'
export default {
  components: { SplitLine, addPicture },
  data () {
    return {
      postInfo: {},
      pictures: [],
      detail: '',
      title: '',
      price: '',
      category: 'textBook'
    }
  },
  methods: {
    radioChange (e) {
      console.log(e)
    },
    async formSubmit (e) {
      var formInfo = e.target.value

      // check not null
      if (!formInfo.category) {
        showModal('信息不完全', '请选择商品类别')
      } else if (!formInfo.price) {
        showModal('信息不完全', '请填写商品价格')
      } else if (!formInfo.title) {
        showModal('信息不完全', '请填写标题')
      } else if (!formInfo.detail) {
        showModal('信息不完全', '请填写详细描述')
      }

      const time = formatTime(new Date())

      const userinfo = wx.getStorageSync('userinfo')
      Object.assign(this.postInfo, formInfo, {
        image: this.pictures.join(','),
        nickName: userinfo.nickName,
        avatarUrl: userinfo.avatarUrl,
        openId: userinfo.openId,
        postTime: time
      })

      console.log('succeed in post second-hand deel information.')
      console.log('postInfo', this.postInfo)

      // post merchandise information to server
      try {
        await post(config.host + '/weapp/post', this.postInfo)
        showSuccess('发布成功')
        this.formReset()
      } catch (e) {
        console.log(e)
        showModal('发布失败', '请检查您的网络状态')
      }
    },
    addPicture (value) {
      this.pictures = value
    },
    formReset () {
      this.price = ''
      this.title = ''
      this.detail = ''
      this.category = 'textBook'
      console.log('reset form and picture')
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
.price-prompt {
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
</style>
