<template>
  <div class="item" @click="goDetail(toneProduct.commodityId)">
    <div class="item_a" v-if="index === 0">
      <div class="item_a_area">
        <div class="a_left">
          <div class="a_titel">{{toneProduct.name}}</div>
          <div class="a_name">{{toneProduct.title}}</div>
          <div class="a_info">
            <div class="a_now_price">￥{{toneProduct.discountPrice}}</div>
            <s class="a_old_price">￥{{toneProduct.originalPrice}}</s>
            <div class="a_buy_now">立即购买</div>
          </div>
        </div>
        <div class="a_right">
          <img :src="toneProduct.titleImg" alt="">
        </div>
      </div>
    </div>
    <div class="item_b" v-else></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// 新品推荐
@Component
export default class toneProduct extends Vue {
  @Prop({ default: {} }) private toneProduct!: Object
  @Prop({ default: 0 }) private index!: Number
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
  height: auto;
  width: auto;
}

// a
.item_a {
  width: 100%;
  height: 12.3rem;
  padding: 1.5rem;
  .item_a_area {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    .a_left {
      width: 50%;
      height: 100%;
      background: #f2f2f2;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .a_titel {
        font-size: 1.5rem;
      }
      .a_name {
        font-size: 1rem;
        color: #333;
      }
      .a_info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        .a_now_price {
          font-size: 1.8rem;
          color: #00ae87;
        }
        .a_old_price {
          font-size: 0.9rem;
          color: #666;
        }
        .a_buy_now {
          font-size: .8rem;
          color: #fff;
          padding: .4rem .8rem;
          background: #00ae3a;
          border-radius: 2rem;
        }
      }
    }
    .a_right {
      width: 50%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// b
.a_right {

}
</style>
