<template>
  <div class="big">
    <el-drawer v-model="drawer">
      <template #title>
        <h4>排序与筛选</h4>
      </template>
      <template #default>
        <div style="display: flex; flex-direction: column; align-items: center">
          <el-select
            v-model="value"
            class="m-2"
            placeholder="请选择排序方式"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options0"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value1"
            multiple
            placeholder="请选择所属团队"
            style="width: 240px"
            size="large"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
    <div id="content">
      <div id="left">
        <div id="leftup">
          <div style="display: flex">
            <h2 class="title gradient" style="font-size: 20px">
              "猫猫"的搜索结果
            </h2>
            <nav>
              <a
                @click="
                  () => {
                    this.tab = 'tab-1';
                  }
                "
                >搜项目</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-2';
                  }
                "
                >搜文件</a
              >
              <a
                @click="
                  () => {
                    this.tab = 'tab-3';
                  }
                "
                >搜队友</a
              >
              <div class="animation" :class="tab"></div>
            </nav>
          </div>

          <div class="buttons">
            <!-- <el-button type="primary" @click=""
              ><el-icon><Sort /></el-icon
            ></el-button> -->
            <el-button
              type="primary"
              @click="
                () => {
                  this.drawer = true;
                }
              "
              ><el-icon><Filter /></el-icon
            ></el-button>
          </div>
        </div>

        <hr style="margin: 5px; margin-bottom: 20px" />

        <div id="leftdown" v-if="tab == 'tab-1'">
          <div
            class="oneteam"
            style="height: 120px; margin-bottom: 20px"
            v-for="i in [1, 2, 3, 4, 5]"
          >
            <div class="oneteamdown">
              <div style="font-size: 18px">我是一个小项目</div>
              <div>我是一个小猫猫我天天喵喵叫</div>
              <div style="margin-bottom: 0">创建日期：2022/8/8</div>
              <div>所属团队：nekopara</div>
            </div>
          </div>
        </div>
        <div id="leftdown" v-if="tab == 'tab-2'">
          <el-dropdown
            trigger="contextmenu"
            v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]"
          >
            <div class="oneitem">
              <img src="..\assets\img\fileicons\Word.png" />
              <div>少年阿宾.vue</div>
              <div style="font-size: smaller; margin-top: 2px">2022/8/3</div>
            </div>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="go(file.fid)"
                  >打开</el-dropdown-item
                >
                <el-dropdown-item>在新标签页中打开</el-dropdown-item>
                <el-dropdown-item>移出工作台</el-dropdown-item>
                <el-dropdown-item>历史版本</el-dropdown-item>
                <el-dropdown-item>属性</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div id="leftdown" v-if="tab == 'tab-3'">
          <div class="oneteam" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]">
            <div
              class="teamimage"
              :style="{
                backgroundImage:
                  `url(` +
                  'https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg' +
                  ')',
              }"
            ></div>
            <div class="oneteamdown">
              <div style="font-size: 18px">小七</div>
              <div>用户名：小猫</div>
              <div>3499475017@qq.com</div>
              <div>简介：啊啊哈啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
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
  getuserinfo,
} from "@/utils/api";
export default {
  name: "teamview",
  components: { Filter, Sort, Plus, CaretBottom },
  created() {
    this.initializationdata();
  },
  data() {
    return {
      value: "",
      value1: "",
      options1: [
        {
          value: "Option1",
          label: "小猫组织",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      options0: [
        {
          value: "Option1",
          label: "按xxx排序",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      drawer: false,
      tab: "tab-1",
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
    go(tid) {
      this.$router.push({
        path: "/teamdetail",
        query: {
          team_id: tid,
        },
      });
    },
    submit() {
      this.dialogFormVisible = false;
      console.log(this.createteamform);
      establishteam(this.createteamform).then((response) => {
        if (response.data.status_code == 1) {
          console.log(response.data);
          this.initializationdata();
        } else ElMessage.error(response.data.message);
      });
    },
    initializationdata() {
      getteamuserin({ username: this.$store.state.username }).then(
        (response) => {
          if (response.data.status_code == 1) {
            console.log("in", response.data);
            this.teamuserin = response.data.Dict.team_info;
          } else ElMessage.error(response.data.message);
        }
      );
      getteamuseradmin({ username: this.$store.state.username }).then(
        (response) => {
          if (response.data.status_code == 1) {
            console.log("admin", response.data);
            this.teamuseradmin = response.data.Dict.team_info;
          } else ElMessage.error(response.data.message);
        }
      );
      getteamusercreat({ username: this.$store.state.username }).then(
        (response) => {
          if (response.data.status_code == 1) {
            console.log("creat", response.data);
            this.teamusercreat = response.data.Dict.team_info;
          } else ElMessage.error(response.data.message);
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
  width: 280px;
  height: 50px;

  border-radius: 8px;
  //   transform: translate(0px, 24px);
  margin-left: 20px;
}

nav a {
  position: relative;
  display: block;
  float: left;
  font-size: 15px;
  line-height: 50px;
  width: 70px;
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

.tab-1,
nav a:hover ~ .animation {
  width: 70px;
  left: 0px;
}
.tab-2,
nav a:nth-child(2):hover ~ .animation {
  width: 70px;
  left: 70px;
}
.tab-3,
nav a:nth-child(3):hover ~ .animation {
  width: 70px;
  left: 140px;
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
