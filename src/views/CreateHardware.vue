<template>
  <div>
    <h1>Создание оборудования</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-2">
          <hardwareForm @createHardware="createHardwareHandler" />
        </div>
        <div class="col-12 col-sm-8">
          <hardwareCanvas />
        </div>
        <div v-if="!isHardwareComponentSelect" class="col-12 col-sm-2">
          <div
            v-for="(component, i) in components"
            :key="i"
            style="border: 1px solid"
          >
            <span>
              {{ component.name }}
            </span>
            <div v-for="(photo, j) in component.photos" :key="j">
              <img
                :src="photo"
                style="max-width: 190px; height: auto; cursor: pointer"
                @click.prevent="addComponentToCanvas(component)"
              />
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
              />
            </div>
            <div class="input-group mb-3">
              <label>Высота</label>
              <input
                v-model.number="selectedHardwareComponent.height"
                type="number"
                class="form-control"
                placeholder="Высота"
                maxlength="255"
              />
            </div>
            <div class="input-group mb-3">
              <label>Top</label>
              <input
                v-model.number="selectedHardwareComponent.top"
                type="number"
                class="form-control"
                placeholder="top"
                maxlength="255"
              />
            </div>
            <div class="input-group mb-3">
              <label>Left</label>
              <input
                v-model.number="selectedHardwareComponent.left"
                type="number"
                class="form-control"
                placeholder="left"
                maxlength="255"
              />
            </div>
            <div class="input-group mb-3">
              <button
                class="btn btn-primary"
                @click.prevent="closeHardwareComponent"
              >
                Закрыть
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hardwareForm from "@/components/hardware/hardwareForm.vue";
import hardwareCanvas from "@/components/hardware/hardwareCanvas.vue";
// TODO: ВСЕ положить в стор, осбенно при создания обородувания (чтобы проще обмениваться состоянмия)
// TODO: отрицательные значения координат не должны вводиться при ручном вводе
// TODO: навесить валидацию на все формы
// TODO: подробить все на компоненты поменшьше
// TODO: добавить возможность удаления оборудования с холста
// TODO: добавить возможность экспортировать конфиг оборудования в JSON
// TODO: добавить доки https://vue-styleguidist.github.io/docs/Documenting.html
// TODO: напсиать кучу тестов
// TODO: добавить добавление компонетнов с несколькими фото и возможность их переключения в зависмсости от состояния
// TODO: добавить возможность настройки размера холста и соответсвенно бэкграунд изображения
// TODO: порезать это все на маленькие компонеты, которые легко тестировать
// TODO: пертащить тудусы в доску на гитхаб, а то какой-то стыд
export default {
  data() {
    return {
    };
  },
  components: {
    hardwareForm,
    hardwareCanvas,
  },
  methods: {
    addComponentToCanvas(componentFromLib) {
      const img = new Image();
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
      };
      this.$store.dispatch("ADD_HARDWARE_COMPONENT", hardwareComponent);
      this.$store.dispatch("ADD_SELECTED_COMPONENT", hardwareComponent);
    },
    selectComponentHandler(hardwareComponent) {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", hardwareComponent);
    },
    closeHardwareComponent() {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", null);
    },
    createHardwareHandler(hardware) {
      hardware.hardwareComponents = this.hardwareComponents;
      this.$store.dispatch("SAVE_HARDWARES", hardware);
    },
  },
  computed: {
    // TODO: проверять на уникальность перед пушем
    hardwareComponents() {
      return this.$store.getters.HARDWARE_COMPONENTS;
    },
    selectedHardwareComponent() {
      return this.$store.getters.SELECTED_COMPONENT;
    },
    components() {
      return this.$store.getters.COMPONENTS;
    },
    isHardwareComponentSelect() {
      if (this.selectedHardwareComponent) {
        return true;
      }
      return false;
    },
  },
};
</script>