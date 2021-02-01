import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router';
import routes from './routes';

export const create = (): Router => {
  return createRouter({
    history: createWebHistory('/'),
    routes: routes as Array<RouteRecordRaw>,
  });
};

export const register = async () => {
  return {
    router: create(),
  };
};
