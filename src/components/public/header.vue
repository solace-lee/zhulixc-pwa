<template>
  <div class="header">

    <!-- 搜索型样式 -->
    <div class="header_search">
      <div class="search_area">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ai241"></use>
        </svg>
        <show-address></show-address>
        <cube-input v-model="value" disabled></cube-input>
      </div>
    </div>

    <!-- 标题型样式 -->
    <div class="header_title">
      <div class="title_area"></div>
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
  @Prop({ default: false }) private isActive!: boolean;
  private value = null
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  background: #00ae87;
  height: 4.8rem;
}

//搜索型样式
.header_search {
  width: 100%;
  height: 100%;
  .search_area {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      color: #000;
    }
    .cube-input {
      width: 70%;
      height: 80%;
      background: #fff;
      border-radius: 2rem;
      overflow: hidden;
    }
  }
  
}
</style>
