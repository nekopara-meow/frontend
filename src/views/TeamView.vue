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
          <el-button type="primary" @click="submit">Confirm</el-button>
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
          <el-skeleton
            v-for="i in [1, 2, 3, 4]"
            animated
            style="
              width: 170px;
              height: 280px;
              background: linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.2)
              );
              backdrop-filter: blur(1rem);
              margin: 0 50px 50px 0;
              box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
            "
            v-if="got != 3"
          >
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 170px; height: 170px"
              />
              <div style="padding: 14px">
                <el-skeleton-item variant="p" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <!-- <el-skeleton-item variant="text" style="width: 90%" /> -->
                </div>
              </div>
            </template>
          </el-skeleton>
          <el-empty
            description="空空如也"
            v-if="got == 3 && teamusercreat.length == 0"
            style="margin: 0 auto"
          />
          <el-dropdown
            trigger="contextmenu"
            v-for="(teamcreat, index) in teamusercreat"
          >
            <div class="oneteam">
              <div
                class="teamimage"
                :style="{
                  backgroundImage: `url(` + teamcreat.team_avatar + ')',
                }"
              ></div>
              <div
                class="oneteamdown"
                style="
                  height: 110px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                "
              >
                <div style="font-size: 18px">{{ teamcreat.team_name }}</div>
                <div>{{ teamcreat.brief_intro }}</div>

                <div class="text-wrap">
                  <div class="example">
                    <div class="avatar-list avatar-list-stacked">
                      <span
                        v-for="i in teamcreat.avatars.slice(0, 4)"
                        class="avatar cover-image brround"
                        :style="{ backgroundImage: `url(` + i + ')' }"
                      >
                      </span>
                      <span
                        v-if="teamcreat.avatars.length > 4"
                        class="avatar cover-image brround"
                        >+{{ teamcreat.avatars.length - 4 }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  @click.natice="
                    deleteTeam(teamcreat.team_id, teamcreat.team_name)
                  "
                  >解散团队</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div id="leftdown" v-if="tab == 'tab-1'">
          <el-skeleton
            v-for="i in [1, 2, 3, 4]"
            animated
            style="
              width: 170px;
              height: 280px;
              background: linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.2)
              );
              backdrop-filter: blur(1rem);
              margin: 0 50px 50px 0;
              box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
            "
            v-if="got != 3"
          >
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 170px; height: 170px"
              />
              <div style="padding: 14px">
                <el-skeleton-item variant="p" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <!-- <el-skeleton-item variant="text" style="width: 90%" /> -->
                </div>
              </div>
            </template>
          </el-skeleton>
          <el-empty
            description="空空如也"
            style="margin: 0 auto"
            v-if="got == 3 && teamuseradmin.length == 0"
          />
          <el-dropdown
            trigger="contextmenu"
            v-for="(teamcreat, index) in teamuseradmin"
          >
            <div class="oneteam">
              <div
                class="teamimage"
                :style="{
                  backgroundImage: `url(` + teamcreat.team_avatar + ')',
                }"
              ></div>
              <div
                class="oneteamdown"
                style="
                  height: 110px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                "
              >
                <div style="font-size: 18px">{{ teamcreat.team_name }}</div>
                <div>{{ teamcreat.brief_intro }}</div>

                <div class="text-wrap">
                  <div class="example">
                    <div class="avatar-list avatar-list-stacked">
                      <span
                        v-for="i in teamcreat.avatars.slice(0, 4)"
                        class="avatar cover-image brround"
                        :style="{ backgroundImage: `url(` + i + ')' }"
                      >
                      </span>
                      <span
                        v-if="teamcreat.avatars.length > 4"
                        class="avatar cover-image brround"
                        >+{{ teamcreat.avatars.length - 4 }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  @click.natice="
                    deleteTeam(teamcreat.team_id, teamcreat.team_name)
                  "
                  >解散团队</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div id="leftdown" v-if="tab == 'tab-2'">
          <el-skeleton
            v-for="i in [1, 2, 3, 4]"
            animated
            style="
              width: 170px;
              height: 280px;
              background: linear-gradient(
                to right bottom,
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.2)
              );
              backdrop-filter: blur(1rem);
              margin: 0 50px 50px 0;
              box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.664);
            "
            v-if="got != 3"
          >
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 170px; height: 170px"
              />
              <div style="padding: 14px">
                <el-skeleton-item variant="p" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <!-- <el-skeleton-item variant="text" style="width: 90%" /> -->
                </div>
              </div>
            </template>
          </el-skeleton>
          <el-empty
            description="空空如也"
            style="margin: 0 auto"
            v-if="got == 3 && teamuserin.length == 0"
          />
          <div
            v-if="got == 3 && teamusercreat.length != 0"
            class="oneteam"
            v-for="(teamin, index) in teamuserin"
            :key="index"
            @click="go(teamin.team_id)"
          >
            <div
              class="teamimage"
              :style="{ backgroundImage: `url(` + teamin.team_avatar + ')' }"
            ></div>
            <div
              class="oneteamdown"
              style="
                height: 110px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
              "
            >
              <div style="font-size: 18px">{{ teamin.team_name }}</div>
              <div>{{ teamin.brief_intro }}</div>
              <div class="text-wrap">
                <div class="example">
                  <div class="avatar-list avatar-list-stacked">
                    <span
                      v-for="i in teamin.avatars.slice(0, 4)"
                      class="avatar cover-image brround"
                      :style="{ backgroundImage: `url(` + i + ')' }"
                    >
                    </span>
                    <span
                      v-if="teamin.avatars.length > 4"
                      class="avatar cover-image brround"
                      >+{{ teamin.avatars.length - 4 }}</span
                    >
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
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { Filter, Sort, Plus, CaretBottom } from "@element-plus/icons-vue";
import {
  establishteam,
  getteamcreator,
  getteamuseradmin,
  getteamusercreat,
  getteamuserin,
  getuserinfo,
  getavatarchain,
  del_team,
} from "@/utils/api";
import Base64 from "@/utils/Base64";
export default {
  name: "teamview",
  components: { Filter, Sort, Plus, CaretBottom },
  created() {
    console.log("ceshi", localStorage.getItem("username"));
    this.initializationdata();
  },
  data() {
    return {
      menu_visible: false,
      got: 0,
      tab: "tab-0",
      dialogFormVisible: false,
      teamuserin: [],
      teamuseradmin: [],
      teamusercreat: [],
      createteamform: {
        team_name: "",
        brief_intro: "",
        username: this.$store.state.username,
      },
      formLabelWidth: "140px",
    };
  },
  methods: {
    deleteTeam(team_id, team_name) {
      let username = this.$store.state.username;
      ElMessageBox.confirm("确认解散团队：" + team_name, "解散团队警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        del_team({
          username: username,
          team_id: team_id,
        }).then((res) => {
          console.log(res.data);
          if (res.data.status_code == 1) {
            ElMessage.success("成功解散团队：" + team_name);
            this.$router.go(0);
          }
        });
      });
    },

    go(tid) {
      this.$router.push({
        path: "/teamdetail",
        query: {
          info: Base64.encode(
            JSON.stringify({
              team_id: tid,
            })
          ),
        },
      });
    },
    submit() {
      this.dialogFormVisible = false;
      establishteam(this.createteamform).then((response) => {
        if (response.data.status_code == 1) {
          this.initializationdata();
        } else ElMessage.error(response.data.message);
      });
    },
    initializationdata() {
      getteamuserin({ username: this.$store.state.username }).then(
        (response) => {
          this.got += 1;
          if (response.data.status_code == 1) {
            this.teamuserin = response.data.Dict.team_info;
            console.log(this.teamuserin);
            let len = this.teamuserin.length;
            let lenn = 0;
            for (let i = 0; i < len; i++) {
              this.teamuserin[i].avatars = [];
              getavatarchain({ team_id: this.teamuserin[i].team_id }).then(
                (response) => {
                  if (response.data.status_code == 1) {
                    console.log("chain");
                    console.log(response.data.ans_list);
                    lenn = response.data.ans_list.length;
                    for (let j = 0; j < lenn; j++) {
                      this.teamuserin[i].avatars.push(
                        response.data.ans_list[j].avatar
                      );
                    }
                  } else ElMessage.error(response.data.message);
                }
              );
            }
          }
        }
      );
      getteamuseradmin({ username: this.$store.state.username }).then(
        (response) => {
          this.got += 1;
          if (response.data.status_code == 1) {
            this.teamuseradmin = response.data.Dict.team_info;
            console.log(this.teamuseradmin);
            let len = this.teamuseradmin.length;
            let lenn = 0;
            for (let i = 0; i < len; i++) {
              this.teamuseradmin[i].avatars = [];
              getavatarchain({ team_id: this.teamuseradmin[i].team_id }).then(
                (response) => {
                  if (response.data.status_code == 1) {
                    console.log("chain");
                    console.log(response.data.ans_list);
                    lenn = response.data.ans_list.length;
                    for (let j = 0; j < lenn; j++) {
                      this.teamuseradmin[i].avatars.push(
                        response.data.ans_list[j].avatar
                      );
                    }
                  } else ElMessage.error(response.data.message);
                }
              );
            }
          }
        }
      );
      getteamusercreat({ username: this.$store.state.username }).then(
        (response) => {
          this.got += 1;
          if (response.data.status_code == 1) {
            this.teamusercreat = response.data.Dict.team_info;
            console.log(this.teamusercreat);
            let len = this.teamusercreat.length;
            let lenn = 0;
            for (let i = 0; i < len; i++) {
              this.teamusercreat[i].avatars = [];
              getavatarchain({ team_id: this.teamusercreat[i].team_id }).then(
                (response) => {
                  if (response.data.status_code == 1) {
                    console.log("chain");
                    console.log(response.data.ans_list);
                    lenn = response.data.ans_list.length;
                    for (let j = 0; j < lenn; j++) {
                      this.teamusercreat[i].avatars.push(
                        response.data.ans_list[j].avatar
                      );
                    }
                  } else ElMessage.error(response.data.message);
                }
              );
            }
          }
        }
      );
    },
  },
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
  overflow-x: auto;
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
  align-items: flex-start;
  justify-content: flex-start;
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
  overflow-y: auto;
  height: 60vh;
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
