<template>
  <BaseHeader />
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
  }
};
</script>
