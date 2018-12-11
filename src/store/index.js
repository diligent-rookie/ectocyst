import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stationall_data: [],
    Protectionall_data: [],
    IsshowTip: false,
    isDelete: false,
    isWarn: false,
    messageShow: false,
    emails: ''
  },
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
