<template>
    <div class="container-fluid row">
        <div class="col-9" @drop="dropBlock" @dragover="imgDown" id="dropzone" >
            <img class="img" src="./Jellyfish.jpg" />
        </div>
        <div class="col-3">
            <div class="">
                <div @click="showBlocks">
                    Кнопки
                </div>
                <div class="container-fluid g-0 row" style="display: none;">
                    <div class="col-6">
                        <img draggable="true" width="50px" height="50px" class=" DDimage" src="./Penguins.jpg" @drag="imgDown" @dragstart ="addBlock" />
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
            curEl: null,
        }
    },
    methods: {
        showBlocks(e) {
            e.target.nextSibling.style.display = '';
        },
        addBlock(e) {
            if (e.target.classList.contains('DDimage')) {
                this.curEl = e.target;
            }
            console.log('start');
        },
        dropBlock(e) {
            this.curEl.style.position = 'absolute';
            this.curEl.style.left = e.pageX - e.target.getBoundingClientRect().left + 'px';
            this.curEl.style.top = e.pageY -  e.target.getBoundingClientRect().top + 'px';
            this.curEl.style.width = 50 + 'px';
            this.curEl.style.height = 50 + 'px';

            document.getElementById('dropzone').appendChild(this.curEl);
            this.curEl = null;
        },
        imgDown(e) {
            e.preventDefault();
        }
    }
}
</script>