<template>

  <div class="col-6 p-0 m-0"
    :style="{
      height: 'auto',
      backgroundColor: `rgba(255, 255, 0, ${this.pack.next_status})`,
    }"
    @click.prevent="selectPack()">
    
    
    <img class="w-100 m-0"
    :id = "this.pack.id"
    :src="this.pack.background"
    :title = "this.pack.name"
    :style="{
      display: 'block',
      zIndex: 2,
      cursor: 'pointer',
      border: `2px solid rgba(0, 255, 0, ${this.pack.actual_status})`,
      opacity: `${this.pack.next_status? 75:100}%`, 
          }" 
        />

    </div>  
  
    
      
  </template>
  
  <script>
  //import * as hwCmpHandler from "./hwComponentsHandle.js";
  
  export default {
    props: {
        pack: {
            type: Object
        }
    },
    methods: {
      selectPack() {
        this.$emit('selectPack', this.pack);
      }
    },
    data() {
      return {
        configs: [
          {
            name: 'ВКО-12',
            rectangleWidth: 63,
            rectangleHeight: 30,
            rectangleColor: this.rectColor,
            top: 4,
            left: 2,
            id: 5,
            zoom: 100,
          },
          {
            name: 'СС-О',
            rectangleWidth: 63,
            rectangleHeight: 30,
            rectangleColor: this.rectColor,
            top: 40,
            left: 2,
            id: 1,
          },
          {
            name: 'ЛО',
            rectangleWidth: 63,
            rectangleHeight: 30,
            rectangleColor: this.rectColor,
            top: 67,
            left: 2,
            id: 2,
          },
          {
            name: 'ГО-12',
            rectangleWidth: 63,
            rectangleHeight: 55,
            rectangleColor: this.rectColor,
            top: 100,
            left: 2,
            id: 3,
          },
          {
            name: 'ПИТ',
            rectangleWidth: 63,
            rectangleHeight: 30,
            rectangleColor: this.rectColor,
            top: 155,
            left: 2,
            id: 4,
          },
          {
            name: 'ЩКНЧ1',
            rectangleWidth: 63,
            rectangleHeight: 37,
            rectangleColor: this.rectColor,
            top: 37,
            left: 65,
            id: 6,
          },
          {
            name: 'ЩКНЧ2',
            rectangleWidth: 63,
            rectangleHeight: 90,
            rectangleColor: this.rectColor,
            top: 67,
            left: 65,
            id: 7,
          },
          {
            name: 'ЩКВЧ',
            rectangleWidth: 63,
            rectangleHeight: 32,
            rectangleColor: this.rectColor,
            top: 155,
            left: 65,
            id: 8,
          },
          {
            name: 'ИПП',
            rectangleWidth: 57,
            rectangleHeight: 61,
            rectangleColor: this.rectColor,
            top: 37,
            left: 130,
            id: 10,
          },
          {
            name: 'ДСВ',
            rectangleWidth: 57,
            rectangleHeight: 54,
            rectangleColor: this.rectColor,
            top: 100,
            left: 130,
            id: 9,
          },
          {
            name: 'ДП',
            rectangleWidth: 57,
            rectangleHeight: 32,
            rectangleColor: this.rectColor,
            top: 155,
            left: 130,
            id: 11,
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
  }
  </style>