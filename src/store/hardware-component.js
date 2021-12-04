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
      console.log(payload);
      state.components.push(payload);
    }
  },

  actions: {
    SAVE_COMPONENTS: (state, payload) => {
      state.commit('SET_COMPONENTS', payload);
    }
  },
}

export default hardwareComponent;