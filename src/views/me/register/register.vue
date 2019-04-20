<!-- 注册，找回密码 -->
<template>
  <div class="register">
    <div class="bg_img">
      <img src="../../../assets/index/loginBg.png" alt="">
    </div>
    <!-- 头部 -->
    <headers :status="headerList.status" :bgColor="headerList.bgColor" ></headers>
    <!-- 头像 -->
    <div class="avater">
      <div style="color:red;">
        <!-- <img src="../../../img/index/register/logo.png" alt> -->
      </div>
    </div>
    <forms :name="name" @ @submitData='submitRegister'></forms>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import forms from '@/components/me/forms/forms.vue'
import utils from '@/config/utils.ts'

@Component({
  components: {
    headers,
    forms
  }
})
export default class register extends Vue {
  // 变量
  name: any ='register'
  headerList: any = {
    bgColor: '#00000000',
    status: 'noTitle'
  }
  created () {
    this.getData()
  }
  // 方法
  private getData () {
    let router = this.$route.query.type
    this.name = router
  }
  private submitRegister (data: any) {
    let phont = utils.encrypt(data.userPhone)
    let psw = utils.encrypt(data.userPwd)
    let form: any = {}
    if (this.name === 'passWord') {
      form.userPhone= phont
      form.code= data.code
      form.userPwd= psw
    } else {
      form.userPhone = phont
      form.userPwd = psw
      form.referralCode = data.referralCode
      form.code = data.code
      form.provinceId = data.provinceId
      form.cityId = data.cityId
      form.districtId = data.districtId
      this.getRequest.getRegister(form, (res: any) => {
        
      })
    }
    console.log(form)
  }
}
</script>
<style lang="stylus" scoped>
.register
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  padding-top: 5rem
  .bg_img
    position: fixed
    z-index: -1
    left: 0
    width: 100%
    top: 0
    bottom: 0
    img
      height: 100%
      width: 100%
  .avater
    height: 8rem
    width: 8rem
    background: #999
    border-radius: 50%
  .forms
    margin-top: 6rem
</style>
