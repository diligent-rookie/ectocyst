<template>
   <div class="edit-inp">
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
import {getLogID} from '../service/index'
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
  props: ['idLog'],
  components: {InpComponent},
  methods: {
    async requestLogId (id) {
      let requestLogIdData = await getLogID(id)
      this.singleLists = requestLogIdData
    }
  },
  watch: {
    idLog: function (newvalue) {
      this.requestLogId(newvalue)
    }
  },
}
</script>

<style scoped lang="stylus">
</style>
