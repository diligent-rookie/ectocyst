<template>
  <div class="radio-menu">
    <div class="radio-inp">
        <input type="text" readonly="readonly" v-model="inpVal" ref="inp">
        <i class="iconfont icon-jiantouxia radio-icon" @click="Show"></i>
    </div>
    <ul class="radio-content" v-show="showContent">
        <li v-for="(list,index) in selectLists" :key="index"
        :class="{selected:list.selected}"
        @click="selectList(list)">
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
  components: {},
  props: ['inpVal', 'selectLists'],
  data () {
    return {
    //   selectLists: [
    //     {content: '男', selected: true},
    //     {content: '女', selected: false}
    //   ],
      showContent: false,
    //   inpVal: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    Show () {
      this.showContent = !this.showContent
    },
    selectList (n) {
    // 清空原始选项
      this.selectLists.map((item, idx) => {
        item.selected = false
      })
      n.selected = true
      this.inpVal = n.content
      this.showContent = false
    }
  },
  mounted () {
    // 渲染初始选项
    this.selectLists.map((item, idx) => {
      item.selected && (this.inpVal = item.content)
    })
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
    width 2.1rem
    height 0.44rem
    color #ffffff
    text-align center
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
