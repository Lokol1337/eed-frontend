<template>
  <div class="create-component-page">
    <h1>Создание компонентов</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6">
          <form @submit.prevent="createComponent" class="border rounded p-2">
            <div class="input-group mb-3">
              <input 
                v-model="name" 
                type="text" 
                class="form-control" 
                placeholder="Имя компонента" 
                maxlength="255"
                required  
              >
            </div>
            <div class="input-group mb-3">
              <input
                :key="fileInputKey"
                @change="onFileChange" 
                class="form-control"
                type="file" 
                id="formFileMultiple" 
                multiple
                required
              > 
            </div>
            <div class="input-group mb-3">
              <input 
                v-model="isCanTakeValues"
                class="form-check-input" 
                type="checkbox"
                id="flexCheckDefault"
              >
              <label 
                class="form-check-label" 
                for="flexCheckDefault" 
                style="margin-left: 5px;"
              >
                Может принмать значения
              </label>
            </div>
            <div class="input-group mb-3">
              <button type="submit" class="btn btn-primary">Создать</button>
            </div>
          </form>          
        </div>
        <div class="col-12 col-sm-6">
          <div>
            <span>
              Изображения компонента {{ name }}
            </span>
            <div v-for="(photo, j) in photos" :key="j">
              <img :src="photo">
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileInputKey: 0,
      name: '',
      photos: [],
      isCanTakeValues: false,
      values: [],
      actualValue: '',
    }
  },
  methods: {
    getBase64(inputFile) {
      const temporaryFileReader = new FileReader();
      temporaryFileReader.readAsDataURL(inputFile);

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result);
        };
      });
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      for (var i = 0; i < files.length; i++) {
        this.getBase64(files[i]).then((res) => {
          this.photos.push(res);
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    componentReset() {
      this.name = '';
      this.fileInputKey++;
      this.photos = [];
      this.isCanTakeValues = false;
      this.values = [];
      this.actualValue = '';
    },
    createComponent() {
      const componentForSave = {
        name: this.name,
        photos: this.photos,
        isCanTakeValues: this.isCanTakeValues,
        values: this.values,
        actualValue: this.actualValue,
      };
      this.$store.dispatch('SAVE_COMPONENTS', componentForSave);
      this.componentReset();
    }
  },
}
</script>