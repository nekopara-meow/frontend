<template>
<div class="file-pre-container">
  <img :src="imgData" @click="openFile"/>
  <div>作者:{{this.creator}}</div>
  <div>上次修改时间</div>
  <el-dialog v-model="dialogFormVisible" :title="createFileTitle">
    <el-form :model="fileInitial">
      <el-form-item label="创建的文件名" label-width="140px">
        <el-input v-model="fileInitial.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false;this.fileInitial.name=null">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>
import {readURL} from "@/utils/ali_oss";
import {create_doc, create_uml} from "@/utils/api";

export default {
  name: "filePreview",
  data(){
    return{
      newFileImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA5xJREFUeF7tms9rE1EQx2c2FkuzsUXx0IOgKO2hl94ET/bUbFLBJq2mXvTmvYqCF+tJClrwL/Aiekh2o2ibiAeLiNSDB0FES0tFRUSxUpqIQvJGNm0xSW0zm+yWt8nLMft98+b72dl5b38gtPgPW9w/KACqAhwQiGdytwHoGAD2OBjGkGISgNKmod9jiF2VsC+BeDY/B0RHXZ29IhhaphGMl/8Vy+a7oSjOE0EqPRR648XcLACxzK9hBGF5kUBZzFnT0AcqAEyvTqCGVwHgnUBIpMP6a7dzYAEYyeYuEcGk25NXxdsOAADQgqZpieRg8JWbebAAxP6dCTfnro5VA4AtxyUQhTEz2vnSrUR8BqBk+xNqWiI12PHCDQh+BACI+EUUxZgVDT1rFIIvAayb/kZICSscetoIBD8DsH0vCwGJdFR/Ui8EvwMAQFgRUFois/VA8D+AkmvMoygmUtE9j5xCaBIAJdt/EPF0Khx84ARCMwGwK6EAQiTMaMjkQpAawMjj/BAJesg1s6EzDZ3lq3TxcILvzE6Q5k0j1FtxL5DNdyPBLQAa5eS5psGkaQRPcfUSAQAg0g5YkY7P3OTd0MkFAOCKZejX3TDGjSEVADvpIhWO3I90LXINNKqTDsBaY6KBlBGabdQcZ7yUANZ6GWRIwFcg+sgxUq4JBNruJMPtC5xx8gLgZL+NRqO2vmRk99taYZoWAAm6ZkVDEwpADQKqAmqViH3co53gdwCYWp9/HAD2c3LhaqS/BITY1ZuOts/bhoanf/doWuE91xxHJzuATU+A45mc/WjrOMccR6MASL4KqAqofg2mLoEm7QGlpQ6B5qobV/XNzkhmdVMDFIT9qMFZIOjnNL5yjRRNsHypc2qgXB/P5MjpeBkAbGp0Tk1s6OvZiMkAADQs7kuGO5frNW6PO5n+2RVob3sOAH1O4kgBAAjuagGcqved/vpTYfurkXNOzNtaOQBsnbXaB6h9QNX3QGoj1KQboa26QMv3gIolcjS7sldQ4IfTTr+dXvZVADaWSNuEKNI4IJxpLQBuuv1PLPkrQAHwloCqAMkfiXl7+n1wL6AAeE1A9QDVA9x8OzyTu4AIN7wuWzfjE8FFK6LfrBWT9Xa43u/1ak3u5XHU8ERqMFjz01kWADvReCa3BAAHvUzaxdgfTEM/xInHBmAHi83kJhExDkCHOcF3XoOLRGRaEf0yd25HALhB/aRTAPx0trzIteUr4C8eInFfvYkbxgAAAABJRU5ErkJggg==',
      umlFileImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABL5JREFUeF7tm2tsFFUUx//T7e52t0sBIy8hILVSxCAPCYogD/kglQRImhRIxIQofhCNCgkPAwEEDT5CSMCQEAIYA0GSVYzhEQJYwiuVpw+gkNryFCyFArvtzD6HnL273Wmzs87szO7MNnO/tb135p7fPed/zr23wyFNq9zXMgIF4mKI4lSA86Trm+2/3fI1VtdUlU7S+z2c3ANjxnM4AYguvV+ayfMuNTWgxFmsOwR5AAf8uyBiZiaTzcYYAkBNbwjyAPb7fEa7vRRkAoDeENIA8IvZWMlMnykFoCeEvAWgF4S8BqAHhLwHoBVCpwCgBUKnAZAphE4FIBMInQ6AWgh5A6D2/nVExajiMkJpxZg3AG75GvE40KIYgFJPyBsAQjiIhkf/QhTVFaj/5wl5A4BWlCA08Q/hD/K6hUNeAVDl/x06eys8KW21AMgeiOw3125Qy+rTWMsDrBCwNMASwVQ6YmWBbGWBKf3teG+Io+3xC07wuOFTXsvPG+LAm/3tsfH1j6NYdJLXlAgMyQKfDHNiXJ/C2MQvN0ewvEZQZASNobGJtqxGQG1zRNFYuU6GACgu5PDtWBd6uFik/VQfws6rwbSGlDg4bHjdhWI7G/N9bRC/XgtpMt7QOmBM70IsHJ5czc9PC/jzvvxqLhlZhFE9bTGDT94NY92FgGbjDQVAL5872IGpz7J4buRFfHC0NaVR0wba8U450410/TIhYkgISCe6dowLZV0LYr+qvh3Gxr/ar2w/TwHWj0teQ674XcDFB9riXvp+wwH0cRdgw/ikgev/COD4nXDbHL9+zYXSEgZod10Iu+vSa4VaLzAcAE1YmhrDUWDukVbwYRFvD3JgRikLEdIH0gm9mykAkFGLRhRhdC8mcheaIvD+E8LqV4piPxOMOYdS64NWIKYBQIZsn+yGJ57mHgZEdHOylKd33JtKA6STKe9mwxevslVPtGzEvWkB0MSqyhyoKmNxT2pPq5/NZqoQoHRIaVHafrgSxC8N2is+OYimArD1DTeo5KXWHBDRPa4Bnx7ncdOvfMOkxmNMA2D+UCcm9WUbpDONEexpCGFNPAvoXf2ZTgOk+4Ig1QGHWxCItNeDAzdC2HJJ3yKIQBjuAbQj3DTB3bYoa88JMQ9INPKCwd1ZffDN+QBq/ktWiWpc3bQasGp0EV58ihm493oI2y63X+WOgN6vbsUDQd01WDpQhnpA5XN2zH6e7fJI5EjsUrWJfQvx4VC2dT53L4Ivz+qXGg0DMOxpG5aPShY9S07xqHskr/QfveTEhGeYSO64GsTP9fqkRkMAuOMnQj3jJ0JKcr3TBmwc725LjStPC/g7zQGKUn0wBIB0NdW49MgeNnz2MvMaCpmlpwQIEW16kHMAFQPsePcFFveU8j4+1op7vHIj5pQ7MH0gK5V/ux3Gdx0OUJSufKJfTgF0LHXp9IdOgdQ26SnS5otBHLyZuR7kFIBaQ3PR3wJg3Q5bt8PW7XAqrbFuh+UUuNL6HyHrn6SUl225SOQa32HVAVYdYNUBausAc304qU0CRL+3oksXdXWAyT6d1QSAw4/eKZ5Z6gCY7OPpzAFwPESM9b5VfF4VAOpsps/n1QMQ/eC4vYhyX8kZT898AgSwel8holoSAAAAAElFTkSuQmCC',
      docFileImg:'data:image/png;base64,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',
      axureFileImg:'data:image/png;base64,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',
      umlData:null,
      dialogFormVisible:false,
      fileInitial:{
        name:null,
        type:null,
      }
    }
  },
  props:{
    isNew:{
      type:Boolean,
      default:false,
    },
    file_id:String,
    project_id:String,
    creator:String,
    file_content:String,
    file_type:Number,
    //0-UML,1-axure,2-doc
    username:String,//测试用
  },
  computed:{
    /**
     * @description: 出现错误就返回新建图片的标签
     * @author: 罗亚硕
     * @date: 2022/8/7
     */
    imgData(){
      if(this.file_type===null||this.isNew){
        return this.newFileImg
      }
      if(this.file_type===0){
        return this.umlFinalImg
      }
      else if(this.file_type===1){
        return this.axureFileImg
      }
      else if(this.file_type===2){

        return this.docFileImg
      }
      else {
        console.log('类型错误')
        return this.newFileImg
      }
    },
    /**
     * @description: 获得数据库中的uml文件数据
     * @author: 罗亚硕
     * @date: 2022/8/7
     */
    umlFinalImg(){
      if(!this.file_content){
        return this.umlFileImg
      }
      let url = this.file_content;
      readURL(url, (xmlData) => {
        this.umlData = xmlData;
      });
      console.log('后端收到初始化数据为')
      console.log(this.umlData)
      return this.umlData
    },
    createFileTitle(){
      switch (this.file_type){
        case 0:
          return '创建新的UML文件'
        case 1:
          return '创建新的Doc文件'
        case 2:
          return '创建新的设计原型'
        default:
          return '类型错误！'
      }
    }
  },
  methods:{
    openFile(){
      //打开老文件
      if(!this.isNew) {
        switch (this.file_type) {
          case 0:
            this.$router.push({
              name: 'UmlDrawer',
              params: {
                uml_url: this.file_content,
                uml_id: this.file_id,
              }
            })
            break
          case 1:
            this.$router.push({
              name: 'DocEditor',
              params: {
                doc_url: this.file_content,
                doc_id: this.file_id,
                username:this.username,
                project_id:this.project_id
              }
            })
            break
          case 2:
            this.$router.push({
              name: 'axure',
              params: {
                doc_url: this.file_content,
                doc_id: this.file_id,
              }
            })
            break
          default:
            console.log('文件类型错误')
        }
      }
      //创建文件
      console.log('创建新文件')
      this.dialogFormVisible=true
      if(this.fileInitial.name===null)
        return
      switch (this.file_type){
        case 0:
          create_uml({
            username:this.$store.state.username,
            prject_id:this.prject_id,
            uml_name:this.fileInitial.name,
          }).then((res)=>{
            if(!res.data.uml_id){
              this.$router.push({
                name:'UmlDrawer',
                params: {
                  uml_url: null,
                  uml_id: res.data.uml_id,
                }
              })
            }
            else console.log('创建uml失败')
          })
          break
        case 1:
          create_doc({
            username:this.$store.state.username,
            prject_id:this.prject_id,
            doc_name:this.fileInitial.name,
          }).then((res)=>{
            if(!res.data.uml_id){
              this.$router.push({
                name:'UmlDrawer',
                params: {
                  doc_url: null,
                  uml_id: res.data.doc_id,
                  username:this.username,
                  project_id:this.project_id
                }
              })
            }
            else console.log('创建doc失败')
          })
          break
        case 2:
          //还没写完
          this.$router.push({
            name:'axure',
            params:{
              doc_url:this.file_content,
              doc_id:this.file_id,
            }
          })
          break
        default:
          console.log('文件类型错误')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/projectDetail.scss";
.file-pre-container{
  margin: 1em;
  display: flex;
  height: 140px;
  width: 100px;
  align-items: center;
  flex-direction: column;
  img{
    height: 80px;
    width: 80px;
  }
  div{
    font-size: 14px;
    font-family: 黑体;
    text-align: center;
  }
}
</style>