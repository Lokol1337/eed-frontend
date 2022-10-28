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
    :scale = "(hardZoomScale)"
  >
  <h1>{{dataServ}}</h1>
    <img
      class="component-img"
      
      :src="hardwareComponent.valuesAndPhotos[imgIndex].photo"
      :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
      }"
      @mouseup.prevent="selectMethodByClick"
      @touchend.prevent="selectMethodByClick"
    />
  </vue-draggable-resizable>
</template>

<script>
// TODO: remove this!
import { demoRequest } from "@/api/demoRequest.js";

export default {
  props:['hardZoom','hardwareComponent'],
  // props: {
  //   hardwareComponent: {
  //     type: Object,
  //   },
  //   hardZoom: {
  //     type: Number,
  //   }
  // },
  data() {
    return {
      imgIndex: 0,
      degreeOfRotation:  this.hardwareComponent.initValue,
      hardZoomScale: this.hardZoom / 100.0,
      dataServ: ''
    };
  },
  watch: {
      hardZoom(val){
        this.hardZoomScale = val / 100.0
      }
  },
  computed: {
      change(){
        if(this.dataServ === ''){
          return '';
        }
        debugger;
        return this.dataServ;
      }
  },
  methods: {
    
    changePhotoByClick() {
      //console.log(this.imgIndex)
      if (this.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
        this.imgIndex = 0;
         this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
        return;
      }
      this.imgIndex++;
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
    },
    rotate() {
      if (this.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
        this.imgIndex = 0;
      }
      else
      {
        this.imgIndex++;
      }
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
      this.degreeOfRotation = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
    },
    // TODO: remove this
    async sendTestRequest() {
      const {data} = await demoRequest(this.hardwareComponent);
      
      console.log(data);
    },
    sendTestRequest2() {
      let socket = new WebSocket("ws://localhost:8000/");

      socket.onopen = function() {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        socket.send("Меня зовут Джон");
      };
      const v = this;
      //https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
      socket.onmessage = function(event) {
        alert(`[message] Данные получены с сервера: ${event.data}`);
        v.dataServ = event.data;
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          alert('[close] Соединение прервано');
        }
      };

      socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
      };
    },
    selectMethodByClick() {
      
      if (
        this.hardwareComponent.draggable === false &&
        this.hardwareComponent.rotatable === false
      ) {
        this.changePhotoByClick();
        return this.sendTestRequest2();
      } else if (
        this.hardwareComponent.draggable === true &&
        this.hardwareComponent.rotatable === false
      ) {
        return this.sendTestRequest2();
      } else if (
        this.hardwareComponent.draggable === false &&
        this.hardwareComponent.rotatable === true
      ) {
        this.rotate();
        return this.sendTestRequest2();
      }
    },
    onDrag(x, y) {
      if (this.hardwareComponent) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;
      }
      console.log(this.hardZoomScale);
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