<!--脚部总组件 -->
<template>
  <div class="foot">
    <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop=false
          :initial-index="initialIndex"
          :auto-play=false
          :show-dots=false
          :options="slideOptions"
          @change="changePage"
        >
          <!-- 首页 -->
          <cube-slide-item>
            <home></home>
          </cube-slide-item>
          <!-- 分类 -->
          <cube-slide-item>
            <classify></classify>
          </cube-slide-item>
          <!-- 购物车 -->
          <cube-slide-item>
            <car></car>
          </cube-slide-item>
          <!-- 我的 -->
          <cube-slide-item>
            <me></me>
          </cube-slide-item>
        </cube-slide>
      </div>
      <div class="foot_bar">
        <cube-tab-bar
          v-model="index"
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
import home from './home/Home.vue'
import car from './car/Car.vue'
import classify from './classify/Classify.vue'
import me from './me/Me.vue'

@Component({
  components: {
    home,
    classify,
    car,
    me
  }
})

export default class foot extends Vue {
  // 变量
   index: string = 'home'
   openInfo= {}
      subjectInfo= []
      selectList= []
      selectExamList= []
      examNumber= []
      show= false
      subjectShow= false
      studentListShow= false
      initialIndex:Number= 0
      slideOptions= {
        listenScroll: true,
        probeType: 4,
        directionLockThreshold: 0
      }

  // 方法
  clickHandler (label:string) : void {
    console.log(label)
    
  }
  private changeHandler (label:string) {
    //  监听导航栏改变事件
      switch (label) {
        case 'home':
          this.initialIndex = 0
          break
        case 'classify':
          this.initialIndex = 1
          break
        case 'car':
          this.initialIndex = 2
          break
        case 'me':
          this.initialIndex = 3
          break
      }
  }
  private changePage () {
  }
}
</script>
<style lang="less" scoped>
.foot {
  width: 100%;
  height: 100%;
  .foot_bar {
    width: 100%;
    height: 4.8rem;
    position: fixed;
    bottom:0;
    font-size:1.2rem;
    background-color: #eee;
    .icon{
    font-size:1.8rem;
    margin-bottom:0.6rem;
    }
    .cube-tab_active{
      color:#00ae87;
    }
  }
}

</style>
