<template>
    <!-- 单选组件 -->
  <div class="radio-menu">
    <div class="radio-inp">
      <input type="text" readonly="readonly"
      :value="selectVal"
      ref="inp"
      class="message-inp">
      <i class="iconfont icon-jiantouxia radio-icon"
      @click="Show"></i>
    </div>
    <ul class="radio-content" v-show="showContent">
      <li v-for="(list,idx) in selectLists"
      :key="idx"
      :class="{selected:list.selected}"
      @click="selectList(list,idx)">
        <span class="list-select iconfont icon-xuanzhong"
      v-show="list.selected"></span>
        <span class="list-name">{{list.content}}</span>
    </li>
    </ul>
  </div>
</template>

<script>
import '../assets/font/iconfont.css'
export default {
  data () {
    return {
      showContent: false,
    }
  },
  props: ['selectVal', 'selectLists'],
  methods: {
    // 单选菜单
    Show () {
      this.showContent = !this.showContent
    },
    selectList (n) {
    // 清空原始选项
      this.selectLists.map((item, idx) => {
        item.selected = false
      })
      n.selected = true
      this.showContent = false
      this.$emit('changeStatusVal', n.content)
      this.$emit('changeProvinceVal', n.content)
      this.$emit('changeSexVal', n.content)
    }
  }
}
</script>
<style lang="stylus" scoped>
.radio-menu
    display block
    float left
    width 2.6rem
    height .44rem
    line-height .44rem
    padding-left 0rem
    position relative

.radio-inp
    width 2.6rem
    height 0.44rem

.radio-inp input
    width 2rem
    height 0.44rem
    color #ffffff
    padding-left .1rem
    vertical-align middle

.radio-icon
    display inline-block
    color #ccc
    width 0.46rem
    height 0.47rem
    cursor pointer
    text-align center
    line-height 0.455rem
    border-radius 0 4px 4px 0
    vertical-align middle
    background-color #2e3751

.radio-content
    width 2.48rem
    height 2rem
    position absolute
    top .6rem

.radio-content li
    width 100%
    height .44rem
    font-size .14rem
    line-height .44rem
    text-align center
    position relative
    cursor pointer
    background-color #2e3751
    color #fff

.radio-content li.selected
    color #449DDA

.radio-content li .list-select
    display inline-block
    position absolute
    left .5rem
    font-size .14rem
</style>
