<!-- 分类 -->
<template>
  <div class="classify">
    分类
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class classify extends Vue {
  created () {
    this.getdata()
  }

  private getdata () {
    // console.log('classify')
  }
}
</script>
<style lang="less" scoped>
.classify {
  background: #eee;
}
</style>
