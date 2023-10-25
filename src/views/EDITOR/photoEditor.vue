<template>
    <div>
        <div class="mb-5 w-100 p-1" style="background-color: #292c63;">
            <div class="d-flex justify-content-center align-items-center">
                <img src="./../mirea2.png" height="40">
                <h6 class="m-0" style="color: white">&nbsp;&nbsp;ВУЦ РТУ МИРЭА</h6>
            </div>
        </div>
        <!-- <div>

        <div class="mb-3">
            <label for="formFile" class="form-label">Default file input example</label>
            <input class="form-control" type="file" id="formFile">
        </div>
        <button type="button">Save Image File</button>

        <br>
        <br>

        <div>
            <div>Crop Mode</div>
            <button type="button" @click="onClickSaveImageFileInCropMode">Save Image File (Crop)</button>
            <button type="button" @click="onClickSaveCrop">Save Crop</button>
            <VueSimpleImageEditor ref="cropCanvas" style="border: 1px solid red;" :width="1000" :height="1000"
                :imageSrc="imageSrc" :imageObj="imageObj" isCropMode @changeImage="onChangeImage" />
        </div>

    </div> -->

        <div class="container-fluid" style="height: 100%;">
            <div class="impContainer" id="impContainer">
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <input type="file" id="photoImp" name="photoImp" @change="takePic">
                <label for="photoImp" class="photoImp">
                    <span class="material-symbols-outlined impSvg">
                        upload
                    </span>
                </label>
            </div>

            <div class="imageContainer" @mousedown="takeBorder" @mouseup="stopBorder">
                <img id="image" style="z-index: 0;">
                <div>
                    <div class="canvasBorders" id="canvasBorders" :style="{
                        display: 'none',
                        top: curTapY + 'px',
                        left: curTapX + 'px',
                        width: canvasWidht + 'px',
                        height: canvasHeight + 'px'
                    }"></div>
                </div>
            </div>
            <div id="canvasContainer" style="display: none;">
                <br><br>

                <canvas id="cutImage"></canvas>
                <br><br>
                <button class="customBtn" @click="cutPhoto">Обрезать</button>
                <br><br>

                <button class="btn btn-primary" @click="gotoElementEditor()">Далее</button>
            </div>

        </div>
    </div>
</template>

<script>
import ServerHandler from '@/api/newServerHandler.js';
// import Vue from 'vue';
// import VueSimpleImageEditor from 'vue-simple-image-editor';

// Vue.use(VueSimpleImageEditor);

// const IMAGE_PATH = 'images/backs/dp_small.jpg'

