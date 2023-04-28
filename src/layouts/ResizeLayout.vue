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
  transition: 0.2s;
  opacity: 1;
  transform: translateX(0);

  &.active {
    @include media-breakpoint-down(sm) {
      opacity: 0;
      transform: translateX(-128px);
    }

    .container {
      &--external {
        @include media-breakpoint-only(md) {
          display: grid;
          grid-template-columns: auto calc(720px - $gap-width-xl);
          gap: $gap-width-xl;
        }

        @include media-breakpoint-only(lg) {
          display: grid;
          grid-template-columns: auto calc(840px - $gap-width-xl);
          gap: $gap-width-xl;
        }

        @include media-breakpoint-only(xl) {
          display: grid;
          grid-template-columns: auto calc(960px - $gap-width-xl);
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
