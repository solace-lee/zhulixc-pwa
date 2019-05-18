<!-- 分类 -->
<template>
  <div class="classify">
    <!-- 头部 -->
    <headers
      :status="headerStatus"
      ></headers>

    <div class="scorll_area">
      <!-- 一级分类 -->
      <cube-scroll ref="scroll" class="part1">
          <div class="fist_list">
            <div :class="checkerFirst == i.id ? 'fist_item_active':'fist_item'" v-for="(i, index) in classifyFirstList" :key="index" @click="selectFirst(i.id)">
              <div class="item_name">{{i.classifyName}}</div>
            </div>
          </div>
      </cube-scroll>

      <!-- 二级三级分类，上拉加载更多，下拉刷新 -->
      <cube-scroll
        ref="scroll"
        class="part2"
        :data="classifyFirstList"
        :options="options"
        @pulling-down="onPullingDown"
      >
        <div class="second_list">
          <div class="second_item" v-for="(i, index) in classifySecondList" :key="index">
            <div class="item_name">{{i.classifyName}}</div>
            <div class="third_area">
              <div class="third_item" v-for="(j, index) in i.child" :key="index" @click="handleClickItem">
                <div class="third_img">
                  <img :src="j.classifyImgUrl" alt="">
                </div>
                <div class="third_name">{{j.classifyName}}</div>
              </div>
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
import login from '../me/login/login.vue';

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
  checkerFirst: any = 0 // 选中的一级分类
  classifySecondList: Array<object> = [] // 二级分类列表

  @Watch('checkerFirst', { immediate: true, deep: true })
    onPersonChanged(val: any, oldVal: any) {
      if (val !== 0) {
        sessionStorage.setItem('classifyId', val)
        this.getSecond(val)
      }
    }

  created () {
    this.getFirst()
  }

  get options ():any {
    return {
      pullDownRefresh: {
        txt: '刷新成功'
      },
      scrollbar: false,
    }
  }

  private onPullingDown () {
    // 下拉刷新
    this.getFirst()
  }

  private getFirst () {
    // 获取一级分类
    this.getRequest.getClassifyFirstList((res: any) => {
      if (res.data.status === 200) {
        this.classifyFirstList = res.data.data
        const id = sessionStorage.getItem('classifyId') || false
        if (id) {
          this.checkerFirst = id
        } else {
          this.checkerFirst = res.data.data[0].id
        }
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
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    })
  }

  private selectFirst (id: any) {
    this.checkerFirst = id
  }

  private handleClickItem () {
    // 点中了某个3级分类
  }
}
</script>
<style lang="stylus" scoped>
.classify
  width 100%

.scorll_area
  width 100%
  padding-right .6rem
  height calc(100vh - 9.8rem)
  margin-top 4.8rem
  margin-bottom 5rem
  display flex
  overflow hidden

.part1
  flex 1
  .fist_item
    width 8.5rem
    min-height 4.4rem
    display flex
    justify-content center
    align-items center
    font-size 1.3rem
    color #666
    background #f2f2f2
  .fist_item_active
    width 8.5rem
    min-height 4.4rem
    display flex
    justify-content center
    align-items center
    font-size 1.3rem
    color #666
    background #fff
    border-left 4px solid #00ae87 /*no*/

.part2
  flex 3
  .second_list
    width 100%
    padding-top .5rem
    .second_item
      width 100%
      min-height 4.4rem
      display flex
      flex-direction column
      justify-content center
      align-items center
      font-size 1.3rem
      color #666
      .item_name
        width 100%
        height 3rem
        font-size 1.5rem
        line-height 3rem
        color #666
        font-weight bold
        border-bottom 1px solid #f2f2f2 /*no*/
      .third_area
        width 100%
        display flex
        align-items center
        flex-wrap wrap
        .third_item
          width 32%
          padding 1rem 0
          display flex
          flex-direction column
          align-items center
          justify-content space-between
          .third_img
            width 7rem
            height 7rem
            margin 0 .3rem .5rem .3rem
            img
              width 100%
              height 100%
          .third_name
            // width 75%
            margin-top .6rem
            font-size 1.2rem
            color #999

.foot
  z-index 15
  position fixed
  bottom 0
  left 0
</style>
