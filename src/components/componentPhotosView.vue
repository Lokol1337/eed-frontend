<template>
  <div>
    <div>
      <button @click.prevent="prevImg">prev</button>
      <img
        :src="photos[imgIndex]"
        style="max-width: 190px; height: auto; cursor: pointer"
        @click.prevent="clickByPhoto"
      />
      <button @click.prevent="nextImg(photos.length)">next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      imgIndex: 0,
    };
  },
  methods: {
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
    clickByPhoto() {
      this.$emit('clickByPhoto');
    }
  },
};
</script>