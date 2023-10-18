<template>
  <div class="container pt-5 pb-5" style="height: 100%">
    <div class="row">
      <div class="d-flex justify-content-center">
        <h4>СОЗДАНИЕ АППАРАТУРЫ</h4>
      </div>

      <div class="flex-column mt-2">
        <!-- <div class="d-flex justify-content-center">
          <div class="d-flex">
            <label for="input-apparatName" class="my-0 me-2"
              >Введите название аппаратуры:
            </label>
            <input id="input-apparatName" type="text" />
          </div>
        </div> -->

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text py-2" id="inputGroup-sizing-default">Название аппаратуры</span>
          </div>
          <input id="input-apparatName" type="text" class="form-control py-2" aria-label="Default"
            aria-describedby="inputGroup-sizing-default" v-model="apparatName" />
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Описание аппаратуры</span>
          </div>
          <textarea class="form-control" aria-label="With textarea" v-model="apparatDescription"></textarea>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-primary" @click="gotoBlockEditor()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
            </svg>&nbsp;Добавить блок
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as util from "../utilities.js";
import ServerHandler from '@/api/newServerHandler.js';

export default {
  props: {
    serverHandler: {
      type: ServerHandler,
    },
  },
  data() {
    return {
      apparatName: "",
      apparatDescription: "",
      flagCreateBlock: false
    };
  },
  methods: {
    gotoBlockEditor() {
      this.send();
      this.$router.push({ path: 'blockEditor' });
    },
    async send() {
      this.serverHandler = new ServerHandler(this.$session.id());
      let sendingData = this.serverHandler.getCreateApparatData(this.apparatName, this.apparatDescription);
      this.serverHandler.sendData(sendingData);
    },
  },
};
</script>
