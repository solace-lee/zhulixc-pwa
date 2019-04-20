const apis = {
  ads: 'ads/findAdsList', // 首页广告列表
  car: 'inside/cart/findCartByuserId', // 购物车
  login: 'login', // 登录
  favorite: 'commodity/indexlike', // 猜你喜欢
  greenlife: 'commodity/findByClassifyCode', // 绿色生活数据（生态市场）
  speciality: 'commodity/onetambononeproduct', // 一村一品（热销乡味）
  member: 'commodity/findmembersarea', // 会员商品
  codeRegistered: 'sms/sendCodeRegistered', // 注册-获取验证码
  register: 'register', // 注册-提交
  article: '/api/getArticle/', // 协议
  retrieve: 'sms/retrieve', // 找回密码--获取验证码
}

export {
  apis
}
