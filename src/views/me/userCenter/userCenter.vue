<template>
  <div class="user_center">
    <!-- 头部 -->
    <headers
      :status="headerStatus"
      :backUrl="backUrl"
      :title="title"
      :bgColor="bgColor"
      :fontColor="fontColor"
      ></headers>

    <div class="info_area">

        <div class="info_item user_img">
          <div class="info_title">头像</div>
          <div class="info_right">
            <div class="info_detail">
              <img :src="userInfo.imgUrl" alt="">
            </div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="info_item" @click="changeNickName">
          <div class="info_title">昵称</div>
          <div class="info_right">
            <div class="info_detail">{{userInfo.nickname}}</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="info_item">
          <div class="info_title">等级</div>
          <div class="info_right">
            <div class="info_detail">Lv{{userInfo.userLevel}}助力乡村大使</div>
          </div>
        </div>

        <div class="info_item share_code">
          <div class="info_title">我的推荐码</div>
          <div class="info_right">
            <div class="info_detail">{{userInfo.referralCode}}</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="info_item">
          <div class="info_title">手机号码</div>
          <div class="info_right">
            <div class="info_detail">{{phone}}</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="info_item">
          <div class="info_title">所属区域</div>
          <div class="info_right">
            <div class="info_detail">{{provinceName}}{{cityName}}{{districtName}}</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="info_item">
          <div class="info_title">收货地址</div>
          <div class="info_right">
            <div class="info_detail"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="info_item change_psw">
          <div class="info_title">修改密码</div>
          <div class="info_right">
            <div class="info_detail"></div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon_next_arrow"></use>
            </svg>
          </div>
        </div>

        <div class="sign_out">
          <div class="out_btn" @click="showLoginOut">退出登录</div>
        </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import headers from '@/components/public/header.vue'
import utils from '@/config/utils.ts' // 加密解密
import { localName } from "@/config/location.ts" // 根据ID获取地名

@Component({
  components: {
    headers
  }
})
export default class userCenter extends Vue {
  headerStatus: string = 'onlyTtitle' // header的显示方式
  title: string = '个人资料'
  bgColor: string = '#fff'
  fontColor: string = '#333'
  backUrl: string = '/me' // 返回路径
  userInfo: any = {}
  phone: string = '' // 手机号码
  provinceName: string = ''
  cityName: string = ''
  districtName: string = ''


  created () {
    this.getdata()
  }

  private getdata () {
    // 获取用户信息
    this.getRequest.getUserInfo((res: any) => {
      this.userInfo = res.data
      this.phone = utils.decrypt(res.data.userPhone)
      this.getlocalName(res.data)
    })
  }

  //更改昵称
  private changeNickName () {
    this.dialog = this.$createDialog({
      type: 'prompt',
      title: '设置昵称',
      prompt: {
        value: '',
        placeholder: '请输入昵称'
      },
      onConfirm: (e: any, promptValue: string) => {
        if (promptValue === "") {
          this.Toast('昵称不能为空', 'error')
          return
        }
        const config = {
          nickname: promptValue
        }
        this.getRequest.changeNickName(config, (res: any) => {
          if (res.data.status === 200) {
            this.Toast('昵称已修改', 'correct', 1000)
            this.getdata()
          } else {
            this.Toast('修改失败请重试', 'warn', 1500)
          }
        })
      }
    }).show()
  }

  // 退出登录弹框
  private showLoginOut() {
    this.$createDialog({
      type: 'confirm',
      title: '确定退出登录吗',
      // content: '我是内容',
      icon: 'cubeic-alert',
      confirmBtn: {
        text: '确定退出',
        active: true,
        disabled: false,
        href: 'javascript:;'
      },
      cancelBtn: {
        text: '取消',
        active: false,
        disabled: false,
        href: 'javascript:;'
      },
      onConfirm: () => {
        this.signOut()
      },
      onCancel: () => {
        // 点击取消按钮动作
      }
    }).show()
  }

  // 退出登录
  private signOut () {
    this.getRequest.logOut((res: any) => {
      this.Toast('已退出登录', 'correct', 1500)
      localStorage.removeItem("token")
      setTimeout(() => {
        this.$router.replace({
          path: "/login"
        })
      }, 1000)
    })
  }

  private getlocalName (userInfo: any) {
    localName(userInfo.provinceId, userInfo.cityId, userInfo.districtId)
      .then((res: any) => {
        this.provinceName = res.provinceName
        this.cityName = res.cityName
        this.districtName = res.districtName
      });
  }

}
</script>
<style lang="stylus" scoped>
.user_center
  width 100%
  overflow hidden

.info_area
  width 100%
  margin-top 4.8rem
  display flex
  flex-direction column
  .info_item
    height 4.4rem
    padding-right 1rem
    padding-left 1.5rem
    width 100%
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #ffffff
    background #f5f5f5
    font-size 1.4rem
    .info_title
      color #333
    .info_right
      color #666
      display flex
      justify-content flex-end
      align-items center
      .icon
        color #999
        margin-left 1rem
  .share_code
    margin 1rem 0
  .change_psw
    margin-top 1rem
  .user_img
    height 5.5rem
    .info_detail
      height 5rem
      width 5rem
      border-radius 50%
      overflow hidden
      img
        width 100%
        height 100%

  // 退出按钮
  .sign_out
    position fixed
    bottom 3rem
    width 100%
    display flex
    justify-content center
    align-items center
    .out_btn
      width 28rem
      height 4.4rem
      font-size 1.6rem
      color #ffffff
      background #50bba7
      border-radius .6rem
      line-height 4.4rem
      text-align center

</style>
