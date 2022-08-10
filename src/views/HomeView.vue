<template>
  <div class="shell">
    <div
      class="image"
      style="
        background-image: url('https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/bizhi/bg1.png');
      "
    ></div>
    <div class="heading" style="display: flex; flex-direction: column">
      <h1
        style="
          text-align: left;
          font-size: 50px;
          transform: translateY(-25vh) translateZ(1px);
        "
      >
        NEKOPARA Project
      </h1>
      <h2 style="font-size: 20px; transform: translateY(-29vh) translateZ(1px)">
        软工团队协作与管理平台
      </h2>
      <h2
        style="
          font-size: 15px;
          transform: translateY(-30vh) translateZ(1px);
          background-color: white;
          color: #26476d;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bolder;
          cursor: pointer;
        "
        @click="go"
      >
        开始使用
      </h2>
    </div>
    <div class="text">
      <h1>实用的团队管理 便捷的项目统筹</h1>
    </div>

    <div
      class="image"
      style="
        background-image: url('https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/bizhi/bg3.png');
      "
    ></div>
    <div class="heading" style="display: flex; flex-direction: column">
      <h1>我的团队</h1>
      <h1 style="font-size: 20px">不可能这么可爱</h1>
    </div>
    <div class="text">
      <h1>Doc, UML, 原型设计，样样出色</h1>
    </div>

    <div
      class="image"
      style="
        background-image: url('https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/bizhi/bg4.png');
      "
    ></div>
    <div class="heading" style="display: flex; flex-direction: column">
      <h1>动动手指</h1>
      <h1 style="font-size: 20px">协同编辑，触手可得</h1>
    </div>
    <div class="text">
      <h1>只为你更好的使用体验</h1>
    </div>

    <div
      class="image"
      style="
        background-image: url('https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/bizhi/bg1.png');
      "
    ></div>
    <div class="heading">
      <h1>Come on,programmer.</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {};
  },
  mounted() {
    // this.svgFun();
  },
  methods: {
    go() {
      this.$router.push("/documentCenter");
    },
  },
};
</script>
<style scoped>
h1 {
  font-weight: bolder;
}
.shell {
  height: calc(100vh - 72px);
  overflow-x: hidden;
  perspective: 3px;
}
.shell div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: 30px;

  letter-spacing: 2px;
}
.image {
  transform: translateZ(-1px) scale(1.6);
  background-size: cover;
  height: 100%;
  z-index: -1;
  height: calc(100vh - 72px);
  width: 100%;
  background-position: center;
}
.text {
  height: 50vh;
  background-color: white;
}
.text h1 {
  color: #000;
}
.heading {
  z-index: -1;
  transform: translateY(-30vh) translateZ(1px);
  color: #fff;
  font-size: 30px;
}
</style>
