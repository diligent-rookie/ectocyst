<template>
      <div class="message" :class="{move:messageShow}">
        <span class="icon">√</span>
        <span class="text">通知报警成功</span>
      </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {
    ...mapState({
      messageShow: state => state.messageShow
    })
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.message
    width 3.5rem
    height .5rem
    border-radius 8px
    background-color #eee
    position absolute
    text-align center
    line-height .5rem
    right 1rem
    top -0.5rem

.move
    animation identifier 1s ease-in-out

.icon
    display inline-block
    width .35rem
    height .35rem
    text-align center
    line-height .35rem
    border-radius 50%
    background-color #00ff00
    color #fff
    margin-right .2rem
    font-size .14rem

.text
    font-size .18rem
    color #00ff00
    font-weight 700

@keyframes identifier {
    0%{
        top: -0.5rem
    }50%{
        top:0.5rem
    }100%{
       top:-0.5rem
    }
}
</style>
