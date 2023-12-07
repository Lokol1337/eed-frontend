<template>
    <div>
        <div class="mb-5 w-100 p-1" style="background-color: #292c63;">
            <div class="d-flex justify-content-center align-items-center">
                <img src="./../mirea2.png" height="40">
                <h6 class="m-0" style="color: white">&nbsp;&nbsp;ВУЦ РТУ МИРЭА</h6>
            </div>
        </div>

        <div class="row">
            <div class="d-flex justify-content-center">
                <h4 style="font-weight: bold;">{{ blockName.toUpperCase() }}</h4>
            </div>
        </div>

        <div class="container-fluid my-5" style="height: 100%;">
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
                <img id="image" style="z-index: 0; width: 100%;">
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


            <div id="canvasContainer" class="d-none">
            </div>

            <button id="button-cutImage" class="btn btn-outline-success mt-3 me-0 d-none"
                @click="cutPhoto">Обрезать</button>
            <br><br>

            <canvas id="cutImage" style="border-radius: 15px;"></canvas>
            <br><br>

            <button id="button-nextPage" class="btn btn-primary me-0 d-none" @click="gotoElementEditor()">Далее</button>

        </div>
    </div>
</template>

<script>
import ServerHandler from '@/api/newServerHandler.js';

export default {
    data() {
        return {
            apparatId: null,
            blockName: "",
            koefWidth: null,
            koefHeight: null,
            photoTempUrl: '',
            photoSrc: "",
            fTapX: 0,
            fTapY: 0,
            curTapX: 0,
            curTapY: 0,
            canvasWidht: 0,
            canvasHeight: 0,
            lTapX: 0,
            lTapY: 0
        }
    },
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
            console.log(file)
            let imageContainer = document.getElementById('image');
            document.getElementById('impContainer').remove();
            if (file) {
                let objectUrl = URL.createObjectURL(file);
                this.photoTempUrl = objectUrl
                localStorage.setItem('myImage', objectUrl);
                document.getElementById('canvasContainer').classList.remove('d-none');

                var v = this;
                imageContainer.onload = () => {
                    v.koefWidth = imageContainer.naturalWidth / imageContainer.width;
                    v.koefHeight = imageContainer.naturalHeight / imageContainer.height;
                    // console.log(v.koefWidth + " " + v.koefHeight);
                };
                imageContainer.src = localStorage.getItem('myImage');

                document.getElementById('button-cutImage').classList.remove('d-none');
            }

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
            var v = this;
            
            image.src = this.photoTempUrl;

            image.onload = () => {
                const startImg = document.getElementById('image');
                console.log(startImg)
                const left = this.fTapX - startImg.offsetLeft;
                const top = this.fTapY - startImg.offsetTop;
                canvas.width = this.canvasWidht;
                canvas.height = this.canvasHeight;
                ctx.drawImage(image, left * v.koefWidth, top * v.koefHeight, this.canvasWidht * v.koefWidth, this.canvasHeight * v.koefHeight, 0, 0, this.canvasWidht, this.canvasHeight);
                ctx.scale(0.1, 0.1);
                setTimeout(()=>{
                    document.getElementById('button-nextPage').classList.remove('d-none');
                    if (canvas.toDataURL() != null) {
                        console.log("canvas.toDataURL() = ", canvas.toDataURL());
                        this.photoSrc = canvas.toDataURL();
                    }
                }, 500)
            };

        },

    }
}

</script>