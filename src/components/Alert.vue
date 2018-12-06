<template>
  <div class="alert-tip">
    <transition tag="div" name="alert">
        <div class="alert-content" v-show="IsshowTip">
            <span class="alert-text">请输入有效内容</span>
            <span class="close" @click="closeAlert">X</span>
        </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
    }
  },
  watch: {},
  computed: {
    ...mapState({
      IsshowTip: state => state.IsshowTip
    })
  },
  methods: {
    closeAlert () {
      this.$store.commit('SET_ALERT_STATUS', false)
    }
  },
}
</script>
<style lang="stylus" scoped>
.alert-content
    width 3.5rem
    height .5rem
    border-radius 8px
    background-color #ffe599
    position absolute
    top .5rem
    right 1rem

.alert-text
    display inline-block
    width 3.25rem
    height 100%
    line-height .5rem
    text-align center
    color #cc4125
    font-size .20rem
    font-family 'Microsoft Yahei'

.close
    display inline-block
    width .25rem
    height .25rem
    font-size .20rem
    color #cc4125
    cursor pointer

.alert-enter-active
  transition all .3s ease

.alert-leave-active
  transition all .3s ease

.alert-enter, .alert-leave-to
  opacity 0

</style>
