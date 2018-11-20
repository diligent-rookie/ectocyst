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
      messagelists: {},
      messagenames: [
        {chineseName: '台站名称', englishName: 'stationName'},
        {chineseName: '台站IP', englishName: 'ip'},
        {chineseName: '台站缩写', englishName: 'alias'},
        {chineseName: '台站纬度', englishName: 'latitude'},
        {chineseName: '台站经度', englishName: 'longitude'},
        {chineseName: '台站海拔', englishName: 'altitude'},
        {chineseName: '启用时间', englishName: 'ondate'},
        {chineseName: '地震计类型', englishName: 'seismometerType'},
        {chineseName: '数采类型', englishName: 'adType'}
      ]
    }
  },
  components: {InpComponent}
}
</script>

<style scoped lang="stylus">
</style>
