<!-- 购物车-列表 -->
<template>
  <div class="something">
    <div class="goods" v-for="(item,index) in goodslist" :key="index">
      <div class="goods_merchants">
        <cube-checkbox
          v-model="item.dos"
          class="goods_merchants_checkbox"
          @change="merchants(index)"
          label=' '></cube-checkbox>
        <div class="goods_merchants_name">
          <img :src="item.shopImgUrl" alt="加载失败，请稍后" class="name_img">
          <div class="name_name" @click="goIndexS(item.shopId)">{{item.shopName}}</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_next_arrow"></use>
          </svg>
        </div>
      </div>
      <div class="something" v-for="(goodsitem,goodsindex) in item.cartList" :key="goodsindex">
        <cube-checkbox
        class="something_checkbox"
        v-model="goodsitem.dos"
        @change="somethingChecked(index)"
        label=' '></cube-checkbox>
        <div class="something_img" @click="goGoods(goodsitem.commodityId)">
          <img :src="goodsitem.imgUrl" alt>
        </div>
        <div class="something_goods">
          <div class="s_g_name">
            <span
              class="area"
              :class="{orange:goodsitem.commodityArea == 3}">
            {{goodsitem.commodityArea | areaName}}
            </span>
            {{goodsitem.name}}
          </div>
          <div class="s_g_specification">
            <div class="s_g_s_span">{{goodsitem.linkValue}}</div>
          </div>
          <div class="something_goods_num">
            <div class="goods_num_m">
              <span
                :class="{jjj:goodsitem.commodityArea == 1, jjj2:goodsitem.commodityArea == 3}"
              >
              {{goodsitem.commodityArea | areaPriceName}}{{sumPrice(goodsitem.discountPrice, goodsitem.commodityQuantity) | number}}
              </span>
            </div>
            <!-- 数量修改部分 -->
            <div class="goods_num_edit">
              <cube-button
                class="g_n_e_button"
                @click="subNum(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity)"
              >-</cube-button>

              <input
                type="number"
                v-model="goodsitem.commodityQuantity"
                class="num"
                @input="input(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity,goodsitem.num)"
              >

              <cube-button
                class="g_n_e_button"
                @click="addNum(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity,goodsitem.num)"
              >+</cube-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算部分 -->
    <div class="goods_footer">
      <cube-checkbox
        class="g_f_checkBox"
        v-model="togoAllChecked"
        @change="togoAll"
        label=' '>
      全选
      </cube-checkbox>
      <!-- v-show="!carEdit" -->
      <div class="g_f_edit">
        <div class="momey">
          <div>合计</div>
          <div class="gf_momey">
            <span style="font-size:1.2rem">￥</span>
            <span class="gf_momey_num"> {{total | number}}</span>
            <!-- <span style="font-size : 1.2rem">{{total | number2}}</span> -->
          </div>
        </div>
      </div>
      <div class="gf_pay flex">
        <div>结算({{all.length}})</div>
        <!-- <button @click="postTotal">结算({{total | number}})</button> -->
      </div>
      <!-- <div class="gf_pay flex">
        <div>删除</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component({
  components: {
  },
  filters: {
    // 过滤金额，保留2位小数
    number: function(data: any) {
      return data.toFixed(2);
      // return parseInt(data);
    },
    areaName: function (data: any) {
      switch (data) {
        case 1:
          return '生态市场'
          break
        case 2:
          return '一村一品'
          break
        case 3:
          return '会员专区'
          break
        default:
          break
      }
    },
    areaPriceName: function (data: any) {
      switch (data) {
        case 0:
          return '￥'
          break
        case 1:
          return '生态价:￥'
          break;
        case 2:
          return '￥'
          break
        case 3:
          return '会员价:￥'
          break
        default:
          break
      }
    }
     // number2: function(data: any) {
    //   let num = parseFloat((data - parseInt(data)) * 100).toFixed(0);
    //   if (num < 10) {
    //     num = "0" + num;
    //     return num;
    //   } else {
    //     return num;
    //   }
    // }
  },
})
export default class something extends Vue {
  @Prop({ default: [] }) private goodslist!: any
  created () {
    this.getdata()
  }
  // 变量
  private total = 0 // 总价
  private togoAllChecked = false // 全选按钮
  private all = [] //需要购买的商品数量

