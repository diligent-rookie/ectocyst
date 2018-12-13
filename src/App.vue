<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">台站展示</router-link>
      <router-link to="/StationSettings">台站配置</router-link>
      <router-link to="/Protection">维护配置</router-link>
      <router-link to="/Logger">日志展示</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import '../public/rem.js'
import {mapState} from 'vuex'
export default({
  data () {
    return {

    }
  },
  computed: {
    ...mapState({

    })
  }
})
</script>
<style lang="stylus">
html,body
  width 100%
  height 100%
  overflow-x hidden
  overflow-y auto

#app
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
