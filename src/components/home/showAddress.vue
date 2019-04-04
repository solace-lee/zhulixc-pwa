<template>
  <div class="show_address">
    <div class="city_name">{{cityName}}</div>
    <div class="line" v-show="cityName&&districtName"></div>
    <div class="district_name">{{districtName}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GetLocation } from '@/config/getLocation.ts'

@Component
export default class showAddress extends Vue {
  cityName: string = ''
  districtName: string = ''
  private created () {
    const arr = window.sessionStorage.getItem('city') || false
    if (arr !== false) {
      this.showInfo()
    } else {
      this.getAddress()
    }
  }

  private showInfo () {
    this.cityName = window.sessionStorage.getItem('city') || ''
    this.districtName = window.sessionStorage.getItem('district') || ''
  }

  private async getAddress () {
    const getInfo = new GetLocation()
    let info = await getInfo.location('ok')
    if (info === 'ok') {
      this.showInfo()
    } else {
      const toast = this.$createToast({
        txt: '定位失败请稍后再试',
        type: 'error',
        mask: false,
        time: 1000
      })
      toast.show()
    }
  }
}
</script>
<style lang="less" scoped>
.show_address {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  .line {
    border-left: 1px solid;
    margin: 0 .4rem;
    height: 1rem;
  }
}
</style>
