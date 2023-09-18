<template>
    <div class="container">
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
        <canvas id="cutImage"></canvas>

        <button class="" @click="cutPhoto">Обезать</button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            photoSrc: '',
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
    methods: {
        takePic(e) {
            let files = e.target.files[0];
            let imageContainer = document.getElementById('image');
            document.getElementById('impContainer').remove();
            if (files) {

                imageContainer.src = URL.createObjectURL(files);
                this.photoSrc = imageContainer.src
                localStorage.setItem('myImage', imageContainer.src);
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
                console.log(left, top, this.canvasWidht, this.canvasHeight);
                canvas.width = this.canvasWidht;
                canvas.height = this.canvasHeight;
                ctx.drawImage(image, left, top, this.canvasWidht, this.canvasHeight, 0 , 0 , this.canvasWidht, this.canvasHeight);
            };

            image.src = this.photoSrc;


        }


    }
}

</script>