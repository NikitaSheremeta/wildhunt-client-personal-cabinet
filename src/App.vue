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

export default {
  components: {
    BaseLayout
  },
  setup() {
    const route = useRoute();

    const store = useStore();

    const isLoading = computed(() => store.getters.GET_IS_LOADING);

    const layout = computed(() => (route.meta['layout'] || 'Base') + 'Layout');

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
