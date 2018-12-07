<template>
   <div class="edit-inp">
     <InpComponent
      :messageNames="messagenames"
      :messageLists="messagelists"
      :searchBoolean="false"
      :componentName="'StationShow'"
      :deleteBoolean="false"
     ></InpComponent>
   </div>
</template>

<script>
import InpComponent from './InpComponent'
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
        }
      ]
    }
  },
  components: {InpComponent}
}
</script>

<style scoped lang="stylus">
</style>
