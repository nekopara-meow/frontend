<template>
  <div id="fr-aside" :class="{ indent: collapse }">
    <header class="fr-back-color" :class="$store.getters.themeClass">
      <figure @click="$router.push({name:'home'})">
        <img src="@/assets/img/logo-w.png" class="h-100" alt="" />
      </figure>
      <span style="margin: 0; padding: 0">NEKOPARA</span>
    </header>

    <!-- <div class="Menu-head" v-show="!collapse">

      <span>Menu</span>
    </div> -->
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <div class="ww" @click="gotoWorkspace">
        <el-icon :size="30">
          <Menu />
        </el-icon>
        <span class="Sp">文档</span>
      </div>
      <router-link to="/documentCenter" v-show="!collapse">
        <span>文档中心</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="Notebook"></el-button>-->
      <div class="ww" @click="gotoRecent">
        <el-icon :size="30">
          <Notebook />
        </el-icon>
        <span class="Sp">最近</span>
      </div>
      <router-link to="/recent" v-show="!collapse">
        <span>最近打开</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="EditPen"></el-button>-->
      <div class="ww" @click="gotoTeam">
        <el-icon :size="30">
          <UserFilled />
        </el-icon>
        <span class="Sp">团队</span>
      </div>
      <router-link to="/team" v-show="!collapse">
        <span>团队管理</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="EditPen"></el-button>-->
      <div class="ww" @click="gotoTeam">
        <el-icon :size="30">
          <Calendar />
        </el-icon>
        <span class="Sp">日历</span>
      </div>
      <router-link to="/calendar" v-show="!collapse">
        <span>我的日历</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// import { ElButton } from "element-plus";
import { Menu, Notebook, UserFilled, Calendar } from "@element-plus/icons-vue";
</script>

<script>
export default {
  name: "FrAside",
  props: { collapse: Boolean },
  data() {
    return {};
  },
  methods: {
    gotoWorkspace() {
      this.$router.push({ name: "documentCenter" });
    },
    gotoRecent() {
      this.$router.push({ name: "recent" });
    },
    gotoTeam() {
      this.$router.push({ name: "team" });
    },
  },
};
</script>

<style lang="scss" scoped>
#fr-aside {
  width: 200px;

  background-color: #26476d;
  backdrop-filter: blur(1rem);
  border-bottom-right-radius: 3em;
  box-shadow: 0 15px 10px 3px rgba(221, 221, 221, 0.308);
  transition: 0.3s;
  &.indent {
    width: 75px;
    transition: 0.3s;
  }

  * {
    user-select: none;
  }

  > header {
    height: 4rem;
    overflow: hidden;

    > figure {
      height: 100%;
      width: 75px;
      display: inline-block;
      text-align: center;
    }

    > span {
      color: white;
      position: relative;
      top: 2px;

      font: {
        size: 20px;
        weight: 700;
      }

      padding-left: 10px;
      white-space: nowrap;
    }
  }
}

.Menu-head {
  height: 35px;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  span {
    font-weight: 700;
    padding-left: 15px;
  }
}
.openBtn-open:hover {
  background-image: linear-gradient(90deg, #4facfe, #7bd4fe, #6acaf7, #4facfe);

  background-size: 200%;

  a {
    color: white;
  }
}
.openBtn-open {
  height: 3.5rem;

  width: 100%;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 22px;
  a {
    text-decoration: none !important;
    // background-image: linear-gradient(
    //   90deg,
    //   #4facfe,
    //   #7bd4fe,
    //   #6acaf7,
    //   #4facfe
    // );
    // background-size: 200%;
    // background-clip: text;
    // color: transparent;
    color: white;
    font-weight: lighter;
    :hover {
      // padding-left: 10px;
      // font-size: 20px !important;
    }
    span {
      position: relative;
      left: 3em;
      font-weight: 500;
      font-size: medium;
    }
  }

  /*.el-button {
		font-size: 25px;
		color: white;
		background-color: transparent;
		border: none;
	}*/
  .ww {
    color: transparent !important;
    position: absolute;
    // display: flex;
    //flex-direction: column;
    .el-icon {
      position: absolute;
    }
    .span {
      position: absolute;
      margin-left: 3em;
    }
  }
  .ww:hover {
    color: white !important;
    .el-icon {
      display: none;
    }
  }
  .el-icon {
    color: white !important;
  }
  .el-icon:hover {
    /*color: transparent !important;*/
    display: none;
  }

  .Sp {
    position: relative;
    padding-top: 5px;
    padding-left: 0;
  }

  /*.el-button:hover {
        background: transparent !important;
        color: white !important;
        font-weight: bold;
        border-color: #01a8f9 !important;
    }*/
  span {
    font-size: 17px;
    font-weight: 700;
    padding-left: 17px;
  }
}

.Btn-fold {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 22px;

  &:not(& + &) {
    padding-top: 0px;
  }
}
</style>
