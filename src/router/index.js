import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateComponent from '../views/CreateComponent.vue'
import CreateHardware from '../views/CreateHardware.vue'
import HardwaresView from '../views/HardwaresView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create-component',
    name: 'CreateComponent',
    component: CreateComponent,
  },
  {
    path: '/create-hardware',
    name: CreateHardware,
    component: CreateHardware,
  },
  {
    path: '/hardwares-view',
    name: HardwaresView,
    component: HardwaresView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
