// 封装一个高德定位方法

class GetLocation {
  location (ok: any) {
    return new Promise((resolve, reject) => {
      let mapObj = new AMap.Map('iCenter')
      mapObj.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data: any) {
          // data是具体的定位信息
          window.sessionStorage.setItem('province', data.addressComponent.province)
          window.sessionStorage.setItem('city', data.addressComponent.city)
          window.sessionStorage.setItem('district', data.addressComponent.district)
          resolve(ok)
        }

        function onError (data: any) {
          reject(data)
        }
      })
    })
  }
  
}

export { GetLocation }
