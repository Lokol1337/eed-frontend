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
      componentsForMenu: [
        {
          name: "jumper2_vertical",
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
        },{
          name: "jumper2_horizontal",
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
          width: 30,
          height: 10,
        },
        {
          name: "jumper4_horizontal",
          valuesAndPhotos: [
            {
              value: "jumper4_horizontal",
              photo: "./images/controls/jumper4_horizontal.png",
            },
          ],
          rotatable: false,
          draggable: true,
          left: 20,
          top: 20,
          width: 27,
          height: 21,
        },
        {
          name: "jumper4_vertical",
          valuesAndPhotos: [
            {
              value: "jumper4_vertical",
              photo: "./images/controls/jumper4_vertical.png",
            },
          ],
          rotatable: false,
          draggable: true,
          left: 20,
          top: 20,
          width: 15,
          height: 30,
        },
        {
          name: "jumper8",
          valuesAndPhotos: [
            {
              value: "jumper8",
              photo: "./images/controls/jumper8.png",
            },
          ],
          rotatable: false,
          draggable: true,
          left: 20,
          top: 20,
          width: 27,
          height: 39,
        },
        {
          name: "4-pin",
          valuesAndPhotos: [
            {
              value: "jumper8",
              photo: "./images/p-330-6/controls/4-pin.png",
            },
          ],
          rotatable: false,
          draggable: true,
          left: 20,
          top: 20,
          width: 19,
          height: 19,
        },
        {
          name: "8-pin",
          valuesAndPhotos: [
            {
              value: "jumper8",
              photo: "./images/p-330-6/controls/8-pin.png",
            },
          ],
          rotatable: false,
          draggable: true,
          left: 20,
          top: 20,
          width: 42,
          height: 19,
        }
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