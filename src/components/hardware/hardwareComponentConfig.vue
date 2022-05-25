<template>
  <div>
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
        <label>Dragable</label>
        <input
          v-model.number="selectedHardwareComponent.draggable"
          type="checkbox"
        />
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-danger" @click.prevent="deleteComponentFromCanvas">
          Удалить
        </button>
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-primary" @click.prevent="closeHardwareComponent">
          Закрыть
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    closeHardwareComponent() {
      this.$store.dispatch("ADD_SELECTED_COMPONENT", null);
    },
    deleteComponentFromCanvas () {
      // TODO: заменить name на id
      this.$store.dispatch("DELETE_HARDWARE_COMPONENT", this.selectedHardwareComponent.name)
      this.closeHardwareComponent();
    }
  },
  computed: {
    selectedHardwareComponent() {
      return this.$store.getters.SELECTED_COMPONENT;
    },
  },
};
</script>