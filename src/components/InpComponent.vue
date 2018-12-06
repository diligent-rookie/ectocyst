<template>
   <div class="inp">
        <Alert></Alert>
        <ul class="station-edit clearfix">
          <li v-for="(item,index) in messageNames" :key='index'>
            <span class="message-name">{{item.chineseName}}</span>
            <div class="radio-menu"
            v-if="(index===1&&componentName==='Log')
            ||(index===messageNames.length-1&&componentName==='EarthQuakeShow')"
            >
              <div class="radio-inp">
                <input type="text" readonly="readonly"
                :value="selectVal||messageLists[item.englishName]||''"
                ref="inp">
                <i class="iconfont icon-jiantouxia radio-icon"
                @click="Show"></i>
              </div>
              <ul class="radio-content" v-show="showContent">
                <li v-for="(list,idx) in
                (componentName==='EarthQuakeShow'?
                earthselectLists:logselectLists)"
                :key="idx"
                :class="{selected:list.selected}"
                @click="selectList(list,index)">
                  <span class="list-select iconfont icon-xuanzhong"
                v-show="list.selected"></span>
                  <span class="list-name">{{list.content}}</span>
              </li>
              </ul>
            </div>
            <input type="text" class="message-number"
            v-else
            :value="messageLists[item.englishName]||standby[index]||''"
            @blur="Verify(index)"
            ref="inp">
            <span class="message-tip">{{item.suggesttext}}</span>
            <span class="message-error">{{item.errortext}}</span>
          </li>
          <div class="edit-btn">
            <button class="sure" @click="SureMessage">
              确定
            </button>
            <button class="delete"
              @click="DeleteMessage(messageLists.id)"
              v-show="deleteBoolean">
              删除
            </button>
        </div>
        </ul>
   </div>
</template>

