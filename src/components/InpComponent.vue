<template>
   <div class="inp">
        <Message v-show="componentName==='Protection'"></Message>
        <WarnTip v-show="isWarn"
        :deleteId="sendId"
        :currentComponent="componentName"></WarnTip>
        <Alert></Alert>
        <ul class="station-edit clearfix">
          <li v-for="(item,index) in messageNames" :key='index'>
            <span :class="componentName==='StationSettings'?
            'messagenametwo':'messagename'">
              {{item.chineseName}}
            </span>
            <div class="radio-menu"
            v-if="(index===1&&componentName==='Protection')
            ||(index===messageNames.length-1&&componentName==='StationShow')"
            >
              <div class="radio-inp">
                <input type="text" readonly="readonly"
                :value="selectVal||
                inpVal(componentName,messageLists[item.englishName])"
                ref="inp">
                <i class="iconfont icon-jiantouxia radio-icon"
                @click="Show"></i>
              </div>
              <ul class="radio-content" v-show="showContent">
                <li v-for="(list,idx) in
                (componentName==='StationShow'?
                earthselectLists:ProtectionselectLists)"
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
          <div class="notification"
          v-show="componentName==='Protection'&&deleteBoolean">
            <button @click="sendMessage(messageLists.id)">通知维修</button>
          </div>
          <div :class="componentName==='StationSettings'?
            'editbtntwo':'editbtn'">
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
  addStationMessage,
  fixSystemMessage,
  fixProtectionSingle,
  addProtectionSingle,
  sendProtectionSingle
} from '../service/index'
import RadioMenu from '../components/RadioMenu'
import {IpTest, NumberTest, IntNum, EmailTest, TelTest} from '../config/regTest'
import Alert from './Alert.vue'
import {mapState} from 'vuex'
import WarnTip from './WarnTip.vue'
import Message from './Message.vue'
export default {
  name: '',
  data () {
    return {
      showContent: false,
      selectVal: '',
      ProtectionselectLists: [
        {content: '男', selected: false},
        {content: '女', selected: false}
      ],
      earthselectLists: [
        {content: '连通', selected: false, id: 0},
        {content: '失连', selected: false, id: 2}
      ],
      standby: [],
      sendId: 0
    }
  },
  components: {RadioMenu, Alert, WarnTip, Message},
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
      isDelete: state => state.isDelete,
      messageShow: state => state.messageShow
    })
  },
  watch: {
    messageLists: function (newval) {
      this.componentName === 'StationShow' &&
      (this.selectVal = newval.status === 2 ? '失连' : '连通')
    },
    selectVal: function (newval) {
      this.componentName === 'StationShow'
        ? this.earthselectLists.map((item) => {
          item.selected = (item.content === newval)
        }) : this.ProtectionselectLists.map((item) => {
          item.selected = (item.content === newval)
        })
    }
  },
  methods: {
    // 单选菜单
    Show () {
      this.showContent = !this.showContent
    },
    selectList (n, idx) {
    // 清空原始选项
      if (this.componentName === 'StationShow') {
        this.earthselectLists.map((item, idx) => {
          item.selected = false
        })
      } else {
        this.ProtectionselectLists.map((item, idx) => {
          item.selected = false
        })
      }

      n.selected = true
      this.selectVal = n.content + ''
      this.showContent = false
    },
    // 保存当前input框的值
    SaveInpVal () {
      // 验证失败 输入不消失
      for (let i = 0, len = this.messageNames.length; i < len; i++) {
        this.standby[i] = this.$refs.inp[i].value
      }
    },
    // 表单验证
    Verify (n) {
      let str = this.$refs.inp[n].value
      this.SaveInpVal()
      if (this.componentName === 'StationShow') {
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
      } else if (this.componentName === 'StationSettings') {
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
      } else if (this.componentName === 'Protection') {
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
        if (idx !== (this.messageNames.length - 1)) {
          fixStationData[item.englishName] =
          Number(str) === +str ? Number(str) : str
        } else {
          fixStationData[item.englishName] = (this.selectVal === '连通' ? 0 : 2)
        }
      })
      if (this.deleteBoolean) {
        fixStationData.id = this.messageLists.id
        await fixStationMessage(fixStationData)
      } else {
        await addStationMessage(fixStationData)
      }
    },
    // 系统短信/邮件报警设置 数据修改
    async stationSettingsRequest () {
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
    async ProtectionRequest () {
      let fixProtectionData = {}
      this.messageNames.map((item, idx) => {
        let str = this.$refs.inp[idx].value
        fixProtectionData[item.englishName] =
        item.englishName === 'tell' ? str
          : (Number(str) === +str ? Number(str) : str)
      })
      if (this.deleteBoolean) {
        fixProtectionData.id = this.messageLists.id
        await fixProtectionSingle(fixProtectionData)
      } else {
        await addProtectionSingle(fixProtectionData)
      }
    },
    async SureMessage () {
      this.SaveInpVal()
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
        case 'StationShow':
          await this.earthQuakeRequest()
          this.$store.dispatch('GET_STATION_DATA')
          break
        case 'StationSettings':
          this.stationSettingsRequest()
          break
        case 'Protection':
          await this.ProtectionRequest()
          this.$store.dispatch('GET_PROTECTIONALL_DATA')
          break
        default:
          break
      }
    },
    async DeleteMessage (id) {
      this.$store.commit('SET_WARN_STATUS', true)
      this.sendId = id
    },
    // 维护配置 通知维修
    async sendMessage (id) {
      let requestStatus = await sendProtectionSingle(id)
      requestStatus === 200 && this.$store.commit('SET_MESSAGE_SHOW', true)
      setTimeout(() => {
        this.$store.commit('SET_MESSAGE_SHOW', false)
      }, 1000)
    },

    // 解决单选 返回值问题
    inpVal (name, backVal) {
      let Val = ''
      if (name === 'StationShow') {
        this.earthselectLists.map((item, idx) => {
          item.id === backVal &&
          (Val = item.content || '')
        })
      } else {
        Val = backVal || ''
      }
      return Val
    }
  },
  mounted () {
    // 渲染页面 初始清空alert状态
    this.$store.commit('SET_ALERT_STATUS', false)

    // 渲染页面 初始清空message状态
    this.$store.commit('SET_MESSAGE_SHOW', false)

    if (this.componentName === 'StationShow') {
      this.earthselectLists.map((item, idx) => {
        this.messageLists.status === item.content &&
        (item.selected = true)
      })
    }
  }
}
</script>
<style scoped lang="stylus" src="./inpComponent.styl"></style>
