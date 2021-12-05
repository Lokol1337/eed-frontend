const hardware = {
  state: {
    hardwares: []
  },

  getters: {
    HARDWARES: (state) => state.hardwares,
  },

  mutations: {
    SET_HARDWARES: (state, payload) => {
      state.hardwares.push(payload);
    }
  },

  actions: {
    SAVE_HARDWARES: (state, payload) => {
      state.commit('SET_HARDWARES', payload);
    }
  },
}

export default hardware;