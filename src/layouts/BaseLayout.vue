<template>
  <BaseHeader />

  <section class="content">
    <router-view />
  </section>
  <BaseFooter />
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader';
import BaseFooter from '@/components/base/BaseFooter';

export default {
  name: 'BaseLayout',
  components: {
    BaseHeader,
    BaseFooter
  }
};
</script>
