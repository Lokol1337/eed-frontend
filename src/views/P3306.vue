<template>
  <div class="p-330-6">
    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto p-0">
            <div style="width: 85px;">
              
            </div>
        </div>
        <div class="col-auto">
          <nav aria-label="breadcrumb hidden">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/eed-frontend/#/main" class="svgHome">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 59 576 512" class="uk-icon-up2 uk-svg" width="20" height="20"><path d="M496 512H368a16 16 0 0 1-16-16V368a16 16 0 0 0-16-16h-96a16 16 0 0 0-16 16v128a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V311c1.78-1.21 3.85-1.89 5.47-3.35L288 115l218.74 192.9c1.54 1.38 3.56 2 5.26 3.2V496a16 16 0 0 1-16 16z" class="fa-secondary"></path><path d="M527.92 283.88L298.6 81.61a16 16 0 0 0-21.17 0L48.11 283.89a16 16 0 0 1-22.59-1.21L4.1 258.89a16 16 0 0 1 1.21-22.59l256-226a39.85 39.85 0 0 1 53.45 0L416 99.67V48a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v136.43l58.69 51.83a16 16 0 0 1 1.22 22.59l-21.4 23.82a16 16 0 0 1-22.59 1.21z" class="fa-primary"></path></svg>
                </a>
              </li>
              <li class="breadcrumb-item">
                П-330-6
              </li>
              <li class="breadcrumb-item">
                {{actualPack.name}}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div>
      <VueSidebarMenuAkahon @selectPackParent="selectPackHandler"/>
    </div>
    <packManager :packs="allPacks.blocks" @selectPack="selectPackHandler"/>
    <div class="container-fluid">
      <div class="row">        
        <div class="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto p-0">
          <div style="width: 85px;">
          </div>
        </div>
        <div class="col-9 col-sm-9 col-md-10 col-lg-11 col-xl-11 p-0" >
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
import P3306JSON from "./P302O/P3306.json";
import VueSidebarMenuAkahon from "./P302O/sideBarMenuP3306.vue";
import hardwareCanvas from "./P302O/hardwareCanvas.vue";
import packManager from "./P302O/packManager.vue";

export default {
  created(){
    //this.getFistZoom();
    window.addEventListener('resize', this.updateWidth);
    this.allPacks = P3306JSON;
    this.actualPack = P3306JSON.blocks[0];
    console.log();
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
    VueSidebarMenuAkahon,
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
        firstZoom = Math.floor((this.width - imgWidth)/imgWidth * 100) + 100 - 10;
      }
      else if(this.width < imgWidth){
        firstZoom = Math.ceil((this.width - imgWidth)/imgWidth * 100) + 100 - 10;
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