<script>
import {
  fixStationMessage,
  deleteStationMessage,
  addStationMessage,
  fixSystemMessage,
  fixLogSingle,
  removeLogSingle,
  addLogSingle
} from '../service/index'
import RadioMenu from '../components/RadioMenu'
import {IpTest, NumberTest, IntNum, EmailTest, TelTest} from '../config/regTest'
import Alert from './Alert.vue'
import {mapState} from 'vuex'
export default {
  name: '',
  data () {
    return {
      showContent: false,
      selectVal: '',
      logselectLists: [
        {content: '男', selected: false},
        {content: '女', selected: false}
      ],
      earthselectLists: [
        {content: 0, selected: false},
        {content: 1, selected: false},
        {content: 2, selected: false}
      ],
      standby: []
    }
  },
  components: {RadioMenu, Alert},
  props: [
    'messageNames',
    'messageLists',
    'deleteBoolean',
    'componentName'
  ],
  computed: {
    ...mapState({
      IsshowTip: state => state.IsshowTip,
      isWarn: state => state.isWarn,
      isDelete: state => state.isDelete
    })
  },
  methods: {
    // 单选菜单
    Show () {
      this.showContent = !this.showContent
    },
    selectList (n, idx) {
    // 清空原始选项
      if (this.componentName === 'EarthQuakeShow') {
        this.earthselectLists.map((item, idx) => {
          item.selected = false
        })
      } else {
        this.logselectLists.map((item, idx) => {
          item.selected = false
        })
      }

      n.selected = true
      this.selectVal = n.content + ''
      this.showContent = false
    },
    // 表单验证
    Verify (n) {
      let str = this.$refs.inp[n].value
      // 验证失败 输入不消失
      for (let i = 0, len = this.messageNames.length; i < len; i++) {
        this.standby[i] = this.$refs.inp[i].value
      }
      if (this.componentName === 'EarthQuakeShow') {
        switch (n) {
          case 1:
            this.messageNames[n].errortext = IpTest(str) ? '' : '请输入正确的IP地址'
            break
          case 3:
            this.messageNames[n].errortext = NumberTest(str) ? '' : '请输入正确的数字格式'
            break
          case 4:
            this.messageNames[n].errortext = NumberTest(str) ? '' : '请输入正确的数字格式'
            break
          case 5:
            this.messageNames[n].errortext = NumberTest(str) ? '' : '请输入正确的数字格式'
            break
        }
      } else if (this.componentName === 'GeneralSettings') {
        switch (n) {
          case 0:
            this.messageNames[n].errortext = IntNum(str) ? '' : '请输入整数格式'
            break
          case 1:
            this.messageNames[n].errortext = IntNum(str) ? '' : '请输入整数格式'
            break
          case 2:
            this.messageNames[n].errortext = EmailTest(str) ? '' : '请输入正确的邮箱'
            break
          case 4:
            this.messageNames[n].errortext = TelTest(str) ? '' : '请输入正确的手机号'
            break
          case 5:
            this.messageNames[n].errortext = IntNum(str) ? '' : '请输入整数格式'
            break
          case 6:
            this.messageNames[n].errortext = IntNum(str) ? '' : '请输入整数格式'
            break
        }
      } else if (this.componentName === 'Log') {
        switch (n) {
          case 2:
            this.messageNames[n].errortext = TelTest(str) ? '' : '请输入正确的手机号'
            break
          case 3:
            this.messageNames[n].errortext = EmailTest(str) ? '' : '请输入正确的邮箱'
            break
        }
      }
    },
    // 台站编辑 数据修改 数据添加
    async earthQuakeRequest () {
      let fixStationData = {}
      this.messageNames.map((item, idx) => {
        let str = this.$refs.inp[idx].value
        fixStationData[item.englishName] =
        Number(str) === +str ? Number(str) : str
      })
      if (this.deleteBoolean) {
        fixStationData.id = this.messageLists.id
        await fixStationMessage(fixStationData)
      } else {
        await addStationMessage(fixStationData)
      }
    },
    // 系统短信/邮件报警设置 数据修改
    async generalSettingsRequest () {
      let fixSystemData = {id: this.messageLists.id}
      this.messageNames.map((item, idx) => {
        let str = this.$refs.inp[idx].value
        fixSystemData[item.englishName] =
        item.englishName === 'sendtell' ? str
          : (Number(str) === +str ? Number(str) : str)
      })
      await fixSystemMessage(fixSystemData)
    },
    // 维护配置 维修人员修改 数据修改 数据添加
    async LogRequest () {
      let fixLogData = {}
      this.messageNames.map((item, idx) => {
        let str = this.$refs.inp[idx].value
        fixLogData[item.englishName] =
        item.englishName === 'tell' ? str
          : (Number(str) === +str ? Number(str) : str)
      })
      if (this.deleteBoolean) {
        fixLogData.id = this.messageLists.id
        await fixLogSingle(fixLogData)
      } else {
        await addLogSingle(fixLogData)
      }
    },
    async SureMessage () {
      // 验证失败 取消保存
      let rulebreakArr = this.messageNames.filter((item, idx) => {
        return item.errortext
      })
      // 输入为空 取消保存
      let inpValArr = this.standby.filter((item) => {
        return item
      })
      if (rulebreakArr.length ||
      inpValArr.length !== this.messageNames.length) {
        this.$store.commit('SET_ALERT_STATUS', true)
        return
      }
      switch (this.componentName) {
        case 'EarthQuakeShow':
          await this.earthQuakeRequest()
          this.$store.dispatch('GET_STATION_DATA')
          break
        case 'GeneralSettings':
          this.generalSettingsRequest()
          break
        case 'Log':
          await this.LogRequest()
          this.$store.dispatch('GET_LOGALL_DATA')
          break
        default:
          break
      }
    },
    async DeleteMessage (id) {
      this.$store.commit('SET_WARN_STATUS', true)
      if (!this.isDelete) return
      switch (this.componentName) {
        case 'EarthQuakeShow':
          await deleteStationMessage(Number(id))
          this.$store.dispatch('GET_STATION_DATA')
          break
        case 'Log':
          await removeLogSingle(Number(id))
          this.$store.dispatch('GET_LOGALL_DATA')
          break
        default:
          break
      }
    }
  },
  mounted () {
    // 渲染页面 初始清空alert状态
    this.$store.commit('SET_ALERT_STATUS', false)
    if (this.componentName === 'EarthQuakeShow') {
      this.earthselectLists.map((item, idx) => {
        this.messageLists.status === item.content &&
        (item.selected = true)
      })
    }
  },
}
</script>
<style scoped lang="stylus" src="./inpComponent.styl"></style>
