<template>
  <div class="p-302-0">
    <h1>P-302-0</h1>
    <button @click.prevent="nextPack">
      next pack
    </button>
    <h3>{{ P302O.blocks[packIdx].name }}</h3>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="hardware-view-page__canvas-wrp">
            <hardwareCanvas
              :key="packIdx"
              :hardwareComponents="P302O.blocks[packIdx].components"
              :bgImage="P302O.blocks[packIdx].background"
              :backgroundSettings="P302O.blocks[packIdx].backgroundSettings"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P302OJSON from './P302O/P302O.json';

import hardwareCanvas from './P302O/hardwareCanvas.vue';

export default {
  components: {
    hardwareCanvas,
  },
  data() {
    return {
      packIdx: 0,
    };
  },
  computed: {
    P302O() {
      return P302OJSON;
    }
  },
  methods: {
    nextPack() {
      if ((this.packIdx + 1) === this.P302O.blocks.length) {
        this.packIdx = 0;
      } else {
        this.packIdx++;
      }
    }
  }
}

// TODO: добавить айдишники упаковкам и компонентам
</script>

<style lang="scss" scoped>

</style>