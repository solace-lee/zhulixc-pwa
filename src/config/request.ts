import http from '@/config/http.ts'
import { configApi, gateway } from '@/config/config.ts'
import { apis } from '@/config/apis.ts'

class getRequest {
  getAds(callback) {
    http.get(gateway.SEARCH + apis.ads).then(res => {
      callback(res)
    })
  }
}

export {
  getRequest
}