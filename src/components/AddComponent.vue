<template>
   <div class="edit-inp">
     <InpComponent
      :messageNames="messagenames"
      :messageLists="messagelists"
      :searchBoolean="false"
      :componentName="'EarthQuakeShow'"
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
          errortext: ''
        },
        {
          chineseName: '台站IP',
          englishName: 'ip',
          errortext: ''
        },
        {
          chineseName: '台站缩写',
          englishName: 'alias',
          errortext: ''
        },
        {
          chineseName: '台站纬度',
          englishName: 'latitude',
          errortext: ''
        },
        {
          chineseName: '台站经度',
          englishName: 'longitude',
          errortext: ''
        },
        {
          chineseName: '台站海拔',
          englishName: 'altitude',
          errortext: ''
        },
        {
          chineseName: '启用时间',
          englishName: 'ondate',
          errortext: ''
        },
        {
          chineseName: '地震计类型',
          englishName: 'seismometerType',
          errortext: ''
        },
        {
          chineseName: '数采类型',
          englishName: 'adType',
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
