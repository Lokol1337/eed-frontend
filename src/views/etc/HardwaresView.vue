<template>
  <div>
    <button @click="exportJson" id="myBtn">export as JSON</button>
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
import hardwareCanvas from "@/components/hardware/hardwareCanvas.vue";
import hardwareJson from '@/mocks/hardware.json';

export default {
  components: {
    hardwareCanvas,
  },
  computed: {
    hardware() {
      // TODO:получает только первое оборудование
      // return this.$store.getters.HARDWARES[0];
      return hardwareJson;
    },
  },
  methods: {
    exportJson() {
      const myBtn = document.querySelector("#myBtn");
      const jsonFile = new Blob([JSON.stringify(this.hardware)]);
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(jsonFile);
      downloadLink.download = "demo.json";
      myBtn.addEventListener("click", () => {
        downloadLink.click();
      });
    },
  },
};
</script>