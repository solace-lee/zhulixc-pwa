<!--脚部总组件 -->
<template>
  <div class="foot">
      <!-- 脚部导航栏 -->
      <div class="foot_bar">
        <cube-tab-bar
          v-model="index"
          :data="tabs"
          @click="clickHandler"
          @change="changeHandler">
          <cube-tab label="home">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_file"></use>
            </svg>
            <div>首页</div>
          </cube-tab>
          <cube-tab label="classify">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_QRcode"></use>
            </svg>
            <div>分类</div>
          </cube-tab>
          <cube-tab label="car">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_collect"></use>
            </svg>
            <div>购物车</div>
          </cube-tab>
          <cube-tab label="me">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_patriarch"></use>
            </svg>
            <div>我的</div>
          </cube-tab>
        </cube-tab-bar>
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class foot extends Vue {
  @Prop({ default: '' }) private foot!: string
  // 变量
  // 导航高亮
  index: string = ''
  // 监听滑动转换-对象
  tabs= [{
    label: 'home'
  }, {
    label: 'classify'
  }, {
    label: 'car'
  }, {
    label: 'me'
  }]

  created () {
    this.index = this.foot
  }

  // 钩子函数
  clickHandler (label: string) : void {}

  private changeHandler (label: string) {
    //  监听导航栏改变事件
    switch (label) {
      case 'home':
        this.$router.replace({
          path: '/'
        })
        break
      case 'classify':
        this.$router.replace({
          path: '/classify'
        })
        break
      case 'car':
        this.$router.replace({
          path: '/car'
        })
        break
      case 'me':
        this.$router.replace({
          path: '/me'
        })
        break
    }
  }
}
</script>
<style lang="stylus" scoped>
.foot
  width 100%
  height 100%
  .foot_bar
    width 100%
    height 4.8rem
    position fixed
    bottom 0
    font-size 1.2rem
    background-color #eee
    .icon
    font-size 1.8rem
    margin-bottom 0.6rem
    .cube-tab_active
      color #00ae87
</style>
