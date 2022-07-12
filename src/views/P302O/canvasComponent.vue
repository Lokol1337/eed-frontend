<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onResize"
    :w="hardwareComponent.width"
    :h="hardwareComponent.height"
    :x="hardwareComponent.left"
    :y="hardwareComponent.top"
    :draggable="hardwareComponent.draggable"
    :resizable="false"
    :parent="true"
  >
    <button @keyup="moveByKeys" class="canvas__item-button">
      <img
        :src="hardwareComponent.valuesAndPhotos[imgIndex].photo"
        :style="{
          width: hardwareComponent.width + 'px',
          height: hardwareComponent.height + 'px',
        }"
        @click.prevent="selectMethodByClick"
      />
    </button>
  </vue-draggable-resizable>
</template>

<script>
// TODO: remove this!
import { demoRequest } from "@/api/demoRequest.js";

export default {
  props: {
    componentMode: {
      type: String,
      required: true,
    },
    hardwareComponent: {
      type: Object,
    },
  },
  data() {
    return {
      imgIndex: 0,
    };
  },
  methods: {
    selectComponent() {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", this.hardwareComponent);
    },
    onDrag(x, y) {
      if (this.hardwareComponent) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;
      }
    },
    onResize(x, y, width, height) {
      if (this.hardwareComponent && width !== 0 && height !== 0) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;

        this.hardwareComponent.width = width;
        this.hardwareComponent.height = height;
      }
    },
    moveByKeys(event) {
      // TODO: валидировать. Не должно быть больше/меньше размеров холста
      switch (event.keyCode) {
        case 38:
          this.hardwareComponent.top--;
          break;
        case 40:
          this.hardwareComponent.top++;
          break;
        case 37:
          this.hardwareComponent.left--;
          break;
        case 39:
          this.hardwareComponent.left++;
          break;
        default:
          break;
      }
    },
    changePhotoByClick() {
      if (this.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
        this.imgIndex = 0;
        return;
      }
      this.imgIndex++;
    },
    // TODO: remove this
    sendTestRequest() {
      demoRequest(this.hardwareComponent);
    },
    selectMethodByClick() {
        if (this.hardwareComponent.draggable === false 
          && this.hardwareComponent.rotatable === false) {
          this.changePhotoByClick();
          return this.sendTestRequest();
        } else if (this.hardwareComponent.draggable === true 
          && this.hardwareComponent.rotatable === false) {
          return this.sendTestRequest();
        }
      }
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  &__item-button {
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
  }
}
</style>