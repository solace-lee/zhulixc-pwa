<!-- 注册，找回密码 -->
<template>
  <div class="register">
    <div class="bg_img">
      <img src="../../../assets/index/loginBg.png" alt="">
    </div>
    <!-- 头部 -->
    <headers :title="headerList.title" :status="headerList.status" :bgColor="headerList.bgColor" :manage="!changeNothing" ></headers>
    <!-- 头像 -->
    <div class="avater">
      <div style="color:red;">
        <!-- <img src="../../../img/index/register/logo.png" alt> -->
      </div>
    </div>
    <forms :name="name"></forms>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import forms from '@/components/me/forms/forms.vue'

@Component({
  components: {
    headers,
    forms
  }
})
export default class register extends Vue {
  // 变量
  name ='register'
  headerList: object = {
    isSearch: false,
    title: '注册',
    bgColor: '#00000000',
    status: 'isCar'
  }
  private changeNothing: boolean = false // 控制显示
  created () {}

  private getData () {
    let router = this.$route.query.type
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
