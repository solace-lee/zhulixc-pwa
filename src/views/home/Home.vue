<template>
  <div class="home">
    <!-- 头部 -->
    <headers :status="headerStatus"></headers>

    <!-- 轮播图 -->
    <swipe :swipeList="swipeList"></swipe>

    <!-- 聚合区 -->
    <div class="special_area">
      <!-- partA -->
      <div class="special" @click="goPartArea(1)">
        <div class="special_img">
          <img loading="lazy" :src="partA.titleImg" alt="">
        </div>
        <div class="special_title">{{partA.title}}</div>
      </div>
      <!-- partB -->
      <div class="special" @click="goPartArea(2)">
        <div class="special_img">
          <img loading="lazy" :src="partB.titleImg" alt="">
        </div>
        <div class="special_title">{{partB.title}}</div>
      </div>
      <!-- partC -->
      <div class="special" @click="goPartArea(3)">
        <div class="special_img">
          <img loading="lazy" :src="partC.titleImg" alt="">
        </div>
        <div class="special_title">{{partC.title}}</div>
      </div>
      <!-- partD -->
      <div class="special" @click="goPartArea(4)">
        <div class="special_img">
          <img loading="lazy" :src="partD.titleImg" alt="">
        </div>
        <div class="special_title">{{partD.title}}</div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img">
          <img src="" alt="">
        </div>
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
        <div class="tone_product_a" v-for="(i, index) in toneProduct" :key="index" @click="goDetail(i.commodityId)" v-show="index === 0">
          <div class="a_left">
            <div class="a_titel">{{i.name}}</div>
            <div class="a_name">{{i.title}}</div>
            <div class="a_info">
              <div class="a_now_price"><span>￥</span>{{i.discountPrice}}</div>
              <s class="a_old_price">￥{{i.originalPrice}}</s>
              <div class="a_buy_now">立即购买</div>
            </div>
          </div>
          <div class="a_right">
            <img loading="lazy" :src="i.titleImg" alt="">
          </div>
        </div>
      </div>
      <div class="tone_area">
        <div class="tone_product_b" v-for="(i, index) in toneProduct" :key="index" @click="goDetail(i.commodityId)" v-show="index == 0">
          <div class="b_img">
            <img loading="lazy" :src="i.titleImg" alt="">
          </div>
          <div class="b_name">{{i.name}}</div>
          <div class="b_info">
            <div class="b_now_price">￥{{i.discountPrice}}</div>
            <s class="b_old_price">￥{{i.originalPrice}}</s>
          </div>
          <div class="b_buy_now">
            <span>立即购买</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">品牌推荐</div>
      </div>
    </div>

    <!-- 品牌推荐 -->
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

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">猜你喜欢</div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess_product">
      <div class="product_area">
        <div class="guess_product_area" v-for="(i, index) in guessProduct" :key="index">
          <guess-product :guessProduct="i"></guess-product>
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <div style="height:5rem;"></div>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import foot from '@/components/public/foot.vue'
import swipe from '@/components/home/swipe.vue'
import newProduct from '@/components/home/newProduct.vue'
import guessProduct from '@/components/home/guessProduct.vue'

@Component({
  components: {
    headers,
    foot,
    swipe,
    newProduct, // 新品推荐
    guessProduct, // 猜你喜欢
  }
})
export default class Home extends Vue {
  foot: String = 'home'
  partA: Object = []
  partB: Object = []
  partC: Object = []
  partD: Object = []
  headerStatus: string = 'isSearch' // header的显示方式
  swipeList: Array<Object> = [] // 轮播数据
  newProduct: Array<Object> = [] // 新品推荐数据
  toneProduct: Array<Object> = [] // 品质推荐数据
  brandProduct: Array<Object> = [] // 品牌推荐数据
  guessProduct: Array<Object> = [] // 猜你喜欢数据

  created () {
    this.getdata()
  }

