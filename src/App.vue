<template>
  <template v-if="isLoading"> Загрузка... </template>

  <component :is="layout" v-else>
    <router-view />
  </component>
</template>

<script>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BaseLayout from '@/layouts/BaseLayout';
import ResizeLayout from '@/layouts/ResizeLayout';

export default {
  components: {
    BaseLayout,
    ResizeLayout
  },
  setup() {
    const route = useRoute();

    const store = useStore();

    const isLoading = computed(() => store.getters.GET_IS_LOADING);

    const layout = computed(() => (route.meta['layout'] || 'Base') + 'Layout');

    const storageMenu = localStorage.getItem('menu');

    if (!storageMenu) {
      localStorage.setItem('menu', 'active');
    }

    watch(
      () => layout.value,
      async () => {
        if (localStorage.getItem('token')) {
          await store.dispatch('CHECK_AUTH');
        }
      }
    );

    return { layout, isLoading };
  }
};
</script>
