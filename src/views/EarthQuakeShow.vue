<template>
  <div class="earchquakeshow">
    <div class="earchcontent">
      <div id="earth-map"></div>
      <div class="stationMessage">
        <ul class="station-tab clearfix">
          <li v-for="(item,idx) in stationtabs" :key="idx"
          :class="['tab-button',{active:currentTab===item.id}]"
          @click.stop="currentTab=item.id"
          onselectstart="return false">
            {{item.name}}
          </li>
        </ul>
        <keep-alive>
          <component :is="componentId" class="tab-content"
          :idcontent="MapId"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import china from '../../public/json/china'
import {MapEchart} from '@/config/EchartJson.js'
import {getStationAll} from '../service/index'
import EditComponent from '../components/EditComponent'
import AddComponent from '../components/AddComponent.vue'
export default {
  name: 'EarthQuakeShow',
  data () {
    return {
      currentTab: 'EditComponent',
      MapId: 3,
      stationtabs: [
        {name: '台站编辑', id: 'EditComponent'},
        {name: '台站添加', id: 'AddComponent'}
      ]
    }
  },
  components: {
    EditComponent,
    AddComponent
  },
  computed: {
    componentId: function () {
      return this.currentTab
    }
  },
  async mounted () {
    let requestStationAll = await getStationAll()
    let mapChart = echarts.init(document.getElementById('earth-map'))
    echarts.registerMap('china', china)
    mapChart.setOption(MapEchart(requestStationAll), true)
    mapChart.on('click', (param) => {
      this.MapId = param.data.id
    })
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

.station-tab
  width 100%
  height .44rem
  margin-bottom .1rem

.station-tab .tab-button
  width 1rem
  text-align center
  line-height .44rem
  height 100%
  float left
  font-size .18rem
  cursor pointer

.station-tab .tab-button.active
  color  #449DDA

</style>
