<template>
  <div class="home">
    <headers></headers>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import http from '@/config/http.ts'
import { apis } from '@/config/apis.ts'
import { gateway } from '@/config/config.ts'
import headers from '@/components/public/header.vue'

@Component({
  components: {
    headers
  }
})
export default class Home extends Vue {
  name: string = 'Home'
  created () {
    this.getdata()
  }

  private getdata () {
    http.get(gateway.SEARCH + apis.ads).then(res => {
      // const toast = this.$createToast({
      //   txt: 'Loading...',
      //   mask: true
      // });
      // toast.show();
    })
  }
}
</script>
<style lang="less" scoped>
.home {
  background: #eee;
}
</style>
