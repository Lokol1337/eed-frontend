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
      <div v-for="(photo, j) in component.photos" :key="j">
        <img
          :src="photo"
          style="max-width: 190px; height: auto; cursor: pointer"
          @click.prevent="addComponentToCanvas(component)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addComponentToCanvas(componentFromLib) {
      const img = new Image();
      img.src = componentFromLib.photos[0];
      const imgWidth = Number(img.width);
      const imgHeight = Number(img.height);
      const hardwareComponent = {
        name: componentFromLib.name,
        photo: componentFromLib.photos[0],
        top: 0,
        left: 0,
        width: imgWidth,
        height: imgHeight,
      };
      this.$store.dispatch("ADD_HARDWARE_COMPONENT", hardwareComponent);
      this.$store.dispatch("ADD_SELECTED_COMPONENT", hardwareComponent);
    },
  },
  computed: {
    components() {
      return this.$store.getters.COMPONENTS;
    },
  },
};
</script>
