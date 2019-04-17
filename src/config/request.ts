import http from '@/config/http.ts'
import { configApi, gateway } from '@/config/config.ts'
import { apis } from '@/config/apis.ts'

class GetRequest {
  // 首页广告数据
  getAds (callback: any, code?: string | number) {
    const districtId = sessionStorage.getItem("districtId") || "0"
    const config: object = {
      params: {
        districtId: districtId,
        code: code || 12345
      }
    }
    http.get(gateway.SEARCH + apis.ads, config).then(res => {
      callback(res)
    })
  }

  // 猜你喜欢数据
  getFavorite (callback: any) {
    const districtId = sessionStorage.getItem("districtId") || "0"
    const config: object = {
      districtId: districtId
    }
    http.get(gateway.SEARCH + apis.favorite, config).then(res => {
      callback(res)
    })
  }

  // 生态市场数据
  getGreenlife (callback: any) {
    const config: object = {
      params: {
        classifyCode: 10000,
        commodityArea: 1
      }
    }
    http.get(gateway.SEARCH + apis.greenlife, config).then(res => {
      callback(res)
    })
  }
  // 获取省市区
  // 获取省份
  private getProvince () {
    console.log(123)
  }
  // 获取城市
  private getCity () {
    console.log(123)
  }
  // 获取地区
  private getDistrict () {
    console.log(123)
  }

  // 购物车列表
  getCar (callback: any) {
    http.get(gateway.ORDER + apis.car).then(res => {
      callback(res)
    })
  }

  // 登录
  getLogin (form: any, callback: any) {
    http.post(gateway.AUTH + apis.login, form).then(res => {
      callback(res)
    })
  }

  // 注册
  // 手机验证码
  getCode (tel: any, callback: any) {
    http.get(gateway.USER + apis.codeRegistered, { params: { phone: tel } }).then(res => {
      callback(res)
    })
  }
  // 提交
  getRegister (form: any, callback: any) {
    http.post(gateway.USER + apis.register, form).then(res => {
      callback(res)
    })
  }
}

export {
  GetRequest
}
