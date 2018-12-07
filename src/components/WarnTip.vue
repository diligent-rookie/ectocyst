<template>
  <div class="wrapper">
    <div class="wrapper-content">
        <span class="warn-text">您确定要删除该数据？</span>
        <button @click="Sure">确定</button>
        <button @click="Cancel">取消</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {
  deleteStationMessage,
  removeProtectionSingle
} from '../service/index'
export default {
  components: {},
  data () {
    return {
    }
  },
  props: ['deleteId', 'currentComponent'],
  watch: {},
  computed: {
    ...mapState({
      isDelete: state => state.isDelete
    })
  },
  methods: {
    async Sure () {
      this.$store.commit('SET_IS_DELETE', true)
      switch (this.currentComponent) {
        case 'StationShow':
          await deleteStationMessage(Number(this.deleteId))
          this.$store.dispatch('GET_STATION_DATA')
          break
        case 'Protection':
          await removeProtectionSingle(Number(this.deleteId))
          this.$store.dispatch('GET_PROTECTIONALL_DATA')
          break
        default:
          break
      }
      this.$store.commit('SET_WARN_STATUS', false)
    },
    Cancel () {
      this.$store.commit('SET_IS_DELETE', false)
      this.$store.commit('SET_WARN_STATUS', false)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.wrapper
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    background-color rgba(0,0,0,0.7)

.wrapper-content
    width 3.9rem
    height 3.5rem
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    border-radius 10px
    background-color #2e3751

.warn-text
    display block
    padding 1rem 0 0 .6rem
    font-size .28rem

button
    width 1rem
    height .5rem
    background-color #449DDA
    margin .8rem 0 0 .55rem
    border-radius 4px
    font-size .16rem
    cursor pointer

button:active
    background-color #2e3751
</style>
