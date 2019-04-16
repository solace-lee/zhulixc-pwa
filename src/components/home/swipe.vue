<template>
  <div class="swipe">
    <cube-slide
      ref="slide"
      :data="swipeList"
      :loop= "true"
      :autoPlay= "true"
      :show-dots= "true"
      :interval="2000"
      @change="changePage"
    >
      <!-- 轮播内容 -->
      <cube-slide-item v-for='(i, index) in swipeList' :key='index'>
        <div @click="goDetail(i.url)">
          <img loading="lazy" :src="i.titleImg" alt="">
        </div>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class headers extends Vue {
  @Prop({ default: [] }) private swipeList!: Array<Object>
  private value = null

  private changePage () {}

  private goDetail (url: string) {
    this.$router.push({
      path: url
    })
  }
}
</script>
<style lang="stylus" scoped>
.swipe
  height 100%
  width 100%
  background #eee
  .cube-slide
    height 100%
    width 100%
    .cube-slide-item
      height 100%
      width 100%
      img
        height 100%
        width 100%
</style>
