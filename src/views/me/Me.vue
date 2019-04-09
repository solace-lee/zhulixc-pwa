<!-- 我的 -->
<template>
  <div class="me">
    我的
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
export default class me extends Vue {
  foot: String = 'me'
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
