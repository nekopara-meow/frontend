<template>
  <div id="fr-aside" :class="{ indent: collapse }">
    <header class="fr-back-color" :class="$store.getters.themeClass">
      <figure><img src="@/assets/img/logo-w.png" class="h-100" /></figure>
      <span>NEKOPARA</span>
    </header>

    <!-- <div class="Menu-head" v-show="!collapse">
   
      <span>Menu</span>
    </div> -->
    <div
      class="openBtn-open"
      :class="{ 'Btn-fold': collapse }"
      style="margin-top: 5em; padding-top: 0"
    >
      <div class="ww" @click="gotoHome">
        <el-icon :size="30">
          <HomeFilled />
        </el-icon>
        <span class="Sp">首页</span>
      </div>
      <router-link to="/" v-show="!collapse">
        <span>综合首页</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="Notebook"></el-button>-->
      <div class="ww" @click="gotoCourse">
        <el-icon :size="30">
          <Notebook />
        </el-icon>
        <span class="Sp">课程</span>
      </div>
      <router-link to="/course" v-show="!collapse">
        <span>课程推荐</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="EditPen"></el-button>-->
      <div class="ww" @click="gotoExercise">
        <el-icon :size="30">
          <EditPen />
        </el-icon>
        <span class="Sp">刷题</span>
      </div>
      <router-link to="/exercise" v-show="!collapse">
        <span>刷题之路</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="ColdDrink"></el-button>-->
      <div class="ww" @click="gotoCampus">
        <el-icon :size="30">
          <ColdDrink />
        </el-icon>
        <span class="Sp">周边</span>
      </div>
      <router-link to="/campus" v-show="!collapse">
        <span>云游校园</span>
      </router-link>
    </div>
    <div class="openBtn-open" :class="{ 'Btn-fold': collapse }">
      <!--<el-button type="" :icon="Menu"></el-button>-->
      <div class="ww" @click="gotoResourse">
        <el-icon :size="30">
          <Menu />
        </el-icon>
        <span class="Sp">资源</span>
      </div>
      <router-link to="/resourse" v-show="!collapse">
        <span>资源共享</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from "element-plus";
import {
  Compass,
  HomeFilled,
  Menu,
  Star,
  Notebook,
  EditPen,
  ColdDrink,
} from "@element-plus/icons-vue";
</script>

<script>
export default {
  name: "FrAside",
  props: { collapse: Boolean },
  data() {
    return {};
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: "Synthesis" });
    },
    gotoCourse() {
      this.$router.push({ name: "Course" });
    },
    gotoExercise() {
      this.$router.push({ name: "Exercise" });
    },
    gotoCampus() {
      this.$router.push({ name: "Campus" });
    },
    gotoResourse() {
      this.$router.push({ name: "Resourse" });
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
  box-shadow: 0px 15px 10px 3px rgba(221, 221, 221, 0.308);

  &.indent {
    width: 75px;
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
  justify-content: center;
  padding-left: 0px;

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

    // display: flex;
    //flex-direction: column;
    .el-icon {
      position: absolute;
    }
    .span {
      position: absolute;
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
  flex-direction: column;
  padding: 0;

  &:not(& + &) {
    padding-top: 10px;
  }
}
</style>
