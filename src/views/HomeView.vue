<template>
  <div id="home">
    <div id="container">
      <div id="intro">
        NEKOPARA创作平台<br /><span id="smallintro">智能互联 协同创作</span
        ><br />
        <div id="button" @click="go">
          <div id="createbutton">Get Started →</div>
        </div>
      </div>
      <div id="lottie" style="position: absolute"></div>
    </div>
    <div class="circle1 circle"></div>
    <div class="circle2 circle"></div>
    <div class="circle3 circle"></div>
    <div class="circle4 circle"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import lottie from "lottie-web";
import animationData from "../assets/img/图表.json";
export default {
  name: "HomeView",
  components: {
    lottie,
  },
  data() {
    return {
      dataJson: "../assets/img/沟通.json",
      anim: "", // lottie实例
    };
  },
  mounted() {
    this.svgFun();
  },
  methods: {
    svgFun() {
      let params = {
        container: document.getElementById("lottie"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
      let anim;
      anim = lottie.loadAnimation(params);
    },
  },
};
</script>
<style scoped>
.circle {
  background: transparent;
  background-image: linear-gradient(60deg, #e9fcf69d 0%, #f9f3ce58 100%);

  position: absolute;
  border-radius: 50%;
  z-index: 0;
}
.circle1 {
  height: 10rem;
  width: 10rem;
  top: 20%;
  right: 15%;
}
.circle2 {
  height: 10rem;
  width: 10rem;
  bottom: 5%;
  left: 10%;
}
.circle3 {
  height: 40rem;
  width: 40rem;
  bottom: -30%;
  right: -20%;
}
.circle4 {
  height: 20rem;
  width: 20rem;
  top: 20%;
  left: 15%;
}
#container {
  width: 80%;
  height: 80%;
  max-width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  backdrop-filter: blur(2rem);
  position: relative;
  border-radius: 1em;
}
#home {
  display: flex;
  align-items: center;
  justify-content: center;
}
#lottie {
  width: 300px;
  height: 300px;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: -1;
}
#intro {
  font-weight: 700;
  font-size: 70px;
  font-family: "思源黑体 CN";
  background-image: linear-gradient(90deg, #abecd6, #fbed96, #fbed96, #abecd6);
  background-size: 200%;
  animation: streamer 5s linear infinite;
  background-clip: text;
  color: transparent;
}
#smallintro {
  font-size: 40px;
}
#button {
  display: inline-block;
  background-image: linear-gradient(90deg, #abecd6, #fbed96, #fbed96, #abecd6);
  background-size: 200%;
  animation: streamer 5s linear infinite;
  backdrop-filter: blur(2rem);
  cursor: pointer;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 30px;
  box-shadow: 0px 15px 10px -15px lightgray;
}
#createbutton {
  line-height: 60px;
  font-size: 30px;
  color: white;
}
</style>
