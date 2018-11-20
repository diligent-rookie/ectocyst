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
// import {getStationAll} from '../service/index'
import EditComponent from '../components/EditComponent'
import AddComponent from '../components/AddComponent.vue'
import {mapState} from 'vuex'
export default {
  name: 'EarthQuakeShow',
  data () {
    return {
      currentTab: 'EditComponent',
      MapId: '',
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
    ...mapState({
      stationall_data: state => state.stationall_data
    }),
    componentId: function () {
      return this.currentTab
    }
  },
  methods: {
    setIntervalFn () {
      setTimeout(() => {
        this.$store.dispatch('GET_STATION_DATA')
        this.setIntervalFn()
      }, 300000)
    }
  },
  watch: {
    stationall_data: function (newval) {
      let mapChart = echarts.init(document.getElementById('earth-map'))
      mapChart.setOption(MapEchart(newval), true)
      this.MapId = newval[0].id
      mapChart.on('click', (param) => {
        this.MapId = param.data.id
      })
    }
  },
  async mounted () {
    this.$store.dispatch('GET_STATION_DATA')
    echarts.registerMap('china', china)
    // 进入页面每五分钟请求一次地图数据
    this.setIntervalFn()
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
