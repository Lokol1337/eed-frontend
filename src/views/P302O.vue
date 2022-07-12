<template>
  <div class="p-302-0">
    <h1>P-302-0</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="hardware-view-page__canvas-wrp">
            <hardwareCanvas
              canvasMode="viewHardware"
              :hardwareComponents="hardware.hardwareComponents"
              :bgImage="hardware.background"
              :backgroundSettings="hardware.backgroundSettings"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hardwareJson from './P302O/P302O.json';

import hardwareCanvas from './P302O/hardwareCanvas.vue';

export default {
  components: {
    hardwareCanvas,
  },
  computed: {
    hardware() {
      return hardwareJson;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>