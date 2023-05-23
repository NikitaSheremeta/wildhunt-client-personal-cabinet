<template>
  <template v-if="isLoading"> Загрузка... </template>

  <component :is="layout" v-else>
    <router-view />
  </component>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout';
import ResizeLayout from '@/layouts/BaseLayout';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  components: {
    BaseLayout,
    ResizeLayout
  },
  setup() {
    const store = useStore();

    const route = useRoute();

    const isLoading = computed(() => store.getters.GET_IS_LOADING);

    const isSideMenuActive = computed(() => store.getters.GET_IS_SIDE_MENU_ACTIVE);

    const layout = computed(() => (route.meta['layout'] || 'Base') + 'Layout');

    onMounted(async () => {
      const storageMenu = localStorage.getItem('menu');

      // If there was no storage item before visiting the site, and this is not a mobile view
      if (!storageMenu && window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        localStorage.setItem('menu', 'active');

        await store.dispatch('SIDE_MENU_ACTIVE', true);
      }

      // If there was storage item before visiting the site, and this is desktop view
      if (storageMenu && window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        await store.dispatch('SIDE_MENU_ACTIVE', storageMenu === 'active');
      }

      // If there was storage item before visiting the site, and this is a mobile view
      if (storageMenu && window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        localStorage.removeItem('menu');

        await store.dispatch('SIDE_MENU_ACTIVE', false);
      }
    });

    watch(
      () => isSideMenuActive.value,
      async (value) => {
        value ? localStorage.setItem('menu', 'active') : localStorage.setItem('menu', 'inactive');
      }
    );

    watch(
      () => layout.value,
      async () => {
        if (localStorage.getItem('token')) {
          await store.dispatch('CHECK_AUTH');
        }
      }
    );

    return {
      isLoading,
      layout,
      route
    };
  }
};
</script>
