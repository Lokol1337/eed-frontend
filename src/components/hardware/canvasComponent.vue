<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onResize"
    :w="hardwareComponent.width"
    :h="hardwareComponent.height"
    :x="hardwareComponent.left"
    :y="hardwareComponent.top"
    :parent="true"
  >
    <!-- <button @keyup="moveByKeys" class="canvas__item-button"> -->
    <img
      :src="hardwareComponent.photos[0]"
      :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
      }"
      @click.prevent="selectComponent(hardwareComponent)"
    />
    <!-- </button> -->
  </vue-draggable-resizable>
</template>

<script>
export default {
  props: {
    hardwareComponent: {
      type: Object,
    },
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
      if (this.hardwareComponent && (width !== 0 && height !== 0)) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;

        this.hardwareComponent.width = width;
        this.hardwareComponent.height = height;
      }
    },
    moveByKeys(event) {
      // TODO: валидировать. Не должно быть больше/меньше размеров холста
      // TODO: переписать на свитч кейс
      if (event.keyCode == 38) {
        this.hardwareComponent.top--;
      } else if (event.keyCode == 40) {
        this.hardwareComponent.top++;
      } else if (event.keyCode == 37) {
        this.hardwareComponent.left--;
      } else if (event.keyCode == 39) {
        this.hardwareComponent.left++;
      }
    },
  },
};
</script>