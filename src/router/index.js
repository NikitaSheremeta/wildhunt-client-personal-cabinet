import { createRouter, createWebHistory } from 'vue-router';
import { labels } from '@/utils/labels';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: labels.ROUTER.NOT_FOUND,
      layout: 'Base'
    },
    component: () => import('@/views/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: labels.ROUTER.LOGIN,
      layout: 'Base'
    },
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      title: labels.ROUTER.SIGN_UP,
      layout: 'Base'
    },
    component: () => import('@/views/signup/Signup.vue')
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    meta: {
      title: labels.ROUTER.RESET_PASSWORD,
      layout: 'Base'
    },
    component: () => import('@/views/resetPassword/ResetPassword.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    meta: {
      title: labels.ROUTER.SHOP,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {
      title: labels.ROUTER.FORUM,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      title: labels.ROUTER.NEWS,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/wiki',
    name: 'Wiki',
    meta: {
      title: labels.ROUTER.WIKI,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: {
      title: labels.ROUTER.FAQ,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/download-launcher',
    name: 'Download Launcher',
    meta: {
      title: labels.ROUTER.DOWNLOAD_LAUNCHER,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/support',
    name: 'Support',
    meta: {
      title: labels.ROUTER.SUPPORT,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    meta: {
      title: labels.ROUTER.TERMS,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    meta: {
      title: labels.ROUTER.PRIVACY_POLICY,
      layout: 'Base'
    },
    component: () => import('@/views/WIP.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'Minecraft Wild Hunt - Личный кабинет';

  next();
});

export default router;
