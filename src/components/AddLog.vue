<template>
   <div class="add-inp">
    <InpComponent
      :messageNames="logNames"
      :messageLists="singleLists"
      :searchBoolean="false"
      :componentName="'Log'"
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
      singleLists: {},
      logNames: [
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
  components: {InpComponent}
}
</script>

<style scoped lang="stylus">
</style>