  // private goodslist: Array<object> =[]
  // 方法
  private getdata () {
    // console.log('car')
  }
  private sumPrice (price: any, number: any) {
    return (price*1000) * (number) /1000
  }
  // 回退到上一页
  private goBack () {
    this.$router.go(-1)
  }
  // 全选
  private togoAll() {
      const togoAllChecked = this.togoAllChecked;
      const checked = this.goodslist.every((item: any) => item.dos);
      this.goodslist.forEach((item: any) => {
        if (togoAllChecked) {
          return (item.dos = true);
        } else if (checked) {
          return (item.dos = false);
        }
      });
      // this.getTotal();
    }
}
</script>
<style lang="stylus" scoped>
.something
  .goods
    margin 0rem 1.2rem 1.6rem 1.2rem
    background-color #fff
    border-radius 1rem
    box-shadow 0.1rem 0.4rem 0.6rem #e8e8e8
      /* 商家 */
    .goods_merchants
      display flex
      align-items center
      padding 1rem 0 0 2rem
      margin-bottom 1rem
      font-size 1.2rem
      .goods_merchants_checkbox
        padding 0
        font-size 1.6rem
        .cube-checkbox-input
          width 2rem
          height 2rem
        // margin-right 1.6rem
      .goods_merchants_name
        flex 1
        display flex
        justify-content flex-start
        align-items center
        .name_img
          width 2.4rem
          height 2.4rem
          margin-right 0.8rem
        .name_name
          margin-right 1rem
      /* 商品 */
    .something
      height 10rem
      width 100%
      padding-left 2rem
      display flex
      justify-content flex-start
      align-items center
      padding-bottom 2rem
      .something_checkbox
        padding 0
        font-size 1.6rem
      .something_img
        flex 2
        width 9.2rem
        // height 8rem
        height 100%
        margin-right 1.6rem
        background-size contain
        img
          width 100%
          height 100%
          border-radius 0.2rem
      .something_goods
        flex 4
        width 100%
        height 100%
        display flex
        flex-direction column
        justify-content space-between
        .s_g_name
          font-size 1.3rem
          padding-right 1rem
          line-height 1.3rem
          // 只显示1行
          text-overflow -o-ellipsis-lastline
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
          -webkit-box-orient vertical
          .area
            padding 0rem 0.4rem
            background-color #00ae87
            border-radius 1rem
            color #fff
            margin-right 0.2rem
            font-size 1.2rem
            height 1.6rem
            overflow hidden
            // line-height 1.4rem
          .orange
            background #fd8320
        .s_g_specification
          width 100%
          .s_g_s_span
            display inline-block
            font-size 1.3rem
            padding 0.3rem 0.6rem
            color #767676
            background-color #f2f2f2
        .something_goods_num
          // flex 1
          width 100%
          display flex
          font-size 1.5rem
          padding-right 0.8rem
          .goods_num_m
            height 100%
            flex 2
            color #00ae87
            font-size 1.3rem
            display flex
            flex-direction column-reverse
            align-items top 
            .jjj
              font-size 1.2rem
              color #ff0000
            .jjj2
              font-size 1.2rem
              color #fd8320
          .goods_num_edit
            flex 1
            display flex
            justify-content center
            align-items center
            .g_n_e_button
              padding 0
              font-size 1.8rem
              background-color #00000000
              berder none
            .num
              margin 0rem 0.8rem
              width 3rem
              height 2rem
              font-size 1.3rem
              background-color #eee
              text-align center
  // 结算
  .goods_footer
    width 100%
    min-height 5rem
    padding-left 2rem
    font-size 1.6rem
    background-color #f6f6f6
    display flex
    align-items center
    position fixed
    bottom 5rem
    .g_f_checkBox
      flex 1
      padding 0
    .g_f_edit
      flex 1
      margin auto
      .momey
        width 100%
        display flex
        justify-content flex-end
        align-items center
        text-align right
        font-size 1.2rem
      .gf_momey
        text-align right
        color #00ae87
        margin-right 1.5rem
        .gf_momey_num
          display inline-block
          font-size 1.6rem
    .gf_pay
      flex 1
      text-align center
      background-color #00ae87
      white-space normal nowrap
      color #fff
      font-size 1.3rem
      height 4.7rem
      line-height 4.7rem
</style>
