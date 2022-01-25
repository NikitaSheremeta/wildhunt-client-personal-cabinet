import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Вход в аккаунт'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      title: 'Регистрация аккаунта'
    },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    meta: {
      title: 'Восстановление аккаунта'
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
