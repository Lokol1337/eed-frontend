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
    :id = hardwareComponent.id
    
  >
    <!-- <img
      class="component-img"
      
      :src="hardwareComponent.valuesAndPhotos[this.imgIndex].photo"
      :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
      }"
      @mouseup.prevent="selectMethodByClick"
      @touchend.prevent="selectMethodByClick"
    /> -->
  </vue-draggable-resizable>
</template>

<script>
 
// TODO: remove this!
//import $url from '@/api/config.js';
import Vue from "vue";
import VueSession from "vue-session";
Vue.use(VueSession);


export default {
  props:['hardZoom', 'hardwareComponents', 'hardwareComponent', 'imgIndex'],
  data() {
    return {
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
        ("change()");
        if(this.dataServ.length < 1){
          return '';
        }
        ("Я ИЗМЕНИЛСЯ! Z");
        debugger;
        if (this.hardwareComponent.valuesAndPhotos.length > 1) {
          ("Блок с состояниями");
        } else {
          ("Перетаскивающийся блок");
        }
        return this.dataServ;
      }
  },
  mounted(){
      // this.$session.start();
      // this.$session.set('session_id', Date.now().toString(32));
    // (this.$session.get('session_id'))
  },

  methods: {
    changePhotoByClick() {
      //(this.imgIndex)
      if (this.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
         this.imgIndex = 0;
         this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
         (this.hardwareComponent);
        return;
      }
      this.imgIndex++;
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
    },
    rotate() {
      if (this.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
        this.imgIndex = 0;
        this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
        return;
      }
      else {
        this.imgIndex++;
      }
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
      this.degreeOfRotation = this.hardwareComponent.valuesAndPhotos[this.imgIndex].value;
    },
    emitNextComponents(hardwareComponents){
      this.$emit('nextHardwareComponents', hardwareComponents);
    },
    findHardwareComponentById(id){
      let index = -1;
      this.hardwareComponents.forEach((element, i) => {
        //(parseInt(element.id) + " ? " + parseInt(id) + " = " + (parseInt(element.id) == parseInt(id)));
        if (parseInt(element.id) == parseInt(id)) {
          index = i;
          return;
        }
      });
      return index;
    },
    /*sendTestRequest(sessionId) {
      let socket = new WebSocket($url);

      // PROMISES: https://stackoverflow.com/questions/42304996/javascript-using-promises-on-websocket

      var sendData = new Map([
        ['session_id', sessionId],
        ['id', this.hardwareComponent.id],
        ['draggble', this.hardwareComponent.draggable],
        ['rotatable', this.hardwareComponent.rotatable],
        ['currentValue',this.hardwareComponent.currentValue],
        ['left', this.hardwareComponent.left/this.hardZoomScale],
        ['top', this.hardwareComponent.top/this.hardZoomScale]
      ]);

      socket.onopen = function() {
        socket.send(JSON.stringify(Array.from(sendData.entries())));
      };

      const v = this;
      //https://stackoverflow.com/questions/67376026/vue-js-updating-html-inside-websocket-onmessage-event
      socket.onmessage = function(event) {
        try {
          v.dataServ = JSON.parse(event.data);
          if(v.dataServ['next_id']) {
            let indexNowHwCmp = v.findHardwareComponentById(v.dataServ['id']);
            v.hardwareComponents[indexNowHwCmp].imgIndex += 1;
            v.hardwareComponents[indexNowHwCmp].imgIndex %= v.hardwareComponents[indexNowHwCmp].valuesAndPhotos.length;

            let indexNextHwCmp = v.findHardwareComponentById(v.dataServ['next_id']);
            // ("PREV_imgindex: " + v.hardwareComponents[indexNextHwCmp].imgIndex);
            v.hardwareComponents[indexNextHwCmp].imgIndex += 1;
            v.hardwareComponents[indexNextHwCmp].imgIndex %= v.hardwareComponents[indexNextHwCmp].valuesAndPhotos.length;
            // ("NEW_imgindex: " + v.hardwareComponents[indexNextHwCmp].imgIndex);
            v.emitNextComponents(v.hardwareComponents);
          }

          // (v.dataServ);
        } catch (event) {
          (event);
        }
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
    },*/
    /*selectMethodByClick() {
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
    },*/
    onDrag(x, y) {
      if (this.hardwareComponent) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;
      }
      // (this.hardZoomScale);
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