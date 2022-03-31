<template>
  <div class="canvas">
    <div
      class="canvas__body"
      :style="{ backgroundImage: 'url(' + bgImage + ')' }"
    >
      <vue-draggable-resizable
        v-for="(hardwareComponent, i) in hardwareComponents"
        :key="i"
        @dragging="onDrag"
        @resizing="onResize"
        :w="hardwareComponent.width"
        :h="hardwareComponent.height"
        :x="hardwareComponent.left"
        :y="hardwareComponent.top"
        :parent="true"
      >
        <button
          @keyup="moveByKeys"
          class="canvas__item-button"
        >
        <img
          :src="hardwareComponent.photo"
          :style="{
            width: hardwareComponent.width + 'px',
            height: hardwareComponent.height + 'px',
          }"
          @click.prevent="selectComponent(hardwareComponent)"
        />
        </button>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  data() {
    return {};
  },
  components: {
    VueDraggableResizable,
  },
  methods: {
    selectComponent(hardwareComponent) {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", hardwareComponent);
    },
    setBackground(background) {
      this.$store.dispatch("ADD_BACKGROUND", background);
    },
    onDrag(x, y) {
      if (this.selectedHardwareComponent) {
        this.selectedHardwareComponent.left = x;
        this.selectedHardwareComponent.top = y;
      }
    },
    onResize(x, y, width, height) {
      if (this.selectedHardwareComponent) {
        this.selectedHardwareComponent.left = x;
        this.selectedHardwareComponent.top = y;

        this.selectedHardwareComponent.width = width;
        this.selectedHardwareComponent.height = height;
      }
    },
    moveByKeys(event) {
      // TODO: валидировать. Не должно быть больше/меньше размеров холста
      // TODO: переписать на свитч кейс
      if (event.keyCode == 38) {
        this.selectedHardwareComponent.top--;
      } else if (event.keyCode == 40) {
        this.selectedHardwareComponent.top++;
      } else if (event.keyCode == 37) {
        this.selectedHardwareComponent.left--;
      } else if (event.keyCode == 39) {
        this.selectedHardwareComponent.left++;
      }
    },
  },
  computed: {
    bgImage() {
      return this.$store.getters.HARDWARE_BACKGROUND;
    },
    hardwareComponents() {
      return this.$store.getters.HARDWARE_COMPONENTS;
    },
    selectedHardwareComponent() {
      return this.$store.getters.SELECTED_COMPONENT;
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