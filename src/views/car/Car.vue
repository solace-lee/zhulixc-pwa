<!-- 购物车 -->
<template>
  <div class="car">
    <div>
      <headers :title="headerList.title" :status="headerList.status" :complete="headerList.complete"></headers>
    </div>
    <div class="header_title" v-if="changeNothing"></div>

    <!-- 列表 -->
    <something :goodslist="list"></something>

    <!-- 空购物车 -->
    <nothing  v-if="!changeNothing"></nothing>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop ,Watch } from 'vue-property-decorator'
import { GetRequest } from '@/config/request.ts'
import foot from '@/components/public/foot.vue'
import headers from '@/components/public/header.vue'
import something from '@/components/car/something.vue'
import nothing from '@/components/car/nothing.vue'

@Component({
  components: {
    foot,
    headers,
    something,
    nothing
  }
})

export default class car extends Vue {
 foot: String = 'car'
  headerList: any = {
    title: '购物车',
    status: 'isCar',
    complete: true
  }
  private list: Array<object> = []//数据列表
  private changeNothing: boolean = false//控制显示
  
   @Watch ('changeNothing')
    onChangeValue (newVal: boolean, oldVal: boolean ){
      console.log(newVal)
      if (newVal === false) {
        this.headerList.complete = false
      } else {
        this.headerList.complete = true
      }
  }
  created () {
    this.getdata()
  }
  private getdata () {
    // const toast = this.$createToast({
    //   txt: 'Loading...',
    //   mask: true
    // })
    const getRequest = new GetRequest()
    getRequest.getCar((res: any) => {
      if (res.data.status === 200) {
        if (res.data.data !== '') {
          res.data.data.items.forEach((item: any) => {
            this.$set(item, 'dos', false)
            this.$set(item, 'leaveMsg', '')
            item.cartList.forEach((i: any) => {
              this.$set(i, 'dos', false)
              this.$set(i, 'toVenture', false)
            })
          })
          this.list = res.data.data.items
          this.changeNothing = true
        } else {
          this.list = []
          this.changeNothing = false
        }
      } else {
        this.list = []
        this.changeNothing = true
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.car
  width 100%
  height 100%
  margin-top 4.8rem
  padding 3rem 0rem
  // 标题型样式
  .header_title
    width 100%
    height 13rem
    background-color #00ae87
    position absolute
    top 0rem
    z-index -1
</style>
