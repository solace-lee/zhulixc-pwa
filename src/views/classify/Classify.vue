<!-- 分类 -->
<template>
  <div class="classify">
    分类
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
export default class classify extends Vue {
  foot: String = 'classify'
  created () {
    this.getdata()
  }

  private getdata () {
    // console.log('classify')
  }
}
</script>
<style lang="stylus" scoped>
.classify
  background #eee

</style>
