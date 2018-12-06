<template>
   <div class="log">
     <div class="log-content clearfix">
        <ul class="all-log">
            <li class="log-title">维修人员概况</li>
            <li class="log-name">
              <span>姓名</span>
              <span>性别</span>
              <span>电话</span>
              <span>邮箱</span>
              <span>地址</span>
            </li>
            <li v-for="(list,idx) in logLists"
            :key="idx"
            @click="sendId(list&&list.id)"
            class="log-list"
            >
              <span>{{list.name}}</span>
              <span>{{list.sex}}</span>
              <span>{{list.tell}}</span>
              <span>{{list.email}}</span>
              <span>{{list.address}}</span>
            </li>
        </ul>
        <div class="log-edit">
          <ul class="log-tab clearfix">
            <li v-for="(item,idx) in logtabs" :key="idx"
            :class="['tab-button',{active:currentTab===item.id}]"
            @click.stop="currentTab=item.id"
            onselectstart="return false">
            {{item.name}}
            </li>
          </ul>
          <keep-alive>
             <component :is="componentId" class="tab-content"
            :idLog="logId"></component>
          </keep-alive>
        </div>
      </div>
     </div>
</template>

<script>
import AddLog from '../components/AddLog'
import EditLog from '../components/EditLog'
import {mapState} from 'vuex'
export default {
  name: 'Log',
  data () {
    return {
      logLists: [],
      currentTab: 'EditLog',
      logtabs: [
        {name: '维修人员修改', id: 'EditLog'},
        {name: '维修人员添加', id: 'AddLog'}
      ],
      logId: '',
    }
  },
  components: {AddLog, EditLog},
  computed: {
    ...mapState({
      logallData: state => state.logall_data
    }),
    componentId: function () {
      return this.currentTab
    }
  },
  methods: {
    sendId (id) {
      this.logId = id
    }
  },
  watch: {
    logallData: function (newval) {
      this.logLists = newval
      this.logId = newval[0].id
    }
  },
  async mounted () {
    this.$store.dispatch('GET_LOGALL_DATA')
  },
}
</script>

<style scoped lang="stylus">
.log,.log-content
  width 100%
  height 93%

.log-content
  padding-top .4rem

.all-log
  width 60%

.log-edit
  width 36%

.all-log,.log-edit
  height 100%
  margin 0 .15rem
  overflow-y auto
  float left
  border 1px solid #24B7D2

.all-log li
  width 100%
  height .42rem
  line-height .42rem
  display flex
  justify-content space-around

.all-log li>span
  display block
  width 20%
  text-align center

.log-title
  font-size .18rem
  text-align center

.log-name
  border-bottom 1px solid #24B7D2

.log-list
  cursor pointer

.log-tab
  width 100%
  height .44rem
  margin-bottom .1rem

.log-tab .tab-button
  width 2rem
  text-align center
  line-height .44rem
  height 100%
  float left
  font-size .18rem
  cursor pointer

.log-tab .tab-button.active
  color  #449DDA

// .active
//   background-color #449DDA
</style>
