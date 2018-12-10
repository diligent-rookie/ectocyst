<template>
  <ul>
      <li class="new-email"
      v-for="(list,index) in emailLists"
      :key="index"
      >
        <span class="email-name">报警接收邮箱</span>
        <span class="email-add"
        v-show="index===emailLists.length-1"
        @click="addEm(index)">
            +
        </span>
        <span class="email-delete"
        v-show="index!==0"
        @click="delEm(index)">
            -
        </span>
        <input type="text" class="message-inp">
        <span class="email-suggest">建议使用163邮箱</span>
        <span class="email-error">请输入正确格式的邮箱</span>
      </li>
  </ul>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      emailStr: '18829489625,15147575763,13624853087,13644853067',
      emailLists: [18829489625, 15147575763, 13624853087, 13644853067]
    }
  },
  watch: {},
  computed: {},
  methods: {
    addEm (idx) {
      console.log('点击添加', idx)
      this.$set(this.emailLists, idx + 1, '')
    },
    delEm (idx) {
      this.emailLists.splice(idx, 1)
    }
  },
  mounted () {
    this.emailLists = this.emailStr.split(',')
  }
}
</script>
<style lang="stylus" scoped>
.new-email
    width 10rem
    margin 0 auto
    position relative

.new-email span
    display inline-block
    vertical-align middle

.new-email input
  width 2.4rem
  height .44rem
  line-height .44rem
  padding-left .1rem
  margin .1rem .3rem 0 2rem

.email-suggest
    color #ccc
    padding-right .1rem

.email-error
    color rgb(239,113,100)

.email-add,.email-delete
    position absolute
    width .44rem
    text-align center
    height .44rem
    margin-top .1rem
    line-height .44rem
    font-size .3rem
    cursor pointer

.email-delete
    left 2.7rem

.email-add
    right 4.1rem

.email-add:active,.email-delete:active
    color #333
</style>
