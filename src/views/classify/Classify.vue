<!-- 分类 -->
<template>
  <div class="classify">
    <!-- 头部 -->
    <headers
      :status="headerStatus"
      ></headers>

    <div class="scorll_area">

      <!-- 上拉加载更多，下拉刷新 -->
      <cube-scroll ref="scroll">
          <div class="fist_list">
            <div :class="checkerFirst === i.id ? 'fist_item_active':'fist_item'" v-for="(i, index) in classifyFirstList" :key="index" @click="selectFirst(i.id)">
              <div class="item_name">{{i.classifyName}}</div>
            </div>
          </div>
      </cube-scroll>

      <!-- 上拉加载更多，下拉刷新 -->
      <cube-scroll
        ref="scroll"
        :data="classifyFirstList"
        :options="options"
        @pulling-down="onPullingDown"
      >

        <div class="second_list">
          <div class="second_item" v-for="(i, index) in classifySecondList" :key="index">
            <div class="item_name">{{i.classifyName}}</div>
            <div class="third_area">
              
            </div>
          </div>
        </div>

      </cube-scroll>

    </div>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  classifyFirstList: Array<object> = [] // 一级分类列表
  checkerFirst: number = 0 // 选中的一级分类
  classifySecondList: Array<object> = [] // 二级分类列表

  @Watch('checkerFirst', { immediate: true, deep: true })
    onPersonChanged(val: number, oldVal: number) { 
      console.log(this.checkerFirst);
      if (val !== 0) {
        this.getSecond(val)
      }
    }

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
    this.getFirst()
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
    this.getFirst()
  }

  private getFirst () {
    // 获取一级分类
    this.getRequest.getClassifyFirstList((res: any) => {
      console.log(res.data.data)
      if (res.data.status === 200) {
        this.classifyFirstList = res.data.data
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    })
  }

  private getSecond (id: number) {
    // 获取二级分类
    this.getRequest.getClassifySecondList(id, (res: any) => {
      if (res.data.status === 200) {
        this.classifySecondList = res.data.data
        console.log(this.classifySecondList)
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    })
  }

  private selectFirst (id: number) {
    this.checkerFirst = id
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
  display flex

.fist_item
  width 8.5rem
  min-height 4.4rem
  display flex
  justify-content center
  align-items center
  font-size 1.3rem
  color #666
  border 1px solid #eee /*no*/
.fist_item_active
  width 8.5rem
  min-height 4.4rem
  display flex
  justify-content center
  align-items center
  font-size 1.3rem
  color #666
  border 1px solid #00ae87 /*no*/
.second_list
  // width 100vw
  // padding-left 8.5rem
.second_item
  width 100%
  min-height 4.4rem
  display flex
  justify-content center
  align-items center
  font-size 1.3rem
  color #666
  border 1px solid #eee /*no*/

</style>
