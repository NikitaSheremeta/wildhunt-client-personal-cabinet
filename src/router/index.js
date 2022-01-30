import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/:catchAll(.*)', redirect: '/404' },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Вход в аккаунт',
      layout: 'Base'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      title: 'Регистрация аккаунта',
      layout: 'Base'
    },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    meta: {
      title: 'Восстановление аккаунта',
      layout: 'Base'
    },
    component: () => import('../views/ResetPassword.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title
    : 'Minecraft Wild Hunt - Личный кабинет';

  next();
});

export default router;
