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
    <van-cell-group>
      <van-field
          :value="price"
          name="price"
          label="价格(元):"
          type="number"
          placeholder="请输入价格"
          :error-message="priceErrorMessage"
          @confirm="onPriceConfirm"
        />
        <van-field
          :value="title"
          name="title"
          label="标题:"
          placeholder="请输入商品名称，20字以内~"
          :error-message="titleErrorMessage"
          @change="onTitleChange"
        />
        <van-field
          :value="detail"
          name="detail"
          type="textarea"
          autosize
          label="详细描述:"
          placeholder="200字以内~"
          :error-message="detailErrorMessage"
          @change="onDetailChange"
          :border="false"
        />

      </van-cell-group>

      <wux-upload 
      listType="picture-card" 
      :defaultFileList="fileList" 
      count="9" 
      max="9" 
      compressed="true"
      url=getUploadUrl
      @change="onChange" 
      @success="onSuccess" 
      @fail="onFail" 
      @complete="onComplete" 
      @preview="onPreview">
        <image :src="imageUrl" :v-if="imageUrl" />
        <text>Upload</text>
      </wux-upload>

    <button class="btn" formType="submit">发布</button>

    </form>
  </div>
</template>

<script>
import {
  post,
  showModal,
  showSuccess,
  formatTime,
  numberValidate
} from '@/utils/index'
import config from '@/config'
export default {
  data () {
    return {
      postInfo: {},
      pictures: [],
      detail: '',
      detailErrorMessage: '',
      title: '',
      titleErrorMessage: '',
      price: '',
      priceErrorMessage: '',
      category: 'textBook',
      uploadPictures: [],
      fileList: []
    }
  },
  methods: {
    radioChange (e) {
      console.log(e)
    },
    getUploadUrl(){
      return config.uploadUrl;
    },
    checkFormInfo (formInfo) {
      if (!formInfo.category) {
        showModal('信息不完全', '请选择商品类别')
        wx.hideLoading()
        return false
      } else if (!formInfo.price) {
        showModal('信息不完全', '请填写商品价格')
        wx.hideLoading()
        return false
      } else if (!formInfo.title) {
        showModal('信息不完全', '请填写标题')
        wx.hideLoading()
        return false
      } else if (!formInfo.detail) {
        showModal('信息不完全', '请填写详细描述')
        wx.hideLoading()
        return false
      }
      return true
    },
    async formSubmit (e) {
      var formInfo = e.target.value
      const time = formatTime(new Date())
      const userinfo = wx.getStorageSync('userinfo')

      console.log('form Information:', formInfo)

      wx.showLoading({
        title: '上传中...', // 提示的内容,
        mask: true, // 显示透明蒙层，防止触摸穿透,
        success: res => {}
      })

      // check form information not null
      if (!this.checkFormInfo(formInfo)) {
        console.log('Form information not complete.')
        return
      }

      // upload pictures
      // console.log('The number of pictures chosen', this.pictures.length)
      // if (this.pictures.length > 0) {
      //   for (let i = 0; i < this.pictures.length; i++) {
      //     console.log('uploading the', i + 1, 'th picture.')
      //     console.log('uploading picture:', this.pictures[i])
      //     wx.uploadFile({
      //       url: config.uploadUrl, // 开发者服务器 url
      //       filePath: this.pictures[i], // 要上传文件资源的路径
      //       name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
      //       success: res => {
      //         res = JSON.parse(res.data)
      //         console.log('uploadFile success call back result:', res)
      //         console.log(
      //           'uploadFile succeeded,the',
      //           i,
      //           'th imgUrl:',
      //           res.data.imgUrl
      //         )
      //         this.uploadPictures = [...this.uploadPictures, res.data.imgUrl]
      //         // 获得所有上传的图片路径之后 再一并提交服务器
      //         console.log(
      //           'uploadLength=',
      //           this.uploadPictures.length,
      //           'localLength=',
      //           this.pictures.length
      //         )
      //         if (this.uploadPictures.length === this.pictures.length) {
      //           Object.assign(this.postInfo, formInfo, {
      //             image: this.uploadPictures.join(','),
      //             nickName: userinfo.nickName,
      //             avatarUrl: userinfo.avatarUrl,
      //             openId: userinfo.openId,
      //             postTime: time
      //           })
      //           console.log('succeed in post second-hand deel information.')
      //           console.log('postInfo', this.postInfo)

      //           // post merchandise information to server
      //           try {
      //             post(config.host + '/weapp/post', this.postInfo)
      //             this.uploadPictures = []
      //             showSuccess('发布成功')
      //             this.formReset()
      //           } catch (e) {
      //             console.log(e)
      //             showModal('发布失败', '请检查您的网络状态')
      //           }
              // }
            // },
        //     fail: () => {},
        //     complete: () => {}
        //   })
      //   }
      //   wx.hideLoading()
      // } else {
      //   Object.assign(this.postInfo, formInfo, {
      //     image: '',
      //     nickName: userinfo.nickName,
      //     avatarUrl: userinfo.avatarUrl,
      //     openId: userinfo.openId,
      //     QQId: userinfo.QQId,
      //     phone: userinfo.phone,
      //     postTime: time
      //   })
      //   console.log('succeed in post second-hand deel information.')
//         console.log('postInfo', this.postInfo)
        // post merchandise information to server
        Object.assign(this.postInfo, formInfo, {
                   image: this.uploadPictures.join(','),
                   nickName: userinfo.nickName,
                   avatarUrl: userinfo.avatarUrl,
                   openId: userinfo.openId,
                   postTime: time
                 })
        try {
          await post(config.host + '/weapp/post', this.postInfo)
          this.uploadPictures = []
          showSuccess('发布成功')
          this.formReset()
        } catch (e) {
          console.log(e)
          showModal('发布失败', '请检查您的网络状态')
        }
      }
    },
    formReset () {
      this.price = ''
      this.title = ''
      this.detail = ''
      this.category = 'textBook'
      console.log('reset form and picture')
    },
    onPriceConfirm (event) {
      const price = event.mp.detail
      console.log('price is number?', numberValidate(price))
      if (!numberValidate(price)) {
        this.priceErrorMessage = '请输入正确的价格'
      } else {
        this.priceErrorMessage = ''
      }
    },
    onTitleChange (event) {
      const title = event.mp.detail
      console.log('title is over 20 character?', title.length > 20)
      if (title.length > 20) {
        this.titleErrorMessage = '标题过长'
      } else {
        this.titleErrorMessage = ''
      }
    },
    onDetailChange (event) {
      const detail = event.mp.detail
      console.log('detail is over 20 character?', detail.length > 20)
      if (detail.length > 200) {
        this.titleErrorMessage = '标题过长'
      } else {
        this.titleErrorMessage = ''
      }
    },
    onSuccess (res) {
      console.log(res)
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
