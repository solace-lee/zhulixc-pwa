<template>
  <div class="part_d">
    <!-- 头部 -->
    <headers :status="headerStatus" :backUrl="backUrl"></headers>

    <!-- 顶部大图 -->
    <div class="ad1">
      <div class="top-img" @click="goUrl(f1.url)">
        <img :src="f1.titleImg">
      </div>
    </div>

    <!-- 积分信息 -->
    <div class="score_area">
      <div class="score_number">
        <div class="score_img">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_coinpurse_line"></use>
          </svg>
        </div>
        <div class="score_txt">
          <span>{{balance}}</span>
        </div>积分
      </div>
      <div class="score_record">
        <div class="score_img">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_coinpurse_line"></use>
          </svg>
        </div>
        <div class="score_txt">积分记录</div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 新品热卖 -->
    <div class="hot-sales">
      <div class="hot-sales-container">
        <div class="hot-sales-title">
          <img class="hot-sales-img" :src="f2.titleImg">
          <div class="hot-sales-text">新品热卖</div>
        </div>
        <div class="hot-sales-item">
          <cube-slide
            ref="slide"
            :data="hotProduct"
            :loop= "true"
            :autoPlay= "true"
            :show-dots= "true"
            :interval="5000"
          >
            <!-- 轮播内容 -->
            <cube-slide-item v-for='(i, index) in hotProduct' :key='index'>
              <div @click="goDetail(i.url)">
                <img loading="lazy" :src="i.imgUrl" alt="">
              </div>
            </cube-slide-item>
          </cube-slide>
        </div>
      </div>
    </div>

    <!-- 间隔线 -->
    <div class="isline"></div>

    <!-- 广告2 -->
    <div class="ad-f2">
      <div class="ad-img">
        <img :src="f3.titleImg">
      </div>
    </div>

    <!-- 精选换购 -->
    <div class="ad-title" style="background: #f2f2f2;">
      <div class="ad-img"></div>
      <div class="ad-title-txt">精选换购</div>
      <div class="ad-img"></div>
    </div>

    <!-- 产品展示区 -->
    <div class="hot-product-container">
      <div class="product-item" @click="goDetail(i.id)" v-for="(i, index) in product" :key="index">
        <div class="itemImg">
          <img :src="i.imgUrl">
        </div>
        <div class="itemTitle">{{i.name}}</div>
        <div class="itemPrice">
          <div class="price">
            <div class="nowPrice">
              {{i.discountPrice}}
              <span>积分</span>
            </div>
            <div class="salesd">
              已换
              <span>{{i.salesVolume}}</span>笔
            </div>
          </div>
          <div class="hot-buy-btn">马上兑换</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'

@Component({
  components: {
    headers
  }
})

export default class partD extends Vue {
  headerStatus: string = 'BackSearch' // header的显示方式
  backUrl: string = '/' // 返回路径
  title: string = '积分兑换'
  product: Array<Object> = [] // 商品列表
  hotProduct: Array<Object> = [] // 热门商品列表
  ad1: string = ''
  balance: number = 0 // 积分数量
  adList: Array<Object> = [] // 广告列表
  f1: Array<Object> = [] // 一楼广告
  f2: Array<Object> = [] // 二楼广告
  f3: Array<Object> = [] // 三楼广告

  created () {
    this.getData() // 获取所有数据
    this.getWallet() // 获取积分数据
    this.getPointAD() // 获取页面广告
  }

  // 获取积分商品所有数据
  private getData () {
    this.getRequest.findIntegralShopping('', (res: any) => {
      if (res.data.status === 200) {
        this.product = res.data.data.commodityList
      }
    })
    // 热门商品列表
    this.getRequest.findIntegralShopping(3, (res: any) => {
      if (res.data.status === 200) {
        this.hotProduct = res.data.data.commodityList
      }
    })
  }

  // 去积分商品详情页
  private goDetail (id: any) {
    this.$router.push({
      path: '/detail?id=' + id
    })
  }

