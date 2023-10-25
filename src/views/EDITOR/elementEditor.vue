<template>
    <div class="container-fluid row">
        <div class="col-10" id="dropzone">
            <img @drop="dropBlock" @dragover="imgDown" class="img" src="./p-327-2_1_clear.png" />
        </div>
        <div class="col-2">
            <div class="">
                
                <div class="container-fluid g-0 row" >
                    
                </div>
            </div>
            <div class="delzone" id="delzone" @drop="dropBlock" @dragover="imgDown"></div>
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
        }
    },
    mounted() {
        this.apparatId = this.$route.query.apparatId;
        this.blockName = this.$route.query.blockName;
        console.log(this.apparatId);
        console.log(this.blockName);
    },
    async created(){
        await this.gotoElementEditor()
    },
    methods: {
        async gotoElementEditor() {
            await this.send();
        },
        async send() {
            this.serverHandler = new ServerHandler(this.$session.id());

            let sendingData = this.serverHandler.getCreateElementsData();
            let mes = await this.serverHandler.sendData(sendingData);
            mes = JSON.parse(mes)

            this.photoContainer = mes['elements']
        },
        showBlocks(e) {
            if (e.target.nextSibling.style.display === 'none')
                e.target.nextSibling.style.display = '';
            else
                e.target.nextSibling.style.display = 'none';

        },
        addBlock(e) {
            if (e.target.classList.contains('DDimage')) {
                this.curElClone = e.target.cloneNode(true);
                this.curEl = e.target;
            }
            this.shiftX = e.clientX - e.target.getBoundingClientRect().left;
            this.shiftY = e.clientY - e.target.getBoundingClientRect().top;
        },
        moveBlock(e) {
            if (e.target.classList.contains('DDimageMove')) {
                this.curElClone = e.target.cloneNode(true);
                this.curEl = e.target;
            }
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