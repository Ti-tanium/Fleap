<template>
  <div class="setting-container">
    <van-field
      :value="QQId"
      name="QQId"
      label="QQ:"
      required
      type="number"
      placeholder="请输入QQ号"
      :error-message="QQErrorMessage"
      @confirm="onQQConfirm"
    />
    <picker @change="MajorPickerChange" :value="index" :range="majorArray">
      <van-field :value="major" label="专业:" name="major" placeholder="请选择专业类别" disabled/>
    </picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      major: "",
      QQErrorMessage: "",
      QQId: "",
      majorArray: ["哲学类", "经济学类", "财政学类", "金融学类", "设计学类"],
      index: ""
    };
  },
  methods: {
    onQQConfirm(event) {
      const QQ = event.mp.detail;
      if (!numberValidate(QQ)) {
        this.QQErrorMessage = "请输入正确QQ号";
      } else {
        this.QQErrorMessage = "";
      }
    },
    numberValidate(obj) {
      var reg = /^[0-9|.]*$/;
      return reg.test(obj);
    },
    MajorPickerChange(e) {
      this.index = e.target.value;
      console.log(e);
      this.major = this.majorArray[this.index];
    }
  }
};
</script>

<style>
</style>
