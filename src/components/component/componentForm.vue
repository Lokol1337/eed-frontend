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
      <!-- TODO: fix h tag, by semantic its not h -->
      <h5 for="valuesInput">Добавьте занчения и фотографии этих значений</h5>
      <div>
        <div>
          <input type="text" v-model="forAdd.value" />
          <input type="file" ref="fileupload" @change="onFileChangeHandler($event)"/>
          <img v-if="forAdd.photo !== ''" 
            width="75" 
            height="75" 
            :src="forAdd.photo"
          >
          <button @click.prevent="addValue">+</button>
        </div>
        <div v-for="(valuePhoto, i) in component.valuesAndPhotos" :key="i">
          <span>
            {{ valuePhoto.value }}
          </span>
          <img width="75" height="75" :src="valuePhoto.photo">
          <button @click.prevent="deleteFromValuesList(valuePhoto)">
            -
          </button>
        </div>
      </div>
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
        name: "",
        valuesAndPhotos: [],
        draggable: true,
      },
      forAdd: {
        value: '',
        photo: '',
      },
    };
  },
  methods: {
    async onFileChangeHandler(e) {
      const photosBase64 = await convertFileToBase64OnChange(e);
      this.forAdd.photo = photosBase64[0];
    },
    emitCreateComponent() {
      this.$emit("createComponent", this.component);
    },
    addValue() {
      if (this.forAdd.value !== "" &&
        !this.component.valuesAndPhotos.some(valuesAndPhotosSrc => valuesAndPhotosSrc.value === this.forAdd.value)
      ) {
        const objForAdd = {...this.forAdd}
        this.component.valuesAndPhotos.push(objForAdd);

        this.forAdd.value = '';
        this.forAdd.photo = '';
        this.$refs.fileupload.value = null;
      } else {
        alert("Уже есть в списке значений");
      }
    },
    deleteFromValuesList(valuePhoto) {
      this.component.valuesAndPhotos = this.component.valuesAndPhotos.filter(
        (valuesAndPhotosSrc) => valuesAndPhotosSrc.value !== valuePhoto.value
      );
    },
    resetComponentForm() {
      // TODO: add reset component form
      // this.component.values = [];
    },
  },
};
</script>