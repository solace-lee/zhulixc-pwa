<!-- 登录，注册，找回密码表单 -->
<template>
  <div class="forms">
      <div class="data">
        <div
          class="li"
          v-for="(item,index) in siYuan"
          :key="index"
          :class="{ active:index==isActive }"
          @click="changeValue(index)"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icons"></use>
          </svg>
          <cube-input
            v-if="item.name==='用户名/手机号'"
            v-model="ReginForm.userPhone"
            :placeholder="item.name"
            :type="item.type"
            :clearable="clearable"
            autocomplete="true"
          ></cube-input>
          <cube-input
            v-if="item.name==='请输入密码' || item.name==='确认密码'"
            v-model="ReginForm.userPwd"
            :placeholder="item.name"
            :type="item.type"
            :clearable="clearable"
            :eye="eye"
          ></cube-input>
          <cube-input
            v-if="item.name==='新密码'"
            v-model="ReginForm.userPwd1"
            :placeholder="item.name"
            :type="item.type"
            :clearable="clearable"
            :eye="eye"
          ></cube-input>
          <cube-input
            v-if="item.name==='请输入短信验证码'"
            v-model="ReginForm.code"
            :placeholder="item.name"
            :type="item.type"
            :clearable="clearable"
          ></cube-input>
          <cube-input
            v-if="item.name==='请输入推荐码(选填)'"
            v-model="ReginForm.referralCode"
            :placeholder="item.name"
            :type="item.type"
            :clearable="clearable"
          ></cube-input>
          <div v-if="item.name==='请输入短信验证码' " class="time">
            <span  v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
            <span  v-show="!sendAuthCode">
              <span>剩余{{authTime}}</span> 秒
            </span>
          </div>
        </div>
        <div class="city"  v-if="name == 'register'">
          <div class="c_text">
            <span>区域信息</span>
          </div>
          <div>
            <select class="select" name="选择省份" id="Province" v-model="ReginForm.provinceId" @change="getCity">
              <option :value="-1">省份</option>
              <option
                v-for="(item,index) in provinceList"
                :key="index"
                :value="item.provinceId"
              >{{item.provinceName}}</option>
            </select>

            <span class="c_span"></span>

            <select class="select" name="选择城市" id="City" v-model="ReginForm.cityId" @change="getDistrict">
              <option :value="-1">城市</option>
              <option
                v-for="(item,index) in cityList"
                :key="index"
                :value="item.cityId"
              >{{item.cityName}}</option>
            </select>

            <span class="c_span"></span>

            <select class="select" name="选择地区" id="District" v-model="ReginForm.districtId">
              <option :value="-1">地区</option>
              <option
                v-for="(item,index) in districtLite"
                :key="index"
                :value="item.districtId"
              >{{item.districtName}}</option>
            </select>
          </div>
        </div>
        <cube-button class="btn" @click="submit" >{{name | filterName}}</cube-button>
        <div class="nu_agreement"  v-if="name == 'register'">
          <cube-checkbox v-model="checkBox" shape="square" class="nu_agreement_checkBox" label=' '></cube-checkbox>
           <div class="nu_a_text">
              <span>已阅读并同意一下协议</span>
              <span @click="getAgreement('41', '助力乡村注册协议')">《助力乡村注册协议》</span>
              <span @click="getAgreement('44', '助力乡村法律声明协议')">《助力乡村法律声明协议》</span>
              <span @click="getAgreement('45', '助力乡村隐私协议')">《助力乡村隐私协议》</span>
            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit} from 'vue-property-decorator'
import { GetRequest } from '@/config/request.ts'
import { Dialog } from '@/config/Dialog.ts'
import utils from '@/config/utils.ts'
import { apis } from '@/config/apis.ts'

