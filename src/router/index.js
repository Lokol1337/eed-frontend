import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import CreateComponent from '@/views/CreateComponent.vue'
import CreateHardware from '@/views/CreateHardware.vue'
import HardwaresView from '@/views/HardwaresView.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create-component',
    name: 'createComponent',
    component: CreateComponent,
  },
  {
    path: '/create-hardware',
    name: 'createHardware',
    component: CreateHardware,
  },
  {
    path: '/hardwares-view',
    name: 'hardwaresView',
    component: HardwaresView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
