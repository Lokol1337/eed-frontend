import components from '@/mocks/components.json'

const hardwareComponent = {
  state: {
    components: components
  },

  getters: {
    COMPONENTS: (state) => state.components,
  },

  mutations: {
    SET_COMPONENTS: (state, payload) => {
      state.components.push(payload);
    }
  },

  actions: {
    SAVE_COMPONENTS: (context, payload) => {
      context.commit('SET_COMPONENTS', payload);
    }
  },
}

export default hardwareComponent;