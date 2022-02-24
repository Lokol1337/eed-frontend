<template>
  <div class="create-hardware-page">
    <h1>Создание оборудования</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-2">
          <form @submit.prevent="createHardware" class="border rounded p-2"> 
            <div class="input-group mb-3">
              <input 
                v-model="name" 
                type="text" 
                class="form-control" 
                placeholder="Имя оборудования" 
                maxlength="255"
                required  
              >
            </div>
            <div class="input-group mb-3">
              <input
                :key="fileInputKey"
                @change="onFileChange" 
                class="form-control"
                type="file" 
                id="formFileMultiple" 
                required
              > 
            </div>
            <div class="input-group mb-3">
              <button type="submit" class="btn btn-primary">Сохранить</button>
            </div>
          </form>
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

import { getBase64 } from '@/utils/base64.js';

// TODO: подробить все на компоненты поменшьше
// TODO: добавить возможность удаления оборудования с холста
// TODO: добавить возможность экспортировать конфиг оборудования в JSON
// TODO: добавить доки https://vue-styleguidist.github.io/docs/Documenting.html
// TODO: напсиать кучу тестов
// TODO: добавить добавление компонетнов с несколькими фото и возможность их переключения в зависмсости от состояния
// TODO: добавить возможность настройки размера холста и соответсвенно бэкграунд изображения
// TODO: добавить возможность добавления сцен для оборудавния с большим кол-вом холсстов
export default {
  data() {
    return {
      fileInputKey: 0,
      name: '',
      background: [],
      // TODO: проверять на уникальность перед пушем
      hardwareComponents: [],
      isHardwareComponentSelect: false,
      selectedHardwareComponent: null,
    }
  },
  components: {
    VueDraggableResizable,
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for (var i = 0; i < files.length; i++) {
        getBase64(files[i]).then((res) => {
          this.background.push(res);
        }).catch((error) => {
          console.log(error);
        })
      }
    },
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
    createHardware() {
      const hardwareForSave = {
        name: this.name,
        background: this.background,
        hardwareComponents: this.hardwareComponents,
      };
      this.$store.dispatch('SAVE_HARDWARES', hardwareForSave);
      // this.hardwareReset();
    },
    onDrag(x,y) {
      if (this.selectedHardwareComponent) {
        this.selectedHardwareComponent.left = x;
        this.selectedHardwareComponent.top = y;
      }
    },
    // TODO: если вызывать onResize без клика по картинке, selectedHardware 
    // остается null и все ломается
    onResize(x, y, width, height) {      
      if (this.selectedHardwareComponent) {
        this.selectedHardwareComponent.left = x;
        this.selectedHardwareComponent.top = y;

        this.selectedHardwareComponent.width = width;
        this.selectedHardwareComponent.height = height;
      }
    },
    moveByKeys(event) {
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
      if (this.background[0]) {
        return this.background[0];
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