<template>
  <form @submit.prevent="emitCreateComponent" class="border rounded p-2">
    <div class="input-group mb-3">
      <input
        v-model="component.name"
        type="text"
        class="form-control"
        placeholder="Имя компонента"
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
        multiple
        required
      />
    </div>
    <div class="input-group mb-3 form-check">
      <input
        v-model="component.isCanTakeValues"
        class="form-check-input"
        style="border-radius: 0.25em"
        type="checkbox"
        id="flexCheckDefault"
      />
      <label
        class="form-check-label"
        for="flexCheckDefault"
        style="margin-left: 5px"
      >
        Может принмать значения?
      </label>
    </div>
    <div class="input-group mb-3">
      <button type="submit" class="btn btn-primary">Создать</button>
    </div>
  </form>
</template>

<script>
// TODO: добавить пропсы, чтобы можно было спускать данные, например из старницы редактирования
import { convertFileToBase64OnChange } from "@/utils/file.js";

export default {
  data() {
    return {
      component: {
        name: '',
        photos: [],
        isCanTakeValues: false,
      }
    };
  },
  methods: {
    async onFileChangeHandler(e) {
      this.component.photos = await convertFileToBase64OnChange(e);
      this.$emit('changeComponentPhotos', this.component.photos);
    },
    emitCreateComponent() {
      this.$emit('createComponent', this.component);
    }
  },
};
</script>