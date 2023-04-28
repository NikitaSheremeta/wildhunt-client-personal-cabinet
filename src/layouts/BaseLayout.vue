<template>
  <BaseHeader />

  <section id="content" class="content">
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

<style lang="scss" scoped>
.content {
  z-index: 9;
  transition: 0.2s;
  opacity: 1;
  transform: translateX(0);

  &.active {
    @include media-breakpoint-down(sm) {
      opacity: 0;
      transform: translateX(-128px);
    }
  }
}
</style>
