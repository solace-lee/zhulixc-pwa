<template>
  <div class="part_a">
    <!-- 头部 -->
    <headers :status="headerStatus"></headers>

    <!-- 广告轮播图 -->
    <swipe :swipeList="swipeList"></swipe>

    <!-- 广告 -->
    <div class="ad1">
      <img loading="lazy" :src="ad1.titleImg" alt="" @click="goAdDetail(ad1.url)">
    </div>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">市场热卖</div>
        <div class="title_txt_en">HOT</div>
      </div>
    </div>

    <!-- 市场热卖 -->
    <div class="hot_product">
      <div class="product_area">
        <div class="hot_container_left" @click="goAdDetail(ad2.url)">
          <img loading="lazy" :src="ad2.titleImg">
        </div>
        <div class="hot_container_right">
          <div class="hot_container_right_item" @click="goAdDetail(ad3.url)">
            <img loading="lazy" :src="ad3.titleImg">
          </div>
          <div class="hot_container_right_item" @click="goAdDetail(ad4.url)">
            <img loading="lazy" :src="ad4.titleImg">
          </div>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">今日特价</div>
        <div class="title_txt_en">SALE</div>
      </div>
    </div>

    <!-- 今日特价 -->
    <div class="sale_product">
      <div class="product_area">
        <div class="sale_product_area" v-for="(i, index) in newProduct" :key="index">
          <new-product :newProduct="i"></new-product>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">绿色生活</div>
        <div class="title_txt_en">GREEN</div>
      </div>
    </div>

    <!-- 绿色生活 -->
    <div class="brand_product">
      <div class="brand_area">
        <div class="brand_top" v-for="(i,index) in brandProduct" :key="index" v-show="index < 2" @click="goDetail(i.commodityId)">
          <img loading="lazy" :src="i.titleImg" alt="">
        </div>
      </div>
      <div class="brand_area">
        <div class="brand_bottom" v-for="(i, index) in brandProduct" :key="index" v-show="index > 1" @click="goDetail(i.commodityId)">
          <img loading="lazy" :src="i.titleImg" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import swipe from '@/components/home/swipe.vue'
import newProduct from '@/components/home/newProduct.vue'
import guessProduct from '@/components/home/guessProduct.vue'

@Component({
  components: {
    headers,
    swipe,
    newProduct, // 新品推荐
    guessProduct, // 猜你喜欢
  }
})
export default class partA extends Vue {
  headerStatus: string = 'isSearch' // header的显示方式
  swipeList: Array<Object> = [] // 轮播数据
  newProduct: Array<Object> = [] // 新品推荐数据
  ad1: Object = [] // 广告
  ad2: Object = [] // 市场热卖数据1
  ad3: Object = [] // 市场热卖数据2
  ad4: Object = [] // 市场热卖数据3

  created () {
    this.getdata(sessionStorage.getItem('codeA') || 0)
  }

  private getdata (code: string | number) {
    // 获取广告代码
    this.getRequest.getAds((res: any) => {
      if (res.data.status === 200) {
        // 轮播数据
        this.swipeList = res.data.data.f1
        // 第一个广告
        this.ad1 = res.data.data.f2[0]
        // 市场热卖数据
        this.ad2 = res.data.data.f3[0]
        this.ad3 = res.data.data.f3[1]
        this.ad4 = res.data.data.f3[2]
        this.newProduct = res.data.data.f6
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    }, code)

    // 获取猜你喜欢数据
    this.getRequest.getFavorite ((res: any) => {
      if (res.data.status === 200) {
      }
    })
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
.part_a {
  width: 100VW;
  overflow: hidden;
}

// 广告轮播图
.swipe
  margin-top 4.8rem
  width 100%
  height 44.8vw

// 广告ad1
.ad1
  height: 30vw;
  width 100%;
  img
    height 100%
    width 100%

// 标题
.part_title
  width: 100%
  height: 4.5rem
  padding: 0 1.5rem
  background: #f2f2f2
  .title_area
    width: 100%
    height: 100%
    display: flex
    align-items: center
    .title_img
      height: 2rem
      width: 0.6rem
      background: #00ae87
      border-radius: 0.3rem
    .title_txt
      font-size: 1.5rem
      line-height 4.5rem
      color: #333
      padding-left: 1rem
    .title_txt_en
      font-size: 1.5rem
      font-weight: bold
      color: #ccc
      padding-left: 0.7rem
.white_title
  background: #fff

// 市场热卖
.hot_product
  width: 100%
  padding-bottom 1.5rem
  .product_area
    display: flex;
    padding: 0 1.5rem
    height: 18.1rem
    justify-content: space-around
    .hot_container_left
      border-radius: 6px
      overflow: hidden
      width: 39%
      height: 18.1rem
      img
        height: 100%
        width: 100%
    .hot_container_right
      width: 59%
      height: 100%
      display: flex
      flex-direction: column
      justify-content: space-between
      .hot_container_right_item
        width: 100%
        height: 8.8rem
        border-radius: 6px
        overflow: hidden
        img
          height: 100%
          width: 100%


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

// 品牌推荐
.brand_product {
  background: #f2f2f2;
  height: auto;
  width: 100%;
  padding: 0 1.5rem 1.5rem 1.5rem;
  .brand_area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .brand_top {
      width: 49%;
      height: 10.3rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .brand_bottom {
      width: 24%;
      height: 12rem;
      margin-top: .6rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}

// 猜你喜欢
.guess_product {
  height: auto;
  width: 100%;
  padding: 0 1.5rem 1.5rem 1.5rem;
  .product_area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .guess_product_area {
      width: 49%;
      height: 23.7rem;
      margin-bottom: 1rem;
      border-radius: 6px;
      overflow: hidden;
    }
  }
}

</style>
