<template>
  <div class="file-container">
    <el-tabs tab-position="left" class="file-tabs" type="card">
      <el-tab-pane label="User">
        <div class="fileDisplayer">
          <file-preview :file_type="0" creator="罗亚硕" :file_id="1" v-for="i in 20"></file-preview>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Config">
        <div class="fileDisplayer">
          <file-preview :file_type="1" creator="罗亚硕" :file_id="1" username="罗亚硕" :project_id="1"></file-preview>
          <file-preview :file_type="1" creator="lalala" :file_id="1" username="蔡徐坤" :project_id="1"></file-preview>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Role">
        <div class="fileDisplayer">
          <axure-editor v-for="i in 50"></axure-editor>
          <axure-editor is-new="true"></axure-editor>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AxureEditor from "@/components/rubbish/axureEditor";
import FilePreview from "@/components/file_componets/filePreview";
export default {
  name: "projectFileInfo",
  components: {FilePreview, AxureEditor}
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