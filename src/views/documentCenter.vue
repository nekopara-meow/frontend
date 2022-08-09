<template>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <h2 class="title gradient">文档中心</h2>
          <div class="buttons">
            <el-dropdown style="margin-right: 30px">
              <el-button type="primary"
              ><el-icon><Sort /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>按项目分组</el-dropdown-item>
                  <el-dropdown-item>按格式分组</el-dropdown-item>
                  <el-dropdown-item>按时间分组</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <hr style="margin: 5px" />

        <div id="leftdown">
          <el-tabs tab-position="top">
            <el-tab-pane label="UML">
              <div class="fileDisplayer">
                <file-preview v-for="(tmp,index) in uml_file" :file_id="tmp.file_id" :update_time="tmp.update_time"
                              :file_type="tmp.file_type" :creator="tmp.creator" :file_name="tmp.file_name"
                              :file_content="tmp.file_content" :project_id="tmp.project_id" :key="index"></file-preview>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文档">
              <div class="fileDisplayer">
                <file-preview v-for="(tmp,index) in doc_file" :file_id="tmp.file_id"
                              :file_type="tmp.file_type" :creator="tmp.creator" :file_name="tmp.file_name" :update_time="tmp.update_time"
                              :file_content="tmp.file_content" :project_id="tmp.project_id" :key="index"></file-preview>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设计原型">
              <div class="fileDisplayer">
                <file-preview v-for="(tmp,index) in axure_file" :file_id="tmp.file_id"
                              :file_type="tmp.file_type" :creator="tmp.creator" :file_name="tmp.file_name" :update_time="tmp.update_time"
                              :file_content="tmp.file_content" :project_id="tmp.project_id" :key="index"></file-preview>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div id="right">
        <div id="rightup">
          <h4 class="title gradient" style="font-size: 30px">我参与的项目</h4>
          <div class="buttons">
            <el-dropdown style="margin-right: 30px">
              <el-button type="primary"
              ><el-icon><Sort /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>按项目分组</el-dropdown-item>
                  <el-dropdown-item>按格式分组</el-dropdown-item>
                  <el-dropdown-item>按时间分组</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <div id="rightdown">
          <pro-preview v-for="(tmp,index) in userProjects" :key="index" :focus_project_id="this.focus_project_id"
                       :team_name="tmp.team_name" :project_name="tmp.project_name" :project_id="tmp.project_id"
                       :brief_intro="tmp.brief_intro" @click="loadFiles(tmp.project_id)"></pro-preview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, CaretBottom } from "@element-plus/icons-vue";
import {reactive, toRefs} from "vue";
import router from "@/router";
import store from "@/store";
import ProPreview from "@/components/file_componets/proPreview";
import {get_docfile, get_umlfile,getProsByUser} from "@/utils/api";
import filePreview from "@/components/file_componets/filePreview";
export default {
  name: "documentCenter",
  components: {ProPreview, Filter, Sort, CaretBottom,filePreview },
  data(){
    return{
      userProjects:[
        {
          project_id:1,
          project_name:'项目名',
          brief_intro:'项目简介777777777777777777777777777777777777asdasd',
          team_name:'团队名',
        },
        {
          project_id:2,
          project_name:'项目名',
          brief_intro:'项目简介',
          team_name:'团队名',
        },
      ],
      username:'',
      uml_file:[],
      doc_file:[],
      axure_file:[],
      focus_project_id:''
    }
  },
  methods:{
    loadFiles(project_id){
      this.focus_project_id=project_id
      get_umlfile({
        username:this.username,
        project_id:this.project_id
      }).then(res=>{
        if(res.data.ans_list){
          this.uml_file.splice(0)
          let tmp
          for(tmp in res.data.ans_list){
            this.uml_file.push(tmp)
          }
          this.uml_file=res.data.ans_list
          console.log('uml_files',this.uml_file)
        }
        else console.log('请求uml文件失败')
      })
      get_docfile({
        username:this.username,
        project_id:this.project_id
      }).then(res=>{
        if(res.data.ans_list){
          this.doc_file.splice(0)
          let tmp
          for(tmp in res.data.ans_list){
            this.doc_file.push(tmp)
          }
          this.doc_file=res.data.ans_list
          console.log('doc_files',this.doc_file)
        }
        else console.log('请求doc文件失败')
      })
    }
  },
  mounted() {
    this.username=this.$store.state.username
    getProsByUser({
      username:this.username
    }).then(res=>{
      console.log('getProsByUser',res.data)
      if(res.data.projects){
        this.userProjects.concat(res.data.projects)
      }else console.log('fail!!')
    })
    if(this.userProjects[0].project_id!==null){
      this.loadFiles(this.userProjects[0].project_id)
    }

  }
};
</script>

<style lang="scss" scoped>
.big {
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
          to right bottom,
          rgba(255, 255, 255, 0.4),
          rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(1rem);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 90%;
  width: 85%;
}
#left {
  height: 100%;
  flex: 1 1 70%;
  padding: 10px;
}
#right {
  height: 100%;
  flex: 1 1 30%;
  min-width: 200px;
  padding: 10px;
}
.gradient {
  background-image: linear-gradient(90deg, #4facfe, #7bd4fe, #6acaf7, #4facfe);
  background-size: 200%;
  animation: streamer 5s linear infinite;
  -webkit-background-clip: text;
  color: transparent;
}
@keyframes streamer {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
.title {
  font-weight: 700;
  font-size: 50px;
  color: #26476d;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#leftup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 85px;
}
.buttons {
  margin-right: 0;
  .el-button {
    background-color: #26476d;
    border: none;
    :hover {
    }
  }
}
.onegroupup {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.onegroupdown {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
  padding: 15px;
}
.oneitem {
  width: 120px;
  height: 140px;
  margin-right: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: start;
  font-size: 15px;
  font-weight: lighter;
  img {
    width: 100px;
    margin-bottom: 5px;
  }
}
#leftdown {
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
}
#rightdown {
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
}
#rightup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 85px;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background-color: #26476d;
}
::v-deep .el-collapse-item__header {
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: lighter;
  color: #26476d;
}
::v-deep .el-collapse-item__wrap {
  background-color: transparent;
  border: none;
  display: flex;
}
::v-deep .el-collapse-item__content {
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.onediedai {
  background: linear-gradient(
          to right bottom,
          rgba(255, 255, 255, 0.4),
          rgba(255, 255, 255, 0.2)
  );
  width: 90%;
  height: 80px;
  margin: 0 auto;
  margin-bottom: 10px;
  backdrop-filter: blur(1rem);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);}
.easy{
  border-left: 10px solid rgba(144, 238, 144, 0.307);
}
.verybusy {
  border-left: 10px solid rgba(240, 128, 128, 0.259);
}
.busy {
  border-left: 10px solid rgba(233, 233, 133, 0.377);
}
.fileDisplayer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
