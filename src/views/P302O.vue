<template>
  <div class="p-302-0">
    <h1>P-302-0</h1>
    <packManager :packs="allPacks.blocks" @selectPack="selectPackHandler"/>
    <h3>{{ actualPack.name }}</h3>
    <div class="container">
      <div class="row">        
        <div class="col-12 col-sm-12">
          <div class="hardware-view-page__canvas-wrp">
            <hardwareCanvas
              :hardwareComponents="actualPack.components"
              :bgImage="actualPack.background"
              :backgroundSettings="actualPack.backgroundSettings"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P302OJSON from "./P302O/P302O.json";

import hardwareCanvas from "./P302O/hardwareCanvas.vue";
import packManager from "./P302O/packManager.vue";

export default {
  components: {
    hardwareCanvas,
    packManager,
  },
  data() {
    return {      
      actualPack: null,
    };
  },
  computed: {
    allPacks() {
      return P302OJSON;
    }
  },
  methods: {
    selectPackHandler(pack) {
      this.actualPack = pack;
    }
  },
  created() {
    this.actualPack = P302OJSON.blocks[0]
  }
};
</script>

<style lang="scss" scoped>
</style>