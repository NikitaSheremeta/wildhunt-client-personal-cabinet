<template>
  <BaseHeader />
  <section class="content">
    <router-view />
  </section>
  <BaseFooter />
</template>

<script>
import BaseHeader from '@/components/custom/CustomHeader';
import BaseFooter from '@/components/custom/CustomFooter';

export default {
  components: {
    BaseHeader,
    BaseFooter
  }
};
</script>
