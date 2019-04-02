<template>
  <div class="home">
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import http from '@/config/http.ts'
import { apis } from '@/config/apis.ts'

@Component({
  components: {
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
