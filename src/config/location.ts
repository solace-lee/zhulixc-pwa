import http from '@/config/http.ts'
import { configApi } from '@/config/config.ts'
import { apis } from '@/config/apis.ts'

const localName = function getAreaName(provinceId?: number, cityId?: number, districtId?: number) {
  let localID: string = ''
  if (!provinceId) {
    localID = '0,0,0'
  } else if (!cityId) {
    localID = provinceId + "," + 0 + "," + 0
  } else if (!districtId) {
    localID = provinceId + "," + cityId + "," + 0
  } else {
    localID = provinceId + "," + cityId + "," + districtId
  }
  let area: any = {}
  return new Promise((resolve, reject) => {
    http.get(configApi.local + apis.getLocalName + '?ids=' + localID)
      .then(res => {
        // area = res.data.data
        area.provinceName = res.data.data.Province.provinceName
        if (!cityId) {
          area.cityName = ''
        } else {
          area.cityName = res.data.data.city.cityName
        }
        if (!districtId) {
          area.districtName = ''
        } else {
          area.districtName = res.data.data.district.districtName
        }
        resolve(area)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const localID = function getAreaID(provinceName?: string, cityName?: string, districtName?: string) {
  let locals = provinceName + ',' + cityName + ',' + districtName
  let area = {}
  return new Promise((resolve, reject) => {
    http.get(configApi.local + apis.getLocalId + '?names=' + locals)
      .then(res => {
        area = res.data.data
        resolve(area)
      })
      .catch(err => {
        reject(err)
      })
  })
}


export {
  localName, localID
}