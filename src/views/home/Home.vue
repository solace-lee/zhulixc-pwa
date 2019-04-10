<template>
  <div class="home">
    <!-- 头部 -->
    <headers :status="headerStatus"></headers>

    <!-- 轮播图 -->
    <swipe :swipeList="swipeList"></swipe>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">新品推荐</div>
      </div>
    </div>

    <!-- 新品推荐 -->
    <div class="new_product">
      <div class="product_area">
        <div class="new_product_area" v-for="(i, index) in newProduct" :key="index">
          <new-product :newProduct="i"></new-product>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title white_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">品质推荐</div>
      </div>
    </div>

    <!-- 品质推荐 -->
    <div class="tone_product">
      <div class="tone_area">
        <div class="tone_product_area" v-for="(i, index) in toneProduct" :key="index" @click="goDetail(toneProduct.commodityId)" v-show="index === 0">
          <div class="a_left">
            <div class="a_titel">{{i.name}}</div>
            <div class="a_name">{{i.title}}</div>
            <div class="a_info">
              <div class="a_now_price">￥{{i.discountPrice}}</div>
              <s class="a_old_price">￥{{i.originalPrice}}</s>
              <div class="a_buy_now">立即购买</div>
            </div>
          </div>
          <div class="a_right">
            <img loading="lazy" :src="i.titleImg" alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- 标题 -->
    <div class="part_title">
      <div class="title_area">
        <div class="title_img"></div>
        <div class="title_txt">品牌推荐</div>
      </div>
    </div>

    <!-- 品牌推荐 -->
    <div class="brand_product">
      <div class="brand_area">
        <div class="brand_top" v-for="(i, index) in brandProduct" :key="index" v-show="index < 2">
          <img loading="lazy" :src="i.titleImg" alt="">
        </div>
        <div class="brand_bottom" v-for="(j, index) in brandProduct" :key="index" v-show="index > 1">
          <img loading="lazy" :src="j.titleImg" alt="">
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <div style="height:5rem;"></div>

    <!-- 脚部 -->
    <foot :foot="foot"></foot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GetRequest } from '@/config/request.ts'
import headers from '@/components/public/header.vue'
import foot from '@/components/public/foot.vue'
import swipe from '@/components/home/swipe.vue'
import newProduct from '@/components/home/newProduct.vue'
import toneProduct from '@/components/home/toneProduct.vue'

@Component({
  components: {
    headers,
    foot,
    swipe,
    newProduct,
    toneProduct,
  }
})
export default class Home extends Vue {
  foot: String = 'home'
  headerStatus: string = 'isSearch' // header的显示方式
  swipeList: Array<Object> = [] // 轮播数据
  newProduct: Array<Object> = [] // 新品推荐数据
  toneProduct: Array<Object> = [] // 品质推荐数据
  brandProduct: Array<Object> = [] // 品牌推荐数据

  created () {
    this.getdata()
  }

  private getdata () {
    const getRequest = new GetRequest()
    getRequest.getAds((res: any) => {
      if (res.data.status === 200) {
        console.log(res.data)
        // 轮播数据
        this.swipeList = res.data.data.f1
        // 新品推荐数据
        this.newProduct = res.data.data.f2
        // 品质推荐数据
        this.toneProduct = res.data.data.f3
        // 品牌推荐数据
        this.brandProduct = res.data.data.f4
      } else {
        this.Toast('数据获取失败请稍后再试', 'error')
      }
    })
  }
}
</script>
<style lang="less" scoped>
.home {
  // background: #eee;
  width: 100VW;
  overflow: hidden;
}

.swipe{
  margin-top: 4.8rem;
}

// 标题
.part_title {
  width: 100%;
  height: 4.5rem;
  padding: 0 1.5rem;
  background: #f2f2f2;
  .title_area {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .title_img {
      height: 2rem;
      width: 0.6rem;
      background: #00ae87;
      border-radius: 0.3rem;
      margin-right: 1rem;
    }
    .title_txt {
      font-size: 2rem;
      color: #666;
    }
  }
}
.white_title {
  background: #fff;
}

// 新品推荐
.new_product {
  height: 17.5rem;
  width: 100%;
  background: #f2f2f2;
  overflow: hidden;
  .product_area {
    // height: 16rem;
    display: flex;
    overflow-x: scroll;
    .new_product_area {
      width: 12rem;
      height: 16rem;
      margin-left: 1.5rem;
    }
  }
}

// 品质推荐
.tone_product {
  .tone_area {
    .tone_product_area {
      width: 100%;
      height: 12.3rem;
      padding: 1.5rem;
      display: flex;
      border-radius: 6px;
      overflow: hidden;
      .a_left {
        width: 50%;
        height: 100%;
        background: #f2f2f2;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .a_titel {
          font-size: 1.5rem;
        }
        .a_name {
          font-size: 1rem;
          color: #333;
        }
        .a_info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          .a_now_price {
            font-size: 1.8rem;
            color: #00ae87;
          }
          .a_old_price {
            font-size: 0.9rem;
            color: #666;
          }
          .a_buy_now {
            font-size: .8rem;
            color: #fff;
            padding: .4rem .8rem;
            background: #00ae3a;
            border-radius: 2rem;
          }
        }
      }
      .a_right {
        width: 50%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

// 品牌推荐
.brand_product {
  background: #f2f2f2;
  height: auto;
  width: 100%;
  padding: 0 1.5rem 1.5rem 1.5rem;
  .brand_area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .brand_top {
      width: 49%;
      height: 10.3rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .brand_bottom {
      width: 24%;
      height: 12rem;
      margin-top: .6rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
