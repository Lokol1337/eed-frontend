<template>
  <vue-draggable-resizable v-if="!hardwareComponent.draggable"
    @dragging="onDrag"
    :class="curZindex "
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
      opacity: hardwareComponent.opacity,
      border: `none`
    }"
  >
      <img v-if="hardwareComponent.currentValue !== 'cabel' && hardwareComponent.currentValue !== 'none' && hardwareComponent.caption !== 'arrow'"
        class="component-img"
        :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo"
        :style="{
          width: hardwareComponent.width + 'px',
          height: hardwareComponent.height + 'px',
          transform: `rotate(${degreeOfRotation}deg)`,
          verticalAlign: `top`
        }"
        @mouseup.prevent="selectMethodByClick"
        @touchend.prevent="selectMethodByClick"
      />
      <img v-if="hardwareComponent.currentValue === 'none'"
        class="component-img"
        :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo"
        :style="{
          width: hardwareComponent.width + 'px',
          height: hardwareComponent.height + 'px',
          transform: `rotate(${degreeOfRotation}deg)`,
          verticalAlign: `top`
        }"
        @mouseup.prevent="selectMethodByClick"
        @touchend.prevent="selectMethodByClick"
      />
      <img v-if="hardwareComponent.currentValue === 'cabel'"
      class=""
        :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo"
        :style="{
          width: hardwareComponent.width + 'px',
          height: hardwareComponent.height + 'px',
          transform: `rotate(${degreeOfRotation}deg)`,
          verticalAlign: `top`
        }"
      />
      <img v-if="hardwareComponent.caption === 'arrow'"
      class=""
        :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo"
        :style="{
          width: hardwareComponent.width + 'px',
          height: hardwareComponent.height + 'px',
          transform: `rotate(${degreeOfRotation}deg)`,
          verticalAlign: `top`
        }"
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
      curZindex : 1,
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
      if(this.hardwareComponent.rotatable){
        this.degreeOfRotation = this.hardwareComponent.currentValue;
      }
      if(this.hardwareComponent.currentValue === "none"){
        this.curZindex = "cabel";
      }
      else if(this.hardwareComponent.currentValue === "cabel"){
        this.curZindex = "none";
      }
      else{
        this.curZindex = "btnTop";
      }
      // this.$session.start();
      // this.$session.set('session_id', Date.now().toString(32));
      // console.log(this.$session.get('session_id'));
  },

  methods: {
    changePhotoByClick() {
      this.changeCurrentValue();

    },
    rotate() {
      // console.log(this.hardwareComponent.imgIndex,this.hardwareComponent.valuesAndPhotos.length);
      // if (this.hardwareComponent.imgIndex === this.hardwareComponent.valuesAndPhotos.length - 1) {
      //   this.hardwareComponent.imgIndex = 0;
      // }
      // else {
        this.changeCurrentValue();
      // }
      // console.log(this.hardwareComponent.imgIndex,"BBBBBBBBBB");
      this.degreeOfRotation = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
      // console.log(,"CCCCCCCCCCCCC");
    },
    changeCurrentValue(){
      this.hardwareComponent.imgIndex += 1;
      this.hardwareComponent.imgIndex %= this.hardwareComponent.valuesAndPhotos.length;
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
      console.log(this.hardwareComponent.imgIndex,"AAAAAAAAAAAAAAAAAA");
    },
    selectMethodByClick() {
      if(this.hardwareComponent.backgroundColor === "yellow"){
        if (this.hardwareComponent.draggable === false && this.hardwareComponent.rotatable === false) {
          console.log("changePhotoByClick");
          this.changePhotoByClick();
        } 
        else if (this.hardwareComponent.draggable === false && this.hardwareComponent.rotatable === true) {
          console.log("rotate");
          this.rotate();
        }
        //  else if (this.hardwareComponent.draggable === true && this.hardwareComponent.rotatable === false){
          
        // }

        return this.sendRequest();
      }
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

<style  scoped>
.btnTop{
  z-index: 98!important;
}
.cabel{
  z-index: -1!important;
}
.none{
  z-index: 1!important;
}

</style>