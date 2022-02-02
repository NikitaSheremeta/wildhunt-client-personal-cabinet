import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: 'Страница не найдена',
      layout: 'Base'
    },
    component: () => import('../views/404.vue')
  },
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
  },
  {
    path: '/shop',
    name: 'Shop',
    meta: {
      title: 'Донат магазин',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {
      title: 'Форум',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      title: 'Новости',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/wiki',
    name: 'Wiki',
    meta: {
      title: 'Wiki',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: {
      title: 'FAQ',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/download-launcher',
    name: 'Download Launcher',
    meta: {
      title: 'Скачать лаунчер',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/support',
    name: 'Support',
    meta: {
      title: 'Техническая поддержка',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    meta: {
      title: 'Пользовательское соглашение',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    meta: {
      title: 'Политика конфиденциальности',
      layout: 'Base'
    },
    component: () => import('../views/WIP.vue')
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
