<template>
  <div class="generalSetting">
    <div class="generalSettingContent">
      <div class="system-inp">
        <h4>系统配置</h4>
        <InpComponent
          :messageNames="messagenames"
          :messageLists="messagelists"
          :searchBoolean="true"
          :deleteBoolean="false"
          :componentName="'GeneralSettings'"
        >
        </InpComponent>
      </div>
      <div id="computer"></div>
    </div>
  </div>
</template>
<script>
import {LineEchart} from '@/config/EchartJson.js'
import {getLineData, getSystemID} from '../service/index'
import echarts from 'echarts'
import InpComponent from '../components/InpComponent'
export default {
  data () {
    return {
      messagenames: [
        {
          chineseName: '报警间隔时间',
          englishName: 'intervalAlarm',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '引发报警异常数',
          englishName: 'countAlarm',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '报警邮箱',
          englishName: 'sendmail',
          suggesttext: '建议使用163邮箱',
          errortext: ''
        },
        {
          chineseName: '报警邮箱授权码',
          englishName: 'sendmailAuthorization',
          suggesttext: '注意不是邮箱密码',
          errortext: ''
        },
        {
          chineseName: '报警手机号',
          englishName: 'sendtell',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '总日志行数限制',
          englishName: 'loggerCount',
          suggesttext: '单位为行',
          errortext: ''
        },
        {
          chineseName: '总日志存活时间',
          englishName: 'loggerDay',
          suggesttext: '单位为天',
          errortext: ''
        }
      ],
      messagelists: {}
    }
  },
  components: {
    InpComponent
  },
  methods: {
    async drawLine () {
      let requestLineData = await getLineData(30, 10)
      this.lineChart.setOption(LineEchart(requestLineData), true)
    },
    setInterFn () {
      setTimeout(async () => {
        this.drawLine()
        this.setInterFn()
      }, 30000)
    },
    async  requestSystemIdData () {
      let requestSystemId = await getSystemID()
      this.messagelists = requestSystemId
    },
  },
  mounted () {
    // 画线
    this.lineChart = echarts.init(document.getElementById('computer'))
    this.drawLine()
    // 每30秒请求一次数据
    this.setInterFn()

    // 初次请求默认ID系统报警数据
    this.requestSystemIdData()
  },
  watch: {
    idcontent: function (newvalue) {
      this.requestSystemIdData(newvalue)
    }
  }
}
</script>
<style scoped lang="stylus">
.generalSetting,.generalSettingContent
  width 100%
  height 93%

.generalSettingContent
  padding-top .4rem

#computer
  width 36%

.system-inp
  width 60%

#computer,.system-inp
  height 100%
  margin 0 .15rem
  overflow hidden
  float left
  border 1px solid #24B7D2

.system-inp h4
  width 100%
  height .44rem
  line-height .44rem
  padding-left .2rem
  margin-bottom .5rem
  background-color #449DDA
  font-weight normal
  font-size .18rem
</style>
