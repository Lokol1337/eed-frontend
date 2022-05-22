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
        @change="resetComponentValues"
        class="form-check-input"
        style="border-radius: 0.25em"
        type="checkbox"
        id="isCanTakeValues"
      />
      <label
        class="form-check-label"
        for="isCanTakeValues"
        style="margin-left: 5px"
      >
        Может принимать значения?
      </label>
    </div>
    <div class="input-group mb-3" v-if="component.isCanTakeValues">
      <label for="valuesInput">
        Добавьте значения, которые сможет принимать компонент
      </label>
      <div>
        <div>
        <input type="text" v-model="valueForAdd">
        <button @click.prevent="addValue">
          +
        </button>
      </div>
        <div 
          v-for="componentValue in component.values" 
          :key="componentValue"
        >
          <span>
            {{ componentValue }}
          </span>
          <button @click.prevent="deleteFromValuesList(componentValue)">
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
        name: '',
        photos: [],
        isCanTakeValues: false,
        values: [],
      },
      valueForAdd: '',
    };
  },
  methods: {
    async onFileChangeHandler(e) {
      this.component.photos = await convertFileToBase64OnChange(e);
      this.$emit('changeComponentPhotos', this.component.photos);
    },
    emitCreateComponent() {
      this.$emit('createComponent', this.component);
    },
    addValue() {
      if (this.valueForAdd !== '' &&
        !(this.component.values.find(arrValue => arrValue === this.valueForAdd))
      ) {
        this.component.values.push(this.valueForAdd);
        this.valueForAdd = '';
      } else {
        alert('Уже есть в списке значений');
      }
    },
    deleteFromValuesList(valueForDelete) {
      this.component.values = this.component.values.filter(value => value !== valueForDelete);
    },
    resetComponentValues() {
      this.component.values = [];
    }
  },
};
</script>