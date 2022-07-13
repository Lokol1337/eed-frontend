<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    :w="hardwareComponent.width"
    :h="hardwareComponent.height"
    :x="hardwareComponent.left"
    :y="hardwareComponent.top"
    :draggable="hardwareComponent.draggable"
    :resizable="false"
    :parent="true"
  >
    <img
      class="component-img"
      :src="hardwareComponent.valuesAndPhotos[imgIndex].photo"
      :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
      }"
      @click.prevent="selectMethodByClick"
    />
  </vue-draggable-resizable>
</template>

<script>
// TODO: remove this!
import { demoRequest } from "@/api/demoRequest.js";

export default {
  props: {
    hardwareComponent: {
      type: Object,
    },
  },
  data() {
    return {
      imgIndex: 0,
      degreeOfRotation: 0,
    };
  },
  methods: {
    onDrag(x, y) {
      if (this.hardwareComponent) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;
      }
    },
    changePhotoByClick() {
      if (this.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
        this.imgIndex = 0;
        return;
      }
      this.imgIndex++;
    },
    rotate() {
      this.degreeOfRotation += this.hardwareComponent.divisionPrice;
    },
    // TODO: remove this
    sendTestRequest() {
      demoRequest(this.hardwareComponent);
    },
    selectMethodByClick() {
      if (
        this.hardwareComponent.draggable === false &&
        this.hardwareComponent.rotatable === false
      ) {
        this.changePhotoByClick();
        return this.sendTestRequest();
      } else if (
        this.hardwareComponent.draggable === true &&
        this.hardwareComponent.rotatable === false
      ) {
        return this.sendTestRequest();
      } else if (
        this.hardwareComponent.draggable === false &&
        this.hardwareComponent.rotatable === true
      ) {
        this.rotate();
        return this.sendTestRequest();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// elem.onselectstart = function() {
//     return false;
// };
// TODO: это работатет не всегда хорошо
.component-img {
  // pointer-events: none;
  // user-select: none;
}
</style>