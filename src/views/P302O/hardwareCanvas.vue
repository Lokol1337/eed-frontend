<template>

  <div class="canvas">
    <div :key="rerenderStatment"
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
          v-on:sendRequest="sendRequestListener($event)"
          :key="hardwareComponent.id"
          :id="hardwareComponent.id"
          :rerenderStatment="rerenderStatment"
          :hardwareComponents="allComponents" 
          :hardwareComponent="hardwareComponent"
          :hardZoom = "hardZoom"    
          :sessionId = "sessionId"
      />
    </div>
  </div>
</template>

<script>
// import addableComponentsMenu from "./addableComponentsMenu.vue";

import canvasComponent from "./canvasComponent.vue";
// import * as hwCmpHandler from "../hwComponentsHandle.js";
// import ServerHandler from '@/api/ServerHandler.js';
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
    serverHandler: {
      type: Object,
    },
    stepServerData: {
      type: Object,
      default: () => [],
    },
    sessionId: {
      type: String
    }
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
      actionIds: null,
      hardwareComponentsData: [],
    };
  },
  computed: {
    allComponents() {
      return this.hardwareComponentsData;
    }
  },
  methods: {
    sendRequestListener(hardwareComponent) {
      this.rerenderStatment++;
      this.sendRequest(hardwareComponent);
    },
    selectComponentHandler(component) {
      console.log("added component");
      this.hardwareComponentsData.push({...component});
    },
    isNeedToChangeYellow(hardwareComponent) {
      let arrayNextActions = this.stepServerData['next_actions']; // может не работать
      let nextAction = this.serverHandler.findNextActionById(arrayNextActions, hardwareComponent.id);
      if (nextAction == null) {
        console.log("isNeedToChangeYellow() -> notFound");
        return false;
      } else {
        if (nextAction['currentValue'] == hardwareComponent.currentValue)
          return true;
      }
      return false;
    },
    changeYellow(hardwareComponent){
      // if (this.isNeedToChangeYellow(hardwareComponent)) {
        let index = this.findHardwareComponentById(hardwareComponent.id);
        if (this.hardwareComponentsData[index].backgroundColor == "yellow") {
          this.hardwareComponentsData[index].backgroundColor = "";
          this.hardwareComponentsData[index].opacity = "";
        }
        // Принудительное обновление <template> 
        this.rerenderStatment++;
      // }
    },
    findHardwareComponentById(id){
      let index = -1;
      this.hardwareComponents.forEach((element, i) => {
        //console.log(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));
        if (parseInt(element.id) == parseInt(id)) {
          index = i;
          return;
        }
      });
      return index;
    },
    sendRequest(hardwareComponent) {

      this.serverHandler.defineActionStepOnMessage(this, hardwareComponent);
      let elseData = this.serverHandler.getElseData(hardwareComponent, hardwareComponent.hardZoomScale);
      this.serverHandler.sendData(elseData);

    },
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