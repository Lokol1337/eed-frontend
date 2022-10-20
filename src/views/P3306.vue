<template>
  <div class="p-302-0">
    <h1>П-330-6</h1>
    <packManager :packs="allPacks.blocks" @selectPack="selectPackHandler"/>
    <h3>{{ actualPack.name }}</h3>
    <div class="container-fluid">
      <div class="row">        
        <div class="col-12 col-sm-12 p-0">
          <div id="mainBlock" class="hardware-view-page__canvas-wrp" style="zoom:100%">
            <hardwareCanvas
              v-for="pack in allPacks.blocks"
              :key="pack.name"
              v-show="pack.name === actualPack.name"
              :id = "'block' + pack.id"
              :hardwareComponents="pack.components"
              :bgImage="pack.background"
              :backgroundSettings="pack.backgroundSettings"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P302OJSON from "./P302O/P3306.json";

import hardwareCanvas from "./P302O/hardwareCanvas.vue";
import packManager from "./P302O/packManager.vue";

export default {
  created(){
    //this.getFistZoom();
    window.addEventListener('resize', this.updateWidth);
    this.allPacks = P302OJSON;
    this.actualPack = P302OJSON.blocks[0];
  },
  mounted(){
    this.getFistZoom();
    var buttonItem = document.querySelectorAll('.btnBlock'), index, button;
    for (index = 0; index < buttonItem.length; index++) {
      button = buttonItem[index];
      button.addEventListener('click', this.updateZoom);
    }
      //console.log(event.currentTarget.id);

  },
  destroyed(){
    var buttonItem = document.querySelectorAll('.btnBlock'), index, button;
    for (index = 0; index < buttonItem.length; index++) {
      button = buttonItem[index];
      button.addEventListener('click', this.updateZoom);
    }
  },
  components: {
    hardwareCanvas,
    packManager,
    
  },
  data() {
    return {      
      actualPack: null,
      allPacks: null,
      width: window.innerWidth,
      imgWidth: 0,
      imgId: 20,
      zoom: 80,
      firstZoom: 0
    };
  },
  methods: {
    getFistZoom(){
      let firstZoom = 0;
      let imgWidth = 1000;
      if(this.width > imgWidth){
        firstZoom = Math.floor((this.width - imgWidth)/imgWidth * 100) + 100 - 5;
      }
      else if(this.width < imgWidth){
        firstZoom = Math.ceil((this.width - imgWidth)/imgWidth * 100) + 100 - 5;
      }
      this.firstZoom = firstZoom;
      document.getElementById('mainBlock').style.zoom = this.firstZoom + '%';
      
    },
    updateZoom(){
      if(event.currentTarget.id){
        this.imgId = event.currentTarget.id;
      }
      
      this.imgWidth = document.getElementById('block' + this.imgId).children[0].style.width;
      this.imgWidth = this.imgWidth.substr(0,this.imgWidth.length - 2);
      
      this.imgWidth = parseInt(this.imgWidth);

      if(this.width > this.imgWidth){
        this.zoom = Math.floor((this.width - this.imgWidth)/this.imgWidth * 100) + 100 - 5;
      }
      else if(this.width < this.imgWidth){
        this.zoom = Math.ceil((this.width - this.imgWidth)/this.imgWidth * 100) + 100 - 5;
      }
      document.getElementById('mainBlock').style.zoom = this.zoom + '%';
    },
    updateWidth() {
      const $html = document.documentElement;
      const width = $html.clientWidth;
      this.width = width;
      this.updateZoom();
    },
    selectPackHandler(pack) {
      this.actualPack = pack;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>