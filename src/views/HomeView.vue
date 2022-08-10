<template>
  <div id="home">
    <full-page :options="options" id="fullpage" ref="fullpage">
      <div class="section">
        <h3>Section 1</h3>
      </div>
      <div class="section">
        <div class="slide">
          <h3>Slide 2.1</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.2</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.3</h3>
        </div>
      </div>
      <div class="section">
        <h3>Section 3</h3>
      </div>
    </full-page>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      options: {
        licenseKey: "YOUR_KEY_HERE",
        parallax: true,
        scrollOverflow: true,
        scrollBar: false,

        navigation: true,

        sectionsColor: ["#41b883", "#ff5f45", "#0798ec"],
      },
    };
  },
  mounted() {
    // this.svgFun();
  },
  methods: {},
};
</script>
<style scoped>
#home {
  /* display: flex;
  align-items: center;
  justify-content: center;
  background-color: aqua; */
  width: 100%;
  height: 100%;
  overflow: hidden;
}
a {
  color: #42b983;
}
</style>
