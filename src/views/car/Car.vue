<!-- 购物车 -->
<template>
  <div class="car">
    <headers :title="headerList.title" :status="headerList.status" ></headers>
    购物车
    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import foot from '@/components/public/foot.vue'
import headers from '@/components/public/header.vue'

@Component({
  components: {
    foot,
    headers
  }
})
export default class car extends Vue {
  foot: String = 'car'
  headerList: object = {
    isSearch: false,
    title: '购物车',
    bgColor: '',
    status: 'isCar'
  }
  created () {
    this.getdata()
  }

  private getdata () {
    // console.log('car')
  }
}
</script>
<style lang="less" scoped>
.car {
  background: #eee;
}
</style>
