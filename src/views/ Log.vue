<template>
   <div class="log">
     <div class="log-content">
        <ul class="all-log">

        </ul>
      </div>
     </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Log',
  data () {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="stylus">
.log,.log-content
  width 100%
  height 93%

.log-content
  padding-top .4rem

.all-log
  width 48%
  height 100%
  margin 0 .15rem
  overflow-y auto
  float left
  border 1px solid #24B7D2
</style>
