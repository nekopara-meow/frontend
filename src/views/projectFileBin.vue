<template>
  <div class="file-container">
    <el-tabs tab-position="left" class="file-tabs" type="card">
      <el-tab-pane label="UML文件">
        <div class="fileDisplayer">
          <!--          <file-preview :file_type="0" creator="罗亚硕" :file_id="1" ></file-preview>-->
          <file-preview
            v-for="(tmp, index) in uml_file"
            :file_id="tmp.file_id"
            :update_time="tmp.update_time"
            :file_type="tmp.file_type"
            :creator="tmp.creator"
            :file_name="tmp.file_name"
            :file_content="tmp.file_content"
            :project_id="tmp.project_id"
            :key="index"
          ></file-preview>
          <file-preview
            :file_type="0"
            :creator="this.username"
            :file_id="1"
            :is-new="true"
            :project_id="this.project_id"
          ></file-preview>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文档">
        <div class="fileDisplayer">
          <!--          <file-preview :file_type="1" creator="罗亚硕" :file_id="1"  :project_id="this.project_id"></file-preview>-->
          <!--          <file-preview :file_type="1" creator="罗亚硕" :file_id="1"  :project_id="this.project_id"></file-preview>-->
          <file-preview
            v-for="(tmp, index) in doc_file"
            :file_id="tmp.file_id"
            :file_type="tmp.file_type"
            :creator="tmp.creator"
            :file_name="tmp.file_name"
            :update_time="tmp.update_time"
            :file_content="tmp.file_content"
            :project_id="tmp.project_id"
            :key="index"
          ></file-preview>
          <file-preview
            :file_type="1"
            :creator="this.username"
            :file_id="this.project_id"
            :project_id="this.project_id"
            :is-new="true"
          ></file-preview>
        </div>
      </el-tab-pane>
      <el-tab-pane label="原型设计">
        <div class="fileDisplayer">
          <!--          <file-preview :file_type="2" creator="lalala" :file_id="1" username="蔡徐坤" :project_id="1"></file-preview>-->
          <file-preview
            v-for="(tmp, index) in axure_file"
            :file_id="tmp.file_id"
            :file_type="tmp.file_type"
            :creator="tmp.creator"
            :file_name="tmp.file_name"
            :update_time="tmp.update_time"
            :file_content="tmp.file_content"
            :project_id="tmp.project_id"
            :key="index"
          ></file-preview>
          <file-preview
            :file_type="2"
            creator="lalala"
            :file_id="1"
            username="蔡徐坤"
            :project_id="1"
            :is-new="true"
          ></file-preview>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AxureEditor from "@/components/rubbish/axureEditor";
import FilePreview from "@/components/file_componets/filePreview";
import { get_docfile, get_umlfile } from "@/utils/api";
export default {
  name: "projectFileInfo",
  components: { FilePreview, AxureEditor },
  data() {
    return {
      uml_file: [],
      doc_file: [],
      axure_file: [],
      project_id: "",
      username: "",
    };
  },
  mounted() {
    console.log("检查router", this.$route.params);
    this.username = this.$store.state.username;
    this.project_id = this.$route.params.project_id;
    get_umlfile({
      username: this.username,
      project_id: this.project_id,
    }).then((res) => {
      if (res.data.ans_list) {
        this.uml_file = res.data.ans_list;
        console.log("uml_files", this.uml_file);
      } else console.log("请求uml文件失败");
    });
    get_docfile({
      username: this.username,
      project_id: this.project_id,
    }).then((res) => {
      if (res.data.ans_list) {
        this.doc_file = res.data.ans_list;
        console.log("doc_files", this.doc_file);
      } else console.log("请求doc文件失败");
    });
    //请求axure
  },
};
</script>

<style lang="scss" scoped>
.file-container {
  height: 63vh;
  width: 100%;
  border: none;

  > .el-tabs {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  > .el-tab-pane {
    background: red;
  }
}
.fileDisplayer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
::v-deep .el-tabs--card > .el-tabs__header {
  border: none !important;

  * {
    border: none !important;
    font-weight: lighter;
    color: #26476d;
    font-size: 15px;
  }
}
$color-black: #26476d;
::v-deep .el-tabs__item {
  height: 60px;
  line-height: 60px;
  // border-radius: 10px;
  transition: 0.3s;
  border-right: 5px solid #26476d !important;
  &:hover {
    background-color: rgba($color-black, 0.05);
    transition: 0.3s;
    // border-right: 5px solid #26476d !important;
  }

  &.is-active {
    background-color: rgba($color-black, 0.1);
    transition: 0.3s;
    // border-right: 5px solid #26476d !important;
  }
}
</style>
