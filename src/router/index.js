import Vue from 'vue'
import Router from 'vue-router'
import EarthQuakeShow from '../views/EarthQuakeShow'
import GeneralSettings from '../views/ GeneralSettings'
import Log from '../views/ Log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EarthQuakeShow',
      component: EarthQuakeShow
    },
    {
      path: '/GeneralSettings',
      name: 'GeneralSettings',
      component: GeneralSettings
    },
    {
      path: '/Log',
      name: 'Log',
      component: Log
    }
  ]
})
