<template>
  <div class="fr-both">
    <div id="content">
      <div id="left">
        <slot name="left"></slot>
      </div>
      <div id="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	name: "FrBoth",
};
</script>
<style lang="scss" scoped>
.fr-both {
	@extend %fr-orth-center;
	#content {
		display: flex;
		// background-color: white;
		opacity: 0.82;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		// padding: 40px;
		font-family: "cat";
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 90%;
		height: 90%;
		// margin: 0;
		// padding: 0;
		overflow-y: hidden;
		background-color: rgba(255, 255, 255, 0.842);
	}
	#left {
		flex: 0 1 70%;
		height: 100%;
		overflow-y: scroll;
		@extend %fr-scrollbar;
	}
	#right {
		flex: 0 1 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