export default {
    data() {
        return {
            apparatId: null,
            blockName: "",
            originalWidth: null,
            originalHeight: null,
            photoTempUrl: '',
            photoSrc: "",
            fTapX: 0,
            fTapY: 0,
            curTapX: 0,
            curTapY: 0,
            canvasWidht: 0,
            canvasHeight: 0,
            lTapX: 0,
            lTapY: 0,
            // imageSrc: IMAGE_PATH,
            // imageObj: null,
            // image: null
        }
    },
    // components: {
    //     VueSimpleImageEditor
    // },
    mounted() {

        this.apparatId = this.$route.query.apparatId;
        this.blockName = this.$route.query.blockName;
    },
    methods: {
        async gotoElementEditor() {
            await this.send();
            // this.$route.push('/elementEditor').catch(() => {});
            // console.log(this.photoSrc);
            // console.log(document.getElementById('dimg').href);
            this.$router.push({ path: 'elementEditor', query: { apparatId: this.apparatId, blockId: this.blockId } });
        },
        async send() {
            this.serverHandler = new ServerHandler(this.$session.id());

            let sendingData = this.serverHandler.getCreateBlockData(
                this.apparatId, this.blockName, this.photoSrc);
            let mes = await this.serverHandler.sendData(sendingData);
            mes = JSON.parse(mes)
            this.blockId = mes['block_id']
            console.log('blockId', this.blockId)
        },
        takePic(e) {
            let file = e.target.files[0];
            let imageContainer = document.getElementById('image');
            document.getElementById('impContainer').remove();
            if (file) {
                imageContainer.src = URL.createObjectURL(file);
                this.photoTempUrl = imageContainer.src
                localStorage.setItem('myImage', imageContainer.src);
                document.getElementById('canvasContainer').style.display = '';
            }
            imageContainer.src = localStorage.getItem('myImage');
        },

        takeBorder(e) {
            e.preventDefault();
            this.fTapX = 0;
            this.fTapY = 0;
            this.canvasWidht = 0;
            this.canvasHeight = 0;
            this.fTapX = e.pageX;
            this.fTapY = e.pageY;
            this.curTapX = this.fTapX;
            this.curTapY = this.fTapY;

            let canvasBorders = document.getElementById('canvasBorders');
            canvasBorders.style.display = "";
            e.target.addEventListener('mousemove', this.moveBorder);
            document.getElementById('canvasBorders').addEventListener('mousemove', this.moveBorder);
        },

        moveBorder(e) {
            e.preventDefault();

            this.canvasWidht = Math.abs(this.fTapX - e.pageX)
            this.canvasHeight = Math.abs(this.fTapY - e.pageY)
            if (e.pageX <= this.curTapX) {
                this.curTapX = e.pageX;
            }
            else if (e.pageX > this.curTapX && e.pageX <= this.fTapX) {
                this.curTapX = e.pageX;
            }

            if (e.pageY <= this.curTapY) {
                this.curTapY = e.pageY;
            }
            else if (e.pageY > this.curTapY && e.pageY <= this.fTapY) {
                this.curTapY = e.pageY;
            }

        },
        stopBorder(e) {
            e.target.removeEventListener("mousemove", this.moveBorder, false);
            document.getElementById('canvasBorders').removeEventListener("mousemove", this.moveBorder, false);

            e.preventDefault()

            this.lTapX = e.pageX;
            this.lTapY = e.pageY;

            if (this.lTapX < this.fTapX) {
                let buf = this.fTapX;
                this.fTapX = this.lTapX;
                this.lTapX = buf;
            }
            if (this.lTapY < this.fTapY) {
                let buf = this.fTapY;
                this.fTapY = this.lTapY;
                this.lTapYT = buf;
            }
        },

        cutPhoto() {
            const canvas = document.getElementById("cutImage");
            const ctx = canvas.getContext("2d");

            const image = new Image;

            image.onload = () => {
                const startImg = document.getElementById('image');
                const left = this.fTapX - startImg.offsetLeft;
                const top = this.fTapY - startImg.offsetTop;
                canvas.width = this.canvasWidht;
                canvas.height = this.canvasHeight;
                ctx.drawImage(image, left, top, this.canvasWidht, this.canvasHeight, 0, 0, this.canvasWidht, this.canvasHeight);
            };
            image.src = this.photoTempUrl;
            if (canvas.toDataURL() != null) {
                // document.getElementById('dimg').href = canvas.toDataURL();
                this.photoSrc = canvas.toDataURL();
            }
        },

        // onChangeImageFile(evt) {
        //     this.imageSrc = null
        //     this.imageObj = null
        //     const files = evt.target.files
        //     if (files.length > 0) {
        //         const file = files[0]
        //         const reader = new FileReader()
        //         reader.onload = e => {
        //             const image = new Image()
        //             image.onload = e => {
        //                 this.imageObj = image
        //                 while (this.$refs.container.hasChildNodes()) {
        //                     this.$refs.container.removeChild(this.$refs.container.firstChild)
        //                 }
        //                 this.$refs.container.appendChild(image)
        //                 console.log(e.target.result)
        //             }
        //             image.src = e.target.result
        //         }
        //         reader.readAsDataURL(file)
        //     } else {
        //         this.imageSrc = IMAGE_PATH
        //     }
        // },
        // onClickSaveImageFile() {
        //     if (this.image) {
        //         const { width, height } = this.image
        //         const canvas = document.createElement('canvas')
        //         canvas.width = width
        //         canvas.height = height
        //         canvas.getContext('2d').drawImage(this.image, 0, 0, width, height)
        //         canvas.toBlob(function (blob) {
        //             const downloadLink = document.createElement('a')
        //             downloadLink.href = URL.createObjectURL(blob)
        //             downloadLink.download = 'imageFile.jpeg'
        //             document.body.appendChild(downloadLink)
        //             downloadLink.click()
        //             document.body.removeChild(downloadLink)
        //         }, 'image/jpeg')
        //     }
        // },
        // onClickSaveImageFileInMutliMode() {
        //     this.$refs.multiCanvas.saveImageFile()
        // },
        // onClickSaveImageFileInMutliModeWithFixedCrop() {
        //     this.$refs.multiCanvasWithFixedCrop.saveImageFile()
        // },
        // onClickSaveImageFileInResizeMode() {
        //     this.$refs.resizeCanvas.saveImageFile()
        // },
        // onClickSaveImageFileInCropMode() {
        //     this.$refs.cropCanvas.saveImageFile()
        // },
        // onClickSaveCrop() {
        //     this.$refs.cropCanvas.crop()
        // },
        // onClickSaveImageFileInCropModeWithFixedCrop() {
        //     this.$refs.cropCanvasWithFixedCrop.saveImageFile()
        // },
        // onClickSaveCropWithFixedCrop() {
        //     this.$refs.cropCanvasWithFixedCrop.crop()
        // },
        // onChangeImage(image) {
        //     this.image = image
        // }


    }
}

</script>