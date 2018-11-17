<template>
   <div class="inp">
        <div class="search" v-show="searchBoolean">
          <input type="text" placeholder="请输入ID查询"><button>确认</button>
        </div>
        <ul class="station-edit clearfix">
          <li v-for="(value,key,index) in messageLists" :key='index'>
            <span class="message-name">{{messageNames[index]}}</span>
            <input type="text" class="message-number"
            :value="value">
          </li>
        </ul>
   </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  components: {},
  props: ['messageNames', 'messageLists', 'searchBoolean']
}
</script>

<style scoped lang="stylus">
.search input
  width 2rem
  height .35rem
  text-align center
  line-height .35rem
  margin 0 .2rem 0 .5rem

.search input:focus
  border 1px solid #449DDA

.search button
  width 1rem
  height .35rem
  background-color #449DDA
  outline none
  border-radius 3px

.search button:active
  background-color #4C5979

.station-edit li
  width 4rem
  height .46rem
  padding .09rem 0
  margin 0 auto

.station-edit li .message-name
  display block
  float left
  width 1rem
  height .44rem
  line-height .44rem
  text-align left

.station-edit li .message-number
  display block
  float right
  width 2.4rem
  height .44rem
  line-height .44rem
  padding-left .1rem
</style>
