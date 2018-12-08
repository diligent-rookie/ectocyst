import Vue from 'vue'
import Router from 'vue-router'
import StationShow from '../views/StationShow'
import StationSettings from '../views/StationSettings'
import Protection from '../views/Protection'
import Logger from '../views/Logger'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StationShow',
      component: StationShow
    },
    {
      path: '/StationSettings',
      name: 'StationSettings',
      component: StationSettings
    },
    {
      path: '/Protection',
      name: 'Protection',
      component: Protection
    },
    {
      path: '/Logger',
      name: 'Logger',
      component: Logger
    }
  ]
})
