<!-- 注册 -->
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
          <input
            v-if="item.name==='用户名/手机号'"
            :type="item.type"
            v-model.number="ReginForm.userPhone"
            :placeholder="item.name"
          >
          <input
            v-if="item.name==='请输入密码' || item.name==='确认密码'"
            :type="item.type"
            v-model="ReginForm.userPwd"
            :placeholder="item.name"
          >
          <input
            v-if="item.name==='新密码'"
            :type="item.type"
            v-model="ReginForm.userPwd1"
            :placeholder="item.name"
          >
          <input
            v-if="item.name==='请输入短信验证码'"
            class="auth_input"
            :type="item.type"
            v-model="ReginForm.code"
            :placeholder="item.name"
          >
          <input
            v-if="item.name==='请输入推荐码(选填)'"
            :type="item.type"
            v-model="ReginForm.referralCode"
            :placeholder="item.name"
          >
          <span v-if="item.name==='请输入短信验证码' ">
            <span class="time" v-show="sendAuthCode" @click="getAuthCode">获取验证码</span>
            <span class="time" v-show="!sendAuthCode">
              <span>剩余{{auth_time}}</span> 秒
            </span>
          </span>
        </div>
        <div class="city"  v-if="name == 'news'">
          <div class="c_text">
            <span>区域信息</span>
          </div>
          <div>
            <select name="选择省份" id="Province" v-model="ReginForm.provinceId" @change="getCity">
              <option :value="-1">省份</option>
              <option
                v-for="(item,index) in provinceList"
                :key="index"
                :value="item.provinceId"
              >{{item.provinceName}}</option>
            </select>

            <span class="c_span"></span>

            <select name="选择城市" id="City" v-model="ReginForm.cityId" @change="getDistrict">
              <option :value="-1">城市</option>
              <option
                v-for="(item,index) in cityList"
                :key="index"
                :value="item.cityId"
              >{{item.cityName}}</option>
            </select>

            <span class="c_span"></span>

            <select name="选择地区" id="District" v-model="ReginForm.districtId">
              <option :value="-1">地区</option>
              <option
                v-for="(item,index) in districtLite"
                :key="index"
                :value="item.districtId"
              >{{item.districtName}}</option>
            </select>
          </div>
        </div>
        <cube-button class="btn" @click="submit" v-if="name == 'login'" >登录</cube-button>
        <cube-button class="btn" @click="submit" :disabled="!checkBox" v-if="name == 'news'">立即注册</cube-button>
        <cube-button class="btn" @click="submit" v-if="name == 'passWord'">找回密码</cube-button>
        <div class="nu_agreement"  v-if="name == 'news'"> 
          <cube-checkbox v-model="checkBox" shape="square" class="nu_agreement_checkBox" label=' '></cube-checkbox>
           <div class="nu_a_text">
              <span>已阅读并同意一下协议</span>
              <router-link :to="{ path: '/zhuce?name=注册协议'}" >《助力乡村注册协议》</router-link>
              <router-link :to="{ path: '/zhuce?name=法律声明协议'}" >《助力乡村法律声明协议》</router-link>
              <router-link :to="{ path: '/zhuce?name=隐私协议'}">《助力乡村隐私协议》</router-link>
            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { GetRequest } from '@/config/request.ts'

@Component({
  components: {}
})
export default class forms extends Vue {
  @Prop({ default: '' }) private name!: string
  private ReginForm: any = {
    // userPhone: "",
    // userPwd: "",
    // referralCode: "",
    // code: "",
    // provinceId: -1,
    // cityId: -1,
    // districtId: -1
  }
   
