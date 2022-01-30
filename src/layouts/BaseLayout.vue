<template>
  <BaseHeader :class="headerComputedClasses" />
  <section class="content">
    <router-view />
  </section>
  <BaseFooter />
</template>

<script>
import BaseHeader from '../components/BaseHeader';
import BaseFooter from '../components/BaseFooter';

export default {
  components: {
    BaseHeader,
    BaseFooter
  },
  computed: {
    headerComputedClasses() {
      return [this.isAuthorizationModifier];
    },
    isAuthorizationModifier() {
      return this.$route.path === '/login' ||
        this.$route.path === '/signup' ||
        this.$route.path === '/reset-password'
        ? 'authorization-page'
        : '';
    }
  }
};
</script>
