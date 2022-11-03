<template>
  <div class="menu-for-show ">
    
    <div
      class="menu-for-show__border"

      v-for="config in configs"  
      
      :key="config.name"
      :id = "config.id"
      :title = "config.name"
      :style="{
        width: config.rectangleWidth + 'px',
        height: config.rectangleHeight + 'px',
        zIndex: 2,
        border: `0px solid ${config.rectangleColor}`,
        position: 'absolute',
        top: config.top + 'px',
        left: config.left + 'px',
        cursor: 'pointer',
        display:block,
      }" 
      @click.prevent="selectPack(packs[config.id - 1])"
    > 
    
  </div>
  <img
      src="images/all_packages_min.png"
      :style="{
        width: 190 + 'px',
        height: 190 + 'px',
        zIndex: 1,
      }"
    />
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
  },
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