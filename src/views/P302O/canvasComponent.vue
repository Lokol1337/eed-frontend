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
    :style="{
      backgroundColor: hardwareComponent.backgroundColor,
      opacity: hardwareComponent.opacity}"
  >
    <img
      class="component-img"
      
      :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo"
      :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`
      }"
      @mouseup.prevent="selectMethodByClick"
      @touchend.prevent="selectMethodByClick"
    />
  </vue-draggable-resizable>
</template>

<script>
 
// TODO: remove this!
// import $url from '@/api/config.js';
import Vue from "vue";
import VueSession from "vue-session";

Vue.use(VueSession);


export default {
  props:['hardZoom', 'hardwareComponents', 'hardwareComponent', /*'hardwareComponent.imgIndex',*/ 'id'],
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
        console.log("change()");
        if(this.dataServ.length < 1){
          return '';
        }
        console.log("Я ИЗМЕНИЛСЯ! Z");
        //debugger;
        if (this.hardwareComponent.valuesAndPhotos.length > 1) {
          console.log("Блок с состояниями");
        } else {
          console.log("Перетаскивающийся блок");
        }
        return this.dataServ;
      }
  },
  mounted(){
      // this.$session.start();
      // this.$session.set('session_id', Date.now().toString(32));
      // console.log(this.$session.get('session_id'));
  },

  methods: {
    changePhotoByClick() {
      this.changeCurrentValue();

    },
    rotate() {
      this.changeCurrentValue();
      if (this.hardwareComponent.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
        this.hardwareComponent.imgIndex = 0;
      }
      else {
        this.hardwareComponent.imgIndex++;
      }
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
      this.degreeOfRotation = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
    },
    changeCurrentValue(){
      this.hardwareComponent.imgIndex += 1;
      this.hardwareComponent.imgIndex %= this.hardwareComponent.valuesAndPhotos.length;
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
    },
    selectMethodByClick() {
      if (this.hardwareComponent.draggable === false && this.hardwareComponent.rotatable === false) {
        this.changePhotoByClick();
      } else if (this.hardwareComponent.draggable === false && this.hardwareComponent.rotatable === true) {
        this.rotate();
      } else if (this.hardwareComponent.draggable === true && this.hardwareComponent.rotatable === false);
      return this.sendRequest();
    },
    onDrag(x, y) {
      if (this.hardwareComponent) {
        this.hardwareComponent.left = x;
        this.hardwareComponent.top = y;
      }
      // console.log(this.hardZoomScale);
    },
    sendRequest() {
      this.$emit('sendRequest', this.hardwareComponent);
    }
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