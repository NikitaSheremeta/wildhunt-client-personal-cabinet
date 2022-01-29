<template>
  <component :is="layout">
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
    }
  }
};
</script>
