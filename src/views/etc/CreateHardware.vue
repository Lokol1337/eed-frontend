<template>
  <div>
    <h1>Создание оборудования</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-2">
          <hardwareForm />
          <canvasConfig class="mt-3"/>
        </div>
        <div class="col-12 col-sm-8">
          <hardwareCanvas
            v-if="canvasMode === 'createHardware'" 
            canvasMode="createHardware"
            :hardwareComponents="hardwareComponents"
            :bgImage="bgImage"
            :backgroundSettings="backgroundSettings"
          />
          <hardwareCanvas 
            v-if="canvasMode === 'viewHardware'" 
            canvasMode="viewHardware"
            :hardwareComponents="hardwareComponents"
            :bgImage="bgImage"
            :backgroundSettings="backgroundSettings"
          />
          <div>
            <span>
              {{ canvasMode }}
            </span>
            <button @click="changeCanvasMode">
              change mode
            </button>
          </div>          
        </div>
        <div v-if="!isHardwareComponentSelect" class="col-12 col-sm-2">
          <componentList />
        </div>
        <div v-else class="col-12 col-sm-2">
          <hardwareComponentConfig />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hardwareForm from "@/components/hardware/hardwareForm.vue";
import hardwareCanvas from "@/components/hardware/hardwareCanvas.vue";
import componentList from "@/components/hardware/componentList.vue";
import hardwareComponentConfig from "@/components/hardware/hardwareComponentConfig.vue";
import canvasConfig from "@/components/hardware/canvasConfig.vue";
// TODO: add to config z-index config
// TODO: унифицировать размер холста всех компонентов и страниц
// TODO: добавить возможность перемщения после клика в режиме создания упражнения
// TODO: навесить валидацию на все формы
// TODO: добавить возможность экспортировать конфиг оборудования в JSON
// TODO: добавить доки https://vue-styleguidist.github.io/docs/Documenting.html
// TODO: добавить добавление компонетнов с несколькими фото и возможность их переключения в зависмсости от состояния 
export default {
  data() {
    return {
      canvasMode: 'createHardware',
    }
  },
  components: {
    hardwareForm,
    hardwareCanvas,
    componentList,
    hardwareComponentConfig,
    canvasConfig
  },
  methods: {
    selectComponentHandler(hardwareComponent) {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", hardwareComponent);
    },
    changeCanvasMode() {
      if (this.canvasMode === 'createHardware') {
        this.canvasMode = 'viewHardware';
      } else if (this.canvasMode === 'viewHardware'){
        this.canvasMode = 'createHardware';
      }
    }
  },
  computed: {
    hardwareComponents() {
      return this.$store.getters.HARDWARE_COMPONENTS;
    },
    selectedHardwareComponent() {
      return this.$store.getters.SELECTED_COMPONENT;
    },
    isHardwareComponentSelect() {
      if (this.selectedHardwareComponent) {
        return true;
      }
      return false;
    },
    bgImage() {
      return this.$store.getters.HARDWARE_BACKGROUND;
    },
    backgroundSettings() {
      return this.$store.getters.BACKGROUND_SETTINGS;
    },
  },
};
</script>