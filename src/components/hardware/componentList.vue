<template>
  <div style="max-height: 500px; overflow-y: scroll">
    <div
      v-for="(component, i) in components"
      :key="i"
      style="border: 1px solid"
    >
      <span>
        {{ component.name }}
      </span>
      <div>
        <componentPhotosView
          :valuesAndPhotos="component.valuesAndPhotos"
          @clickByPhoto="addComponentToCanvas(component)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import componentPhotosView from "@/components/componentPhotosView.vue";

export default {
  data() {
    return {
      imgIndex: 0,
    };
  },
  components: {
    componentPhotosView,
  },
  methods: {
    addComponentToCanvas(componentFromLib) {
      const img = new Image();
      img.src = componentFromLib.valuesAndPhotos[0].photo;
      const imgWidth = Number(img.width);
      const imgHeight = Number(img.height);

      componentFromLib.top  = 0;
      componentFromLib.left  = 0;
      componentFromLib.width  = imgWidth;
      componentFromLib.height  = imgHeight;

      this.$store.dispatch("ADD_HARDWARE_COMPONENT", {...componentFromLib});
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
    },
  },
  computed: {
    components() {
      return this.$store.getters.COMPONENTS;
    },
  },
};
</script>
