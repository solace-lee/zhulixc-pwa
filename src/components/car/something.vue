<!-- 购物车-列表 -->
<template>
  <div class="something">
    <div class="goods" v-for="(item,index) in goodslist" :key="index">
      <div class="goods_merchants">
        <van-checkbox
          v-model="item.dos"
          class="goods_merchants_checkbox"
          checked-color="#00ae87"
          @change="merchants(index)"
        ></van-checkbox>
        <div>
          <img :src="item.shopImgUrl" alt="加载失败，请稍后">
          <span @click="goIndexS(item.shopId)">{{item.shopName}}</span>
          <van-icon name="arrow" @click="goIndexS(item.shopId)"/>
        </div>
      </div>
      <div class="something" v-for="(goodsitem,goodsindex) in item.cartList" :key="goodsindex">
        <van-checkbox
          v-model="goodsitem.dos"
          class="something_checkbox"
          checked-color="#00ae87"
          @change="somethingChecked(index)"
        ></van-checkbox>
        <div class="something_img" @click="goGoods(goodsitem.commodityId)">
          <img :src="goodsitem.imgUrl" alt>
        </div>
        <div class="something_goods">
          <div class="jieshao">
            <span class="area" v-if="goodsitem.commodityArea == 1">生态市场</span>
            <span class="area" v-else-if="goodsitem.commodityArea == 2">一村一品</span>
            <span class="area orange" v-else-if="goodsitem.commodityArea == 3">会员专区</span>
            {{goodsitem.name}}
          </div>
          <div class="something_goods_jieshao">
            <div class="span">{{goodsitem.linkValue}}</div>
          </div>
          <div class="something_goods_num">
            <div class="goods_num_m">
              <span
                v-if="goodsitem.commodityArea == 0 "
              >￥{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
              <span
                v-if="goodsitem.commodityArea == 1"
                class="jjj"
              >生态价:￥{{(goodsitem.price*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
              <span
                v-if="goodsitem.commodityArea == 2 "
              >￥{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
              <span
                v-if="goodsitem.commodityArea == 3"
                class="jjj2"
              >会员价:￥{{(goodsitem.discountPrice*1000) * (goodsitem.commodityQuantity) /1000 | number}}</span>
            </div>
            <!-- 数量修改部分 -->
            <div class="goods_num_edit">
              <button
                @click="subNum(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity)"
              >-</button>

              <input
                type="number"
                v-model="goodsitem.commodityQuantity"
                class="num"
                @input="input(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity,goodsitem.num)"
              >

              <button
                @click="addNum(index,goodsindex,goodsitem.cartId,goodsitem.commodityQuantity,goodsitem.num)"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class something extends Vue {
  @Prop({ default: [] }) private goodslist!: Array<object>
  created () {
    this.getdata()
  }
  // 变量
  // private goodslist: Array<object> =[]
  // 方法
  private getdata () {
    // console.log('car')
  }
  // 回退到上一页
  private goBack () {
    this.$router.go(-1)
  }
}
</script>
<style lang="stylus" scoped>
.something {
  .goods {
      margin: 0rem 1.2rem 1.6rem 1.2rem;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0.1rem 0.4rem 0.6rem #e8e8e8;
      /* 商家 */
      .goods_merchants {
        display: flex;
        align-items: center;
        padding-top: 1rem;
        margin-bottom: 1rem;
        padding-left: 2rem;
        font-size: 1.2rem;
        font-weight: normal;
        font-stretch: normal;
        .goods_merchants_s {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          div {
            flex: 1;
          }
          :last-child {
            text-align: right;
            padding-right: 1rem;
            color: #00ae87;
          }
        }
        .goods_merchants_checkbox {
          margin-right: 1.6rem;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          margin-left: 1rem;
        }
        img {
          width: 2rem;
          height: 2rem;
          margin-right: 0.8rem;
        }
      }
      /* 商品 */
      .something {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 10rem;
        padding-bottom: 2rem;
        .something_checkbox {
          margin: 0 2rem;
          margin-right: 1.5rem;
        }
        .something_tig {
          margin: 0 2rem;
          margin-right: 0.4rem;
          background-color: #ccc;
          color: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
        }
        .something_img {
          flex: 2;
          width: 9.2rem;
          // height: 8rem;
          height: 100%;
          margin-right: 1.6rem;
          background-size: contain;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
          }
        }
        .something_goods {
          flex: 4;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .jieshao {
            font-size: 1.2rem;
            padding-right: 1rem;
            // 只显示1行
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            // display: flex;
            // align-items: center;
            .area {
              padding: 0rem 0.4rem;
              background-color: #00ae87;
              border-radius: 1rem;
              color: #fff;
              margin-right: 0.2rem;
              font-size: 1.1rem;
              height: 1.6rem;
              overflow: hidden;
              // line-height: 1.4rem;
            }
            .orange {
              background: #fd8320;
            }
          }
          .something_goods_jieshao {
            // flex: 1;
            width: 100%;
            // margin-top: 0.2rem;
            .span {
              display: inline-block;
              font-size: 1.1rem;
              padding: 0.3rem 0.6rem;
              color: #767676;
              background-color: #f2f2f2;
            }
          }
          .something_goods_num {
            // flex: 1;
            width: 100%;
            display: flex;
            font-size: 1.5rem;
            padding-right: 0.8rem;
            .goods_num_m {
              height: 100%;
              flex: 2;
              color: #00ae87;
              font-size: 1.3rem;
              display: flex;
              flex-direction: column-reverse;
              align-items: top;
              // span {
              // }
              .jjj {
                font-size: 1.2rem;
                color: #ff0000;
              }
              .jjj2 {
                font-size: 1.2rem;
                color: #fd8320;
              }
            }
            .goods_num_edit {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              button {
                height: 90%;
                font-size: 1.8rem;
                background-color: #fff;
              }
              .num {
                margin: 0rem 0.5rem;
                width: 3rem;
                height: 2rem;
                font-size: 1.3rem;
                background-color: #eee;
                text-align: center;
              }
            }
            .goods_search {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #00ae87;
              border: 0.1rem solid #00ae87;
              border-radius: 2rem;
              font-size: 1.4rem;
            }
          }
        }
      }
    }
}
</style>
