<template>
  <div class="create-component-page">
    <h1>Создание компонентов</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-6">
          <componentForm @createComponent="createComponentHandler" @changeComponentPhotos="changeComponentPhotosHandler"/>
        </div>
        <!-- <div class="col-12 col-sm-6">
          <div>
            <span>
              Изображения компонента
            </span>
            <componentPhotosView :photos="photos"/>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import componentForm from '@/components/component/componentForm.vue';
// import componentPhotosView from '@/components/componentPhotosView.vue';

import { convertFileToBase64OnChange } from '@/utils/file.js';

export default {
  data() {
    return {
      photos: [],
    }
  },
  components: {
    componentForm,
    // componentPhotosView,
  },
  methods: {
    async onFileChangeHandler(e) {
      this.photos = await convertFileToBase64OnChange(e);
    },
    componentReset() {
    },
    changeComponentPhotosHandler(componentPhotos) {
      this.photos = componentPhotos;
    },
    createComponentHandler(component) {
      this.$store.dispatch('SAVE_COMPONENTS', component);
    },
  },
}
</script>