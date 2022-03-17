<template>
  <form @submit.prevent="emitCreateHardware" class="border rounded p-2">
    <div class="input-group mb-3">
      <input
        v-model="hardware.name"
        type="text"
        class="form-control"
        placeholder="Имя оборудования"
        maxlength="255"
        required
      />
    </div>
    <div class="input-group mb-3">
      <input
        @change="onFileChangeHandler"
        class="form-control"
        type="file"
        id="formFileMultiple"
        required
      />
    </div>
    <div class="input-group mb-3">
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </div>
  </form>
</template>

<script>
// TODO: добавить пропсы, чтобы можно было спускать данные, например из старницы редактирования
import { convertFileToBase64OnChange } from "@/utils/file.js";

export default {
  data() {
    return {
      hardware: {
        name: '',
        backgrounds: [],
      }
    }
  },
  methods: {
    async onFileChangeHandler(e) {
      this.hardware.backgrounds = await convertFileToBase64OnChange(e);
      this.$emit('changeHardwareBackgrounds', this.hardware.backgrounds);
    },
    emitCreateHardware() {
      this.$emit('createHardware', this.hardware);
    }
  }
}
</script>