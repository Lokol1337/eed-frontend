import Vue from 'vue'
import Vuex from 'vuex'

import hardwareComponent from './hardware-component.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hardwareComponent
  },
})
