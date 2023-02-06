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
// import addableComponentsMenu from "./addableComponentsMenu.vue";

import canvasComponent from "./canvasComponent.vue";
import * as hwCmpHandler from "../hwComponentsHandle.js";

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
      type: Array,
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
    sendRequestListener(hardwareComponent) {
      console.log(hardwareComponent);
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
      if (this.isNeedToChangeYellow(hardwareComponent)) {
        let index = this.findHardwareComponentById(hardwareComponent.id);
        if (this.hardwareComponentsData[index].backgroundColor == "yellow") {
          this.hardwareComponentsData[index].backgroundColor = "";
          this.hardwareComponentsData[index].opacity = "";
        }
        // Принудительное обновление <template> 
        this.rerenderStatment++;
      }
    },
    sendRequest(hardwareComponent) {
      let socket = this.serverHandler.getSocket();
      
      this.serverHandler.sendElse(v.sessionId, hardwareComponent, hardwareComponent.hardZoomScale);
      console.log("SERVER SENDING_DATA: " + JSON.stringify(Array.from(this.serverHandler.sendData.entries())));
      
      this.serverHandler.socket.onopen = function() {
        console.log("ONOPEN!");
        this.serverHandler.socket.send(JSON.stringify(Array.from(this.serverHandler.sendData.entries())));
      };
      
      this.serverHandler.socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
      };
      
      let v = this;
      //https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
      socket.onmessage = function(event) {
          try {
            let server_data = this.serverHandler.parseServerData(event.data);
            if(this.serverHandler.checkData(v.data)) {
              console.log("ДАННЫЕ С СЕРВЕРА ПОЛУЧЕНЫ!");

              if (this.serverHandler.is_training) {

                if (server_data['status'] && server_data.length == 1) {
                  if (server_data['status'] == "correct") {
                    console.log("CORRECT ACTION!");
                    v.changeYellow(hardwareComponent);
                  } else {
                    console.log("INCORRECT ACTION!");

                    // Отменяем предыдущее действие пользователя и надеемся, что рычажок не подсвечивался жёлтым
                    v.hardwareComponentsData = hwCmpHandler.revertHwCmpCurrentValue(v.hardwareComponentsData, hardwareComponent);

                    // Принудительное обновление <template> 
                    v.rerenderStatment++;
                  }
                  return;
                } else {
                  v.annotation = hwCmpHandler.getAnnotation(server_data);
                  // Сделать emit для аннотации
                  
                  v.hardwareComponentsData = hwCmpHandler.uploadHwComponents_Training(v.hardwareComponentsData, server_data);

                  // Принудительное обновление <template> 
                  v.rerenderStatment++;
                }

              } else {
                console.log("НЕ ТРЕННИРОВКА");
              }
              
            } else {
              console.log("НЕВЕРНАЯ СТРУКТУРА ДАННЫХ СЕРВЕРА!");
            }

          } catch (event) {
            console.log(event);
          }
      };

      socket.onclose = function(event) {
          if (event.wasClean) { 
            //
          } else {
            //
          }
      };

    },
  },
  created() {
    this.hardwareComponentsData = this.hardwareComponents;
    console.log("ServerHandler: " + this.serverHandler);
    console.log("hwSESSION_ID: " + this.sessionId);
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