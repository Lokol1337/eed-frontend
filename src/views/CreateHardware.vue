<template>
  <div class="create-hardware-page">
    <h1>Создание оборудования</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-2">
          <hardwareForm @createHardware="createHardwareHandler" @changeHardwareBackgrounds="changeHardwareBackgroundsHandler"/>
        </div>
        <div class="col-12 col-sm-8">
          <div class="create-hardware-page__canvas-wrp">
            <div 
              class="create-hardware-page__canvas" 
              style="background-color: #ffffff"
              :style="{ 'background-image': 'url(' + backgroundImg + ')' }"
            >
              <vue-draggable-resizable v-for="(hardwareComponent, i) in hardwareComponents" :key="i"  
                @dragging="onDrag" 
                @resizing="onResize"
                :w="hardwareComponent.width"
                :h="hardwareComponent.height" 
                :x="hardwareComponent.left"
                :y="hardwareComponent.top"
                :parent="true"
              >
                <button
                  @keyup='moveByKeys'
                  class="create-hardware-page__canvas-item-button"
                >
                  <img 
                    :src="hardwareComponent.photo"
                    :style="{ 
                      width: hardwareComponent.width + 'px', 
                      height: hardwareComponent.height + 'px'
                    }"
                    @click.prevent="selectComponent(hardwareComponent)" 
                  >
                </button>
              </vue-draggable-resizable>
            </div>
          </div>
        </div>
        <div v-if="!isHardwareComponentSelect" class="col-12 col-sm-2">
          <div v-for="(component, i) in components" :key="i" style="border: 1px solid">
            <span>
              {{ component.name }}
            </span>
            <div v-for="(photo, j) in component.photos" :key="j">
              <img 
                :src="photo" 
                style="max-width: 190px; height: auto; cursor: pointer;"
                @click.prevent="addComponentToCanvas(component)"
              >
            </div>
          </div>
        </div>
        <div v-else class="col-12 col-sm-2">
          <span>Компонент {{ selectedHardwareComponent.name }}</span>
          <form class="border rounded p-2"> 
            <div class="input-group mb-3">
              <label>Ширина</label>
              <input
                v-model.number="selectedHardwareComponent.width"
                type="number" 
                class="form-control" 
                placeholder="Ширина" 
                maxlength="255"
              >
            </div>
            <div class="input-group mb-3">
              <label>Высота</label>
              <input
                v-model.number="selectedHardwareComponent.height" 
                type="number" 
                class="form-control" 
                placeholder="Высота" 
                maxlength="255"
              >
            </div>
            <div class="input-group mb-3">
              <label>Top</label>
              <input
                v-model.number="selectedHardwareComponent.top" 
                type="number" 
                class="form-control" 
                placeholder="top" 
                maxlength="255"
              >
            </div>
            <div class="input-group mb-3">
              <label>Left</label>
              <input
                v-model.number="selectedHardwareComponent.left" 
                type="number" 
                class="form-control" 
                placeholder="left" 
                maxlength="255"
              >
            </div>
            <div class="input-group mb-3">
              <button class="btn btn-primary" @click.prevent="closeHardwareComponent">Закрыть</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

import hardwareForm from '@/components/hardware/hardwareForm.vue';

// TODO: отрицательные значения координат не должны вводиться при ручном вводе
// TODO: навесить валидацию на все формы
// TODO: подробить все на компоненты поменшьше
// TODO: добавить возможность удаления оборудования с холста
// TODO: добавить возможность экспортировать конфиг оборудования в JSON
// TODO: добавить доки https://vue-styleguidist.github.io/docs/Documenting.html
// TODO: напсиать кучу тестов
// TODO: добавить добавление компонетнов с несколькими фото и возможность их переключения в зависмсости от состояния
// TODO: добавить возможность настройки размера холста и соответсвенно бэкграунд изображения
// TODO: добавить возможность добавления сцен для оборудавния с большим кол-вом холсстов
// TODO: порезать это все на маленькие компонеты, которые легко тестировать
// TODO: пертащить тудусы в доску на гитхаб, а то какой-то стыд
export default {
  data() {
    return {
      name: '',
      backgrounds: [],
      // TODO: проверять на уникальность перед пушем
      hardwareComponents: [],
      isHardwareComponentSelect: false,
      selectedHardwareComponent: null,
    }
  },
  components: {
    VueDraggableResizable,
    hardwareForm,
  },
  methods: {
    addComponentToCanvas(componentFromLib) {
      let img = new Image();
      img.src = componentFromLib.photos[0];
      const imgWidth = Number(img.width);
      const imgHeight = Number(img.height);
      const hardwareComponent = {
        name: componentFromLib.name,
        photo: componentFromLib.photos[0],
        top: 0,
        left: 0,
        width: imgWidth,
        height: imgHeight,
      } 
      this.hardwareComponents.push(hardwareComponent);
    },
    selectComponent(hardwareComponent) {
      this.selectedHardwareComponent = hardwareComponent; 
      this.isHardwareComponentSelect = true;
    },
    closeHardwareComponent() {
      this.selectedHardwareComponent = null;
      this.isHardwareComponentSelect = false;
    },
    createHardwareHandler(hardware) {
      hardware.hardwareComponents = this.hardwareComponents;
      this.$store.dispatch('SAVE_HARDWARES', hardware);
    },
    changeHardwareBackgroundsHandler(backgrounds) {
      this.backgrounds = backgrounds;
    },
    onDrag(x,y) {
      if (this.selectedHardwareComponent) {
        this.selectedHardwareComponent.left = x;
        this.selectedHardwareComponent.top = y;
      }
    },
    onResize(x, y, width, height) {      
      if (this.selectedHardwareComponent) {
        this.selectedHardwareComponent.left = x;
        this.selectedHardwareComponent.top = y;

        this.selectedHardwareComponent.width = width;
        this.selectedHardwareComponent.height = height;
      }
    },
    moveByKeys(event) {
      // TODO: валидировать. Не должно быть больше/меньше размеров холста
      // TODO: переписать на свитч кейс
      if (event.keyCode == 38) {
        this.selectedHardwareComponent.top--;
      } else if (event.keyCode == 40) {
        this.selectedHardwareComponent.top++;
      } else if (event.keyCode == 37) {
        this.selectedHardwareComponent.left--
      } else if (event.keyCode == 39) {
        this.selectedHardwareComponent.left++;
      } 
    }
  },
  computed: {
    components() {
      return this.$store.getters.COMPONENTS;
    },
    backgroundImg() {
      if (this.backgrounds[0]) {
        return this.backgrounds[0];
      } else {
        return '';
      }
    }
  },
  watch: {
    selectedHardwareComponent: {
      handler(val) {
        if (val) {
          for (let i = 0; i < this.hardwareComponents.length; i++) {
            if (this.hardwareComponents[i].name === this.selectedHardwareComponent.name) {
              // TODO: Из-за проверки на имя нельзя добавить два одинвковых
              // фото(а тут, скорее всего, это и не надо) одного компонента
              // ---
              // затирает компоненты с одинаковым именем
              this.hardwareComponents[i] = val;
            }
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-hardware-page {
    &__canvas {
      &-wrp {
        display: flex;
        justify-content: center;
      }

      border: 1px solid;
      position: relative;
      width: 760px;
      height: 270px;
      background-size: 760px 270px;

      &-item {
        &-button {
          border: none;
          margin: 0;
          padding: 0;

          background: transparent;
        }
      }
    }
  }
</style>