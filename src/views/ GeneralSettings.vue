<template>
  <div class="generalSetting">
    <div class="generalSettingContent">
      <div id="computer"></div>
    </div>
  </div>
</template>
<script>
import VClork from '@/components/VClork'
import {LineEchart} from '@/config/EchartJson.js'
import {getLineData} from '../service/index'
import echarts from 'echarts'
export default {
  methods: {
    setInterFn () {
      setTimeout(async () => {
        let requestLineData = await getLineData(30, 10)
        this.lineChart.setOption(LineEchart(requestLineData), true)
        this.setInterFn()
      }, 30000)
    }
  },
  components: { VClork },
  async mounted () {
    // 画线
    this.lineChart = echarts.init(document.getElementById('computer'))
    let requestLineData = await getLineData(30, 10)
    this.lineChart.setOption(LineEchart(requestLineData), true)
    // 每30秒请求一次数据
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
  width 48%
  height 100%
  margin 0 .15rem
  overflow hidden
  float left
  border 1px solid #24B7D2
</style>
