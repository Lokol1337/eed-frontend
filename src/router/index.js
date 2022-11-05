import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '@/views/Home.vue';
// import CreateComponent from '@/views/CreateComponent.vue';
// import CreateHardware from '@/views/CreateHardware.vue';
// import HardwaresView from '@/views/HardwaresView.vue';
import Login from '@/views/Login.vue';

// not designer hardware, demo page P-302-O
import P3020 from '@/views/P302O.vue';
import P3306 from '@/views/P3306.vue';
import MAIN from '@/views/MAIN.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/create-component',
  //   name: 'createComponent',
  //   component: CreateComponent,
  // },
  // {
  //   path: '/create-hardware',
  //   name: 'createHardware',
  //   component: CreateHardware,
  // },
  // {
  //   path: '/hardwares-view',
  //   name: 'hardwaresView',
  //   component: HardwaresView,
  // },
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/p-302-o',
    name: 'p-302-o',
    component: P3020,
  },
  {
    path: '/p-330-6',
    name: 'p-330-6',
    component: P3306
  },
  {
    path: '/main',
    name: 'main',
    component: MAIN,
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: '/eed-frontend/',
  routes
});

export default router
