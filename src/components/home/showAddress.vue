<template>
  <div class="show-address">
    <div class="city_name">{{cityName}}</div>
    <div class="district_name">{{districtName}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
export default class showAddress extends Vue {
  cityName:string = ''
  districtName:string = ''
  created () :void {
    
  } 
}
</script>
<style lang="less" scoped>

</style>

