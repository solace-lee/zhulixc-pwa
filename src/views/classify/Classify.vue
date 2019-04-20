<!-- 分类 -->
<template>
  <div class="classify">
    <!-- 头部 -->
    <headers
      :status="headerStatus"
      ></headers>

    <div class="scorll_area">

      <!-- 上拉加载更多，下拉刷新 -->
      <cube-scroll
        ref="scroll1"
        :data="classifyFirstList"
        :options="options"
        @pulling-down="onPullingDown"
      >

        分类


      </cube-scroll>

    </div>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import foot from '@/components/public/foot.vue'

@Component({
  components: {
    headers,
    foot
  }
})
export default class classify extends Vue {
  foot: String = 'classify'
  headerStatus: string = 'isSearch' // header的显示方式
  classifyFirstList: Array<object> = [] // 分类列表

  get options ():any {
    return {
      pullDownRefresh: this.pullDownRefreshObj,
      // pullUpLoad: this.pullUpLoadObj,
      scrollbar: false,
      // eventPassthrough: 'vertical',
    }
  }

  private pullDownRefreshObj () {
    console.log('下拉刷新')
  }

  private onPullingDown () {
    console.log('下拉刷新1')
    this.getdata()
    // 模拟更新数据
    // setTimeout(() => {
    //   if (Math.random() > 0.5) {
    //     // 如果有新数据
    //     this.items.unshift(_foods[1])
    //   } else {
    //     // 如果没有新数据
    //     this.$refs.scroll.forceUpdate()
    //   }
    // }, 1000)
  }

  created () {
    this.getdata()
  }

  private getdata () {
    // console.log('classify')
  }
}
</script>
<style lang="stylus" scoped>
.classify
  width 100%
  height 100vh

.scorll_area
  width 100%
  height 100vh
  padding-top 4.8rem
  padding-bottom 5rem

</style>
