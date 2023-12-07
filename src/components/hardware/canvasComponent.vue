<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onResize"
    :w="hardwareComponent.width"
    :h="hardwareComponent.height"
    :x="hardwareComponent.left"
    :y="hardwareComponent.top"
    :draggable="mode.draggable"
    :resizable="mode.resizable"
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
      // console.log('Req send');
    },
    // TODO: remove this
    selectMethodByClick() {
      if (this.componentMode === "createHardware") {
        return this.selectComponent();
      } else if (this.componentMode === "viewHardware") {
        this.$store.dispatch("ADD_SELECTED_COMPONENT", null);

        if (!this.mode.draggable) {
          this.changePhotoByClick();
        }
        return this.sendTestRequest();
      } else {
        throw "Oops, selectMethodByClick dont know that it do";
      }
    },
  },
  computed: {
    // TODO: Rename this property
    mode() {
      // TODO: switch case!
      if (this.componentMode === "createHardware") {
        return {
          draggable: true,
          resizable: true,
        };
      } else if (this.componentMode === "viewHardware") {
        return {
          draggable: this.hardwareComponent.draggable,
          resizable: false,
        };
      } else {
        throw "Hey, set mode for canvasComponent";
      }
    },
    backgroundSettings() {
      return this.$store.getters.BACKGROUND_SETTINGS;
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  &__item-button {
    padding: 0;
    margin: 0;
    border: 0;
    background: ;
  }
}
</style>