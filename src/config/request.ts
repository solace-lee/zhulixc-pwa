import http from '@/config/http.ts'
import { configApi, gateway } from '@/config/config.ts'
import { apis } from '@/config/apis.ts'

class GetRequest {
  // 首页广告数据
  getAds (callback: any, code?: string | number) {
    const districtId = sessionStorage.getItem('districtId') || '0'
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
    const districtId = sessionStorage.getItem('districtId') || '0'
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

  // 获取积分商品所有数据
  findIntegralShopping (sort:string, callback: any) {
    const province: string = sessionStorage.getItem('province') || ''
    const city: string = sessionStorage.getItem('city') || ''
    const district: string = sessionStorage.getItem('district') || ''
    const obj: Object = {
      params: {
        provinceName: province,
        cityName: city,
        districtName: district,
        commodityArea: 4,
        sort: sort || ''
      }
    }
    http.get(gateway.SEARCH + apis.findIntegralShopping, obj).then(res => {
      callback(res)
    })
  }

  // 获取积分详细
  integralRecommend (callback: any) {
    http.get(gateway.SEARCH + apis.integralRecommend).then(res => {
      callback(res)
    })
  }

  // 获取积分广告
  getAdsList (callback: any) {
    const districtId: string = sessionStorage.getItem('districtId') || ''
    const code: string = sessionStorage.getItem('codeD') || ''
    const obj: Object = {
      params: {
        districtId: districtId,
        code: code
      }
    }
    http.get(gateway.SEARCH + apis.findAdsList, obj).then(res => {
      callback(res)
    })
  }
}

export {
  GetRequest
}
