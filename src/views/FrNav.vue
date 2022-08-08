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
          <el-badge is-dot class="item" type="danger">
            <i class="bi-bell"></i>
          </el-badge>
        </div>

        <template #dropdown style="">
          <el-dropdown-menu style="width: 300px; margin: 0; padding: 0">
            <div
              v-infinite-scroll="load"
              class="infinite-list"
              infinite-scroll-distance="1"
              style="overflow: auto; overflow-x: hidden"
            >
              <div class="dongtai" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]">
                <img
                  src="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/1654578546964_4f747bb0.jpg"
                />
                <div class="dongtairight bluelight">
                  <div>小七</div>
                  <div style="font-size: 15px">邀请了成员：吕双羽</div>
                  <div style="font-size: 13px">2022/8/5</div>
                </div>
                <div class="dongtairightright">
                  <el-button type="success" :icon="Check" size="small" circle />
                  <el-button type="info" :icon="Close" size="small" circle />
                </div>
              </div>
            </div>
            <!-- <el-dropdown-item divided class="badgecontainer">
            </el-dropdown-item> -->
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
  Close,
  Search,
  ChatDotRound,
  Star,
  Service,
} from "@element-plus/icons-vue";
</script>

<script>
import { changepassword, getuserinfo } from "@/utils/api";
import { ElMessage } from "element-plus";
import { Check } from "@element-plus/icons-vue";
import qs from "qs";
export default {
  name: "FrNav",
  components: {
    Check,
    Close,
  },
  props: {
    collapse: Boolean,
  },
  created() {
    this.updateinfo();
    console.log(this.head);
  },
  data() {
    return {
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

.item span {
  font-size: small;
  color: rgb(190, 190, 190);
}
.infinite-list {
  height: 300px;
  padding: 10px;
  margin: 0;
  list-style: none;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.185),
    rgba(255, 255, 255, 0.042)
  );
  backdrop-filter: blur(1rem);
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
::-webkit-scrollbar {
  width: 4px;
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 10px;
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
.dongtai {
  background-color: rgb(202, 229, 250);
  backdrop-filter: blur(1rem);
  width: 280px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px rgba(211, 211, 211, 0.392);
  display: flex;
  align-items: center;

  padding: 10px;
  margin-right: 60px;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0px 15px 10px -15px rgb(211, 211, 211);
    margin-right: 10px;
  }
}
.dongtairightright {
  flex: 1 1 50%;
}
.dongtairightright {
  flex: 1 1 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .el-button {
    margin: 3px 0;
  }
}
.bluelight {
  font-weight: lighter;
  font-size: 16px;
  color: #26476d;
}
</style>
