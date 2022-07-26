<template>
  <div class="about">
    <transition appear @before-enter="beforeEnter"
                @enter="enter" @after-enter="afterEnter">
      <h1>This is an about page</h1>
    </transition>
  </div>
</template>
<style scoped>
.about {
  color: red;
}
</style>

<script>
import gsap from 'gsap'

export default {
  setup() {
    const beforeEnter = (el) => {
      console.log('before-enter set initial state', el);
      el.style.transform = 'translateY(-60px)';
      el.style.opacity = 0;
    }
    const enter = (el, done) => {
      console.log('enter', el);
      gsap.to(el, {y: 0,
        opacity: 1,
        duration: 3,
        ease: 'bounce.out',
        onComplete: done});
    }
    const afterEnter = (el) => {
      console.log('after-enter', el);
    }
    return {beforeEnter, enter, afterEnter}
  }
}
</script>
