<template>
  <img alt="共享文档" :src="imgData" v-show="!this.isNew" class="fileicon"
       @click="this.$router.push({
       name: 'editor',
        params: {
         username: this.username,
         project_id:this.prject_id,
         doc_id:this.doc_id
       }})">
  <img alt="共享文档" :src="newImgData" v-show="this.isNew" class="fileicon"
       @click="newDoc">
</template>

<script>
import {create_doc} from "@/utils/api";
export default {
  /**
   * @description: 文档的缩略图，以后可以拓展，将图标显示为缩略图
   * @author: 罗亚硕
   * @date: 2022/8/5
   */
  name: "CoEditor",
  data(){
    return{
      imgData:'data:image/png;base64,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',
      newImgData:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA5xJREFUeF7tms9rE1EQx2c2FkuzsUXx0IOgKO2hl94ET/bUbFLBJq2mXvTmvYqCF+tJClrwL/Aiekh2o2ibiAeLiNSDB0FES0tFRUSxUpqIQvJGNm0xSW0zm+yWt8nLMft98+b72dl5b38gtPgPW9w/KACqAhwQiGdytwHoGAD2OBjGkGISgNKmod9jiF2VsC+BeDY/B0RHXZ29IhhaphGMl/8Vy+a7oSjOE0EqPRR648XcLACxzK9hBGF5kUBZzFnT0AcqAEyvTqCGVwHgnUBIpMP6a7dzYAEYyeYuEcGk25NXxdsOAADQgqZpieRg8JWbebAAxP6dCTfnro5VA4AtxyUQhTEz2vnSrUR8BqBk+xNqWiI12PHCDQh+BACI+EUUxZgVDT1rFIIvAayb/kZICSscetoIBD8DsH0vCwGJdFR/Ui8EvwMAQFgRUFois/VA8D+AkmvMoygmUtE9j5xCaBIAJdt/EPF0Khx84ARCMwGwK6EAQiTMaMjkQpAawMjj/BAJesg1s6EzDZ3lq3TxcILvzE6Q5k0j1FtxL5DNdyPBLQAa5eS5psGkaQRPcfUSAQAg0g5YkY7P3OTd0MkFAOCKZejX3TDGjSEVADvpIhWO3I90LXINNKqTDsBaY6KBlBGabdQcZ7yUANZ6GWRIwFcg+sgxUq4JBNruJMPtC5xx8gLgZL+NRqO2vmRk99taYZoWAAm6ZkVDEwpADQKqAmqViH3co53gdwCYWp9/HAD2c3LhaqS/BITY1ZuOts/bhoanf/doWuE91xxHJzuATU+A45mc/WjrOMccR6MASL4KqAqofg2mLoEm7QGlpQ6B5qobV/XNzkhmdVMDFIT9qMFZIOjnNL5yjRRNsHypc2qgXB/P5MjpeBkAbGp0Tk1s6OvZiMkAADQs7kuGO5frNW6PO5n+2RVob3sOAH1O4kgBAAjuagGcqved/vpTYfurkXNOzNtaOQBsnbXaB6h9QNX3QGoj1KQboa26QMv3gIolcjS7sldQ4IfTTr+dXvZVADaWSNuEKNI4IJxpLQBuuv1PLPkrQAHwloCqAMkfiXl7+n1wL6AAeE1A9QDVA9x8OzyTu4AIN7wuWzfjE8FFK6LfrBWT9Xa43u/1ak3u5XHU8ERqMFjz01kWADvReCa3BAAHvUzaxdgfTEM/xInHBmAHi83kJhExDkCHOcF3XoOLRGRaEf0yd25HALhB/aRTAPx0trzIteUr4C8eInFfvYkbxgAAAABJRU5ErkJggg=='
    }
  },
  props:{
    isNew:{
      type:Boolean,
      default:false,
    },
    username:String,
    doc_id:String,
    prject_id:String,
    doc_name:{
      type:String,
      default:'新文档',
    },
  },
  methods:{
    newDoc(){
      let pojo={
        username:this.username,
        project_id:this.project_id
      }
      create_doc(pojo).then(
          (res)=>{
            if(res.data.doc_id)
              this.doc_id=res.data.doc_id
            this.$router.push({
              name: 'editor',
              params: {
                username: this.username,
                project_id:this.prject_id,
                doc_id:this.doc_id,
                doc_name: this.doc_name,
              }})
          }
      )

    }
  }
}
</script>

<style lang="scss" scoped>

</style>