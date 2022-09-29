<template>
  <div class="menu-for-show">
    <div
      class="menu-for-show__border"
      v-for="config in configs"
      :key="config.name"
      v-show="config.name === packName"
      :style="{
        width: config.rectangleWidth + 'px',
        height: config.rectangleHeight + 'px',
        zIndex: 2,
        border: `3px solid ${config.rectangleColor}`,
        borderRadius: 5 + 'px',
        position: 'absolute',
        top: config.top + 'px',
        left: config.left + 'px',
      }"
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
        },
        {
          name: 'СС-О',
          rectangleWidth: 63,
          rectangleHeight: 30,
          rectangleColor: this.rectColor,
          top: 40,
          left: 2,
        },
        {
          name: 'ЛО',
          rectangleWidth: 63,
          rectangleHeight: 30,
          rectangleColor: this.rectColor,
          top: 67,
          left: 2,
        },
        {
          name: 'ГО-12',
          rectangleWidth: 63,
          rectangleHeight: 55,
          rectangleColor: this.rectColor,
          top: 100,
          left: 2,
        },
        {
          name: 'ПИТ',
          rectangleWidth: 63,
          rectangleHeight: 30,
          rectangleColor: this.rectColor,
          top: 155,
          left: 2,
        },
        {
          name: 'ЩКНЧ1',
          rectangleWidth: 63,
          rectangleHeight: 37,
          rectangleColor: this.rectColor,
          top: 37,
          left: 65,
        },
        {
          name: 'ЩКНЧ2',
          rectangleWidth: 63,
          rectangleHeight: 90,
          rectangleColor: this.rectColor,
          top: 67,
          left: 65,
        },
        {
          name: 'ЩКВЧ',
          rectangleWidth: 63,
          rectangleHeight: 32,
          rectangleColor: this.rectColor,
          top: 155,
          left: 65,
        },
        {
          name: 'ИПП',
          rectangleWidth: 57,
          rectangleHeight: 61,
          rectangleColor: this.rectColor,
          top: 37,
          left: 130,
        },
        {
          name: 'ДСВ',
          rectangleWidth: 57,
          rectangleHeight: 54,
          rectangleColor: this.rectColor,
          top: 100,
          left: 130,
        },
        {
          name: 'ДП',
          rectangleWidth: 57,
          rectangleHeight: 32,
          rectangleColor: this.rectColor,
          top: 155,
          left: 130,
        },              
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-for-show {
  position: relative;
  width:auto;
  &__border {
  }
}
</style>