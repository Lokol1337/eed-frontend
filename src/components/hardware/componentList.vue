<template>
  <div>
    <div
      v-for="(component, i) in components"
      :key="i"
      style="border: 1px solid"
    >
      <span>
        {{ component.name }}
      </span>
      <div>
        <componentPhotosView :photos="component.photos" @clickByPhoto="addComponentToCanvas(component)"/>
      </div>
    </div>
  </div>
</template>

<script>
import componentPhotosView from '@/components/componentPhotosView.vue'

export default {
  data() {
    return {
      imgIndex: 0,
    }
  },
  components: {
    componentPhotosView,
  },
  methods: {
    addComponentToCanvas(componentFromLib) {
      const img = new Image();
      img.src = componentFromLib.photos[0];
      const imgWidth = Number(img.width);
      const imgHeight = Number(img.height);

      const hardwareComponent = {
        name: componentFromLib.name,
        photos: componentFromLib.photos,
        top: 0,
        left: 0,
        width: imgWidth,
        height: imgHeight,
      };

      this.$store.dispatch("ADD_HARDWARE_COMPONENT", hardwareComponent);
    },
    nextImg(photosArrLength) {
      if (this.imgIndex < photosArrLength - 1) {
        this.imgIndex++;
      } 
    },
    prevImg() {
      if (this.imgIndex > 0) {
        this.imgIndex--;
      }
    }
  },
  computed: {
    components() {
      return this.$store.getters.COMPONENTS;
    },
  },
};
</script>
