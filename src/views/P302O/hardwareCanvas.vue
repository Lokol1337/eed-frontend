<template>
  <div class="canvas">
    <div
      class="canvas__body"
      :style="{
        backgroundImage: 'url(' + bgImage + ')',
        width: `${backgroundSettings.width}px`,
        height: `${backgroundSettings.height}px`,
        backgroundSize: `${backgroundSettings.width}px ${backgroundSettings.height}px`,
      }"
    >
      <canvasComponent
        v-for="(hardwareComponent, i) in allComponents"
        :key="i"
        :hardwareComponent="hardwareComponent"
      />
    </div>
    <!-- <div>
      <addableComponentsMenu
        :addableComponents="componentsForMenu"
        @selectComponent="selectComponentHandler"
      />
    </div> -->
  </div>
</template>

<script>
import canvasComponent from "./canvasComponent.vue";
// import addableComponentsMenu from "./addableComponentsMenu.vue";

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
    },
  },
  components: {
    canvasComponent,
    // addableComponentsMenu,
  },
  data() {
    return {
      componentsForMenu: [
        {
          name: "jumper2",
          valuesAndPhotos: [
            {
              value: "jumper2",
              photo: "./images/controls/jumper2.png",
            },
          ],
          rotatable: false,
          draggable: true,
          left: 20,
          top: 20,
          width: 10,
          height: 30,
        },
      ],
      hardwareComponentsData: [],
    };
  },
  computed: {
    allComponents() {
      return this.hardwareComponentsData;
    }
  },
  methods: {
    selectComponentHandler(component) {
      console.log("added component");
      this.hardwareComponentsData.push({...component});
    }
  },
  created() {
    this.hardwareComponentsData = this.hardwareComponents;
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