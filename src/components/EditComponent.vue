<template>
   <div class="edit-inp">
     <InpComponent
      :messageNames="messagenames"
      :messageLists="messagelists"
      :componentName="'EarthQuakeShow'"
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
      messagelists: {},
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
          chineseName: '启用时间',
          englishName: 'ondate',
          suggesttext: '',
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
