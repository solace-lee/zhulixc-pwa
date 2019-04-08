import Vue from 'vue'
import Cube from 'cube-ui'
// import axios from 'axios'
import App from './App.vue'
import AMap from 'vue-amap'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Cube)
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: 'deff2dcf2e3baae4659fa43854600c62',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
