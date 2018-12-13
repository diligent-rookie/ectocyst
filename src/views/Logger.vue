<template>
  <div class="log">
      <div class="log-content">
          <div class="all-logger">
            <ul>
              <li class="logger-title">当前异常日志展示</li>
              <li class="logger-name">
                <span class="title-text">日志标题</span>
                <span class="time-text">产生时间</span>
                <span class="detail-text">详情描述</span>
              </li>
              <li class="logger-list"
              v-for="(list,idx) in loggerLists" :key="idx">
                <span>{{list.title?list.title:'无'}}</span>
                <span>{{list.create_time}}</span>
                <span class="detail-content">
                  <span class="detail-text" >
                  <el-scrollbar style="
                  height:0.8rem;overflow-x:hidden">
                  <span v-html="list.description"
                  style="display:inline">
                  </span>
                  </el-scrollbar>
                  </span>
                </span>
              </li>
            </ul>
            </div>
            <Pagination
            :total="totalLists"
            :pages="totalPages"
            @getCurPage="getPage"
            >
            </Pagination>
          </div>
      </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import {getAllLogger} from '../service/index'
export default {
  components: {Pagination},
  props: {},
  data () {
    return {
      size: 7,
      totalPages: 0,
      loggerLists: [],
      totalLists: 0
    }
  },
  methods: {
    // 请求当前页的日志
    async requestLogger (n) {
      let requestLoggerData = await getAllLogger(n, this.size)
      this.loggerLists = requestLoggerData.list
      this.totalPages = requestLoggerData.maxPage
      this.totalLists = this.totalPages * this.size
    },
    // 获取用户选择的页数 并请求
    getPage (n) {
      this.requestLogger(n)
    },
  },
  mounted () {
    this.requestLogger(1)
  }
}
</script>
<style lang="stylus" scoped>
.log,.log-content
  width 100%
  height 93%

.log-content
  padding-top .4rem
  position relative

.all-logger
  width 98%
  height 100%
  margin 0 auto
  overflow-y auto
  overflow-x hidden
  border 1px solid #24B7D2

.all-logger li
  width 100%
  height .42rem
  line-height .42rem
  display flex
  justify-content space-around

.all-logger li span
  display block
  width 20%
  height 100%
  box-sizing border-box
  text-align center

.logger-title
  font-size .18rem
  text-align center

.logger-name
  border-bottom 1px solid #24B7D2

.all-logger li.logger-list
  height 0.8rem
  border-bottom 1px solid #2e3751

.all-logger li.logger-list:hover
  background-color #24B7D2

.all-logger li.logger-list span.title-text,
.all-logger li.logger-list span.time-text
  line-height 0.8rem

.all-logger li.logger-list span.detail-text
  overflow-y auto
  overflow-x hidden
  text-align left
  height 0.8rem
  width 3.5rem

.all-logger li.logger-list span.detail-content
  width 2.5rem
  overflow-x hidden
  // padding-right .5rem
  margin-left 1rem

.detail-text::-webkit-scrollbar
  width: 0 !important

.detail-text
  -ms-overflow-style none

.detail-text
  overflow -moz-scrollbars-none
</style>
