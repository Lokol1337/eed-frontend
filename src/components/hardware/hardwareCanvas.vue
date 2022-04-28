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
import canvasComponent from "@/components/hardware/canvasComponent.vue";

export default {
  components: {
    canvasComponent,
  },
  methods: {
    setBackground(background) {
      this.$store.dispatch("ADD_BACKGROUND", background);
    },
  },
  computed: {
    bgImage() {
      return this.$store.getters.HARDWARE_BACKGROUND;
    },
    hardwareComponents() {
      return this.$store.getters.HARDWARE_COMPONENTS;
    },
    backgroundSettings() {
      return this.$store.getters.BACKGROUND_SETTINGS;
    },
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