const createHardware = {
  state: {
    selectedHardwareComponent: null,
    hardwareComponents: [],
    background: '',
  },

  getters: {
    SELECTED_COMPONENT: (state) => state.selectedHardwareComponent,
    HARDWARE_COMPONENTS: (state) => state.hardwareComponents,
    HARDWARE_BACKGROUND: (state) => state.background,
  },

  mutations: {
    SET_SELECTED_COMPONENT: (state, payload) => {
      state.selectedHardwareComponent = payload;
    },
    SET_HARDWARE_COMPONENT: (state, payload) => {
      state.hardwareComponents.push(payload);
    },
    // TODO: переделать на поиск и удаление по id, а не по name
    REMOVE_HARDWARE_COMPONENT: (state, payload) => {
      state.hardwareComponents = state.hardwareComponents.filter(component => {
        return component.name !== payload;
      })
    },
    SET_BACKGROUND: (state, payload) => {
      state.background = payload;
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
    }
  },
}

export default createHardware;