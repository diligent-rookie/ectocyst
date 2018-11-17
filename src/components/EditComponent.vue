<template>
   <div class="edit-inp">
     <InpComponent
      :messageNames="messagenames"
      :messageLists="messagelists"
      :searchBoolean="true"
     ></InpComponent>
   </div>
</template>

<script>
import InpComponent from './InpComponent'
import {testMessageLists} from '../test/earchquake'
export default {
  name: '',
  data () {
    return {
      messagelists: testMessageLists,
      messagenames: [
        '台站ID',
        '台站名称',
        '台站IP',
        '台站缩写',
        '台站纬度',
        '台站经度',
        '台站海拔',
        '启用时间',
        '地震计类型',
        '数采类型',
        '连通标识'
      ]
    }
  },
  components: {InpComponent}
}
</script>

<style scoped lang="stylus">
</style>
