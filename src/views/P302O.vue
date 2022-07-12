<template>
  <div class="p-302-0">
    <h1>P-302-0</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="hardware-view-page__canvas-wrp">
            <hardwareCanvas
              canvasMode="viewHardware"
              :hardwareComponents="P302O.blocks[0].components"
              :bgImage="P302O.blocks[0].background"
              :backgroundSettings="P302O.blocks[0].backgroundSettings"
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
  computed: {
    P302O() {
      return P302OJSON;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>