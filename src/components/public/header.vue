<template>
  <div class="header">

    <!-- 搜索型样式 -->
    <div class="header_search" v-if="isSearch">
      <div class="search_area">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_GPS"></use>
        </svg>
        <show-address></show-address>
        <div class="search_box" @click.stop="goSearch">
          <cube-input v-model="value" disabled placeholder="更多好货助力"></cube-input>
        </div>
        <div class="icons">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_dmail"></use>
          </svg>
        </div>
      </div>
    </div>

    <!-- 标题型样式 -->
    <div class="header_title" v-if="!isSearch">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_left"></use>
      </svg>
      <div class="title_area">{{title}}</div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_collect"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
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
  @Prop({ default: true }) private isSearch!: boolean;
  @Prop({ default: '标题' }) private title!: string;
  private value = null

  private goSearch () {
    console.log('去搜索页')
  }

  private goMsg () {
    console.log('去消息页')
  }
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
    .icons {
      flex: 1;
      .icon {
        font-size: 1.8rem;
      }
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
      .cube-input {
        height: 100%;
        font-size: 1.2rem;
        line-height: 3.4rem;
        .cube-input-field::placeholder {
          font-size: 1.2rem;
        }
      }
    }
  }
}

//标题型样式
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
