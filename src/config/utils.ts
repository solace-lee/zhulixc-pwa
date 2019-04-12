/**
 * aes加解密工具类
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'

export default {
  //加密
  encrypt (word:string, keyStr:string) {
    keyStr = keyStr ? keyStr : 'ab*d5678abc-896.'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7})
    return encrypted.toString()
  },

  //解密
  decrypt (word:string, keyStr:string) {
    keyStr = keyStr ? keyStr : 'ab*d5678abc-896.'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7})
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
