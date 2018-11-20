<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">台站展示</router-link>
      <router-link to="/GeneralSettings">台站配置</router-link>
      <router-link to="/Log">维护配置</router-link>
      <audio autoplay="autoplay" src="../src/assets/董昱昆 - 微博提示音.mp3"></audio>
      <button class="bells">关闭警报</button>
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

.bells
  width 1rem
  height 0.44rem
  border-radius 4px
  background-color #449DDA
</style>
