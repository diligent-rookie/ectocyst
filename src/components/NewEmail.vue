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
        <input type="text"
        v-model="list.text"
        class="message-inp"
        @blur="Verify(list,index)"
        ref='eminp'
        >
        <span class="email-suggest">建议使用163邮箱</span>
        <span class="email-error message-error"
        v-if="!list.isEm"
        >
        请输入正确格式的邮箱
        </span>
      </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex'
import {EmailTest} from '../config/regTest'
export default {
  data () {
    return {
      emailLists: []
    }
  },
  computed: {
    ...mapState({
      EmStr: state => state.emails
    })
  },
  methods: {
    addEm (idx) {
      this.emailLists.push({text: '', isEm: true})
    },
    delEm (idx) {
      this.emailLists.splice(idx, 1)
    },
    Verify (item, n) {
      let str = this.$refs.eminp[n].value
      item.isEm = EmailTest(str)
    },
    arrFormat (str) {
      let newarr = []
      str.indexOf(',') === -1
        ? newarr[0] = str
        : newarr = str.split(',')
      newarr.map((item, idx) => {
        item && this.emailLists.push({text: item, isEm: true})
      })
    }
  },
  mounted () {
    this.$store.commit('SET_EMAIL_STR', '')
    this.arrFormat(this.EmStr)
  },
  watch: {
    EmStr: function (newstr) {
      this.arrFormat(newstr)
    }
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

.new-email span.email-name
  float left
  display block
  width 3rem
  height .44rem
  text-align left

.new-email input
  width 2.4rem
  height .44rem
  line-height .44rem
  padding-left .1rem
  margin .1rem .3rem 0 0

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
    left 25%

.email-add
    right 41%

.email-add:active,.email-delete:active
    color #333
</style>
