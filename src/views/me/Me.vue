<!-- 我的 -->
<template>
  <div class="me">
    我的
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class me extends Vue {
  created () {
    this.getdata()
  }

  private getdata () {
    // console.log('me')
  }
}
</script>
<style lang="less" scoped>
.me {
  background: #eee;
}
</style>