     private provinceList: Array<object> = []
     private cityList: Array<object> = []
     private districtLite: Array<object> = []
  private siYuan: any = [
    // {
    //   icons: "#icon-icon_signal",
    //   name: "用户名/手机号",
    //   type: "text"
    // },

    // {
    //   icons: "#icon-icon_likegood",
    //   name: "请输入短信验证码",
    //   type: "number"
    // },
    // {
    //   icons: "#icon-icon_collect",
    //   name: "请输入密码",
    //   type: "password"
    // },
    // {
    //   icons: "#icon-icon_discovery",
    //   name: "请输入推荐码(选填)",
    //   type: "text"
    // }
    // {
    //   class: "iconfont icon-mima1",
    //   name: "新密码",
    //   type: "password"
    // },
    // {
    //   class: "iconfont icon-mima1",
    //   name: "确认密码",
    //   type: "password"
    // },
  ]
  private isActive: Number = -1  // 控制样式变绿
  private sendAuthCode: boolean = true // 发送验证码倒计时转换
  private auth_time: any = 0 // 倒计时
  private checkBox: boolean = false //是否同意
  created () {
    this.getDate()
  }
  // 方法
  private getDate () {
    switch (this.name ) {
      case 'login':
      this.ReginForm = {
        userPhone:'' ,
        userPwd:''
      },
      this.siYuan = [
      {
        icons: "#icon-icon_signal",
        name: "用户名/手机号",
        type: "text"
      },
      {
        icons: "#icon-icon_collect",
        name: "请输入密码",
        type: "password"
      },
      ]
        break;
      case 'news':
      this.ReginForm = {
        userPhone: "",
        userPwd: "",
        referralCode: "",
        code: "",
        provinceId: -1,
        cityId: -1,
        districtId: -1
      },
      this.siYuan = [
        {
          icons: "#icon-icon_signal",
          name: "用户名/手机号",
          type: "text"
        },

        {
          icons: "#icon-icon_likegood",
          name: "请输入短信验证码",
          type: "number"
        },
        {
          icons: "#icon-icon_collect",
          name: "请输入密码",
          type: "password"
        },
        {
          icons: "#icon-icon_discovery",
          name: "请输入推荐码(选填)",
          type: "text"
        },
        {
          class: "iconfont icon-mima1",
          name: "确认密码",
          type: "password"
        }
      ]
        break;
      case 'passWord':
      this.ReginForm = {
        userPhone: "",
        userPwd1: "",
        userPwd: "",
        code: ""
      },
      this.siYuan = [
        {
          class: "iconfont icon-geren11",
          name: "用户名/手机号",
          type: "text"
        },
        {
          class: "iconfont icon-mima1",
          name: "新密码",
          type: "password"
        },
        {
          class: "iconfont icon-mima1",
          name: "确认密码",
          type: "password"
        },
        {
          class: "iconfont icon-yanzhengma2",
          name: "请输入短信验证码",
          type: "text"
        }
      ]
        break;
      default:
        break;
    }
  }
  // input高亮
  private changeValue(index: Number) {
    this.isActive = index;
  }
  //  验证
  private getAuthCode() {
    if (
      !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.ReginForm.userPhone)) {
        alert('ccc')
      return;
    } else {
      this.getCode(this.ReginForm.userPhone);
    }
  }
  // 
  getCode (tel: string) {
    this.sendAuthCode = false;
    this.auth_time = 60;
    var auth_timetimer = setInterval(() => {
      this.auth_time--
      if (this.auth_time <= 0) {
        this.sendAuthCode = true;
        clearInterval(auth_timetimer);
      }
    }, 1000);
  }
  // 获取省份
    private getProvince() {
      console.log(123)
    }
    // 获取城市
    private getCity() {
      this.ReginForm.cityId = -1;
      this.ReginForm.districtId = -1;
      this.cityList = [];
      this.districtLite = [];
      console.log(123)
    }
    // 获取地区
    private getDistrict() {
      this.ReginForm.districtId = -1;
      this.districtLite = [];
      console.log(123)

    }

  private submit() {
    const getRequest = new GetRequest()
    if(this.name == 'login') {
      let form = {
        userName : this.ReginForm.userPhone,
        passWord : this.ReginForm.userPwd
      }
      getRequest.getLogin(form,(res: any) => {
        console.log(res.data)
    })
    }
    
  }
}
</script>
<style lang="less" scoped>
.forms {
  width: 100%;
  height: 100%;
  input {
    width: 100%;
  }
  .data {
    width: 100%;
    padding: 0rem 3.6rem;
    .li {
      width: 100%;
      height: 4rem;
      margin-top: 1rem;
      padding-left: 1rem;
      position: relative;
      line-height: 3.5rem;
      border: solid 1px #adadad;
      border-radius: 7px;
      font-size: 1.6rem;
      color: #999;
      white-space: nowrap;
      margin-bottom: 10px;
      i {
        vertical-align: middle;
        font-size: 2rem;
        width: 50%;
      }
      input {
        width: 80%;
        height: 95%;
        vertical-align: middle;
        border: none;
        font-size: 1.6rem;
        color: #343434;
        opacity: 0.5;
        background: none;
        border:none;
        outline: none; // 去除选中状态边框
        /* width: 4rem; */
      }
      .getCode {
        width: 6%;
        height: 2rem;
        display: inline-block;
        // background-image: url(../../../img/index/newuser/drawable-xhdpi/推荐码未点击.png);
        background-size: 100% 100%;
      }
      .auth_input {
        width: 50%;
        border-right: 1px solid #ccc;
        border-radius: 0px;
        vertical-align: middle;
      }
      .time {
        height: 100%;
        vertical-align: middle;
        padding-left: 0.8rem;
        color: #00ae87;
        font-size: 1.6rem;
        }
      }
      .active {
        border: solid 1px #0bb794;
        color: #0bb794;
        .getCode {
          width: 6%;
          height: 2rem;
          display: inline-block;
          // background-image: url(../../../img/index/newuser/drawable-xhdpi/推荐码点击.png);
          background-size: 100% 100%;
        }
      }
      select {
        width: 27%;
        height: 2.2rem;
        line-height: 2.2rem;
        background: none;
        color: #999999;
        font-size: 1.3rem;
        text-align: center;
      }

      .city {
        font-size: 1.6rem;
        margin-bottom: 1.5rem;
        .c_text {
          color: #00ae87;
          margin-bottom: 0.4rem;
        }
        .c_span {
          display: inline-block;
          width: 1.2rem;
          height: 0.1rem;
          background-color: #999;
          vertical-align: middle;
        }
      }
    }

    .autoLogin {
      display: flex;
      justify-content: space-between;
      color: #c3c3c3;
      font-size: 1.2rem;
      font-weight: normal;
      font-family: SourceHanSansCN-Regular;
      margin-top: 12px;
      button {
        background: #fff;
      }
    }
    .btn {
      width: 100%;
      text-align: center;
      background-color: #0bb794;
      color: #fff;
      font-size: 1.5rem;
      border-radius: 5px;
      margin-top:2.5rem;
    }
    .operation {
      position: absolute;
      right: 47px;
      top: 281px;
      /*font-size: 6.8rem;*/
      background-color: transparent;
      color: #c3c3c3;
      font-size: 1.2rem;
    }
    .nu_agreement{
      width: 100%;
      margin-top:1rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .nu_agreement_checkBox {
        padding:0;
        font-size:1.4rem; 
      }
      .nu_a_text {
        color: #999;
        font-size: 1.3rem;
        span{
          display:inline-block;
        }
      }
    }
  }
</style>