<template>
  <div id="fr-nav" class="d-flex" style="border: none">
    <div class="indent" @click="indentSignal">
      <i
          :class="{
          'bi-text-indent-right': !collapse,
          'bi-text-indent-left': collapse,
        }"
      />
    </div>
    <div class="search">
      <i class="bi-search" @click="browse" />
    </div>
    <div class="text">
      <input
          type="text"
          v-model="query"
          @keydown.enter="browse"
          placeholder="搜索..."
          style="background-color: rgba(255, 255, 255, 0.437)"
      />
    </div>
    <div class="end">
      <el-dropdown
          trigger="click"
          class="Notification"
          v-if="$store.state.token"
      >
        <div class="el-dropdown-link d-flex align-items-center">
          <el-badge
              :value="
              numoffollowers + numofcomments + numoflikes + numofsys === 0
                ? ''
                : numoffollowers + numofcomments + numoflikes + numofsys
            "
              class="item"
              type="danger"
          >
            <i class="bi-bell"></i>
          </el-badge>
        </div>

        <template #dropdown>
          <el-dropdown-menu style="width: 300px; margin: 0">
            <div
                class="dropdown-head"
                style="
                display: flex;
                flex-direction: row;
                justify-content: center;
              "
            >
              <!-- 你有{{
                numoffollowers + numofcomments + numoflikes + numofsys
              }}条未读消息 -->
            </div>

            <el-dropdown-item divided class="badgecontainer">
              <div class="badges">
                <el-badge
                    :value="numoffollowers === 0 ? '' : numoffollowers"
                    class="item"
                >
                  <el-button
                      :icon="User"
                      circle
                      size="large"
                      @click="gotoListFollow"
                  />
                  <span>新的粉丝</span>
                </el-badge>
                <el-badge
                    :value="numofcomments === 0 ? '' : numofcomments"
                    class="item"
                >
                  <el-button
                      :icon="ChatDotRound"
                      circle
                      size="large"
                      @click="gotoListComment"
                  />
                  <span>新的回复</span>
                </el-badge>
                <el-badge
                    :value="numoflikes === 0 ? '' : numoflikes"
                    class="item"
                >
                  <el-button
                      :icon="Star"
                      circle
                      size="large"
                      @click="gotoListLike"
                  />
                  <span>新的赞同</span>
                </el-badge>
                <el-badge :value="numofsys === 0 ? '' : numofsys" class="item">
                  <el-button
                      :icon="Service"
                      circle
                      size="large"
                      @click="gotoListSys"
                  />
                  <span>系统消息</span>
                </el-badge>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown
          :hide-on-click="false"
          trigger="click"
          class="justify-content-end"
      >
        <div class="el-dropdown-link d-flex align-items-center">
          {{ name }}
          <!-- {{YL}} -->
          <i class="bi-caret-down-fill" />
          <el-avatar :size="40">
            <!-- <img src="@/assets/img/head.jpg"> -->
            <img :src="head" />
            <!-- YL -->
          </el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu style="width: 160px">
            <el-dropdown-item
                :icon="User"
                v-if="$store.state.token"
                @click="checkInfo"
            >查看资料</el-dropdown-item
            >
            <el-dropdown-item
                :icon="User"
                v-if="$store.state.token"
                @click.native="changePassword"
            >修改密码</el-dropdown-item
            >
            <el-dropdown-item
                :icon="TurnOff"
                divided
                @click="logout"
                v-if="$store.state.token"
            >退出登录</el-dropdown-item
            >
            <el-dropdown-item
                :icon="TurnOff"
                divided
                @click="login"
                v-if="!$store.state.token"
            >登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Axios from "axios";
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBadge,
  ElMessage,
} from "element-plus";
import {
  Setting,
  User,
  TurnOff,
  Search,
  ChatDotRound,
  Star,
  Service,
} from "@element-plus/icons-vue";
</script>

<script>
import { changepassword, getuserinfo } from "@/utils/api";
import { ElMessage } from "element-plus";
import qs from "qs";
export default {
  name: "FrNav",
  props: {
    collapse: Boolean,
  },
  created() {
    this.updateinfo();
    console.log(this.head);
  },
  data() {
    return {
      numoffollowers: 0,
      numofcomments: 0,
      numoflikes: 0,
      numofsys: 0,
      query: "",
      token: "",
      name: "",
      head: "",
      textarea1: "",
    };
  },
  mounted() {
    this.updateinfo();
  },
  watch: {
    "$store.state.token"() {
      // console.log("changed!");
      this.updateinfo();
    },
  },
  updated() {},
  methods: {
    browse() {
      this.$router.push({
        path: "search",
        query: {
          q: this.query,
          mode: 1,
        },
      });
      // ???
    },
    updateinfo() {
      this.token = this.$store.state.token;
      if (!this.token) {
        this.head =
            "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/Transparent_Akkarin.jpg";
        this.name = "请登录";
      } else {
        console.log(this.$store.state.username, this.$store.state.token);
        getuserinfo({ username: this.$store.state.username }).then(
            (response) => {
              if (response.data.status_code == 1) {
                console.log(response.data);
                this.head = response.data.avatar;
              } else ElMessage.error(response.data.message);
            }
        );
        //this.head = this.userinfo.head;
        this.name = this.$store.state.username;
      }
      console.log(this.name);
    },
    indentSignal() {
      this.$emit("indent");
    },
    gotoListFollow() {
      this.$router.push({ name: "List" });
    },
    gotoListLike() {
      this.$router.push({ name: "ListLike" });
    },
    gotoListComment() {
      this.$router.push({ name: "ListCommit" });
    },
    gotoListSys() {
      this.$router.push({ name: "ListSys" });
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.commit("removeInfo");
      localStorage.clear();
    },
    checkInfo() {
      this.$router.push("/personalspace");
    },
    changePassword() {
      this.$router.push("/changepassword");
    },
  },
};
</script>

<style lang="scss" scoped>
#fr-nav {
  > * {
    width: 55px;
    height: 100%;
    flex: none;
    background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.737),
            rgba(255, 255, 255, 0.221)
    );
    box-shadow: 0px 15px 10px -15px rgba(221, 221, 221, 0.479);
    backdrop-filter: blur(2rem);
    > * {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .indent {
    background-color: rgba(255, 255, 255, 0.537);
    i {
      font-size: 20px;
    }
  }
  .text {
    width: 200px;
    input {
      width: 100%;
      padding: 10px 15px;
      border: none;
      outline-style: none;
    }
  }
  .end {
    flex: 1 1 0;
    display: flex;
    justify-content: flex-end;
    .el-dropdown-link {
      height: fit-content;
      margin-right: 20px;
      > i {
        margin: 0 10px;
      }
    }
  }
  .Notification {
    .Note :deep(el-dropdown-item) {
      background-color: #fd9f9f;
    }
  }
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.badgecontainer {
  width: 100%;
  height: 100%;
}
.badges {
  display: flex;
  align-items: center;
  justify-content: space-around;
  // background-color: #fd9f9f;
  width: 100%;
  height: 70px;
}
.item span {
  font-size: small;
  color: rgb(190, 190, 190);
}
</style>
