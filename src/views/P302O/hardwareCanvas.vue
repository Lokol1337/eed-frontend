<template>
  <div class="canvas">
    <div
      class="canvas__body"
      :style="{ 
        backgroundImage: ('url(' + bgImage + ')'), 
        width: `${backgroundSettings.width}px`,
        height: `${backgroundSettings.height}px`,
        backgroundSize: `${backgroundSettings.width}px ${backgroundSettings.height}px`
      }"
    >
      <canvasComponent
        v-for="(hardwareComponent, i) in hardwareComponents"
        :key="i"
        :hardwareComponent="hardwareComponent"
      />
    </div>
  </div>
</template>

<script>
import canvasComponent from "./canvasComponent.vue";

export default {
  props: {
    bgImage: {
      type: String,
      required: true,
    },
    hardwareComponents: {
      type: Array,
      default: () => [],
    },
    backgroundSettings: {
      type: Object,
    }
  },
  components: {
    canvasComponent,
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  display: flex;
  justify-content: center;

  &__body {
    border: 1px solid;
    position: relative;
    background-repeat: no-repeat;
  }
}
</style>