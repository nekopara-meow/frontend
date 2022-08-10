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
                  <el-dropdown-item @click="sortByTime(1)">按修改时间升序</el-dropdown-item>
                  <el-dropdown-item @click="sortByTime(-1)">按修改时间降序</el-dropdown-item>
                  <el-dropdown-item @click="sortByFileName(1)">按文件名升序</el-dropdown-item>
                  <el-dropdown-item @click="sortByFileName(-1)">按文件名降序</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <hr style="margin: 5px" />

        <div id="leftdown">
          <el-tabs tab-position="top" v-model="active_tab">
            <el-tab-pane label="UML" name='0'>
              <div class="fileDisplayer">
                <el-skeleton :rows="5" animated v-if="got != 2" />
                <el-empty
                  description="空空如也"
                  v-if="got == 2 && uml_file.length == 0"
                  style="margin: 0 auto"
                />
                <file-preview
                  v-if="got == 2 && uml_file.length != 0"
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
              </div>
            </el-tab-pane>
            <el-tab-pane label="文档" name='1'>
              <div class="fileDisplayer">
                <el-skeleton :rows="5" animated v-if="got != 2" />
                <el-empty
                  description="空空如也"
                  v-if="got == 2 && doc_file.length == 0"
                  style="margin: 0 auto"
                />
                <file-preview
                  v-if="got == 2 && doc_file.length != 0"
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
              </div>
            </el-tab-pane>
            <el-tab-pane label="设计原型" name='2'>
              <div class="fileDisplayer">
                <el-empty
                  description="空空如也"
                  v-if="got == 2 && axure_file.length == 0"
                  style="margin: 0 auto"
                />
                <file-preview
                  v-if="got == 2 && axure_file.length != 0"
                  v-for="(tmp, index) in axure_file"
                  :file_id="tmp.file_id"
                  :file_type="tmp.file_type"
                  :creator="tmp.creator"
                  :file_name="tmp.file_name"
                  :update_time="tmp.update_time"
                  :file_content="tmp.file_content"
                  :project_id="tmp.project_id"
                  :name_url="tmp.name_url"
                  :key="index"
                ></file-preview>
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
                  <el-dropdown-item @click="userProjects.sort(function(a,b){return a.project_name.localeCompare(b.project_name)})"
                  >按项目名升序</el-dropdown-item>
                  <el-dropdown-item @click="userProjects.sort(function(a,b){return -1*a.project_name.localeCompare(b.project_name)})"
                  >按项目名降序
                  </el-dropdown-item>
                  <el-dropdown-item @click="userProjects.sort(function(a,b){return a.team_name.localeCompare(b.team_name)})"
                  >按团队名升序</el-dropdown-item>
                  <el-dropdown-item @click="userProjects.sort(function(a,b){return -1*a.team_name.localeCompare(b.team_name)})"
                  >按团队名降序</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <hr style="margin: 5px" />
        <div id="rightdown">
