<template>
  <div class="item" @click="goDetail(brandProduct.commodityId)">
    <div class="item_a" v-if="index < 2">
      <div class="item_a_area">
        <img :src="brandProduct.titleImg" alt="">
      </div>
    </div>
    <div class="item_b" v-else></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// 新品推荐
@Component
export default class brandProduct extends Vue {
  @Prop({ default: {} }) private brandProduct!: Object
  @Prop({ default: 0 }) private index!: Number
  private value = null

  mounted () {
    console.log(this.brandProduct);
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
  width: 45%;
  height: 12.3rem;
  padding: 1.5rem;
  .item_a_area {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
}

// b

</style>
