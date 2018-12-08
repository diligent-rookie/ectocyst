<template>
   <div class="edit-inp">
     <InpComponent
      :messageNames="messagenames"
      :messageLists="messagelists"
      :componentName="'StationShow'"
      :deleteBoolean="true"
     ></InpComponent>
   </div>
</template>

<script>
import InpComponent from './InpComponent'
import {getStationID} from '../service/index'
export default {
  name: '',
  data () {
    return {
      messagelists: {
        adType: '',
        alias: '',
        altitude: '',
        ip: '',
        latitude: '',
        longitude: '',
        ondate: '',
        seismometerType: '',
        stationInfoId: '',
        stationName: '',
        status: ''
      },
      messagenames: [
        {
          chineseName: '台站名称',
          englishName: 'stationName',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '台站IP',
          englishName: 'ip',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '台站缩写',
          englishName: 'alias',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '台站纬度',
          englishName: 'latitude',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '台站经度',
          englishName: 'longitude',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '台站海拔',
          englishName: 'altitude',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '所处位置',
          englishName: 'province',
          suggesttext: '指省内省外',
          errortext: ''
        },
        {
          chineseName: '启用时间',
          englishName: 'ondate',
          suggesttext: '格式：2018-01-01 00:00:00',
          errortext: ''
        },
        {
          chineseName: '地震计类型',
          englishName: 'seismometerType',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '数采类型',
          englishName: 'adType',
          suggesttext: '',
          errortext: ''
        },
        {
          chineseName: '连通标识',
          englishName: 'status',
          suggesttext: '此项谨慎修改',
          errortext: ''
        }
      ]
    }
  },
  components: {InpComponent},
  props: ['idcontent'],
  methods: {
    async  requestStationIdData (idcontent) {
      let requestStationId = await getStationID(idcontent)
      this.messagelists = requestStationId
    },
  },
  watch: {
    idcontent: function (newvalue) {
      this.requestStationIdData(newvalue)
    }
  },
}
</script>

<style scoped lang="stylus">
</style>
