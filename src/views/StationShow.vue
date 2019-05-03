<template>
  <div class="earchquakeshow">
    <div class="earchcontent">
      <div id="earth-map"></div>
      <div class="warn">
        <!-- muted的存在解决chorme浏览器的兼容 -->
        <audio loop id="bells" muted>
          <source src="../assets/new_warn.mp3" type="audio/mpeg">
          您的浏览器不支持播放音频
        </audio>
        <button class="switch"
        @click="Close"
        :disabled="!canClose"
        :class="switchColor?'close':'start'"
        >
          关闭警报
        </button>
      </div>
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
import china from '../config/china'
import {MapEchart} from '@/config/EchartJson.js'
import {fixWranStatus, getWranStatus} from '../service/index'
import EditComponent from '../components/EditComponent'
import AddComponent from '../components/AddComponent.vue'
import {mapState} from 'vuex'
export default {
  name: 'StationShow',
  data () {
    return {
      currentTab: 'EditComponent',
      // 提示音报警系统
      switchColor: false,
      switchBoolean: false,
      canClose: false,

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
      stationalData: state => state.stationall_data
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
    },
    Close () {
      this.switchColor = false
      this.switchBoolean = true
      let audio = document.getElementById('bells')
      audio.pause()
      fixWranStatus()
      this.canClose = false
    },
    async requestStatus () {
      let requestStatus = await getWranStatus()
      let audio = document.getElementById('bells')
      if (requestStatus === 0) {
        this.switchBoolean = true
        this.switchColor = false
        this.canClose = false
        audio.pause()
      } else {
        this.switchBoolean = false
        this.switchColor = true
        this.canClose = true
        audio.play()
      }
    }
  },
  watch: {
    stationalData: function (newval) {
      this.mapChart = echarts.init(document.getElementById('earth-map'))
      this.mapChart.setOption(MapEchart(newval), true)
      this.MapId = newval[0].id
      this.mapChart.on('click', (param) => {
        // 点不到ID时不发送请求
        param.data && (this.MapId = param.data.id)
      })

      // for 提高查询效率
      for (var i = 0, len = newval.length; i < len; i++) {
        if (newval[i].status === 2) break
      }
      this.canClose = i < len
      // 判断所有台站的状态 一个不正常则报警
      if (!this.switchBoolean && this.canClose) {
        this.switchColor = true
        let audio = document.getElementById('bells')
        audio.play()
      }
    }
  },
  async mounted () {
    this.$store.dispatch('GET_STATION_DATA')
    echarts.registerMap('china', china)
    // 进入页面每五分钟请求一次地图数据
    this.setIntervalFn()
    this.requestStatus()
    // 窗口变化 echarts响应
    window.addEventListener('resize', () => {
      this.mapChart.resize()
    })
  },
  async activated () {
    this.requestStatus()
  }
}

</script>
<style  scoped lang="stylus">
.earchquakeshow,.earchcontent
  width 100%
  height 93%

.earchcontent
  padding-top .4rem
  position relative

#earth-map
  width 60%

.stationMessage
   width 36%

#earth-map,.stationMessage
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

.warn
  position absolute
  top 0.42rem
  left .16rem

.switch
  width 1rem
  height 0.44rem
  border-radius 4px
  cursor pointer
  background-color #2e3751

.start
  background-color #2e3751

.close
  background-color #449DDA

</style>
