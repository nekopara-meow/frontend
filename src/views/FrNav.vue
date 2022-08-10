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
          <el-badge :is-dot='flag' class="item" type="danger">
            <i class="bi-bell"></i>
          </el-badge>
        </div>

        <template #dropdown style="">
          <el-dropdown-menu style="width: 300px; margin: 0; padding: 0">
            <div
              class="infinite-list"
              infinite-scroll-distance="1"
              style="overflow: auto; overflow-x: hidden"
            >
              <div
                class="dongtai"
                v-for="(message, index) in personnalmsg"
                :key="index"
              >
                <img :src="message.avatar" />
                <div class="dongtairight bluelight">
                  <div>{{ message.sender }}</div>
                  <div style="font-size: 15px">{{ message.msg }}</div>
                  <div style="font-size: 13px">{{this.timestampFormat(new Date(message.send_time).valueOf() / 1000)  }}</div>
                </div>
                <div class="dongtairightright">
                  <el-button
                    v-if="message.message_type == 1"
                    type="success"
                    :icon="Check"
                    size="small"
                    circle
                    @click="accept(message.message_id)"
                  />
                  <el-button
                    type="info"
                    :icon="Close"
                    size="small"
                    circle
                    @click="deletemsg(message.message_id)"
                  />
                </div>
              </div>
            </div>
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
            <img :src="$store.state.head" />
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
import {
  agreeinvitation,
  changepassword,
  deletepersonalmsg,
  edituserinfo,
  getpersonalmsg,
  getuserinfo,
} from "@/utils/api";
import { ElMessage } from "element-plus";
import { Check, Close } from "@element-plus/icons-vue";
import Base64 from "@/utils/Base64";
import store from "@/store";
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
  },
  data() {
    return {
      flag:false,
      personnalmsg: [],
      //{message_id:1,msg:"邀请您",sender:"luanbu",message_type:2,avatar:"",team_id:13,send_time:""}
      query: "",
      token: "",
      name: "",
      //head: this.$store.state.head,
      textarea1: "",
    };
  },
  mounted() {
    this.updateinfo();
  },
  watch: {
    "$store.state.token"() {
      this.updateinfo();
    },
  },
  methods: {
    timestampFormat(timestamp) {
      function zeroize(num) {
        return (String(num).length == 1 ? "0" : "") + num;
      }

      var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
      var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

      var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
      var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(),
          m = tmDate.getMonth() + 1,
          d = tmDate.getDate();
      var H = tmDate.getHours(),
          i = tmDate.getMinutes(),
          s = tmDate.getSeconds();

      if (timestampDiff < 60) {
        // 一分钟以内
        return "刚刚";
      } else if (timestampDiff < 3600) {
        // 一小时前之内
        return Math.floor(timestampDiff / 60) + "分钟前";
      } else if (
          curDate.getFullYear() == Y &&
          curDate.getMonth() + 1 == m &&
          curDate.getDate() == d
      ) {
        return "今天" + zeroize(H) + ":" + zeroize(i);
      } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (
            newDate.getFullYear() == Y &&
            newDate.getMonth() + 1 == m &&
            newDate.getDate() == d
        ) {
          return "昨天" + zeroize(H) + ":" + zeroize(i);
        } else if (curDate.getFullYear() == Y) {
          return (
              zeroize(m) +
              "月" +
              zeroize(d) +
              "日 " +
              zeroize(H) +
              ":" +
              zeroize(i)
          );
        } else {
          return (
              Y +
              "年" +
              zeroize(m) +
              "月" +
              zeroize(d) +
              "日 " +
              zeroize(H) +
              ":" +
              zeroize(i)
          );
        }
      }
    },
    browse() {
      this.$router.push({
        path: "search",
        query: {
          keyword: this.query,
        },
      });
      this.query = "";
    },
    updateinfo() {
      this.token = this.$store.state.token;
      if (!this.token) {
        store.commit("setHead", "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/Transparent_Akkarin.jpg");
        /*this.head =
          "https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/yonghutouxiang/Transparent_Akkarin.jpg";*/
        this.name = "请登录";
      } else {
        this.updatepersonalmsg();
        getuserinfo({ username: this.$store.state.username }).then(
          (response) => {
            if (response.data.status_code == 1) {
              store.commit("setHead", response.data.avatar);
              /*this.head = response.data.avatar;*/
            } else ElMessage.error(response.data.message);
          }
        );
        //this.head = this.userinfo.head;
        this.name = this.$store.state.username;
      }
    },
    indentSignal() {
      this.$emit("indent");
    },
    updatepersonalmsg() {
      getpersonalmsg({ username: this.$store.state.username }).then(
        (response) => {
          if (response.data.status_code == 1) {
            this.personnalmsg = response.data.ans_list;
            if(this.personnalmsg.length>0)this.flag=true;
            else this.flag=false;
          }
        }
      );
    },
    /* gotoListFollow() {
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
    },*/
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.commit("removeInfo");
      this.$router.push("/login");
    },
    checkInfo() {
      this.$router.push({
        path: "/personalspace",
        query: {
          info: Base64.encode(
            JSON.stringify({
              username: this.$store.state.username,
              author: 1,
            })
          ),
        },
      });
      //this.$router.push("/personalspace");
    },
    changePassword() {
      this.$router.push("/changepassword");
    },
    accept(message_id) {
      //同意请求
      agreeinvitation({ message_id: message_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.updatepersonalmsg();
        } else ElMessage.error(response.data.msg);
      });
    },
    deletemsg(message_id) {
      //删除信息
      deletepersonalmsg({ message_id: message_id }).then((response) => {
        if (response.data.status_code == 1) {
          this.updatepersonalmsg();
        }
      });
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
