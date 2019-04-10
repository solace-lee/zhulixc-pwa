<template>
  <div class="home">
    <!-- 头部 -->
    <headers></headers>

    <!-- 轮播图 -->
    <swipe :swipeList="swipeList"></swipe>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">新品推荐</div>
      </div>
    </div>

    <!-- 新品推荐 -->
    <div class="new_product">
      <div class="product_area">
        <div class="new_product_area" v-for="(i, index) in newProduct" :key="index">
          <new-product :newProduct="i"></new-product>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">品质推荐</div>
      </div>
    </div>

    <!-- 品质推荐 -->
    <div class="tone_product">
      <div class="tone_area">
        <div class="tone_product_area" v-for="(i, index) in toneProduct" :key="index">
          <tone-product :toneProduct="i" :index="index"></tone-product>
        </div>
      </div>
    </div>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GetRequest } from '@/config/request.ts'
import headers from '@/components/public/header.vue'
import foot from '@/components/public/foot.vue'
import swipe from '@/components/home/swipe.vue'
import newProduct from '@/components/home/newProduct.vue'
import toneProduct from '@/components/home/toneProduct.vue'

@Component({
  components: {
    headers,
    foot,
    swipe,
    newProduct,
    toneProduct
  }
})
export default class Home extends Vue {
  foot: String = 'home'
  swipeList: Array<Object> = [] // 轮播数据
  newProduct: Array<Object> = [] // 新品推荐数据
  toneProduct: Array<Object> = [] // 品质推荐数据
  brandProduct: Array<Object> = [] // 品牌推荐数据

  created () {
    this.getdata()
  }

  private getdata () {
    const getRequest = new GetRequest()
    getRequest.getAds((res: any) => {
      console.log(res.data)
      // 轮播数据
      this.swipeList = res.data.data.f1
      // 新品推荐数据
      this.newProduct = res.data.data.f2
      // 品质推荐数据
      this.toneProduct = res.data.data.f3
      // 品牌推荐数据
      this.brandProduct = res.data.data.f4
    })
  }
}
</script>
<style lang="less" scoped>
.home {
  // background: #eee;
  width: 100VW;
  overflow: hidden;
}

// 标题
.part_title {
  width: 100%;
  height: 4.5rem;
  padding: 0 1.5rem;
  background: #f2f2f2;
  .title_area {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .title_img {
      height: 2rem;
      width: 0.6rem;
      background: #00ae87;
      border-radius: 0.3rem;
      margin-right: 1rem;
    }
    .title_txt {
      font-size: 2rem;
      color: #666;
    }
  }
}
.white_title {
  background: #fff;
}

// 新品推荐
.new_product {
  height: 17.5rem;
  width: 100%;
  background: #f2f2f2;
  overflow: hidden;
  .product_area {
    // height: 16rem;
    display: flex;
    overflow-x: scroll;
    .new_product_area {
      width: 12rem;
      height: 16rem;
      margin-left: 1.5rem;
    }
  }
}
</style>
