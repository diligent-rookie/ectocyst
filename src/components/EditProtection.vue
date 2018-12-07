<template>
   <div class="edit-inp">
    <InpComponent
      :messageNames="ProtectionNames"
      :messageLists="singleLists"
      :searchBoolean="false"
      :componentName="'Protection'"
      :deleteBoolean="true"
    ></InpComponent>
   </div>
</template>

<script>
import InpComponent from './InpComponent'
import {getProtectionID} from '../service/index'
export default {
  name: '',
  data () {
    return {
      singleLists: {},
      ProtectionNames: [
        {
          chineseName: '姓名',
          englishName: 'name',
          errortext: ''
        },
        {
          chineseName: '性别',
          englishName: 'sex',
          errortext: ''
        },
        {
          chineseName: '电话',
          englishName: 'tell',
          errortext: ''
        },
        {
          chineseName: '邮箱',
          englishName: 'email',
          errortext: ''
        },
        {
          chineseName: '地址',
          englishName: 'address',
          errortext: ''
        }
      ],
    }
  },
  props: ['idProtection'],
  components: {InpComponent},
  methods: {
    async requestProtectionId (id) {
      let requestProtectionIdData = await getProtectionID(id)
      this.singleLists = requestProtectionIdData
    }
  },
  watch: {
    idProtection: function (newvalue) {
      this.requestProtectionId(newvalue)
    }
  },
}
</script>

<style scoped lang="stylus">
</style>
