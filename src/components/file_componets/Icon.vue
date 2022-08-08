<template>
  <div
      class="icon"
  >
    <img :src="require(`@/assets/icons/${name}.svg`)" :alt="`${name}`" />

  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  // created: function() {}
};
</script>

<style lang="scss" scoped></style>