<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="修改项目信息"
    width="30%"
    center
  >
    <el-form :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.project_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目介绍">
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.brief_intro"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          style="background-color: white"
          >Cancel</el-button
        >
        <el-button type="primary" @click="submit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <div class="big">
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex; height: 80px">
            <h2 class="title">{{ projectinfo.project_name }}</h2>

            <nav class="nav-link">
              <router-link
                :to="{
                  name: 'projectInfo',
                  query: {
                    project_id: this.project_id,
                  },
                }"
                @click="tab = 'tab-0'"
                >概览</router-link
              >
              <router-link
                :to="{
                  name: 'projectFileInfo',
                  query: {
                    project_id: this.project_id,
                  },
                }"
                @click="tab = 'tab-1'"
                >文件</router-link
              >

              <router-link
                :to="{
                  name: 'projectFileBin',
                  query: {
                    project_id: this.project_id,
                  },
                }"
                @click="tab = 'tab-2'"
                >回收站</router-link
              >
              <!-- <router-link to="" @click="tab = 'tab-3'">迭代</router-link>
              <router-link to="" @click="tab = 'tab-4'">统计</router-link> -->

              <div class="animation" :class="tab"></div>
            </nav>
          </div>
          <div class="text-wrap">
            <div class="example">
              <div class="avatar-list avatar-list-stacked">
                <span
                  v-for="i in avatars.slice(0, 5)"
                  class="avatar cover-image brround"
                  :style="{ backgroundImage: `url(` + i + ')' }"
                >
                </span>
                <span
                  v-if="avatars.length > 5"
                  class="avatar cover-image brround"
                  >+{{ avatars.length - 5 }}</span
                >
              </div>
            </div>
          </div>
          <el-button
            type="primary"
            style="margin-right: 30px"
            v-if="tab == 'tab-0'"
            @click="dialogFormVisible = true"
            ><el-icon><Edit /></el-icon
          ></el-button>
          <el-button
            type="primary"
            style="margin-right: 30px"
            v-if="tab == 'tab-1'"
            ><el-icon><Sort /></el-icon
          ></el-button>
          <el-button
            type="primary"
            style="margin-right: 30px; visibility: hidden"
            v-if="tab == 'tab-2'"
            ><el-icon><Sort /></el-icon
          ></el-button>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, Edit, Plus, CaretBottom } from "@element-plus/icons-vue";
import UMLEditor from "@/components/rubbish/UMLEditor";
import CoEditor from "@/components/rubbish/CoEditor";
import {
  get_docfile,
  get_umlfile,
  del_uml,
  del_doc,
  updateprojectinfo,
  editteaminfo,
  getprojectinfo,
  getavatarchain,
} from "@/utils/api";
import AxureEditor from "@/components/rubbish/axureEditor";

export default {
  name: "projectDetail",
  components: { Edit, Sort },
  props: {},
  data() {
    return {
      gota: 0,
      avatars: [],
      projectinfo: {
        brief_intro: "",
        create_time: "",
        creator: "",
        project_name: "",
        team_name: "",
      },
      dialogFormVisible: false,
      project_id: "",
      tab: "tab-0",
      dialogFormVisible1: false,
      editing: 0,
      username: "",
      form: {
        project_name: "",
        brief_intro: "",

        project_id: this.project_id,
      },
    };
  },
  methods: {
    getprojectinfos() {
      getprojectinfo({ project_id: this.project_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.projectinfo.brief_intro = response.data.brief_intro;
          this.projectinfo.create_time = response.data.create_time;
          this.projectinfo.creator = response.data.creator;
          this.projectinfo.project_name = response.data.project_name;
          this.projectinfo.team_name = response.data.team_name;
          this.avatars = [];
          getavatarchain({ team_id: response.data.team_id }).then(
            (response) => {
              if (response.data.status_code == 1) {
                let lenn = response.data.ans_list.length;
                for (let j = 0; j < lenn; j++) {
                  this.avatars.push(response.data.ans_list[j].avatar);
                }
                console.log(this.avatars);
              } else ElMessage.error(response.data.message);
            }
          );
          this.form.brief_intro = this.projectinfo.brief_intro;
          this.form.project_name = this.projectinfo.project_name;
        } else ElMessage.error(response.data.message);
      });
    },

    submit() {
      this.form.project_id = this.project_id;
      updateprojectinfo(this.form).then((response) => {
        if (response.data.status_code == 1) {
          ElMessage({
            message: "修改成功",
            type: "success",
          });

          this.dialogFormVisible = false;
          this.$router.go(0);
        } else ElMessage.error(response.data.message);
      });
    },
  },
  watch: {
    $route(val) {
      console.log("route is watched", val);
      if (val.name === "projectInfo") {
        this.tab = "tab-0";
      }
      if ((val, name === "projectFileInfo")) {
        this.tab = "tab-1";
      }
    },
  },
  created() {
    console.log("route in projectDetail");
    //JSON.parse(Base64.decode(this.$route.query.project_id))
    if (this.$route.query.project_id) {
      this.project_id = this.$route.query.project_id;
      this.username = this.$store.state.username;
      this.form.project_id = this.project_id;
      // this.getprojectinfos();
    }

    console.log(this.project_id);
  },
  computed: {},
  mounted() {
    this.getprojectinfos();
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/projectDetail.scss";
.nav-link {
  a {
    color: black;
  }
}
::v-deep .el-dialog {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.905),
    rgba(255, 255, 255, 0.622)
  );
  backdrop-filter: blur(1rem);
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  font-weight: lighter;
  font-size: 23px;
  color: #26476d;
  overflow: hidden;
  .el-button {
    background-color: #26476d;
    border: none;
  }
}
::v-deep .el-dialog__header {
  margin-right: 0;
  color: white;
  background: linear-gradient(to right bottom, #26476def, #26476dc5);
}
</style>
