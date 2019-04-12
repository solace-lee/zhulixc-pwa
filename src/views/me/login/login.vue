<!-- 注册 -->
<template>
  <div class="login">
    <div class="box">
      <!-- 头部 -->
      <headers  :title="headerList.title" :status="headerList.status" :manage="!changeNothing"></headers>
      <!-- 头像 -->
      <div class="avater">
        <div>
          <!-- <img src="../../../img/index/newuser/logo.png" alt> -->
        </div>
      </div>
    </div>

    <div class="box2">
      <forms :name="name"></forms>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import forms from '@/components/forms/forms.vue'

@Component({
  components: {
    headers,
    forms,
  }
})
export default class login extends Vue {
  // 变量
  name ='login'
  headerList: object = {
    isSearch: false,
    title: '登录',
    bgColor: '',
    status: 'isCar'
  }
  private changeNothing: boolean = false//控制显示
  created () {}
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  margin-top:4.8rem;
  input {
    width: 100%;
  }
  .box {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    // background-image: url(../../../img/index/newuser/bottom.png);
    background-repeat: no-repeat;
    background-size: 100% 146%;
    background-position: 0 0;
    .header{
      background-color: #999 !important ;
    }
    .nu_head {
      width: 100%;
      height: 4.7rem;
      color: #fff;
      top: 0;
      z-index: 1000;
      line-height: 4.7rem;
      font-size: 1.6rem;
      display: flex;
      position: fixed;
      top: 0;
      // justify-content: center;
      // align-items: center;
      div {
        flex: 1;
        .nu_h_go {
          margin-left: 1rem;
          font-size: 2rem;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .nu_h_text {
        text-align: center;
      }
    }
    .avater {
      width: 100%;
      height: 100%;
      padding-top: 2rem;
      div {
        width: 30%;
        margin: 1.6rem auto;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
  .box2 {
    width: 100%;
    height: 74%;
    position: absolute;
    bottom: 0;
    // background-image: url(../../../img/index/newuser/bottom2.png);
    background-size: 100% 100%;
    padding-top: 3rem;
  }
}
</style>