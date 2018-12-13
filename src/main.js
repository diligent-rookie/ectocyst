import './main.styl'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Scrollbar} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Scrollbar)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
