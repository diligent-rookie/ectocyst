<template>
  <div class="earchquakeshow">
    <div class="earchcontent">
      <div id="earth-map"></div>
      <div class="stationMessage"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import china from '../../public/json/china'
import {MapEchart} from '@/config/EchartJson.js'
import {getStationAll} from '../service/index'
export default {
  name: 'EarthQuakeShow',
  methods: {

  },
  async mounted () {
    let requestStationAll = await getStationAll()
    let mapChart = echarts.init(document.getElementById('earth-map'))
    echarts.registerMap('china', china)
    mapChart.setOption(MapEchart(requestStationAll), true)
  }
}

</script>
<style  scoped lang="stylus">
.earchquakeshow,.earchcontent
  width 100%
  height 93%

.earchcontent
  padding-top .4rem

#earth-map,.stationMessage
  width 48%
  height 100%
  margin 0 .15rem
  overflow hidden
  float left
  border 1px solid #24B7D2
</style>
