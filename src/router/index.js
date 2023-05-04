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
    component: () => import('@/components/404')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: labels.ROUTER.LOGIN,
      layout: 'Base'
    },
    component: () => import('@/views/login/Login')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      title: labels.ROUTER.SIGN_UP,
      layout: 'Base'
    },
    component: () => import('@/views/signup/Signup')
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    meta: {
      title: labels.ROUTER.RESET_PASSWORD,
      layout: 'Base'
    },
    component: () => import('@/views/resetPassword/ResetPassword')
  },
  {
    path: '/shop',
    name: 'Shop',
    meta: {
      title: labels.ROUTER.SHOP,
      layout: 'Base'
    },
    props: {
      title: labels.ROUTER.SHOP,
      description: labels.WIP.DESCRIPTION
    },
    component: () => import('@/components/404')
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {
      title: labels.ROUTER.FORUM,
      layout: 'Base'
    },
    props: {
      title: labels.ROUTER.FORUM,
      description: labels.WIP.DESCRIPTION
    },
    component: () => import('@/components/404')
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      title: labels.ROUTER.NEWS,
      layout: 'Base'
    },
    props: {
      title: labels.ROUTER.NEWS,
      description: labels.WIP.DESCRIPTION
    },
    component: () => import('@/components/404')
  },
  {
    path: '/wiki',
    name: 'Wiki',
    meta: {
      title: labels.ROUTER.WIKI,
      layout: 'Base'
    },
    props: {
      title: labels.ROUTER.WIKI,
      description: labels.WIP.DESCRIPTION
    },
    component: () => import('@/components/404')
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: {
      title: labels.ROUTER.FAQ,
      layout: 'Base'
    },
    props: {
      title: labels.ROUTER.FAQ,
      description: labels.WIP.DESCRIPTION
    },
    component: () => import('@/components/404')
  },
  {
    path: '/download-launcher',
    name: 'Download Launcher',
    meta: {
      title: labels.ROUTER.DOWNLOAD_LAUNCHER,
      layout: 'Base'
    },
    props: {
      title: labels.ROUTER.DOWNLOAD_LAUNCHER,
      description: labels.WIP.DESCRIPTION
    },
    component: () => import('@/components/404')
  },
  {
    path: '/support',
    name: 'Support',
    meta: {
      title: labels.ROUTER.SUPPORT,
      layout: 'Base'
    },
    component: () => import('@/views/support/Support')
  },
  {
    path: '/terms',
    name: 'Terms',
    meta: {
      title: labels.ROUTER.TERMS,
      layout: 'Resize'
    },
    component: () => import('@/views/Terms')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    meta: {
      title: labels.ROUTER.PRIVACY_POLICY,
      layout: 'Resize'
    },
    component: () => import('@/views/privacyPolicy')
  },
  {
    path: '/terms-support',
    name: 'Terms Support',
    meta: {
      title: labels.ROUTER.TERMS_SUPPORT,
      layout: 'Resize'
    },
    component: () => import('@/views/TermsSupport')
  },
  {
    path: '/rules',
    name: 'Rules',
    meta: {
      title: labels.ROUTER.RULES,
      layout: 'Base'
    },
    component: () => import('@/components/404')
  }
];

const router = createRouter({
  scrollBehavior: () => ({ top: 0 }),
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'Minecraft Wild Hunt - Личный кабинет';

  next();
});

export default router;
