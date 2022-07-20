<template>
  <div class="p-330-6">
    <h1>П-302-0</h1>
    <packManager :packs="allPacks.blocks" @selectPack="selectPackHandler"/>
    <h3>{{ actualPack.name }}</h3>
    <div class="container">
      <div class="row">        
        <div class="col-12 col-sm-12">
          <div class="hardware-view-page__canvas-wrp">
            <hardwareCanvas
              v-for="pack in allPacks.blocks"
              :key="pack.name"
              v-show="pack.name === actualPack.name"
              :hardwareComponents="pack.components"
              :bgImage="pack.background"
              :backgroundSettings="pack.backgroundSettings"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <textShowVue @inputText="inputTextHandler"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P3306JSON from "./P302O/P302O.json";

import hardwareCanvas from "./P302O/hardwareCanvas.vue";
import packManager from "./P302O/packManager.vue";
import textShowVue from "./P302O/textShow.vue";

export default {
  components: {
    hardwareCanvas,
    packManager,
    textShowVue,
  },
  data() {
    return {      
      actualPack: null,
      allPacks: null,
    };
  },
  methods: {
    selectPackHandler(pack) {
      this.actualPack = pack;
    },
    inputTextHandler(text) {
      console.log(text);
    }
  },
  created() {
    this.allPacks = P3306JSON;
    this.actualPack = P3306JSON.blocks[0]
  }
};
</script>

<style lang="scss" scoped>
</style>