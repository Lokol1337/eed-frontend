<template>
  <div>
    <h1>Просмотр оборудования (как будут видеть студенты)</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="hardware-view-page__canvas-wrp">
            <div class="hardware-view-page__canvas" :style="{ 'background-image': 'url(' + hardware.background + ')' }">
              <img v-for="(hardwareComponent, i) in hardware.hardwareComponents" :key="i" 
                :src="hardwareComponent.photo"
                :style="{
                  top: hardwareComponent.top + 'px', 
                  left: hardwareComponent.left + 'px', 
                  width: hardwareComponent.width + 'px', 
                  height: hardwareComponent.height + 'px'
                }"
                style="position: absolute"
                @click.prevent="clickComponent(hardwareComponent)"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickComponent(hardwareComponent) {
      console.log(hardwareComponent)
    }
  },
  computed: {
    hardware() {
      // TODO:получает только первое оборудование
      return this.$store.getters.HARDWARES[0];
    }
  }
}
</script>

<style lang="scss" scoped>
.hardware-view-page {
  &__canvas {
      &-wrp {
        display: flex;
        justify-content: center;
      }

      position: relative;
      width: 760px;
      height: 270px;

      background-size: 760px 270px;
    }
}
</style>