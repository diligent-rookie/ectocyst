<template>
   <div class="inp">
        <ul class="station-edit clearfix">
          <li v-for="(item,index) in messageNames" :key='index'>
            <span class="message-name">{{item.chineseName}}</span>
            <input type="text" class="message-number"
            :value="messageLists[item.englishName]||''"
            ref="inp">
            <span class="message-tip"
            >{{item.suggesttext}}</span>
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
  getStationAll,
  fixSystemMessage,
  fixLogSingle,
  getLogAll,
  removeLogSingle
} from '../service/index'
import echarts from 'echarts'
import {MapEchart} from '@/config/EchartJson.js'
export default {
  name: '',
  data () {
    return {}
  },
  components: {},
  props: [
    'messageNames',
    'messageLists',
    'deleteBoolean',
    'componentName'
  ],
  methods: {
    async requestMapData () {
      let requestStationAll = await getStationAll()
      let mapChart = echarts.init(document.getElementById('earth-map'))
      mapChart.setOption(MapEchart(requestStationAll), true)
    },
    // 台站编辑 数据修改
    async earthQuakeRequest () {
      let fixStationData = {id: this.messageLists.id}
      this.messageNames.map((item, idx) => {
        let str = this.$refs.inp[idx].value
        fixStationData[item.englishName] =
        Number(str) === +str ? Number(str) : str
      })
      this.searchBoolean
        ? await fixStationMessage(fixStationData)
        : await addStationMessage(fixStationData)
      this.requestMapData()
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
    // 维护配置 维修人员修改 数据修改
    async LogRequest () {
      let fixLogData = {id: this.messageLists.id}
      this.messageNames.map((item, idx) => {
        let str = this.$refs.inp[idx].value
        fixLogData[item.englishName] =
        item.englishName === 'tell' ? str
          : (Number(str) === +str ? Number(str) : str)
      })
      await fixLogSingle(fixLogData)
    },
    async SureMessage () {
      switch (this.componentName) {
        case 'EarthQuakeShow':
          this.earthQuakeRequest()
          break
        case 'GeneralSettings':
          this.generalSettingsRequest()
          break
        case 'Log':
          await this.LogRequest()
          await getLogAll()
          break
        default:
          break
      }
    },
    async DeleteMessage (id) {
      switch (this.componentName) {
        case 'EarthQuakeShow':
          await deleteStationMessage(Number(id))
          await this.requestMapData()
          break
        case 'Log':
          await removeLogSingle(Number(id))
          await getLogAll()
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.messageNames.map((item, idx) => {
      item === 'name' && console.log(this.messageLists[item.englishName])
    })
  },
}
</script>

<style scoped lang="stylus">
.search input
  width 2rem
  height .35rem
  text-align center
  line-height .35rem
  margin 0 .2rem 0 .5rem

.search input:focus
  border 1px solid #449DDA

.search button
  width 1rem
  height .35rem
  background-color #449DDA
  outline none
  border-radius 3px

.search button:active
  background-color #4C5979

.station-edit li
  width 6rem
  height .46rem
  padding .09rem 0
  margin 0 auto

.station-edit li .message-name
  display block
  float left
  width 1.5rem
  height .44rem
  line-height .44rem
  text-align left

.station-edit li .message-number
  display block
  float left
  width 2.4rem
  height .44rem
  line-height .44rem
  padding-left .1rem

.station-edit li .message-tip
  display block
  float left
  font-size .12rem
  color #ccc
  padding-left .05rem
  line-height .44rem

.edit-btn
  width 4rem
  margin-left 3.2rem
</style>
