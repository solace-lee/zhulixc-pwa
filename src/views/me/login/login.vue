<!-- 登录 -->
<template>
  <div class="login">
    <div class="bg_img">
      <img src="../../../assets/index/loginBg.png" alt="">
    </div>
    <!-- 头部 -->
    <headers :status="headerList.status" :bgColor="headerList.bgColor" ></headers>
    <!-- 头像 -->
    <div class="avater">
      <div style="color:red;">
        <!-- <img src="../../../img/index/newuser/logo.png" alt> -->
      </div>
    </div>
    <forms :name="name" @submitData='submitLogin'></forms>
    <div class="login_foot">
      <div @click="go('/register?type=register')">立即注册</div>
      <div @click="go('/register?type=passWord')">忘记密码</div>
    </div>
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
export default class login extends Vue {
  // 变量
  name ='login'
  headerList: object = {
    bgColor: '#00000000',
    status: 'noTitle'
  }

  // 方法
  private go (val:string) {
    this.$router.push({
      path: val
    })
  }
  // 提交登录
  private submitLogin (data: any) {
    if (this.name === 'login') {
      let phont = utils.encrypt(data.userPhone)
      let psw = utils.encrypt(data.userPwd)
      let form = {
        userName: phont,
        passWord: psw
      }
      this.getRequest.getLogin(form, (res: any) => {
        if (res.data) {
          if (res.data.status === 200) {
            localStorage.setItem('token', res.data.data)
            localStorage.setItem('Account', data.userPhone)
            const detailId = sessionStorage.getItem('detailId') || false
            if (detailId) {
              sessionStorage.removeItem('detailId')
              this.$router.replace({
                path: 'detail?id=' + detailId
              })
            } else {
              this.$router.replace({
                path: '/me'
              })
            }
          } else {
            this.Toast(res.data.msg, 'text', 1000, true)
          }
        }
      })
    }
  }
  created () {}
}
</script>
<style lang="stylus" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 15rem;
  .bg_img {
    position: fixed;
    z-index: -1;
    left: 0;
    width: 100%;
    top: 0;
    bottom: 0;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .avater {
    height: 8rem;
    width: 8rem;
    background: #999;
    border-radius: 50%;
  }
  .forms{
    margin-top: 6rem;
  }
  .login_foot{
    width 100%;
    display flex;
    margin-top:2rem
    div{
      flex:1;
      text-align:center;
      font-size: 1.4rem
      color: #fff
    }
  }
}
</style>
