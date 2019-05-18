const apis = {
  // HOME
  ads: 'ads/findAdsList', // 首页广告列表
  car: 'inside/cart/findCartByuserId', // 购物车
  login: 'login', // 登录
  favorite: 'commodity/indexlike', // 猜你喜欢
  greenlife: 'commodity/findByClassifyCode', // 绿色生活数据（生态市场）
  speciality: 'commodity/onetambononeproduct', // 一村一品（热销乡味）
  member: 'commodity/findmembersarea', // 会员商品

  // location
  getLocalName: '/api/getAddressDetail',
  getLocalId: '/api/getAddress',

  // classify
  classifyFirstList: 'commodityClassify/oneClassifyLevel', // 一级分类
  classifySecondList: 'commodityClassify/findByPreClassifyId', // 二级分类

  // register
  codeRegistered: 'sms/sendCodeRegistered', // 注册-获取验证码
  register: 'register', // 注册-提交
  findIntegralShopping: 'commodity/findIntegralShopping', // 获取积分商品
  integralRecommend: 'inside/integral/integralRecommend', // 获取积分详情
  findAdsList: 'ads/findAdsList', // 获取积分广告
  article: '/api/getArticle/', // 协议
  retrieve: 'sms/retrieve', // 找回密码--获取验证码

  // user
  userInfo: 'verifyUser', // 获取用户信息
  orderValue: 'inside/showOrderAmount', // 获取订单条数
  logOut: 'logout', // 退出登录
  changeNickName: 'inside/updateUserData', // 修改用户昵称
}

export {
  apis
}
