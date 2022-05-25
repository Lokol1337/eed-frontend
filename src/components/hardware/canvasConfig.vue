<template>
  <form class="border rounded p-2">
    <div class="input-group mb-3">
      <input
        v-model.number="canvasSetting.width"
        @input="createConfig"
        type="number"
        class="form-control"
        placeholder="Ширина"
        maxlength="255"
        required
      />
    </div>
    <div class="input-group mb-3">
      <input
        v-model.number="canvasSetting.height"
        @input="createConfig"
        type="number"
        class="form-control"
        placeholder="Высота"
        maxlength="255"
        required
      />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      // TODO: навесить валидвцию
      canvasSetting: {
        width: 856,
        height: 300,
      }
    }
  },
  methods: {
    createConfig() {
      this.$store.dispatch('ADD_BACKGROUND_SETTINGS', this.canvasSetting);
    }
  },
  created() {
    this.createConfig();
  }
}
</script>