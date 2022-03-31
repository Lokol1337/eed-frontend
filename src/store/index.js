import Vue from 'vue'
import Vuex from 'vuex'

import hardwareComponent from './hardware-component.js';
import hardware from './hardware.js';
import createHardware from './create-hardware.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hardwareComponent,
    hardware,
    createHardware,
  },
})