<!--          <pro-preview v-for="(tmp,index) in userProjects" :key="index" :focus_project_id="this.focus_project_id"-->
<!--                       :team_name="tmp.team_name" :project_name="tmp.project_name" :project_id="tmp.project_id"-->
<!--                       :brief_intro="tmp.brief_intro" @click="loadFiles(tmp.project_id)"></pro-preview>-->
          <el-skeleton :rows="5" animated v-if="got1 != 3" />
          <el-menu class="el-menu-vertical-demo" v-else>
            <el-sub-menu
              v-for="value in teamusercreat"
              :key="value.team_name"
              :index="value.team_name"
            >
              <template #title>
                <el-icon><User /></el-icon>
                <span>{{ value.team_name }}</span>
              </template>
              <el-menu-item
                class="menu-item"
                v-for="(v, i) in value.projectids"
                :key="v.project_name + i"
                :index="v.project_name"
                @click.native="sb(v.project_id)"
                ><el-icon><Notebook /></el-icon
                >{{ v.project_name }}</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu
              v-for="value in teamuseradmin"
              :key="value.team_name"
              :index="value.team_name"
            >
              <template #title>
                <el-icon><User /></el-icon>
                <span>{{ value.team_name }}</span>
              </template>
              <el-menu-item
                class="menu-item"
                v-for="(v, i) in value.projectids"
                :key="v.project_name + i"
                :index="v.project_name"
                @click.native="sb(v.project_id)"
                ><el-icon><Notebook /></el-icon
                >{{ v.project_name }}</el-menu-item
              >
            </el-sub-menu>

            <el-sub-menu
              v-for="value in teamuserin"
              :key="value.team_name"
              :index="value.team_name"
            >
              <template #title>
                <el-icon><User /></el-icon>
                <span>{{ value.team_name }}</span>
              </template>
              <el-menu-item
                class="menu-item"
                v-for="(v, i) in value.projectids"
                :key="v.project_name + i"
                :index="v.project_name"
                @click.native="sb(v.project_id)"
                ><el-icon><Notebook /></el-icon
                >{{ v.project_name }}</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import {
  Filter,
  Sort,
  CaretBottom,
  User,
  Notebook,
} from "@element-plus/icons-vue";
import { reactive, toRefs } from "vue";
import router from "@/router";
import store from "@/store";
import ProPreview from "@/components/file_componets/proPreview";
import {get_axurefile, get_docfile, get_umlfile, getProsByUser} from "@/utils/api";
import {
  getteamuseradmin,
  getteamusercreat,
  getteamuserin,
  getteamprojectbyid,
} from "@/utils/api";
import filePreview from "@/components/file_componets/filePreview";
export default {
  name: "documentCenter",
  components: {
    ProPreview,
    Filter,
    Sort,
    CaretBottom,
    filePreview,
    User,
    Notebook,
  },
  data() {
    return {
      got: 0,
      got1: 0,
      teamuserin: [],
      teamuseradmin: [],
      teamusercreat: [],
      userProjects: [
        {
          project_id: 1,
          project_name: "项目名",
          brief_intro: "项目简介777777777777777777777777777777777777asdasd",
          team_name: "团队名",
        },
      ],
      username:'',
      uml_file:[],
      doc_file:[],
      axure_file:[],
      focus_project_id:'',
      active_tab:'0',
    }
  },
  computed: {
    modDate() {
      // if (this.isNew) return "";
      // let date = new Date(this.update_time);
      // return date.toLocaleDateString();
      if (this.update_time != undefined) {
        console.log(this.update_time);
        return (
            "修改于:" +
            this.timestampFormat(new Date(this.update_time).valueOf() / 1000)
        );
      }
    },
  },
  methods:{
    /**
     * @description: 按时间排序，asc=1:升序,asc=-1,降序
     * @author: 罗亚硕
     * @date: 2022/8/9
     */
    sortByTime(asc){
      switch (this.active_tab){
        case '0':
          this.uml_file.sort(function(a, b) {
            return b.update_time < a.update_time ? asc : (asc*-1)
          })
          break
        case '1':
          this.doc_file.sort(function(a, b) {
            return b.update_time < a.update_time ? asc : (asc*-1)
          })
          break
        case '2':
          this.axure_file.sort(function(a, b) {
            return b.update_time < a.update_time ? asc : (asc*-1)
          })
          break

        default:
          console.log('tab error')
      }
    },
    sortByFileName(asc){
      switch (this.active_tab){
        case '0':
          this.uml_file.sort(function(a, b) {
            return b.file_name < a.file_name ? asc : (asc*-1)
          })
          break
        case '1':
          this.doc_file.sort(function(a, b) {
            return b.file_name < a.file_name ? asc : (asc*-1)
          })
          break
        case '2':
          this.axure_file.sort(function(a, b) {
            return b.file_name < a.file_name ? asc : (asc*-1)
          })
          break

        default:
          console.log('tab error')
      }
    },
    sb(id) {
      console.log("我是傻逼");
      console.log(id);
      this.got = 0;
      this.loadFiles(id);
    },
    initializationdata() {
      let teamid = 0;
      let len = 0,
          len1 = 0;
      let i = 0,
          j = 0;
      var that;
      getteamusercreat({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.teamusercreat = response.data.Dict.team_info;
              len = this.teamusercreat.length;
              for (let i = 0; i < len; i++) {
                teamid = this.teamusercreat[i].team_id;
                getteamprojectbyid({
                  team_id: this.teamusercreat[i].team_id,
                }).then((response) => {
                  if (response.data.status_code == 1) {
                    this.teamusercreat[i].projectids = response.data.ans_list;
                  } else ElMessage.error(response.data.message);
                });
              }
              this.got1 += 1;
            } else ElMessage.error(response.data.message);
          }
      );
      getteamuseradmin({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.teamuseradmin = response.data.Dict.team_info;
              len = this.teamuseradmin.length;
              for (let i = 0; i < len; i++) {
                teamid = this.teamuseradmin[i].team_id;
                getteamprojectbyid({
                  team_id: this.teamuseradmin[i].team_id,
                }).then((response) => {
                  if (response.data.status_code == 1) {
                    this.teamuseradmin[i].projectids = response.data.ans_list;
                  } else ElMessage.error(response.data.message);
                });
              }
              this.got1 += 1;
            } else ElMessage.error(response.data.message);
          }
      );
      getteamuserin({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.teamuserin = response.data.Dict.team_info;
              len = this.teamuserin.length;
              for (let i = 0; i < len; i++) {
                teamid = this.teamuserin[i].team_id;
                getteamprojectbyid({
                  team_id: this.teamuserin[i].team_id,
                }).then((response) => {
                  if (response.data.status_code == 1) {
                    this.teamuserin[i].projectids = response.data.ans_list;
                    console.log(this.teamuserin);
                    console.log(this.teamuseradmin);
                    console.log(this.teamusercreat);
                  } else ElMessage.error(response.data.message);
                });
              }
              this.got1 += 1;
            } else ElMessage.error(response.data.message);
          }
      );
      // getteamuseradmin({ username: this.$store.state.username }).then(
      //   (response) => {
      //     if (response.data.status_code == 1) {
      //       this.teamuseradmin = response.data.Dict.team_info;
      //     } else ElMessage.error(response.data.message);
      //   }
      // );
      // getteamusercreat({ username: this.$store.state.username }).then(
      //   (response) => {
      //     if (response.data.status_code == 1) {
      //       this.teamusercreat = response.data.Dict.team_info;
      //     } else ElMessage.error(response.data.message);
      //   }
      // );
    },
    loadFiles(project_id){
      this.focus_project_id=project_id
      get_umlfile({
        username:this.username,
        project_id:project_id
      }).then(res=>{
        if(res.data.ans_list){
          this.uml_file.splice(0)
          let tmp
          for(tmp in res.data.ans_list){
            this.uml_file.push(tmp)
          }
          this.got += 1;
          console.log('uml_files',this.uml_file)
        }
        else console.log('请求uml文件失败')
      })
      get_docfile({
        username:this.username,
        project_id:project_id
      }).then(res=>{
        if(res.data.ans_list){
          console.log('res',res.data)
          this.doc_file.splice(0)
          let tmp
          for(tmp in res.data.ans_list){
            this.doc_file.push(tmp)
          }
          this.got += 1;
          console.log('doc_files',this.doc_file)
        }
        else console.log('请求doc文件失败')
      })
      //请求axure
      get_axurefile({
        username:this.username,
        project_id:project_id
      }).then(res=>{
        if(res.data.ans_list){
          this.axure_file.splice(0)
          let tmp
          for(tmp in res.data.ans_list){
            this.axure_file.push(tmp)
          }
          this.got += 1;
          console.log('axure_files',this.axure_file)
        }else console.log("请求axure文件失败")
      })
    }
  },
  mounted() {
    this.initializationdata();
    console.log('检查query',this.$route)
    if(this.$route.query.active_tab!=null){
      this.active_tab=''+this.$route.query.active_tab
    }else{
      this.active_tab='0'
    }
    console.log('active_tab',this.active_tab)

  },
  created() {
    this.username=this.$store.state.username
    getProsByUser({
      username:this.username
    }).then(res=>{
      if(res.data.projects){
        let l=this.userProjects.length
        for(let i=0;i<l;i++){
          this.userProjects.pop()
        }
        console.log('pros',res.data.projects[0])
        l=res.data.projects.length
        for(let i=0;i<l;i++){
          this.userProjects.push(res.data.projects[i])
        }
        console.log('userPro',this.userProjects)
        if(this.userProjects[0].project_id!==null){
          this.loadFiles(this.userProjects[0].project_id)
        }
      }else console.log('fail!!')
    })


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
}
#right {
  height: 100%;
  flex: 1 1 30%;
  min-width: 200px;
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
  overflow-y: auto;
  height: 60vh;
  padding: 0 5px;
}
#rightdown {
  overflow-y: auto;
  height: 60vh;
  padding: 0;
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
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
}
.easy {
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
::v-deep .el-menu {
  background-color: transparent;
}
</style>
