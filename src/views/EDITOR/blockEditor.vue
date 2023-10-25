<template>
    <div class="container pt-5 pb-5" style="height: 100%">
        <div class="row">
            <div class="d-flex justify-content-center">
                <h4>ДОБАВЛЕНИЕ БЛОКА</h4>
            </div>

            <div class="flex-column mt-2">


                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text py-2" id="inputGroup-sizing-default">Название блока</span>
                    </div>
                    <input type="text" class="form-control py-2" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" v-model="blockName"/>
                </div>


                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-primary" @click="gotoPhotoEditor()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>&nbsp;Загрузить фотографию
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import ServerHandler from '@/api/newServerHandler.js';

export default {
    data() {
        return {
            apparatId: null,
            apparatName: "",
            flagCreateBlock: false
        };
    },
    mounted(){
        this.apparatId = this.$route.query.apparatId;
        this.apparatName = this.$route.query.apparatName;
        console.log(this.apparatId,' blockEditor.vue')
    },
    methods: {
        gotoPhotoEditor() {
            this.send();
            this.$router.push({ path: 'photoEditor', query: { apparatId: this.apparatId , blockName: this.blockName} });
        },
        async send() {
            this.serverHandler = new ServerHandler(this.$session.id());
            
            let sendingData = this.serverHandler.getCreateBlockData(
                this.apparatId, this.blockName, this.photoSrc );
            this.serverHandler.sendData(sendingData);
        },
    },
};
</script>
  