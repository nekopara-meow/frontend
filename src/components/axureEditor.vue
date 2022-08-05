<template>
  <img alt="共享文档" src="@/assets/img/fileicons/chengxu.png"
       v-show="!this.isNew" class="fileicon"
       @click="this.$router.push({
       name: 'axure',})"

  >
  <img alt="共享文档" src="@/assets/img/fileicons/newfile.png"
       v-show="this.isNew" class="fileicon"
       @click="this.$router.push({
       name: 'axure',
       })"
  >
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