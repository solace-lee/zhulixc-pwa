<template>
  <div class="item" @click="goDetail(newProduct.commodityId)">
    <div class="item_a" v-if="index === 0">
      <div class="item_a_area">
        <div class="a_left">
          <div class="a_titel"></div>
          <div class="a_name"></div>
          <div class="a_info">
            <div class="a_now_price"></div>
            <div class="a_old_price"></div>
            <div class="a_buy_now">立即购买</div>
          </div>
        </div>
        <div class="a_right">
          <img src="" alt="">
        </div>
      </div>
    </div>
    <div class="item_b" v-else></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 新品推荐
@Component
export default class toneProduct extends Vue {
  @Prop({ default: {} }) private toneProduct!: Object
  @Prop({ default: 0 }) private index!: Number
  private value = null

  mounted () {
    console.log(this.toneProduct);
    
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
  width: 12rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  .item_img {
    width: 100%;
    height: 10.6rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .name {
    font-size: 1.3rem;
    color: #333;
    /*超过两行省略号*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /*超过两行省略号*/
    -webkit-box-orient: vertical;
    /*超过两行省略号*/
  }
  .info {
    display: flex;
    padding-bottom: .4rem;
    align-items: flex-end;
    .now_price {
      font-size: 1.8rem;
      color: #00ae87;
      font-weight: bold;
    }
    .old_price {
      font-size: .9rem;
      color: #666;
      margin-left: 1rem;
    }
  }
}
</style>
