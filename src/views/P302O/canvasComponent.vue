<template>
  <vue-draggable-resizable v-if="!hardwareComponent.draggable" @dragging="onDrag" :class="curZindex"
    :w="hardwareComponent.width" :h="hardwareComponent.height" :x="hardwareComponent.left" :y="hardwareComponent.top"
    :draggable="hardwareComponent.draggable" :resizable="false" :parent="true" :scale="(hardZoomScale)"
    :id=hardwareComponent.id :style="{
      backgroundColor: hardwareComponent.backgroundColor,
      opacity: hardwareComponent.opacity + '%',
      border: `none`
    }">
    <img
      v-if="hardwareComponent.currentValue !== 'cabel' && hardwareComponent.currentValue !== 'none' && hardwareComponent.caption !== 'arrow' && hardwareComponent.caption !== 'rotationBlock'"  
      class="component-img" :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo" :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
        verticalAlign: `top`,
        cursor: hardwareComponent.opacity == 80 ? 'pointer' : 'unset'
      }" @mouseup.prevent="selectMethodByClick" @touchend.prevent="selectMethodByClick"
      @wheel.prevent="scrollRotateELement" />
      
      <img v-if="hardwareComponent.currentValue === 'none'" class="component-img"
      :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo" :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
        verticalAlign: `top`
      }" @mouseup.prevent="selectMethodByClick" @touchend.prevent="selectMethodByClick" />
    <img v-if="hardwareComponent.currentValue === 'cabel'" class=""
      :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo" :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
        verticalAlign: `top`
      }" />
    <img
        v-if="hardwareComponent.caption === 'rotationBlock'"
        class="rotationBlock" :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo" :style="{
          width: hardwareComponent.width + 'px',
          height: hardwareComponent.height + 'px',
          // transform: `rotate(${degreeOfRotation}deg)`,
          verticalAlign: `top`,
          cursor:'url(./images/icons/arrow-clockwise.svg) , pointer'
          // cursor: hardwareComponent.opacity == 80 ? 'url(./images/icons/arrow-clockwise.svg)' : 'unset'
        }" @mouseup.prevent="selectMethodByClick" @touchend.prevent="selectMethodByClick"
        @wheel.prevent="scrollRotateELement" />
    <img v-if="hardwareComponent.caption === 'arrow'" class=""
      :src="hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].photo" :style="{
        width: hardwareComponent.width + 'px',
        height: hardwareComponent.height + 'px',
        transform: `rotate(${degreeOfRotation}deg)`,
        verticalAlign: `top`
      }" />

  </vue-draggable-resizable>
</template>

<script>

// TODO: remove this!
// import $url from '@/api/config.js';
import Vue from "vue";
import VueSession from "vue-session";
import { findHardwareComponentById } from "../hwComponentsHandle";

Vue.use(VueSession);


export default {
  props: ['hardZoom', 'hardwareComponents', 'hardwareComponent', /*'hardwareComponent.imgIndex',*/ 'id'],
  data() {
    return {
      curZindex: 1,
      degreeOfRotation: this.hardwareComponent.currentValue,
      deg: 0,
      img_src: this.hardwareComponent.valuesAndPhotos.photo,
      hardZoomScale: this.hardZoom / 100.0,
      dataServ: [],
    };
  },
  watch: {
    hardZoom(val) {
      this.hardZoomScale = val / 100.0
    }
  },
  computed: {
    change() {
      console.log("change()");
      if (this.dataServ.length < 1) {
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
  mounted() {
    if (this.hardwareComponent.rotatable) {
      this.degreeOfRotation = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
    }
    if (this.hardwareComponent.currentValue === "none") {
      this.curZindex = "cabel";
    }
    else if (this.hardwareComponent.currentValue === "cabel") {
      this.curZindex = "none";
    }
    else {
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
    changeCurrentValue() {
      if (this.hardwareComponent.imgIndex >= this.hardwareComponent.valuesAndPhotos.length - 1)
        this.hardwareComponent.imgIndex = 0;
      else
        this.hardwareComponent.imgIndex += 1;
      // this.hardwareComponent.imgIndex %= this.hardwareComponent.valuesAndPhotos.length;
      this.hardwareComponent.currentValue = this.hardwareComponent.valuesAndPhotos[this.hardwareComponent.imgIndex].value;
      console.log(this.hardwareComponent.imgIndex, "AAAAAAAAAAAAAAAAAA");
    },
    selectMethodByClick() {
      if ((this.hardwareComponent.backgroundColor === "yellow" && this.$route.query.it == 1) || this.$route.query.it == 0) {
        if (this.hardwareComponent.draggable === false && this.hardwareComponent.rotatable === false && this.hardwareComponent.caption != "rotationBlock") {
          console.log("changePhotoByClick");
          this.changePhotoByClick();
        }
        else if (this.hardwareComponent.draggable === false && this.hardwareComponent.rotatable === true) {
          console.log("rotate");
          this.rotate();
        }
        else if (this.hardwareComponent.caption == "rotationBlock") {
          // тут для болта  
        }

        return this.sendRequest();
      }
    },
    scrollRotateELement(e) {
      if ((this.hardwareComponent.backgroundColor === "yellow" && this.$route.query.it == 1) || this.$route.query.it == 0) {
        console.log("rotete.func - F1")
        if (this.hardwareComponent.caption == "rotationBlock") {
          console.log("rotete.func - F2")
          // Где-то надо определить self.deg
          let arrow_ell = findHardwareComponentById(this.hardwareComponent.pairRotationId, this.hardwareComponents)   

          var delta = e.deltaX || e.detail || e.wheelDelta;
          if(this.hardwareComponents[arrow_ell].currentValue == "arrow")
            this.hardwareComponents[arrow_ell].currentValue = this.hardwareComponents[arrow_ell].initValue
          

          if (delta > 0 && this.hardwareComponents[arrow_ell].currentValue < 55) this.hardwareComponents[arrow_ell].currentValue += 1;
          else if (delta < 0 && this.hardwareComponents[arrow_ell].currentValue > -55) this.hardwareComponents[arrow_ell].currentValue -= 1;
          this.hardwareComponent.currentValue = this.degreeOfRotation
          console.log("rotete.func - F3 = ", this.hardwareComponents[arrow_ell] )



          document.getElementById(this.hardwareComponent.id).children[0].style.transform = "rotate(" + this.degreeOfRotation + "deg)" // Крутим болт
          
          console.log(this.hardwareComponent.pairRotationId)

          // this.hardwareComponents[arrow_ell].currentValue = this.degreeOfRotation
          console.log(this.hardwareComponents[arrow_ell].currentValue)
          // arrow_ell.currentValue = this.degreeOfRotation 
          // document.getElementById(this.hardwareComponent.pairRotationId).children[0].style.transform = "rotate(" + this.degreeOfRotation + "deg)" // Крутим стрелку
        }
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
.btnTop {
  z-index: 98 !important;
}

.cabel {
  z-index: 3 !important;
}

.none {
  z-index: 1 !important;
}
</style>