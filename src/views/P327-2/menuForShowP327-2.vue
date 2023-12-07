<template>
    <div class="menu-for-show" id="menu-for-show">
      
      <div
        class="menu-for-show__border"
  
        v-for="config in configs"  
        
        :key="config.name"
        :id = "config.id"
        :title = "config.name"
        :style="{
          width: config.rectangleWidth + 'px',
          height: auto,
          top: config.top + 'px',
          left: config.left + 'px',
          border: `0px solid ${config.rectangleColor}`,
          position: 'absolute',
          cursor: 'pointer',
          display: block,
        }" 
        @click.prevent="selectPack(packs[config.id - 1])"
      > 
      <img id="imgAllPacks"
        :src=config.src
        :style="{
        //   width: 190 + 'px',
          width: 180 + 'px',
          zIndex: 1,
        }"
      />
    </div>
    
</div>
      
  </template>
  
  <script>
  
  
  export default {
    props: {
      rectColor: {
        type: String,
        default: 'green'
      },
      packName: {
        type: String,
        // default: 'ВКО-12',
      },
      packs: {
        type: Array,
        required: true,
      },
    },
    methods: {
      selectPack(pack) {
        let borderImgArr = [];
        borderImgArr = document.getElementsByClassName('menu-for-show__border');
  
        for(let i = 0; i < borderImgArr.length; i++){
          borderImgArr[i].style.border = '0px solid';  
        }
        document.getElementById(pack.id).style.border = '3px solid green';
        this.actualPack = pack.name;
        console.log("selectPack()");
        // for(let i = 0; i<configs.lenght(); i++)
        this.$emit('selectPack', pack);
      }
    },
    data() {
      return {
        widthMenu: 0,
        count_column: 1,
        count_str: 2,
        configs: [
          {
            name: 'BLOCK-1',
            rectangleWidth: 190,
            rectangleColor: this.rectColor,
            id: 1,
            top: 0,
            left: 190/this.count_column * 0,
            zoom: 100,
            src: "images/p-327-2/p-327-2_1.png"
          },    
          {
            name: 'BLOCK-2',
            rectangleWidth: 190,
            rectangleColor: this.rectColor,
            id: 2,
            top: 40,
            left: 190/this.count_column * 0,
            zoom: 100,
            src: "images/p-327-2/p-327-2_2.png"
          },           
        ],
      };
    }
  };
  
  </script>
  
  <style lang="scss" scoped>
  .menu-for-show {
    position: relative;
    width: 190px;
    &__border {
    }
  }
  </style>