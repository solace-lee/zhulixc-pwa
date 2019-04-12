import http from '@/config/http.ts'
import { configApi, gateway } from '@/config/config.ts'
import { apis } from '@/config/apis.ts'

class GetRequest {
  getAds (callback: any) {
    http.get(gateway.SEARCH + apis.ads).then(res => {
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
}

export {
  GetRequest
}
