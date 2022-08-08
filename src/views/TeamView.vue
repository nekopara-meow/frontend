<template>
  <div class="big">
    <el-dialog v-model="dialogFormVisible" title="创建团队" width="30%" center>
      <el-form :model="createteamform">
        <el-form-item label="团队名称">
          <el-input v-model="createteamform.team_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="团队介绍">
          <el-input
            type="textarea"
            :rows="3"
            v-model="createteamform.brief_intro"
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
          <el-button type="primary" @click="submit"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex">
            <h2 class="title gradient">我的团队</h2>
            <nav>
              <a
                @click="
                  () => {
                    this.tab = 'tab-0';
                  }
                "
                >我创建的</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-1';
                  }
                "
                >我管理的</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-2';
                  }
                "
                >我参与的</a
              >
              <div class="animation" :class="tab"></div>
            </nav>
          </div>

          <div class="buttons">
            <!-- <el-dropdown style="margin-right: 30px">
              <el-button type="primary"
                ><el-icon><Sort /></el-icon
              ></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                  <el-dropdown-item>按xx排序</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown> -->

            <el-button type="primary" @click="this.dialogFormVisible = true"
              ><el-icon><Plus /></el-icon
            ></el-button>
          </div>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />
        <div id="leftdown" v-if="tab == 'tab-0'">
          <div class="oneteam" v-for="(teamcreat,index) in teamusercreat" :key="index" @click="go(teamcreat.team_id)">
            <div
              class="teamimage"
              :style="{ backgroundImage: `url(` + teamcreat.team_avatar + ')' }"
            ></div>
            <div class="oneteamdown">
              <div style="font-size: 18px">{{teamcreat.team_name}}</div>
              <div>{{teamcreat.brief_intro}}</div>
              <div class="text-wrap">
                <div class="example">
                  <div class="avatar-list avatar-list-stacked">
                    <span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span class="avatar cover-image brround">+8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="leftdown" v-if="tab == 'tab-1'">
          <div class="oneteam" v-for="(teamadmin,index) in teamuseradmin" :key="index" @click="go(teamadmin.team_id)">
            <div
                class="teamimage"
                :style="{ backgroundImage: `url(` + teamadmin.team_avatar + ')' }"
            ></div>
            <div class="oneteamdown">
              <div style="font-size: 18px">{{teamadmin.team_name}}</div>
              <div>{{teamadmin.brief_intro}}</div>
              <div class="text-wrap" style="margin: 10px 0">
                 <div class="example">
                   <div class="avatar-list avatar-list-stacked">
                    <span
                        class="avatar cover-image brround"
                        style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span
                       class="avatar cover-image brround"
                       style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                   ></span
                   ><span
                       class="avatar cover-image brround"
                       style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                   ></span
                   ><span
                       class="avatar cover-image brround"
                       style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                   ></span
                   ><span
                       class="avatar cover-image brround"
                       style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                   ></span
                   ><span class="avatar cover-image brround">+8</span>
                   </div>
                 </div>
                </div>
            </div>
          </div>
        </div>
        <div id="leftdown" v-if="tab == 'tab-2'">
          <div class="oneteam" v-for="(teamin,index) in teamuserin" :key="index" @click="go(teamin.team_id)">
            <div
                class="teamimage"
                :style="{ backgroundImage: `url(` + teamin.team_avatar + ')' }"
            ></div>
            <div class="oneteamdown">
              <div style="font-size: 18px">{{teamin.team_name}}}</div>
              <div>{{teamin.brief_intro}}</div>
              <div class="text-wrap">
                <div class="example">
                  <div class="avatar-list avatar-list-stacked">
                    <span
                        class="avatar cover-image brround"
                        style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                    ></span
                    ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                  ></span
                  ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                  ></span
                  ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                  ></span
                  ><span
                      class="avatar cover-image brround"
                      style="
                        background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg);
                      "
                  ></span
                  ><span class="avatar cover-image brround">+8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import { Filter, Sort, Plus, CaretBottom } from "@element-plus/icons-vue";
