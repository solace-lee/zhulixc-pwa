<template>
  <div class="item" @click="goDetail(guessProduct.commodityId)">
    <div class="item_img">
      <img :src="guessProduct.imgUrl" alt="">
      <div class="brand_name">{{guessProduct.brandName}}</div>
    </div>
    <div class="item_title">
      <p>{{guessProduct.name}}</p>
    </div>
    <div class="item_info">
      <div class="now_price">￥{{guessProduct.discountPrice}}</div>
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
<style lang="less" scoped>
.item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item_img {
    height: 15.4rem;
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .brand_name {
      position: absolute;
      bottom: -0.8rem;
      left: 1rem;
      height: 1.9rem;
      font-size: 1.2rem;
      background: #ba9078;
      line-height: 2rem;
      color: #fff;
      padding: 0 0.6rem;
    }
  }
  .item_title {
    
  }
}
</style>
