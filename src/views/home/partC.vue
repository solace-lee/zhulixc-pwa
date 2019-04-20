<template>
  <div class="part_c">
    <!-- 头部 -->
    <headers
      :status="headerStatus"
      :backUrl="backUrl"
      :title="title"
      :bgColor="bgColor"
      :fontColor="fontColor"
      ></headers>

    <!-- 会员说明数据 -->
    <div class="member_info_area">
      <div class="member_info">
        <img :src="memberInfo.titleImg" alt="">
      </div>
    </div>

    <!-- 广告 -->
    <div class="member_ad_area">
      <div class="ad_info">
        <img :src="ad1.titleImg" alt="">
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_doc"></use>
        </svg>
        <div class="title_txt">精品热卖</div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_doc"></use>
        </svg>
      </div>
    </div>

    <!-- 精品热卖产品展示区 -->
    <div class="product-container">
      <div
        class="product-item"
        v-for="(i, index) in hotSale"
        :key="index"
        v-show="index<4"
        @click="goProduct(i.commodityId)"
      >
        <div class="itemImg">
          <img :src="i.titleImg">
        </div>
        <div class="item-right">
          <div class="itemTitle">{{i.name}}</div>
          <div class="itemPrice">
            <div class="price">
              <div class="nowPrice">
                ￥
                <span>{{i.discountPrice}}</span>
              </div>
              <div class="originalPrice">
                市场价:
                <span>￥</span>
                {{i.originalPrice}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- 广告 -->
    <div class="member_ad_area">
      <div class="ad_info">
        <img :src="ad2.titleImg" alt="">
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_doc"></use>
        </svg>
        <div class="title_txt">会员商品</div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_doc"></use>
        </svg>
      </div>
    </div>

    <!-- 热销乡味 -->
    <div class="guess_product">
      <div class="product_area">
        <div class="guess_product_area" v-for="(i, index) in specialityProduct" :key="index">
          <guess-product :guessProduct="i"></guess-product>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import swipe from '@/components/home/swipe.vue'
import guessProduct from '@/components/home/guessProduct.vue'

@Component({
  components: {
    headers,
    swipe,
    guessProduct, // 猜你喜欢样式（热销乡味）
  }
})
export default class partC extends Vue {
  headerStatus: string = 'BackSearch' // header的显示方式
  title: string = '会员专区'
  bgColor: string = '#fff'
  fontColor: string = '#333'
  memberInfo: Object = {} // 会员说明数据
  ad1: Object = {} // 广告数据1
  hotSale: Array<Object> = [] // 精品热卖数据
  ad2: Object = {} // 广告数据2
  specialityProduct: Array<Object> = [] // 热销乡味数据
  backUrl: string = '/' // 返回路径

  created () {
    this.getdata(sessionStorage.getItem('codeC') || 0)
  }

  private getdata (code: string | number) {
    // 获取广告代码
    this.getRequest.getAds((res: any) => {
      if (res.data.status === 200) {
        // 会员说明数据
        this.memberInfo = res.data.data.f1[0]
        // 广告数据1
        this.ad1 = res.data.data.f2[0]
        // 精品热卖
        this.hotSale = res.data.data.f3
        // 广告数据2
        this.ad2 = res.data.data.f4[0]
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    }, code)

    // 获取会员商品数据
    this.getRequest.getMember ((res: any) => {
      if (res.data.status === 200) {
        this.specialityProduct = res.data.data.commodityList
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
.part_c
  width 100%
  overflow hidden

// 会员说明数据
.member_info_area
  margin-top 6.3rem
  width 100%
  height 56vw
  .member_info
    padding 0 1.5rem
    height 56vw
    width 100%
    img
      height 100%
      width 100%

// 会员说明数据
.member_ad_area
  margin-top 1.5rem
  width 100%
  height 21.3vw
  .ad_info
    height 21.3vw
    width 100%
    img
      height 100%
      width 100%

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
    justify-content center
    color #fd8320
    .title_txt
      font-size 1.5rem
      line-height 4.5rem
      padding 0 .8rem
    .icon
      font-size 1.5rem
.white_title
  background #fff

// 产品展示区样式集中
.product-container
  display flex
  flex-wrap wrap
  width 100%
  height 100%
  background #fff
  .product-item
    width 50%
    background #fff
    display flex
    border 1px solid #eee /*no*/
    padding 1rem
    .itemImg
      width 40%
      height 9.8rem
      overflow hidden
      // background #666
      img
        width 100%
        height 100%
    .item-right
      display flex
      flex-direction column
      justify-content space-between
      width 9.1rem
      margin-left 0.5rem
      .itemTitle
        font-size 1.3rem
        line-height 1.6rem
        color #333
        margin-top 0.5rem
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        /*! autoprefixer off */
        -webkit-box-orient vertical
        /*! autoprefixer on */
      .itemPrice
        padding 0 0.5rem
        display flex
        justify-content space-between
        .price
          display flex
          flex-direction column
          .nowPrice
            font-size 0.8rem
            color #fd8320
            span
              font-size 1.7rem
              font-weight bold
          .originalPrice
            font-size 1.1rem
            line-height 1.2rem
            span
              font-size 0.9rem

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
