<template>
<div>
  <img v-if="!isNew" alt="共享文档" src="@/assets/img/fileicons/chengxu.png"
       v-show="!this.isNew" class="fileicon"
       @click="this.$router.push ('axure')"

  >
  <img alt="共享文档" src="@/assets/img/fileicons/newfile.png"
       v-else class="fileicon"
       @click="this.$router.push ('axure')"
  >
</div>
</template>

<script>
export default {
  name: "axureEditor",
  props:{
    isNew:{
      type:Boolean,
      default:false,
    },
  },
}
</script>

<style scoped>

</style>