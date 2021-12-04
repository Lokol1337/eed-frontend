<template>
  <div class="create-hardware-page">
    <h1>Создание оборудования</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-2">
          config
        </div>
        <div class="col-12 col-sm-8">
          <div>
            <canvas ref="canvas">
            </canvas>
          </div>
        </div>
        <div class="col-12 col-sm-2">
          <div v-for="(component, i) in components" :key="i" style="border: 1px solid">
            <span>
              {{ component.name }}
            </span>
            <div v-for="(photo, j) in component.photos" :key="j">
              <img :src="photo" style="max-width: 190px; height: auto;">
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
    setBackground(imgSrc){
      let cvn = this.$refs.canvas;
      let ctx = cvn.getContext("2d");  
      let bg = new Image();
      bg.src = imgSrc;
      bg.onload = function() {
        ctx.drawImage(bg, 0 ,0);
      };
    },    
  },
  computed: {
    components() {
      return this.$store.getters.COMPONENTS;
    }
  },
  mounted() {
    this.func();
  }
}
</script>