<template>
  <div class="item" @click="goDetail(newProduct.commodityId)">
    <div class="item_img">
      <img :src="newProduct.titleImg" alt="">
    </div>
    <div class="name">{{newProduct.name}}</div>
    <div class="info">
      <div class="now_price"><span>￥</span>{{newProduct.discountPrice}}</div>
      <s class="old_price">￥{{newProduct.originalPrice}}</s>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 类似新品推荐的样式
@Component
export default class newProduct extends Vue {
  @Prop({ default: {} }) private newProduct!: Object
  private value = null

  mounted () {}

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
  height inherit
  width inherit
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  background #fff
  border-radius 6px
  overflow hidden
  .item_img
    width 100%
    height 10.6rem
    img
      height 100%
      width 100%
  .name
    font-size 1.3rem
    padding 0 .6rem
    color #333
    /*超过两行省略号*/
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 1
    /*超过两行省略号*/
    -webkit-box-orient vertical
    /*超过两行省略号*/
  .info
    display flex
    padding-bottom .4rem
    align-items flex-end
    .now_price
      font-size 1.8rem
      color #00ae87
      font-weight bold
      span
        font-size 1.2rem
    .old_price
      font-size .9rem
      color #666
      margin-left 1rem
</style>
