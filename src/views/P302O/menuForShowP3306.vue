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
          zIndex: 4,
          border: `0px solid ${config.rectangleColor}`,
          position: 'absolute',
          top: config.top + 'px',
          left: config.left + 'px',
          cursor: 'pointer',
          display:block,
        }" 
        @click.prevent="selectPack(packs[config.id - 1])"
      > 
      <img id="imgAllPacks"
        src="images/p-330-6/back/p-330-6-cleaned.png"
        :style="{
        //   width: 190 + 'px',
          width: 190 + 'px',
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
        // for(let i = 0; i<configs.lenght(); i++)
        this.$emit('selectPack', pack);
      }
    },
    data() {
      return {
        widthMenu: 0,
        configs: [
          {
            name: 'ВКО-12',
            rectangleWidth: 190,
            rectangleColor: this.rectColor,
            top: 4,
            left: 2,
            id: 5,
            zoom: 100,
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