  // 获取积分详细
  private getWallet () {
    this.getRequest.integralRecommend((res: any) => {
      if (res.data.status === 200) {
        this.balance = res.data.data.alreadyAmount
      }
    })
  }
  // 获取积分广告
  private getPointAD () {
    this.getRequest.getAdsList((res: any) => {
      if (res.data.status === 200) {
        this.adList = res.data.data
        this.f1 = res.data.data.f1[0]
        this.f2 = res.data.data.f2[0]
        this.f3 = res.data.data.f3[0]
      }
    })
  }
  // 去广告页
  private goUrl (url: string) {
    if (url !== '#') {
      this.$router.push({
        path: url
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.part_d
  width 100VW
  overflow hidden

  // 顶部大图
.ad1
  width 100%
  margin-top 4.7rem
  .top-img
    width 100%
    height 53vw
    overflow hidden
    img
      width 100%
      height 100%

.isline
  width 100%
  height 1.2rem
  background: #f2f2f2

// 积分信息
.score_area
  width 100%
  height 5.4rem
  overflow hidden
  display flex
  align-items center
  font-size 1.6rem
  padding 0 1.5rem
  .score_number
    flex 1
    text-align center
    display flex
    justify-content center
    align-items center
    .score_img
      width 1.8rem
      height 2rem
      margin-right 1rem
      img
        width 100%
        height 100%
    .score_txt
      color #666
      font-size 1.6rem
      padding-top 0.4rem
      span
        color #00ae87
        font-size 1.8rem
        margin-right 0.4rem
  .score_record
    flex 1
    display flex
    justify-content center
    align-items center
    .score_img
      width 1.8rem
      height 2rem
      margin-right 1rem
      img
        width 100%
        height 100%

// 新品热卖
  .hot-sales
    width 100%
    height 32rem
    background #f2f2f2
    .hot-sales-container
      width 100%
      padding 0 1.5rem
      .hot-sales-title
        width 100%
        height 5.8rem
        border-radius 6px 6px 0 0
        overflow hidden
        position relative
        // background #666
        img
          height 100%
          width 100%
        .hot-sales-text
          position absolute
          top 0
          left 0
          right 0
          height 100%
          text-align center
          line-height 5.8rem
          font-size 2.4rem
          color #fff
      .hot-sales-item
        height 26.2rem
        width 100%
        background #fff
        img
          border-style none
          width 100%
          height 100%

    // 广告图位置
  .ad-f2
    width 100%
    height 23.2vw
    padding 0 1.5rem
    background #f2f2f2
    .ad-img
      width 100%
      height 23.2vw
      border-radius 11.6vw
      // background #999
      overflow hidden
      img
        width 100%
        height 100%

  // 标题的样式
  .ad-title
    height 4.6rem
    display flex
    padding-left 1.5rem
    align-items center
    justify-content center
    background #fff
    .ad-img
      width 1.6rem
      height 0.3rem
      border-radius 0.15rem
      background #00ae87
    .ad-title-txt
      font-size 1.5rem
      color #333
      padding 0 0.7rem

  // 精选换购产品展示区样式集中
  .hot-product-container
    display flex
    justify-content space-between
    flex-wrap wrap
    width 100%
    height 100%
    padding 0 1.5rem
    background #f2f2f2
    .product-item
      width 49%
      height 24.4rem
      overflow hidden
      background #fff
      display flex
      flex-direction column
      border-radius 6px
      margin-top 0.5rem
      margin-bottom 0.5rem
      .itemImg
        width 100%
        height 15.2rem
        overflow hidden
        background #666
        border-radius 6px 6px 0 0
        img
          width 100%
          height 100%
      .itemTitle
        font-size 1.4rem
        color #333
        // padding 0.5rem
        padding-top 0.5rem
        padding-left 1rem
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 1
        /*! autoprefixer off */
        -webkit-box-orient vertical
        /*! autoprefixer on */
      .itemPrice
        padding 0 0.5rem
        display flex
        flex-direction column
        align-items center
        .price
          display flex
          padding 0.5rem
          width 100%
          justify-content space-between
          .nowPrice
            font-size 1.6rem
            color #ff0000
            font-weight bold
            span
              font-size 1.2rem
          .salesd
            font-size 1rem
            color #999
            line-height 1.8rem
            margin-top 0.2rem
            margin-left 0.2rem
            span
              font-size 0.9rem
        .hot-buy-btn
          width 90%
          height 2.5rem
          border-radius 3px
          text-align center
          line-height 2.5rem
          background #00ae87
          color #fff
          font-size 1.2rem
</style>
