<template>
  <template v-if="isLoading"> Загрузка... </template>

  <component :is="state.layout" v-else>
    <router-view />
  </component>
</template>

<script>
import { computed, nextTick, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BaseLayout from '@/layouts/BaseLayout';
import ArticleLayout from '@/layouts/ArticleLayout';

export default {
  components: {
    BaseLayout,
    ArticleLayout
  },
  setup() {
    const router = useRouter();

    const store = useStore();

    const state = reactive({
      layout: ''
    });

    const isLoading = computed(() => store.getters.GET_IS_LOADING);

    router.afterEach(async (to) => {
      await nextTick();

      state.layout = (to.meta['layout'] || 'Base') + 'Layout';
    });

    watch(
      () => state.layout,
      async () => {
        if (localStorage.getItem('token')) {
          await store.dispatch('CHECK_AUTH');
        }
      }
    );

    return { state, isLoading };
  }
};
</script>
