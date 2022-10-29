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
  <!-- <h1>{{dataServ['id']}}</h1> -->
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
import $url from '@/api/config.js';
import Vue from "vue";
import VueSession from "vue-session";
Vue.use(VueSession);



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
      img_src: this.hardwareComponent.valuesAndPhotos.photo,
      hardZoomScale: this.hardZoom / 100.0,
      dataServ: []
    };
  },
  watch: {
      hardZoom(val){
        this.hardZoomScale = val / 100.0
      }
  },
  computed: {
      change(){
        console.log("change()");
        if(this.dataServ.length < 1){
          return '';
        }
        console.log("Я ИЗМЕНИЛСЯ! Z");
        debugger;
        if (this.hardwareComponent.valuesAndPhotos.length > 1) {
          console.log("Блок с состояниями");
        } else {
          console.log("Перетаскивающийся блок");
        }
        return this.dataServ;
      }
  },
  mounted(){
      this.$session.start();
      this.$session.set('session_id', Date.now().toString(32));
    // console.log(this.$session.get('session_id'))
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
      let socket = new WebSocket($url);

      // var session_id = 0;
      var sendData = new Map([
        ['session_id', this.$session.get('session_id')],
        ['id',this.hardwareComponent.id],
        ['draggble', this.hardwareComponent.draggable],
        ['rotatable', this.hardwareComponent.rotatable],
        ['currentValue',this.hardwareComponent.currentValue],
        ['left',this.hardwareComponent.left],
        ['top', this.hardwareComponent.top]
      ]);
 
      socket.onopen = function() {
        socket.send(JSON.stringify(Array.from(sendData.entries())));
      };

      const v = this;
      //https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
      socket.onmessage = function(event) {
        v.dataServ = new Map(JSON.parse(event.data));
      };

      socket.onclose = function(event) {
        if (event.wasClean) { 
          //
        } else {
          //
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
      // console.log(this.hardZoomScale);
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