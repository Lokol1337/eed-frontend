<template>
  <div class="menu-wrp">
    <h1>menu</h1>
    <div
      v-for="(component, i) in addableComponents"
      :key="i"
      @click="selectComponent(component)"
      class="menu"
    >
      <span>
        {{ component.name }}
      </span>
      <img :src="component.valuesAndPhotos[0].photo" class="menu__img">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addableComponents: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectComponent(component) {
      this.$emit("selectComponent", component);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;

  &-wrp {
    overflow: auto;
    height: 300px;
  }

  &__img {
    max-width: 50px;
    max-height: 50px;
  }
}
</style>