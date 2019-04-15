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
  getRegister (form: any,callback: any ) {
      http.post(gateway.USER + "register", form).then(res => {
        callback(res)
      });
    }
}

export {
  GetRequest
}
