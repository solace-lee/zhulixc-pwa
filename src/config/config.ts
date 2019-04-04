const configApi = {
  local: 'http://192.168.1.107:80',
  home: 'http://192.168.1.107:9100',
}

const gateway = {
  FINANCE: '/api/finance/', //财务服务
  AUTH: '/api/auth/', //授权中心微服务
  USER: '/api/user/', //用户微服务
  SEARCH: '/api/search/', //搜索微服务
  ORDER: '/api/order/', //订单微服务
  COMMODITY: '/api/commodity/', //商品服务
  UPLOAD: '/api/upload/', //图片服务
  BACKSTAGE: '/api/backstage/', //后台调用
  GAME: '/api/game/', //游戏
}

export {
  configApi, gateway
}
