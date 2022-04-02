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
// TODO: навесить валидацию на все формы
// TODO: добавить возможность экспортировать конфиг оборудования в JSON
// TODO: добавить доки https://vue-styleguidist.github.io/docs/Documenting.html
// TODO: напсиать кучу тестов
// TODO: добавить добавление компонетнов с несколькими фото и возможность их переключения в зависмсости от состояния (progress)
// TODO: добавить возможность настройки размера холста и соответсвенно бэкграунд изображения
// TODO: порезать это все на маленькие компонеты, которые легко тестировать
// TODO: пертащить тудусы в доску на гитхаб, а то какой-то стыд
export default {
  components: {
    hardwareForm,
    hardwareCanvas,
    componentList,
    hardwareComponentConfig,
  },
  methods: {
    selectComponentHandler(hardwareComponent) {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", hardwareComponent);
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
    isHardwareComponentSelect() {
      if (this.selectedHardwareComponent) {
        return true;
      }
      return false;
    },
  },
};
</script>