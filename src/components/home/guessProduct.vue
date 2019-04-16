<template>
  <div class="item" @click="goDetail(guessProduct.id)">
    <div class="item_img">
      <img :src="guessProduct.imgUrl" alt="">
      <div class="brand_name">{{guessProduct.brandName}}</div>
    </div>
    <div class="item_title">
      <p>{{guessProduct.name}}</p>
    </div>
    <div class="item_info">
      <div class="now_price"><span>￥</span>{{guessProduct.discountPrice.toFixed(2)}}</div>
      <div class="hot_num">{{guessProduct.salesVolume}}人付款</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// 新品推荐
@Component
export default class guessProduct extends Vue {
  @Prop({ default: {} }) private guessProduct!: Object
  private value = null

  mounted () {
    // console.log(this.toneProduct)
  }

  // 去商品详情页
  private goDetail (id: Number) {
    this.$router.push({
      path: '/detail?id=' + id
    })
  }
}
</script>
<style lang="stylus" scoped>
.item
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content space-between
  background #f2f2f2
  .item_img
    height 15.4rem
    width 100%
    position relative
    img
      width 100%
      height 100%
    .brand_name
      position absolute
      bottom -0.8rem
      left 1rem
      height 1.9rem
      font-size 1.2rem
      background #ba9078
      line-height 2rem
      color #fff
      padding 0 0.6rem
  .item_title
    width 100%
    height 2.8rem
    margin-top 1rem
    padding 0 1rem
    p
      font-size 1.3rem
      color #333 
      /*超过两行省略号*/
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      /*超过两行省略号*/
      -webkit-box-orient vertical
      /*超过两行省略号*/
  .item_info
    display flex
    justify-content space-between
    align-items flex-end
    padding 0 1rem
    margin-bottom .6rem
    .now_price
      color #00ae87
      font-size 2rem
      font-weight bold
      span  
        font-size 1.2rem
    .hot_num
      font-size 1rem
      color #333
</style>