@Component({
  components: {},
  // 过滤器
  filters: {
    filterName (value: string) {
      if (value === 'login') {
        return '登录'
      } else if (value === 'register') {
        return '立即注册'
      } else {
        return '找回密码'
      }
    }
  }
})
export default class forms extends Vue {
  @Prop({ default: '' }) private name!: string // 父传过来的值
  private ReginForm: any = {} // 提交列表
  private siYuan: any = [] // form列表
  private provinceList: Array<object> = [] // 省份列表
  private cityList: Array<object> = [] // 城市列表
  private districtLite: Array<object> = [] // 地区列表
  private isActive: Number = -1 // 控制样式变绿
  private sendAuthCode: boolean = true // 发送验证码倒计时转换
  private authTime: any = 0 // 倒计时
  private checkBox: boolean = false // 是否同意
  private clearable:object = { // 密码框显示
    visible: true,
    blurHidden: true
  }
  private eye: object = {
    open: false,
    reverse: false
  }
  created () {
    this.getDate()
  }
  // 方法
  // 初始化列表-按需导入不同表单
  private getDate () {
    switch (this.name) {
      case 'login':
        this.ReginForm = {
          userPhone: '',
          userPwd: ''
        }
        this.siYuan = [
          {
            icons: '#icon-icon_signal',
            name: '用户名/手机号',
            type: 'text'
          },
          {
            icons: '#icon-icon_collect',
            name: '请输入密码',
            type: 'password'
          }
        ]
        break
      case 'register':
        this.ReginForm = {
          userPhone: '',
          userPwd: '',
          referralCode: '',
          code: '',
          provinceId: -1,
          cityId: -1,
          districtId: -1
        }
        this.siYuan = [
          {
            icons: '#icon-icon_signal',
            name: '用户名/手机号',
            type: 'text'
          },

          {
            icons: '#icon-icon_likegood',
            name: '请输入短信验证码',
            type: 'string'
          },
          {
            icons: '#icon-icon_collect',
            name: '请输入密码',
            type: 'password'
          },
          {
            icons: '#icon-icon_discovery',
            name: '请输入推荐码(选填)',
            type: 'text'
          }
        ]
        break
      case 'passWord':
        this.ReginForm = {
          userPhone: '',
          userPwd1: '',
          userPwd: '',
          code: ''
        }
        this.siYuan = [
          {
            icons: '#icon-icon_signal',
            name: '用户名/手机号',
            type: 'text'
          },
          {
            icons: '#icon-icon_collect',
            name: '新密码',
            type: 'password'
          },
          {
            icons: '#icon-icon_collect',
            name: '确认密码',
            type: 'password'
          },
          {
            icons: '#icon-icon_likegood',
            name: '请输入短信验证码',
            type: 'text'
          }
        ]
        break
      default:
        break
    }
  }
  // input高亮
  private changeValue (index: Number) {
    this.isActive = index
  }
  // 验证
  private getAuthCode () {
    if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.ReginForm.userPhone)) {
      return this.Toast('请输入正确手机号', 'error', 1000, true)
    }
      let pws = utils.encrypt(this.ReginForm.userPwd)
      let url = ''
    if (this.name === 'register') {
      url = apis.codeRegistered
    } else {
      url = apis.retrieve
    }
    this.getRequest.getCode(pws, url, (res: any) => {
      if (res.data.status === 200) {
        this.Toast('验证码已发送', 'text', 1000, true)
        this.timeOut()
      } else {
        this.Toast(res.data.msg, 'error', 1000, true)
      }
    })
  }
  // 设置倒计时秒
  private timeOut () {
    this.sendAuthCode = false
    this.authTime = 60
    var authTimetimer = setInterval(() => {
      this.authTime--
      if (this.authTime <= 0) {
        this.sendAuthCode = true
        clearInterval(authTimetimer)
      }
    }, 1000)
  }
  // 获取省份
  private getProvince () {
    console.log(123)
  }
  // 获取城市
  private getCity () {
    this.ReginForm.cityId = -1
    this.ReginForm.districtId = -1
    this.cityList = []
    this.districtLite = []
    console.log(123)
  }
  // 获取地区
  private getDistrict () {
    this.ReginForm.districtId = -1
    this.districtLite = []
    console.log(123)
  }
  // 获取协议
  private getAgreement (id: string, name: string) {
    this.getRequest.checkAgreement(id, (res: any) => {
      if (res.data.status === 200) {
        this.$createDialog({
          content: res.res.data.data.articleContent,
          title: name,
          type: 'alert',
        }).show()
      }
    })
  }
  @Emit ('submitData') send (reginForm: any) {}
  private submit () {
    // 判断必须的form项
    if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.ReginForm.userPhone)) {
      return this.Toast('请输正确入手机号', 'error', 1000, true)
    } else if (this.ReginForm.userPwd.length < 6 || this.ReginForm.userPwd.length > 16) {
      return this.Toast('请填写6-16位密码', 'error', 1000, true)
    } else if (this.ReginForm.code) {
      if (!this.ReginForm.code.length) {
        return this.Toast('请输入验证码', 'error', 1000, true)
      }
    }
    if (this.name === 'register') {
      if (this.ReginForm.provinceId === -1) {
        return this.Toast('请选择省份', 'error', 1000, true)
      } else if (this.ReginForm.cityId === -1) {
        return this.Toast('请选择城市', 'error', 1000, true)
      } else if (this.ReginForm.districtId === -1) {
        return this.Toast('请选择地区', 'error', 1000, true)
      } else if (this.checkBox) {
        return this.Toast('请确认同意注册等协议', 'error', 1000, true)
      }
    } else if (this.name === 'passWord') {
       if (this.ReginForm.userPwd !== this.ReginForm.userPwd1) {
        return this.Toast('2次输入的密码不同', 'error', 1000, true)
      } 
    }
    this.send(this.ReginForm)
  }
}
</script>
<style lang="stylus" scoped>
* { touch-action: none; }
.forms
  width 100%
  height 100%
  input
    width 100%
  .data
    width 100%
    padding 0rem 3.6rem
    .li
      width 100%
      margin-top 1rem
      padding-left 1rem
      line-height 3.5rem
      border-bottom solid 1px #fff
      font-size 1.6rem
      color #fff
      margin-bottom 1.5rem
      display flex
      align-items center
      .icon
        vertical-align middle
        font-size 2rem
        margin-right 1rem
      .cube-inputafter
        border none
      .cube-input
        width 100%
        background none
        font-size 1.6rem
        >.cube-input-field
          color #fff
      .cube-inpu_active
        border none
      .getCode
        width 6%
        height 2rem
        display inline-block
        background-size 100% 100%
      .auth_input
        width 50%
        border-right 1px solid #ccc
        border-radius 0px
        vertical-align middle
      .time
        width 70%
        text-align center
        vertical-align middle
        color #00ae87
    .active
      border-bottom solid 1px #00ae87
      color #00ae87
    .select
      width 30%
      height 2.2rem
      line-height 2.2rem
      background none
      color #fff
      font-size 1.3rem
      text-align center
    .city
      font-size 1.6rem
      margin-bottom 1.5rem
      .c_text
        color #00ae87
        margin-bottom 0.4rem
      .c_span
        display inline-block
        width 1.2rem
        height 0.1rem
        background-color #999
        vertical-align middle
    .btn
      width 100%
      text-align center
      background-color #0bb794
      color #fff
      font-size 1.5rem
      border-radius 5px
      margin-top 2.5rem
    .nu_agreement
      width 100%
      margin-top 1rem
      display flex
      justify-content flex-start
      align-items center
      .nu_agreement_checkBox
        padding 0
        font-size 1.4rem
      .nu_a_text
        color #999
        font-size 1.28rem
        line-height 20px
        span
          display inline-block
</style>
