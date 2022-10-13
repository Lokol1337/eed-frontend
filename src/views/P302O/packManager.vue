<!-- <template>
  <div class="pack-manger container">
    <div class="pack-manger__list row mb-4">
      <div
        
        v-for="pack in packs"
        :id="pack.id"
        :key="pack.name"
        class="pack-manger__card col-4 col-sm-4 col-md-3 col-lg-1 btnBlock"
        :style="{
          borderColor: borderColor(pack.name),
        }"
        @click.prevent="selectPack(pack)"
      >
      
        <span class="pack-manger__card-title">
          {{ pack.name }}
        </span>
        <img class="pack-manger__card-img" :src="pack.background" />
      </div>
    </div>
  </div>
</template> -->

<script>
export default {
  props: {
    packs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      actualPack: '',
    }
  },
  methods: {
    borderColor(packName) {
      if (packName === this.actualPack) {
        return 'green';
      } else {
        return 'black'
      }
    },
    selectPack(pack) {
      this.actualPack = pack.name;
      this.$emit('selectPack', pack);
    }
  },
};
</script>

<style lang="scss" scoped>
.pack-manger {
  &__list {
    display: flex;
    flex-direction: row;

    justify-content: center;
  }

  &__card {
    margin-right: 5px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    border: 2px solid;
    border-radius: 10px;

    &:hover {
      box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
      // transform: translate(0, -25%);
      transition: 0.5s;
      cursor: pointer;
    }

    &-title {
    }

    &-img {
      max-width: 50px;
      max-height: 50px;
    }
  }
}
</style>