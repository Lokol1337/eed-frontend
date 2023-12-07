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
      style="border-radius: 15px;"
    >
      <canvasComponent 
        v-for="hardwareComponent in allComponents"
          v-on:nextHardwareComponents="nextHardwareComponentListener($event)"
          :key="hardwareComponent.id"
          :imgIndex="hardwareComponent.imgIndex"
          :rerenderStatment="rerenderStatment"
          :hardwareComponents="allComponents"
          :hardwareComponent="hardwareComponent"
          :hardZoom = "hardZoom" 
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
    zoom: {
      type: Number,
    },
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
  watch:{
    zoom(val){
      this.hardZoom = val
    }
  },
  components: {
    canvasComponent,
    // addableComponentsMenu,
  },
  data() {
    return {
      hardZoom: this.zoom,
      rerenderStatment: 0,
      componentsForMenu: [
      ],
      hardwareComponentsData: [],
    };
  },
  computed: {
    allComponents() {
      this.hardwareComponentsData.forEach(element => {
        element.imgIndex = 0;
      });
      return this.hardwareComponentsData;
    }
  },
  methods: {
    nextHardwareComponentListener(nextHardwareComponents) {
      (nextHardwareComponents);
      this.hardwareComponentsData = nextHardwareComponents;
      this.rerenderStatment++;
    },
    selectComponentHandler(component) {
      ("added component");
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
border-radius: 15px;
box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
border:none;
  &__body {
    position: relative;
    background-repeat: no-repeat;
  }
}
</style>