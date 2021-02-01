import HomePage from '../../Page/HomePage.vue';
import {RouteRecordRaw} from 'vue-router';

export default [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
] as Array<RouteRecordRaw>;
