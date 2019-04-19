<template>
  <div class="part_b">
    <!-- 头部 -->
    <headers
      :status="headerStatus"
      :backUrl="backUrl"
      :title="title"
      :bgColor="bgColor"
      :fontColor="fontColor"
      ></headers>

    <!-- 广告轮播图 -->
    <swipe :swipeList="swipeList"></swipe>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <div class="title_txt">热销乡味</div>
        <div class="title_txt_en">尝遍故乡的鲜</div>
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
export default class partB extends Vue {
  headerStatus: string = 'BackSearch' // header的显示方式
  title: string = '一村一品'
  bgColor: string = '#fff'
  fontColor: string = '#333'
  swipeList: Array<Object> = [] // 轮播数据
  specialityProduct: Array<Object> = [] // 热销乡味数据
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
    this.getRequest.getSpeciality ((res: any) => {
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
.part_b
  width 100%
  overflow hidden


// 广告轮播图
.swipe
  margin-top 4.8rem
  width 100%
  height 31.2vw

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
    .title_txt
      font-size 1.5rem
      line-height 4.5rem
      color #333
      padding-left 1rem
    .title_txt_en
      font-size 1rem
      color #ccc
      padding-left 0.4rem
      border-left 1px solid #ccc /*no*/
      margin-left 0.4rem
.white_title
  background #fff

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
