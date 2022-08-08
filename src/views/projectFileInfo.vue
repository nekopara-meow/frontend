<template>
  <div class="file-container">
    <el-tabs tab-position="left" class="file-tabs" type="card">
      <el-tab-pane label="UML文件">
        <div class="fileDisplayer">
          <file-preview :file_type="0" creator="罗亚硕" :file_id="1" ></file-preview>
          <file-preview v-for="(tmp,index) in uml_file" :file_id="tmp.file_id"
                        :file_type="tmp.file_type" :creator="tmp.creator"
                        :file_content="tmp.file_content" :project_id="tmp.project_id"></file-preview>
          <file-preview :file_type="0" :creator="this.username" :file_id="1" is-new="true" :project_id="this.project_id"></file-preview>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文档">
        <div class="fileDisplayer">
          <file-preview :file_type="1" creator="罗亚硕" :file_id="1"  :project_id="this.project_id"></file-preview>
          <file-preview :file_type="1" creator="罗亚硕" :file_id="1"  :project_id="this.project_id"></file-preview>
          <file-preview v-for="(tmp,index) in doc_file" :file_id="tmp.file_id"
                        :file_type="tmp.file_type" :creator="tmp.creator"
                        :file_content="tmp.file_content" :project_id="tmp.project_id"></file-preview>
          <file-preview :file_type="1" :creator="this.username" :file_id="this.project_id"
                        username="蔡徐坤" :project_id="this.project_id" is-new="true"></file-preview>
        </div>
      </el-tab-pane>
      <el-tab-pane label="原型设计">
        <div class="fileDisplayer">
          <file-preview :file_type="2" creator="lalala" :file_id="1" username="蔡徐坤" :project_id="1"></file-preview>
          <file-preview v-for="(tmp,index) in axure_file" :file_id="tmp.file_id"
                        :file_type="tmp.file_type" :creator="tmp.creator"
                        :file_content="tmp.file_content" :project_id="tmp.project_id"></file-preview>
          <file-preview :file_type="2" creator="lalala" :file_id="1" username="蔡徐坤" :project_id="1" is-new="true"></file-preview>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AxureEditor from "@/components/rubbish/axureEditor";
import FilePreview from "@/components/file_componets/filePreview";
import {get_docfile, get_umlfile} from "@/utils/api";
export default {
  name: "projectFileInfo",
  components: {FilePreview, AxureEditor},
  data(){
    return{
      uml_file:[],
      doc_file:[],
      axure_file:[],
      project_id:'',
      username:'',
    }
  },
  mounted() {
    this.username=this.$store.state.username
    console.log(this.username)
    // this.project_id=this.$route.params.project_id
    this.project_id=3
    get_umlfile({
      username:this.username,
      project_id:this.project_id
    }).then(res=>{
      if(res.data.ans_list){
        this.uml_file=res.data.ans_list
      }
      else console.log('请求uml文件失败')
    })
    get_docfile({
      username:this.username,
      project_id:this.project_id
    }).then(res=>{
      if(res.data.ans_list){
        this.uml_file=res.data.ans_list
      }
      else console.log('请求doc文件失败')
    })
    //请求axure

  }
}
</script>

<style lang="scss" scoped>
.file-container{
  height: 100%;
  width: 100%;

  > .el-tabs{
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  > .el-tab-pane{
    background: red;
  }
}
.fileDisplayer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>