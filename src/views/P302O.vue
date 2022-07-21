<template>
  <div class="p-330-6">
    <h1>П-302-0</h1>
    <packManager :packs="allPacks.blocks" @selectPack="selectPackHandler" />
    <h3>{{ actualPack.name }}</h3>
    <input
      @change.prevent="importJSON"
      style="margin-right: 15px"
      type="file"
    />
    <button @click.prevent="exportJSON">export</button>
    <div class="container" :key="reRenderKey">
      <div class="row">
        <div class="col-2 col-sm-2">
          <menuForShow :rectColor="'green'" :packName="packForShow" />
        </div>
        <div class="col-10 col-sm-10">
          <div class="hardware-view-page__canvas-wrp" :key="reRenderKey">
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
          <textShowVue @inputText="inputTextHandler" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P3306JSON from "./P302O/P302O.json";

import hardwareCanvas from "./P302O/hardwareCanvas.vue";
import packManager from "./P302O/packManager.vue";
import menuForShow from "./P302O/menuForShow.vue";
import textShowVue from "./P302O/textShow.vue";

export default {
  components: {
    hardwareCanvas,
    packManager,
    menuForShow,
    textShowVue,
  },
  data() {
    return {
      actualPack: null,
      allPacks: null,
      packForShow: null,
    };
  },
  methods: {
    selectPackHandler(pack) {
      this.actualPack = pack;
      this.packForShow = pack.name;
    },
    inputTextHandler(text) {
      console.log(text);
    },
    exportJSON() {
      const jsonFile = new Blob([JSON.stringify(this.actualPack)]);
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(jsonFile);
      downloadLink.download = "demo.json";
      downloadLink.click();
    },
    async parseJsonFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
      });
    },
    importJSON(event) {
      const file = event.target.files[0];

      this.parseJsonFile(file)
        .then((res) => {
          this.allPacks.blocks

          for (let i = 0; i < this.allPacks.blocks.length; i++) {
            if (this.allPacks.blocks[i].name === res.name) {
              this.allPacks.blocks[i].components = res.components;
            }
          }

          // TODO: добавит ререндер хардвер канваса
        })
        .catch((error) => {
          console.log(error);
        });

    },
  },
  created() {
    this.allPacks = P3306JSON;
    this.actualPack = P3306JSON.blocks[0];
  },
};
</script>

<style lang="scss" scoped>
</style>