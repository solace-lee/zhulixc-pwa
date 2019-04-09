<template>
  <div class="header" ref="header">
    <!-- 搜索型样式 -->
    <div class="header_search" v-if="isSearch">
      <div class="search_area">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_GPS"></use>
        </svg>
        <show-address></show-address>
        <div class="search_box" @click="goSearch">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_search"></use>
          </svg>
          <input type="text" class="gosearch" disabled placeholder="更多好货助力">
          <!-- <cube-input v-model="value" disabled placeholder="更多好货助力"></cube-input> -->
        </div>
        <svg class="icon" aria-hidden="true" @click="goMsg">
          <use xlink:href="#icon-icon_dmail"></use>
        </svg>
      </div>
    </div>

    <!-- 标题型样式 -->
    <div class="header_title" v-if="!isSearch">
      <svg class="icon" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-icon_left"></use>
      </svg>
      <div class="title_area">{{title}}</div>
      <div class="right">
        <svg class="icon" aria-hidden="true" @click="goCar">
          <use xlink:href="#icon-icon_collect"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goMsg">
          <use xlink:href="#icon-icon_dmail"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import showAddress from '@/components/home/showAddress.vue';

@Component({
  components: {
    showAddress
  }
})
export default class headers extends Vue {
  @Prop({ default: true }) private isSearch!: boolean
  @Prop({ default: '标题' }) private title!: string
  @Prop({ default: '#00ae87' }) private bgColor!: string
  private value = null

  mounted () {
    // 根据传入值修改背景颜色
    this.changeBgColor();
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

  // 回退到上一页
  private goBack () {
    this.$router.go(-1)
  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  // background: #00ae87;
  height: 4.8rem;
}

// 搜索型样式
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
      flex: 1;
      font-size: 1.8rem;
    }
    .search_box {
      flex: 6;
      width: auto;
      margin: 0 0.6rem;
      height: 3.4rem;
      overflow: hidden;
      border-radius: 1.7rem;
      overflow: hidden;
      background: #fff;
      display: flex;
      align-items: center;
      .icon {
        color: #ccc;
        font-size: 1.6rem;
        flex: none;
        width: 3rem;
      }
      input {
        height: 100%;
        background: #fff;
      }
      .gosearch::placeholder {
        color: #ccc;
        font-size: 1.2rem;
        line-height: 3.4rem;
      }
    }
  }
}

// 标题型样式
.header_title {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  position: relative;
  .icon {
    font-size: 1.6rem;
    margin-left: 0.8rem;
  }
  .title_area {
    font-size: 1.8rem;
    position: absolute;
    height: 100%;
    width: 100%;
    line-height: 4.8rem;
  }
  .right {
    display: flex;
    align-items: center;
    .icon {
      font-size: 1.8rem;
      margin-left: 0;
      margin-right: 1.2rem;
    }
  }
}
</style>
