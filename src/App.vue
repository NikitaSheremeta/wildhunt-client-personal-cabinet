<template>
  <template v-if="isLoading"> Загрузка... </template>

  <component v-else :is="layout">
    <router-view />
  </component>
</template>

<script>
import BaseLayout from './layouts/BaseLayout';

export default {
  components: {
    BaseLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'Base') + 'Layout';
    },
    isLoading() {
      return this.$store.getters.GET_IS_LOADING;
    }
  },
  watch: {
    layout: {
      immediate: true,
      handler() {
        if (localStorage.getItem('token')) {
          this.$store.dispatch('CHECK_AUTH');
        }
      }
    }
  }
};
</script>
