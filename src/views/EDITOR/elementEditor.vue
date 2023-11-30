<template>
    <div>
        <div class="mb-5 w-100 p-1" style="background-color: #292c63;">
            <div class="d-flex justify-content-center align-items-center">
                <img src="./../mirea2.png" height="40">
                <h6 class="m-0" style="color: white">&nbsp;&nbsp;ВУЦ РТУ МИРЭА</h6>
            </div>
        </div>
        <div class="container-fluid row">
            <div class="col-10" id="dropzone">
                <img @drop="dropBlock" @dragover="imgDown" class="img" :src="'./' + mainPhoto"
                    style="border-radius: 15px;" />
            </div>
            <div class="col-2">

                <button class="btn btn-outline-primary w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                    Добавить элемент
                </button>

                <div class="container-fluid border p-2 w-100" style="border-radius: 10px;">

                    <div class="g-0 row">
                        <div v-for="photo in photoContainer" :key="photo" class="col-3 m-2">
                            <div class="DDimage d-flex" draggable="true" @drag="imgDown" @dragstart="addBlock" style="border-radius: 5px;" >
                                <img width="35px" height="35px" class="btn btn-link border p-1 m-0" draggable="false"
                                 :src="'./' + photo"  />
                                <div class="px-0 mx-0 rounded border d-none" style="background-color: rgba(255, 255, 255, 0.5);">
                                    <div class="flex-column">
                                    <p>Состояния:</p>
                                    <div class="flex-column">

                                    </div>
                                    <button class="btn btn-success">Сохранить</button>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="btn btn-outline border-danger bg-white text-danger py-3 mt-1 w-100" id="delzone"
                    @drop="dropBlock" @dragover="imgDown" @mouseover="onTrashMouseOver">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg> &nbsp;&nbsp;Удалить элемент
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
            curEl: null,
            curElClone: null,
            leftInBlock: null,
            topInBlock: null,
            shiftX: null,
            shiftY: null,
            photoContainer: null,
            mainPhoto: null,
        }
    },
    async mounted() {
        this.apparatId = this.$route.query.apparatId;
        this.blockId = this.$route.query.blockId;
        console.log(this.apparatId)
        console.log(this.blockId)
        await this.gotoElementEditor()
    },
    // async created(){
    //     // await this.gotoElementEditor()
    // },
    methods: {
        async gotoElementEditor() {
            await this.send();
        },
        async send() {
            this.serverHandler = new ServerHandler(this.$session.id());
            console.log(this.apparatId)
            console.log(this.blockId)
            let sendingData = this.serverHandler.getCreateElementsData(this.apparatId, this.blockId);
            let mes = await this.serverHandler.sendData(sendingData);
            mes = JSON.parse(mes)

            this.photoContainer = mes['elements']
            console.log('mainPhoto', this.mainPhoto)
            this.mainPhoto = mes['src']
        },
        // onTrashMouseUp(e) {
        //     console.log("UP");
        //     let trashElem = e.target;
        //     if (trashElem.classList.contains('bg-danger')) {
        //         trashElem.classList.remove('bg-danger', 'text-white');
        //         trashElem.classList.add('bg-white', 'text-danger');
        //     } else if (trashElem.classList.contains('bg-white')) {
        //         trashElem.classList.remove('bg-white', 'text-danger');
        //         trashElem.classList.add('bg-danger', 'text-white');
        //     }
        // },
        
        onTrashMouseOver(e) {
            console.log("OVER");
            let trashElem = e.target;
            if (trashElem.classList.contains('bg-danger')) {
                trashElem.classList.remove('bg-danger', 'text-white');
                trashElem.classList.add('bg-white', 'text-danger');
            } else if (trashElem.classList.contains('bg-white')) {
                trashElem.classList.remove('bg-white', 'text-danger');
                trashElem.classList.add('bg-danger', 'text-white');
            }
        },
        showBlocks(e) {
            if (e.target.nextSibling.style.display === 'none')
                e.target.nextSibling.style.display = '';
            else
                e.target.nextSibling.style.display = 'none';

        },
        addBlock(e) {
            console.log("e:", e.target);
            if (e.target.classList.contains('DDimage')) {
                this.curElClone = e.target.cloneNode(true);
                this.curEl = e.target;
            }
            console.log("curElClone:", this.curElClone);
                console.log("curEl:", this.curEl);
            this.shiftX = e.clientX - e.target.getBoundingClientRect().left;
            this.shiftY = e.clientY - e.target.getBoundingClientRect().top;
        },
        moveBlock(e) {
            if (e.target.classList.contains('DDimageMove')) {
                this.curElClone = e.target.cloneNode(true);
                this.curEl = e.target;
            } else if (e.target.id == "delzone") {
                document.getElementById('delzone').classList.add("bg-danger", "text-white");
            }
            console.log(e);
            this.shiftX = e.clientX - e.target.getBoundingClientRect().left;
            this.shiftY = e.clientY - e.target.getBoundingClientRect().top;
        },
        dropBlock(e) {
            let delzone = document.getElementById('delzone');
            if (e.target === delzone && !this.curEl.classList.contains('DDimage')) {
                this.curEl.remove();
                return;
            }
            if (e.target === delzone && this.curEl.classList.contains('DDimage'))
                return;
            let dropzone = document.getElementById('dropzone');

            console.log("dropBlock() -> curElClone: ", this.curElClone);

            this.curElClone.style.position = 'absolute';
            this.curElClone.style.left = e.pageX - this.shiftX + 'px'; // абсолютное позиционирование 
            this.curElClone.style.top = e.pageY - this.shiftY + 'px';  // абсолютное позиционирование
            this.curElClone.addEventListener('dragstart', this.moveBlock);
            if (this.curEl.classList.contains('DDimageMove')) {
                this.curEl.remove();
            }
            this.curElClone.classList.add('DDimageMove');
            this.curElClone.classList.remove('DDimage');


            dropzone.appendChild(this.curElClone);

            this.leftInBlock = this.curElClone.style.left - dropzone.offsetLeft;// относительное позиционирование
            this.topInBlock = this.curElClone.style.top - dropzone.offsetTop;// относительное позиционирование

            this.curElClone = null;
        },
        imgDown(e) {
            e.preventDefault();
        }
    },

}
</script>