import { createRouter, createWebHistory } from 'vue-router';
import { labels } from '@/utils/labels';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: () => {
      return {
        path: '/login'
      };
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: labels.ROUTER.NOT_FOUND,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
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
      description: labels.WIP.DESCRIPTION,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {
      title: labels.ROUTER.FORUM,
      description: labels.WIP.DESCRIPTION,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      title: labels.ROUTER.NEWS,
      description: labels.WIP.DESCRIPTION,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
  },
  {
    path: '/wiki',
    name: 'Wiki',
    meta: {
      title: labels.ROUTER.WIKI,
      description: labels.WIP.DESCRIPTION,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: {
      title: labels.ROUTER.FAQ,
      description: labels.WIP.DESCRIPTION,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
  },
  {
    path: '/download-launcher',
    name: 'Download Launcher',
    meta: {
      title: labels.ROUTER.DOWNLOAD_LAUNCHER,
      description: labels.WIP.DESCRIPTION,
      layout: 'Base'
    },
    component: () => import('@/components/default/DefaultNotFound')
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
    path: '/terms-use',
    name: 'Terms Use',
    meta: {
      title: labels.ROUTER.TERMS,
      layout: 'Base',
      baseTitle: true
    },
    component: () => import('@/views/TermsUse')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    meta: {
      title: labels.ROUTER.PRIVACY_POLICY,
      layout: 'Base',
      baseTitle: true
    },
    component: () => import('@/views/PrivacyPolicy')
  },
  {
    path: '/terms-support',
    name: 'Terms Support',
    meta: {
      title: labels.ROUTER.TERMS_SUPPORT,
      layout: 'Base',
      baseTitle: true
    },
    component: () => import('@/views/TermsSupport')
  },
  {
    path: '/game-rules',
    name: 'Game Rules',
    meta: {
      title: labels.ROUTER.RULES,
      layout: 'Base',
      baseTitle: true
    },
    component: () => import('@/views/GameRules')
  }
];

const router = createRouter({
  scrollBehavior: () => ({ top: 0 }),
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  document.title = to.meta.title ? to.meta.title : 'Minecraft Wild Hunt - Личный кабинет';

  if (to.path !== '/login' && to.params.back === undefined) {
    await store.dispatch('ADD_HISTORY_ITEM', from.fullPath);
  }
});

export default router;