import {
  establishteam,
  getteamcreator,
  getteamuseradmin,
  getteamusercreat,
  getteamuserin,
  getuserinfo
} from "@/utils/api";
import Base64 from "@/utils/Base64";
export default {
  name: "teamview",
  components: { Filter, Sort, Plus, CaretBottom },
  created() {
    console.log("ceshi",localStorage.getItem("username"))
    this.initializationdata()
  },
  data() {
    return {
      tab: "tab-0",
      dialogFormVisible: false,
      teamuserin:[],
      teamuseradmin:[],
      teamusercreat:[],
      createteamform: {
        team_name: "",
        brief_intro: "",
        username:this.$store.state.username
      },
      formLabelWidth: "140px",
    };
  },
  methods:{
    go(tid){
      this.$router.push({
        path:'/teamdetail',
        query:{
          info:Base64.encode(JSON.stringify({
            team_id:tid
          }))
        }

      })
    },
    submit()
    {
      this.dialogFormVisible = false
      establishteam(this.createteamform).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.initializationdata()
            } else ElMessage.error(response.data.message);
          }
      );

    },
    initializationdata()
    {
      getteamuserin({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.teamuserin = response.data.Dict.team_info;
            } else ElMessage.error(response.data.message);
          }
      );
      getteamuseradmin({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.teamuseradmin = response.data.Dict.team_info;
            } else ElMessage.error(response.data.message);
          }
      );
      getteamusercreat({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              this.teamusercreat = response.data.Dict.team_info;
            } else ElMessage.error(response.data.message);
          }
      );
    },

  }
};
</script>

<style lang="scss" scoped>
.oneteamdown {
  color: #26476d;
  width: 100%;
  overflow: hidden;
  padding: 14px;
  font-size: 10px;
  font-weight: lighter;
  text-overflow: ellipsis;
  white-space: nowrap;
  div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #26476d;
  }
}
.oneteam {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(1rem);
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
  width: 170px;
  height: 280px;
  margin-right: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: start;
  overflow: hidden;
  .teamimage {
    width: 100%;
    height: 170px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

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
  background-clip: text;
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
}
#leftdown {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
}
.buttons {
  margin-right: 50px;
  .el-button {
    background-color: #26476d;
    border: none;
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
    width: 64px;
    height: 64px;
    margin-bottom: 5px;
    object-fit: cover;
    border: 1px;
    border-color: #26476d;
    border-radius: 20%;
  }
}
#leftdown {
  overflow-y: scroll;
  height: 63vh;
  padding: 0 5px;
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

nav {
  position: relative;
  width: 300px;
  height: 50px;

  border-radius: 8px;
  transform: translate(0px, 24px);
  margin-left: 20px;
}

nav a {
  position: relative;
  display: block;
  float: left;
  font-size: 15px;
  line-height: 50px;
  width: 100px;
  height: 50px;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-weight: lighter;
  cursor: pointer;
  /* background-color: #00b894; */
  z-index: 10;
}

nav .animation {
  position: absolute;
  height: 100%;
  // background-color: #f97f51;
  z-index: 9;
  transition: all 0.3s;
  border-bottom: 5px solid #26476d;
}

.tab-0,
nav a:hover ~ .animation {
  width: 100px;
  left: 0px;
}
.tab-1,
nav a:nth-child(2):hover ~ .animation {
  width: 100px;
  left: 100px;
}
.tab-2,
nav a:nth-child(3):hover ~ .animation {
  width: 100px;
  left: 200px;
}

.avatar {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  display: inline-block;
  background: #26476d no-repeat center/cover;
  position: relative;
  text-align: center;
  color: #fff;
  font-weight: 600;
  vertical-align: bottom;
  font-size: 0.875rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.avatar i {
  font-size: 125%;
  vertical-align: sub;
}

.avatar-list {
  margin: 0 0 -0.5rem;
  padding: 0;
  font-size: 0;
}
.avatar-list .avatar {
  margin-bottom: 0.5rem;
}
.avatar-list .avatar:not(:last-child) {
  margin-right: 0.5rem;
}
.avatar-list-stacked .avatar {
  margin-right: -0.8em !important;
}
.avatar-list-stacked .avatar {
  box-shadow: 0 0 0 2px #fff;
}

.brround {
  border-radius: 50%;
}
.example {
  padding: 0;
  border: 1px solid rgba(167, 180, 201, 0.3);
  border-radius: 3px 3px 0 0;
  font-size: 0.9375rem;
  border: none;
}
.text-wrap {
  font-size: 14px;
  line-height: 1.66;
  margin-top: 3px;
  border: none;
}
.text-wrap > :first-child {
  margin-top: 0;
}
.text-wrap > :last-child {
  margin-bottom: 0;
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
