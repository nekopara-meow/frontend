<template>
  <div class="big">
    <div id="content">
      <h1 class="intro">恭喜你已经成功验证账号！</h1>
      <div
        class="intro"
        style="font-weight: lighter; font-size: 23px; color: #26476d"
      >
        三秒后自动跳转到首页噢
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirm",
  components: {},
};
</script>

<style scoped>
.big {
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro {
  font-weight: 700;
  font-size: 40px;
  font-family: "思源黑体 CN";
  background-image: linear-gradient(90deg, #4facfe, #7bd4fe, #6acaf7, #4facfe);
  background-size: 200%;
  animation: streamer 5s linear infinite;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
}
@keyframes streamer {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}

#content {
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  backdrop-filter: blur(2rem);
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 15px 10px -15px lightgray;
  height: 60%;
  width: 400px;
}
</style>
