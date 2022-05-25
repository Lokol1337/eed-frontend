const createHardware = {
  state: {
    selectedHardwareComponent: null,
    hardwareComponents: [],
    background: '',
    backgroundSettings: {
      width: 0,
      height: 0,
    },
  },

  getters: {
    SELECTED_COMPONENT: (state) => state.selectedHardwareComponent,
    HARDWARE_COMPONENTS: (state) => state.hardwareComponents,
    HARDWARE_BACKGROUND: (state) => state.background,
    BACKGROUND_SETTINGS: (state) => state.backgroundSettings,
  },

  mutations: {
    SET_SELECTED_COMPONENT: (state, payload) => {
      state.selectedHardwareComponent = payload;
    },
    // TODO: переделать на id
    SET_HARDWARE_COMPONENT: (state, payload) => {
      // TODO: think about adding to canvas process
      // if (!state.hardwareComponents.find(component => component.name === payload.name)) {
        state.hardwareComponents.push(payload);
      // }
    },
    // TODO: переделать на поиск и удаление по id, а не по name
    REMOVE_HARDWARE_COMPONENT: (state, payload) => {
      state.hardwareComponents = state.hardwareComponents.filter(component => {
        return component.name !== payload;
      })
    },
    SET_BACKGROUND: (state, payload) => {
      state.background = payload;
    },
    SET_BACKGROUND_SETTINGS: (state, payload) => {
      state.backgroundSettings = payload;
    },
    SET_DEFAULT_STATE: (state) => {
      state.selectedHardwareComponent = null;
      state.hardwareComponents = [];
      state.background = '';
      state.backgroundSettings = null;
    }
  },

  actions: {
    ADD_SELECTED_COMPONENT: (context, payload) => {
      context.commit('SET_SELECTED_COMPONENT', payload);
    },
    ADD_HARDWARE_COMPONENT: (context, payload) => {
      context.commit('SET_HARDWARE_COMPONENT', payload);
    },
    ADD_BACKGROUND: (context, payload) => {
      context.commit('SET_BACKGROUND', payload);
    },
    DELETE_HARDWARE_COMPONENT: (context, payload) => {
      context.commit('REMOVE_HARDWARE_COMPONENT', payload);
    },
    ADD_BACKGROUND_SETTINGS: (context, payload) => {
      context.commit('SET_BACKGROUND_SETTINGS', payload)
    },
    RESET_CREATE_HARDWARE: (context) => {
      context.commit('SET_DEFAULT_STATE');
    }
  },
}

export default createHardware;