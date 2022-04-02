<template>
  <div class="canvas">
    <div
      class="canvas__body"
      :style="{ backgroundImage: 'url(' + bgImage + ')' }"
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
    width: 760px;
    height: 270px;
    background-size: 760px 270px;
  }

  &__item {
    &-button {
      border: none;
      margin: 0;
      padding: 0;

      background: transparent;
    }
  }
}
</style>