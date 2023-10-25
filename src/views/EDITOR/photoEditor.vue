<template>
    <!-- <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script> -->
    <!-- <link href="/path/to/cropper.css" rel="stylesheet"> -->
    <!-- <script src="/path/to/cropper.js"></script> -->

    <div class="container" style="height: 100%;">
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

            <!-- <a id="dimg" class="customBtn">download</a> -->
            <button class="btn btn-primary" @click="gotoElementEditor()">Далее</button>
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
            lTapY: 0
        }
    },
    mounted() {
        this.apparatId = this.$route.query.apparatId;
        this.blockName = this.$route.query.blockName;

        console.log(this.apparatId);
        console.log(this.blockName);
    },
    methods: {
        gotoElementEditor() {
            this.send();
            // this.$route.push('/elementEditor').catch(() => {});
            // console.log(this.photoSrc);
            // console.log(document.getElementById('dimg').href);
            this.$router.push({ path: 'elementEditor', query: { apparatId: this.apparatId , blockName: this.blockName} });
        },
        async send() {
            this.serverHandler = new ServerHandler(this.$session.id());
            
            let sendingData = this.serverHandler.getCreateBlockData(
                this.apparatId, this.blockName, this.photoSrc );
            this.serverHandler.sendData(sendingData);
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


    }
}

</script>