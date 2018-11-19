<template>
   <div class="add-inp">
    <InpComponent
      :messageNames="logNames"
      :messageLists="singleLists"
      :searchBoolean="false"
      :componentName="'Log'"
      :deleteBoolean="true"
    ></InpComponent>
   </div>
</template>

<script>
import InpComponent from './InpComponent'
// import {testMessageLists} from '../test/earchquake'
export default {
  name: '',
  data () {
    return {
      singleLists: {},
      logNames: [
        {chineseName: '姓名', englishName: 'name'},
        {chineseName: '性别', englishName: 'sex'},
        {chineseName: '电话', englishName: 'tell'},
        {chineseName: '邮箱', englishName: 'email'},
        {chineseName: '地址', englishName: 'address'}
      ],
    }
  },
  components: {InpComponent}
}
</script>

<style scoped lang="stylus">
</style>
