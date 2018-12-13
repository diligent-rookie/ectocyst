<template>
   <div class="Protection">
     <div class="protection-content clearfix">
       <div class="all-protection-content">
        <ul class="all-protection">
        <el-scrollbar
        style="height:100%;overflow:hidden">
            <li class="protection-title">维修人员概况</li>
            <li class="protection-name">
              <span>姓名</span>
              <span>性别</span>
              <span>电话</span>
              <span>邮箱</span>
              <span>地址</span>
            </li>
            <li v-for="(list,idx) in ProtectionLists"
            :key="idx"
            @click="sendId(list&&list.id)"
            class="protection-list"
            >
              <span>{{list.name}}</span>
              <span>{{list.sex}}</span>
              <span>{{list.tell}}</span>
              <span>{{list.email}}</span>
              <span>{{list.address}}</span>
            </li>
        </el-scrollbar>
        </ul>
       </div>
        <div class="protection-edit">
          <ul class="protection-tab clearfix">
            <li v-for="(item,idx) in Protectiontabs" :key="idx"
            :class="['tab-button',{active:currentTab===item.id}]"
            @click.stop="currentTab=item.id"
            onselectstart="return false">
            {{item.name}}
            </li>
          </ul>
          <keep-alive>
             <component :is="componentId" class="tab-content"
            :idProtection="ProtectionId"></component>
          </keep-alive>
        </div>
      </div>
     </div>
</template>

<script>
import AddProtection from '../components/AddProtection'
import EditProtection from '../components/EditProtection'
import {mapState} from 'vuex'
export default {
  name: 'Protection',
  data () {
    return {
      ProtectionLists: [],
      currentTab: 'EditProtection',
      Protectiontabs: [
        {name: '维修人员修改', id: 'EditProtection'},
        {name: '维修人员添加', id: 'AddProtection'}
      ],
      ProtectionId: '',
    }
  },
  components: {AddProtection, EditProtection},
  computed: {
    ...mapState({
      ProtectionallData: state => state.Protectionall_data
    }),
    componentId: function () {
      return this.currentTab
    }
  },
  methods: {
    sendId (id) {
      this.ProtectionId = id
    }
  },
  watch: {
    ProtectionallData: function (newval) {
      this.ProtectionLists = newval
      this.ProtectionId = newval[0].id
    }
  },
  async mounted () {
    this.$store.dispatch('GET_PROTECTIONALL_DATA')
  },
}
</script>

<style scoped lang="stylus">
.Protection,.protection-content
  width 100%
  height 93%

.protection-content
  padding-top .4rem

.all-protection-content
  width 60%

.all-protection
  width 12.6rem
  height 7.2rem

.protection-edit
  width 36%

.all-protection-content,.protection-edit
  height 100%
  margin 0 .15rem
  overflow-y auto
  float left
  overflow-x hidden
  border 1px solid #24B7D2

.all-protection li
  width 100%
  height .42rem
  line-height .42rem
  display flex
  justify-content space-around

.all-protection li>span
  display block
  width 20%
  text-align center

.protection-title
  font-size .18rem
  text-align center

.protection-name
  border-bottom 1px solid #24B7D2

.protection-list
  cursor pointer
  border-bottom 1px solid #2e3751

.protection-tab
  width 100%
  height .44rem
  margin-bottom .1rem

.protection-tab .tab-button
  width 2rem
  text-align center
  line-height .44rem
  height 100%
  float left
  font-size .18rem
  cursor pointer

.protection-tab .tab-button.active
  color  #449DDA
</style>
