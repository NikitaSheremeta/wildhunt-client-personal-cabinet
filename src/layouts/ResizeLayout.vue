<template>
  <BaseHeader />

  <section id="content" class="content">
    <div class="container container--external">
      <div class="aside"></div>

      <div class="container container--inner">
        <router-view />
      </div>
    </div>
  </section>

  <BaseFooter />
</template>

<script>
import BaseHeader from '@/components/base/BaseHeader';
import BaseFooter from '@/components/base/BaseFooter';

export default {
  name: 'ResizeLayout',
  components: {
    BaseHeader,
    BaseFooter
  }
};
</script>

<style lang="scss" scoped>
$gap-width: 24px;
$gap-width-xl: 32px;

.content {
  &.active {
    .container {
      &--external {
        display: grid;

        @include media-breakpoint-only(md) {
          grid-template-columns: 240px calc(720px - $gap-width-xl);
          gap: $gap-width-xl;
        }

        @include media-breakpoint-only(lg) {
          grid-template-columns: 240px calc(840px - $gap-width-xl);
          gap: $gap-width-xl;
        }

        @include media-breakpoint-only(xl) {
          grid-template-columns: 240px calc(960px - $gap-width-xl);
          gap: $gap-width-xl;
        }
      }

      &--inner {
        margin-right: 0;
      }
    }
  }
}
</style>
