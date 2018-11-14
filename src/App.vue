<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">台站展示</router-link>
      <router-link to="/GeneralSettings">总体设置</router-link>
      <router-link to="/Log">日志显示</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script src="../public/js/rem.js"></script>
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
