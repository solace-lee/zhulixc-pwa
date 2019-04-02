<template>
  <div class="home">
    <show-address></show-address>
    主页
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import http from '@/config/http.ts'
import { apis } from '@/config/apis.ts'
import showAddress from '@/components/home/showAddress.vue'

@Component({
  components: {
    showAddress
  }
})

export default class Home extends Vue {
  name: string = 'Home'
  created () {
    this.getdata()
  }

  getdata (): void {
    http.get(apis.ads).then(res => {
      console.log(123)
    })
  }
}
</script>
<style lang="less" scoped>
.home{
  font-size: 40px;
  height: 50px;
  width: 100px;
  background: #eee;
}
</style>
