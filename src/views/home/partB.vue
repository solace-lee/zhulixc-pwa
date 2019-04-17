<template>
  <div class="part_a">
    <!-- 头部 -->
    <headers :status="headerStatus" :backUrl="backUrl" :title="title"></headers>

    <!-- 广告轮播图 -->
    <swipe :swipeList="swipeList"></swipe>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">绿色生活</div>
        <div class="title_txt_en">GREEN</div>
      </div>
    </div>

    <!-- 绿色生活 -->
    <!-- 大标题展示区 -->
    <div class="all_content" v-for="(i, count) in greenlife" :key="count">
      <div class="banner_title">
        <img :src="i.classifyImgUrl">
      </div>
      <!-- 产品展示区 -->
      <div class="product_container">
        <!-- i.commodityList -->
        <div class="sale_product_area" v-for="(j, index) in i.commodityList" :key="index">
          <new-product :newProduct="j"></new-product>
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
    newProduct, // 今日特价
    guessProduct, // 猜你喜欢
  }
})
export default class partA extends Vue {
  headerStatus: string = 'BackSearch' // header的显示方式
  title: string = '一村一品'
  swipeList: Array<Object> = [] // 轮播数据
  newProduct: Array<Object> = [] // 新品推荐数据
  greenlife: Array<Object> = [] // 绿色生活数据
  backUrl: string = '/' // 返回路径

  created () {
    this.getdata(sessionStorage.getItem('codeB') || 0)
  }

  private getdata (code: string | number) {
    // 获取广告代码
    this.getRequest.getAds((res: any) => {
      if (res.data.status === 200) {
        // 轮播数据
        this.swipeList = res.data.data.f1
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    }, code)

    // 获取猜你喜欢数据
    this.getRequest.getGreenlife ((res: any) => {
      if (res.data.status === 200) {
        this.greenlife = res.data.data
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
.part_a
  width 100VW
  overflow hidden


// 广告轮播图
.swipe
  margin-top 4.8rem
  width 100%
  height 44.8vw

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
    .title_txt
      font-size 1.5rem
      line-height 4.5rem
      color #333
      padding-left 1rem
    .title_txt_en
      font-size 1.5rem
      font-weight bold
      color #ccc
      padding-left 0.7rem
.white_title
  background #fff

// 绿色生活
// 大标题展示区样式集中
.all_content
  width 100%
  height auto
  .banner_title
    width 100%
    height 22.6vw
    overflow hidden
    position relative
    justify-content center
    img
      width 100%
      height 100%
  .product_container
    width 100%
    padding 1.5rem 0
    background #f2f2f2
    display flex
    justify-content space-around
    align-items center
    overflow-x scroll
    .sale_product_area
      height 15rem
      width 11.5rem
      overflow hidden
</style>
