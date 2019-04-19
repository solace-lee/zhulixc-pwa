<template>
  <div class="header" ref="header">
    <!-- 搜索型样式 -->
    <div class="header_search" v-if="isSearch">
        <!-- 定位图标 -->
        <svg class="icon" aria-hidden="true" v-if="hasGetLocation">
          <use xlink:href="#icon-icon_GPS"></use>
        </svg>
        <!-- 返回图标 -->
        <svg class="icon" aria-hidden="true" @click="goBack" v-if="hasBack">
          <use xlink:href="#icon-icon_left"></use>
        </svg>
        <!-- 地点显示 -->
        <show-address v-if="hasGetLocation"></show-address>
        <!-- 搜索框 -->
        <div class="search_box" @click="goSearch">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_search"></use>
          </svg>
          <input type="text" class="gosearch" disabled placeholder="更多好货助力">
          <!-- <cube-input v-model="value" disabled placeholder="更多好货助力"></cube-input> -->
        </div>
        <!-- 消息图标 -->
        <svg class="icon" aria-hidden="true" v-if="msgBtn" @click="goMsg">
          <use xlink:href="#icon-icon_dmail"></use>
        </svg>
    </div>

    <!-- 标题型样式 -->
    <div class="header_title" v-if="!isSearch">

      <div class="left_area">
        <!-- 返回图标 -->
        <svg class="icon" aria-hidden="true" @click="goBack" v-if="hasBack">
          <use xlink:href="#icon-icon_left"></use>
        </svg>
        <!-- 地点显示 -->
        <show-address v-if="hasGetLocation"></show-address>
      </div>

      <!-- 标题 -->
      <div class="title_area" v-if="showTitle">{{title}}</div>

      <div class="right_area">
        <!-- 购物车图标 -->
        <svg class="icon" aria-hidden="true" @click="goCar" v-if="goCarBtn">
          <use xlink:href="#icon-icon_collect"></use>
        </svg>
        <!-- 搜索图标 -->
        <svg class="icon" aria-hidden="true" @click="goSearch" v-if="searchBtn">
          <use xlink:href="#icon-icon_search"></use>
        </svg>
        <!-- 管理按钮 -->
        <div class="manage" v-if="complete" @click="goEdit">管理</div>
        <!-- 完成按钮 -->
        <div class="manage" v-if="manage" @click="goEdit">完成</div>
        <!-- 消息图标 -->
        <svg class="icon" aria-hidden="true" v-if="msgBtn" @click="goMsg">
          <use xlink:href="#icon-icon_dmail"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import showAddress from '@/components/home/showAddress.vue'

@Component({
  components: {
    showAddress
  }
})
export default class headers extends Vue {
  @Prop({ default: '标题' }) private title!: string
  @Prop({ default: '#00ae87' }) private bgColor!: string
  @Prop({ default: '' }) private status!: string // 显示方式
  @Prop({ default: false }) private manage!: boolean // 显示管理
  @Prop({ default: '' }) private backUrl!: string // 返回地址

  private isSearch: boolean = false // 控制显示搜索1
  private hasBack: boolean = false // 控制显示返回按钮12
  private goCarBtn: boolean = false // 控制显示购物车按钮2
  private complete: boolean = false // 控制显示完成按钮2
  // private manage: boolean = false // 控制管理按钮2
  private hasGetLocation: boolean = false // 控制显示定位按钮1
  private searchBtn: boolean = false // 控制搜索图标2
  private showTitle: boolean = false // 控制标题显示2
  private msgBtn: boolean = false // 控制消息按钮显示2

  mounted () {
    this.changeBgColor() // 根据传入值修改背景颜色
    this.changeStatus() // 根据传入值修改显示方式
  }

  // t 根据传入值修改显示方式
  private changeStatus () {
    switch (this.status) {
      case 'isCar': // 购物车类型
        this.goCarBtn = false
        this.complete = true
        this.hasBack = true
        break
      case 'isSearch': // 首页类型
        this.isSearch = true
        this.hasGetLocation = true
        this.msgBtn = true
        break
      case 'BackSearch': // 带搜索带返回按钮类型
        this.isSearch = false
        this.hasGetLocation = true
        this.hasBack = true
        this.searchBtn = true
        this.showTitle = true
        this.msgBtn = true
        break
       case 'noTitle': // 带搜索带返回按钮类型
        this.isSearch = false
        this.hasBack = true
        break
      default:
        break
    }
  }
  // 根据传入值修改背景颜色
  private changeBgColor () {
    let el: any = this.$refs.header
    el.style.background = this.bgColor
  }

  private goSearch () {
    console.log('去搜索页')
  }

  private goMsg () {
    console.log('去消息页')
  }

  private goCar () {
    console.log('去购物车')
  }
  
  //完成及编辑切换
  private goEdit () {
    this.complete = !this.complete
    this.manage = !this.manage
  }

  // 回退到上一页
  private goBack () {
    // 如果父组件有传返回路径则使用
    if (this.backUrl) {
      this.$router.replace({
        path: this.backUrl
      })
    } else {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  width 100%
  // background #00ae87
  height 4.8rem
  position fixed
  top 0
  left 0
  z-index 10

// 搜索型样式
.header_search
  width 100%
  height 100%
  width 100%
  height 100%
  display flex
  align-items center
  color #fff
  .icon
    flex 1
    font-size 1.8rem
  .search_box
    flex 6
    width auto
    margin 0 0.6rem
    height 3.4rem
    overflow hidden
    border-radius 1.7rem
    overflow hidden
    background #fff
    display flex
    align-items center
    .icon
      color #ccc
      font-size 1.6rem
      flex none
      width 3rem
    input
      height 3.4rem
      background #fff
      line-height 3.4rem
    .gosearchplaceholder
      color #ccc
      font-size 1.2rem
      line-height 3.4rem


// 标题型样式
.header_title
  width 100%
  height 100%
  display flex
  align-items center
  justify-content space-between
  color #fff
  position relative
  .left_area
    display flex
    align-items center
  .icon
    font-size 1.6rem
    margin 0 0.8rem
    z-index 10
  .title_area
    font-size 1.8rem
    position absolute
    height 100%
    width 100%
    line-height 4.8rem
    text-align center
  .right_area
    display flex
    align-items center
    .icon
      font-size 1.8rem
      margin-left 0
      margin-right 1.2rem
    .manage
      font-size 1.4rem
      margin-left 0
      z-index 10
      margin-right 1.2rem

</style>
