<template>
  <form @submit.prevent="createHardware" class="border rounded p-2">
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
        name: "",
      },
    };
  },
  methods: {
    async onFileChangeHandler(e) {
      const files = await convertFileToBase64OnChange(e);
      this.$store.dispatch("ADD_BACKGROUND", files[0]);
    },
    createHardware() {
      const hardwareForSend = {
        name: this.hardware.name,
        hardwareComponents: this.$store.getters.HARDWARE_COMPONENTS,
        background: this.$store.getters.HARDWARE_BACKGROUND,
        backgroundSettings: this.$store.getters.BACKGROUND_SETTINGS,
      };
      this.$store.dispatch("SAVE_HARDWARES", hardwareForSend);
      // TODO: сбрасывать только в случае успешного сохранения сервером
      // this.$store.dispatch("RESET_CREATE_HARDWARE");
    },
  },
};
</script>