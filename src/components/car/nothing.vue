<!-- 购物车 -->
<template>
  <div class="nothing">
    <!-- <v-gologin></v-gologin> -->
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-icon_delete"></use>
    </svg>
    <p class="noting-text">购物车是空的~</p>
    <div class="nothing-toshop">
      <router-link :to="{ name: '首页', params: {} }" class="nothing-toshop2" ><strong>再去逛逛</strong></router-link>
    </div>
    <div class="lovely">
      <span></span>
      <p>猜你喜欢</p>
      <span></span>
    </div>
      <!-- 猜你喜欢 -->
    <div class="guess_product">
      <div class="product_area">
        <div class="guess_product_area" v-for="(i, index) in guessProduct" :key="index">
          <guess-product :guessProduct="i"></guess-product>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import guessProduct from '@/components/home/guessProduct.vue'

@Component({
  components: {
    guessProduct
  }
})
export default class nothing extends Vue {
  created () {
    this.getdata()
  }
  // 变量
  guessProduct: Array<Object> = [] // 猜你喜欢数据
  // 方法
  private getdata () {
    // 获取猜你喜欢数据
    this.getRequest.getFavorite ((res: any) => {
      if (res.data.status === 200) {
        this.guessProduct = res.data.data
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.nothing
  width 100%
  height 100%
  text-align center
  background-color #fff
  .icon
    font-size 8rem
    color #999
    margin-bottom 1rem
  .noting-text
    font-size 1.6rem
    color #aaabab
    margin-bottom 2rem
  .nothing-toshop
    width 100%
    margin-bottom 5rem
    .nothing-toshop2
      font-size 1.2rem
      background-color #00ae87
      padding 0.6rem 3rem
      border-radius 20rem
      color #fff
      letter-spacing 0.1rem
  .lovely
    width 100%
    height 3rem
    display flex
    justify-content center
    align-items center
    p
      font-size 1.8rem
      color #00ae87
      margin 0rem 2rem
    span
      width 3.7rem
      height 0.2rem
      background-color #00ae87
  // 猜你喜欢
  .guess_product
    height auto
    width 100%
    padding 0 1.5rem 1.5rem 1.5rem
    .product_area
      display flex
      justify-content space-between
      flex-wrap wrap
      width 100%
      .guess_product_area
        width 49%
        height 23.7rem
        margin-bottom 1rem
        border-radius 6px
        overflow hidden
</style>
