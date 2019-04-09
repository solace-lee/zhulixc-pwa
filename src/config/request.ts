import http from '@/config/http.ts'
import { configApi, gateway } from '@/config/config.ts'
import { apis } from '@/config/apis.ts'

class GetRequest {
  getAds (callback: any) {
    http.get(gateway.SEARCH + apis.ads).then(res => {
      callback(res)
    })
  }
}

export {
  GetRequest
}
