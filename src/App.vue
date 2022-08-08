<template>
  <div id="App" class="row">
    <fr-aside @click="collapse = !collapse" :collapse="collapse" />
    <main>
      <fr-nav :collapse="collapse" @indent="collapse = !collapse" />
      <article :style="background" :class="{ indent: collapse }">
        <router-view />
      </article>
    </main>
  </div>
</template>

<script setup>
import FrNav from "./views/FrNav";
import FrAside from "./views/FrAside";
</script>

<script>
export default {
  data() {
    return {
      collapse: true,
    };
  },
  computed: {
   /* background() {
      return {
        background: `url("${this.$store.getters.backImg}") center / cover`,
      };
    },*/
  },
  mounted() {
    //初始化YDoc，建立webrtc链接
    this.$store.commit('initYDoc')
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是 hashchange事件
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      },
      false
    );
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息

    if (localStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},

          this.$store.state,

          JSON.parse(localStorage.getItem("store"))
        )
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里

    // beforeunload事件在页面刷新时先触发

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style lang="scss" scoped>
#App {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
  background-image: url(https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/bg.png);
  background-size: cover;
  background-position: center;
}
.row > * {
  padding: 0;
}
#fr-aside {
  flex: none;
}
main {
  flex: 1 1 0;
}
#fr-nav {
  height: 4rem;
  font-family: "Times New Roman", "simsun";
}
article {
  height: calc(100vh - 4rem);
  width: calc(100vw - 200px);
  &.indent {
    width: calc(100vw - 75px);
  }
  > * {
    height: 100%;
    overflow-y: auto;
    font-family: "cat";
  }
}
</style>
