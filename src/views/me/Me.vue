<!-- 我的 -->
<template>
  <div class="me">

    <!-- 头像及背景 -->
    <div class="head_part">
      <div class="head_area">
        <div class="head_img" @click="goUserCenter">
          <img v-if="userInfo.imgUrl" :src="userInfo.imgUrl" alt="">
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_boss"></use>
          </svg>
        </div>
        <div class="user_name">{{userInfo.nickname}}</div>
      </div>
    </div>

    <!-- 我的订单部分 -->
    <div class="my_order_part">
      <div class="my_order_area">
        <div class="title_area">
          <div class="myorder">我的订单</div>
          <div class="view_all_order" @click="goOrderCenter(0)">
            <div class="all_order_text">查看全部</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="order_btn_area">

          <div class="order_item" @click="goOrderCenter(1)">
            <div class="order_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_cloud_history"></use>
              </svg>
              <div class="red_point" v-show="num1 != 0">{{num1}}</div>
            </div>
            <div class="item_name">待付款</div>
          </div>

          <div class="order_item" @click="goOrderCenter(2)">
            <div class="order_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_cloud_history"></use>
              </svg>
              <div class="red_point" v-show="num2 != 0">{{num2}}</div>
            </div>
            <div class="item_name">待发货</div>
          </div>

          <div class="order_item" @click="goOrderCenter(3)">
            <div class="order_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_cloud_history"></use>
              </svg>
              <div class="red_point" v-show="num3 != 0">{{num3}}</div>
            </div>
            <div class="item_name">待收货</div>
          </div>

          <div class="order_item" @click="goOrderCenter(4)">
            <div class="order_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_cloud_history"></use>
              </svg>
              <div class="red_point" v-show="num4 != 0">{{num4}}</div>
            </div>
            <div class="item_name">待评价</div>
          </div>

          <div class="order_item" @click="goAfterSalesCenter">
            <div class="order_icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_cloud_history"></use>
              </svg>
              <!-- <div class="red_point" v-show="num1 != 0">{{num1}}</div> -->
            </div>
            <div class="item_name">退货/售后</div>
          </div>

        </div>
      </div>
    </div>

    <!-- 其他功能 -->
    <div class="else_part">
      <div class="else_area">

        <div class="else_item">
          <div class="item_left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_camera"></use>
            </svg>
            <div class="else_title">我的钱包</div>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_next_arrow"></use>
          </svg>
        </div>

        <div class="else_item item_bottom">
          <div class="item_left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_camera"></use>
            </svg>
            <div class="else_title">养殖收获</div>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_next_arrow"></use>
          </svg>
        </div>

        <div class="else_item">
          <div class="item_left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_camera"></use>
            </svg>
            <div class="else_title">推广二维码</div>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_next_arrow"></use>
          </svg>
        </div>

        <div class="else_item">
          <div class="item_left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_camera"></use>
            </svg>
            <div class="else_title">我的店铺</div>
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_next_arrow"></use>
          </svg>
        </div>

      </div>
    </div>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import foot from '@/components/public/foot.vue'

@Component({
  components: {
    foot
  }
})
export default class me extends Vue {
  foot: String = 'me'
  userInfo: any = {
    imgUrl: ''
  }
  // 订单数量
  num1: any = 0
  num2: any = 0
  num3: any = 0
  num4: any = 0
  // 入驻状态
  isEnter: number = 0

  created () {
    this.getdata()
  }

  private getdata () {
    // 获取用户信息
    this.getRequest.getUserInfo((res: any) => {
      this.userInfo = res.data
    })

    // 获取订单条数
    this.getRequest.getOrderValue((res: any) => {
      this.isEnter = res.data.data.isEnter;
      const obj: any = res.data.data
      if (obj) {
        this.num1 = obj.waitPay
        this.num2 = obj.waitShipments
        this.num3 = obj.waitReceiving
        this.num4 = obj.waitEvaluate
        if (this.num1 > 99) {
          this.num1 = "99+";
        }
        if (this.num2 > 99) {
          this.num2 = "99+";
        }
        if (this.num3 > 99) {
          this.num3 = "99+";
        }
        if (this.num4 > 99) {
          this.num4 = "99+";
        }
      }
    })
  }

  // 去用户中心
  goUserCenter () {
    this.$router.replace({
      path: '/userCenter'
    })
  }

  // 去订单中心
  goOrderCenter (id: any) {
    sessionStorage.setItem('orderCenter', id)
    this.$router.replace({
      path: '/orderCenter'
    })
  }

  // 去售后中心
  goAfterSalesCenter () {
    this.$router.replace({
      path: '/afterSalesCenter'
    })
  }
}
</script>
<style lang="stylus" scoped>
.me
  background #f2f2f2
  width 100%
  height 100vh

// 头像及背景
.head_part
  height 50vw
  width 100%
  background #50bba7
  .head_area
    height 100%
    width 100%
    display flex
    flex-direction column
    justify-content center
    align-items center
    .head_img
      height 8rem
      width 8rem
      background #eee
      border-radius 50%
      overflow hidden
      img
        width 100%
        height 100%
      .icon
        font-size 8rem
        color #666
    .user_name
      color #fff
      font-size 1.6rem
      margin-top 2rem

// 我的订单部分
.my_order_part
  width 100%
  margin-top 1.5rem
  // height 13rem
  padding 0 1.5rem
  .my_order_area
    width 100%
    height 100%
    padding 0 1.5rem
    background #fff
    border-radius .6rem
    display flex
    flex-direction column
    justify-content space-between
    .title_area
      width 100%
      height 4.5rem
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #f2f2f2 /*no*/
      .myorder
        font-size 1.5rem
        line-height 4.5rem
        color #333
      .view_all_order
        display flex
        font-size 1.2rem
        color #999
        .all_order_text
          margin-right .6rem
    .order_btn_area
      width 100%
      height 8.5rem
      display flex
      justify-content space-between
      align-items center
      .order_item
        display flex
        flex-direction column
        align-items center
        justify-content center
        width 6.4rem
        height 7rem
        .order_icon
          position relative
          height 3rem
          width 3rem
          .icon
            height 100%
            width 100%
            color #00ae87
          .red_point
            position absolute
            right -.5rem
            top -.5rem
            padding .2rem .4rem
            border-radius .7rem
            background red
            color #fff
            font-size 1rem
        .item_name
          font-size 1.2rem
          color #666
          margin-top .2rem

// 其他功能
.else_part
  width 100%
  padding 1.5rem
  .else_area
    width 100%
    display flex
    flex-direction column
    .else_item
      height 4.5rem
      width 100%
      padding 0 1.5rem
      display flex
      justify-content space-between
      align-items center
      background #fff
      border-bottom 1px solid #f2f2f2 /*no*/
      .item_left
        display flex
        align-items center
        font-size 1.3rem
        .icon
          color #994900
        .else_title
          margin-left .8rem
    .item_bottom
      margin-bottom 1.5rem
</style>
