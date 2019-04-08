<!-- 购物车 -->
<template>
  <div class="car">
    购物车
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class car extends Vue {
  name: string = 'Home'
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
