<!-- 购物车 -->
<template>
  <div class="car">
    购物车
    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import foot from '@/components/public/foot.vue'

@Component({
  components: {
    foot
  }
})
export default class car extends Vue {
  foot: String = 'car'
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