  private getdata () {
    // 获取广告代码
    this.getRequest.getAds((res: any) => {
      if (res.data.status === 200) {
        // 轮播数据
        this.swipeList = res.data.data.f1
        // 新品推荐数据
        this.newProduct = res.data.data.f6
        // 品质推荐数据
        this.toneProduct = res.data.data.f7
        // 品牌推荐数据
        this.brandProduct = res.data.data.f8
        // 保存聚合区的code和图像
        this.partA = res.data.data.f2[0]
        sessionStorage.setItem('codeA', res.data.data.f2[0].typeCode)
        this.partB = res.data.data.f3[0]
        sessionStorage.setItem('codeB', res.data.data.f3[0].typeCode)
        this.partC = res.data.data.f4[0]
        sessionStorage.setItem('codeC', res.data.data.f4[0].typeCode)
        this.partD = res.data.data.f5[0]
        sessionStorage.setItem('codeD', res.data.data.f5[0].typeCode)
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    })

    // 获取猜你喜欢数据
    this.getRequest.getFavorite ((res: any) => {
      if (res.data.status === 200) {
        this.guessProduct = res.data.data
      }
    })
  }

  // 去聚合区
  private goPartArea (id: number) {
    switch (id) {
      case 1:
      this.$router.replace({
        path: '/partA'
      })
      break
      case 2:
      this.$router.replace({
        path: '/partB'
      })
      break
      case 3:
      this.$router.replace({
        path: '/partC'
      })
      break
      case 4:
      this.$router.replace({
        path: '/partD'
      })
      break
    
      default:
        break
    }
    
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
.home
  // background #eee
  width 100VW
  overflow hidden

// 轮播图
.swipe
  margin-top 4.8rem
  width 100%
  height 50vw

// 聚合区
.special_area
  width 100%
  height 9.6rem
  // overflow hidden
  // padding 0 1.5rem
  display flex
  justify-content space-around
  align-items center
  .special
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    .special_img
      height 4.6rem
      width 4.6rem
      img
        width 100%
        height 100%
    .special_title
      margin-top 1rem
      font-size 1.6rem
      color #666

// 标题
.part_title
  width 100%
  height 4.5rem
  padding 0 1.5rem
  background #f2f2f2
  .title_area
    width 100%
    height 100%
    display flex
    align-items center
    .title_img
      height 2rem
      width 0.6rem
      background #00ae87
      border-radius 0.3rem
      margin-right 1rem
    .title_txt
      font-size 2rem
      color #666
.white_title
  background #fff


// 新品推荐
.new_product
  height 17.5rem
  width 100%
  background #f2f2f2
  overflow hidden
  .product_area 
    // height 16rem
    display flex
    overflow-x scroll
    .new_product_area 
      width 12rem
      height 16rem
      margin-left 1.5rem

// 品质推荐
.tone_product
  width 100%
  height auto
  padding 0 1.5rem
  .tone_area
    width 100%
    height 100%
    display flex
    flex-wrap wrap
    .tone_product_a
      width 100%
      height 9.3rem
      display flex
      border-radius 6px
      overflow hidden
      margin-bottom 1rem
      .a_left
        width 50%
        height 100%
        background #f2f2f2
        padding 1rem
        display flex
        flex-direction column
        align-items center
        justify-content space-between
        .a_titel
          font-size 1.5rem
        .a_name
          font-size 1rem
          color #333
        .a_info
          display flex
          justify-content space-between
          align-items flex-end
          width 100%
          .a_now_price
            font-size 1.8rem
            color #00ae87
            font-weight bold
            span 
              font-size 1.2rem
          .a_old_price
            font-size 0.9rem
            color #666
          .a_buy_now
            font-size .8rem
            color #fff
            padding .4rem .8rem
            background #00ae3a
            border-radius 2rem
      .a_right
        width 50%
        height 100%
        img 
          width 100%
          height 100%
    .tone_product_b
      height 19.6rem
      width 11rem
      margin-bottom 1rem
      border-radius 6px
      display flex
      flex-direction column
      justify-content space-between
      background #f2f2f2
      .b_img
        width 11rem
        height 10.4rem
        img
          height 100%
          width 100%
      .b_name
        padding .6rem
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
      .b_info
        display flex
        align-items flex-end
        margin 0 .6rem
        .b_now_price
          font-size 1.8rem
          color #00ae87
        .b_old_price
          font-size .9rem
          color #999
      .b_buy_now
        // width 100%
        margin-bottom .6rem
        margin-right .6rem
        display flex
        justify-content flex-end
        align-items flex-end
        span
          width 4.8rem
          font-size .8rem
          color #fff
          padding .4rem .8rem
          background #00ae3a
          border-radius 2rem

// 品牌推荐
.brand_product
  background #f2f2f2
  height auto
  width 100%
  padding 0 1.5rem 1.5rem 1.5rem
  .brand_area
    display flex
    justify-content space-between
    flex-wrap wrap
    width 100%
    .brand_top
      width 49%
      height 10.3rem
      img
        height 100%
        width 100%
    .brand_bottom
      width 24%
      height 12rem
      margin-top .6rem
      img
        height 100%
        width 100%

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
