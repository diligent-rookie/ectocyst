<template>
    <!-- 分页组件 -->
    <div id="paging">
        <span class="total-page">共{{total}}条/{{pages}}页</span>
        <span @click="switchPage(curPage - 1)">&lt;</span>
        <span v-if="showText(item)"
        @click="switchPage(item)"
        v-for="item in sum" :key="item"
        :class="{'active': item == curPage}">
        {{ showText(item) }}
        </span>
        <span @click="switchPage(curPage + 1)">&gt;</span>
      </div>
</template>

<script>
export default {
  components: {},
  props: ['total', 'pages'],
  data () {
    return {
      sum: 0,
      curPage: 1,
    }
  },
  watch: {
    curPage: function (newval) {
      this.$emit('getCurPage', newval)
    },
    pages: function (newval) {
      this.sum = newval
    }
  },
  methods: {
    switchPage (page) {
      if (page > 0 && page < this.sum + 1) {
        this.curPage = page
      }
    },
    showText (i) {
      if (i === 1 || i === this.sum) {
        // 第一页和最后一页始终显示
        return i
      } else if (i < this.curPage + 2 && i > this.curPage - 2) {
        // 当前页的前一页和后一页始终显示
        return i
      } else if (i === this.curPage + 2 || i === this.curPage - 2) {
        // 当前页的前前页和后后页显示'...'
        return '...'
      } else {
        // 其他页面都不显示
        return false
      }
    },
  }
}
</script>
<style lang="stylus" scoped>
#paging
    position absolute
    right .1rem
    bottom .2rem
    font-size .2rem

span
    display inline-block
    width 40px
    height 40px
    line-height 40px
    color #ccc
    text-align center
    margin-right 5px
    border-radius 40px
    cursor pointer

span.active
    color #449DDA

span.total-page
    width 120px
    height 40px

</style>
