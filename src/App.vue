<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">台站展示</router-link>
      <router-link to="/GeneralSettings">台站配置</router-link>
      <router-link to="/Log">维护配置</router-link>
    </div>
    <router-view/>
    <WarnTip v-show="isWarn"></WarnTip>
  </div>
</template>
<script>
import '../public/rem.js'
import WarnTip from './components/WarnTip.vue'
import {mapState} from 'vuex'
export default({
  data () {
    return {

    }
  },
  components: {WarnTip},
  computed: {
    ...mapState({
      isWarn: state => state.isWarn
    })
  }
})
</script>
<style lang="stylus">
html,body,#app
 width 100%
 height 100%
 font-family 'Micrisoft Yahei'
 background-color #0A193A

#nav
  padding .2rem
  border 1px solid #24B7D2
  a
    font-weight bold
    color #fff
    font-size .18rem
    padding-right .5rem
    &.router-link-exact-active
      color #449DDA
</style>
