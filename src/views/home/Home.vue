<template>
  <div class="home">
    <headers></headers>
    <swipe :swipeList="swipeList"></swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getRequest } from '@/config/request.ts'
import headers from '@/components/public/header.vue'
import swipe from '@/components/home/swipe.vue'

@Component({
  components: {
    headers,
    swipe
  }
})
export default class Home extends Vue {
  name: String = 'Home'
  swipeList: Array<Object> = []
  created () {
    this.getdata()
  }

  private getdata () {
    const GetRequest = new getRequest()
    GetRequest.getAds((res: any) => {
      console.log(res.data)
      this.swipeList = res.data.data.f1
    })
  }
}
</script>
<style lang="less" scoped>
.home {
  background: #eee;
}
</style>
