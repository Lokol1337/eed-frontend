<template>
  <div>
    <h1>Просмотр оборудования {{ hardware.name }}</h1>
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
import hardwareCanvas from '@/components/hardware/hardwareCanvas.vue';

export default {
  components: {
    hardwareCanvas
  },
  computed: {
    hardware() {
      // TODO:получает только первое оборудование
      return this.$store.getters.HARDWARES[0];
    }
  }
}
</script>