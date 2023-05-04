<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="wrapper">
          <MenuButton />

          <BaseLogo />

          <BaseButton class="back-button" icon-button theme="transparent" color="secondary" icon="arrow-left" />
        </div>

        <div class="wrapper">
          <BaseTitle class="title" close-button />

          <BaseNavigation class="navigation" inline :list="state.navigation" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import MenuButton from '@/components/menu/MenuButton';
import BaseButton from '@/components/base/BaseButton';
import BaseLogo from '@/components/base/BaseLogo';
import BaseTitle from '@/components/base/BaseTitle';
import BaseNavigation from '@/components/base/BaseNavigation';
import { labels } from '@/utils/labels';

export default {
  name: 'Header',
  components: {
    MenuButton,
    BaseLogo,
    BaseButton,
    BaseTitle,
    BaseNavigation
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      navigation: [
        {
          label: labels.ROUTER.LOGIN,
          to: router.options.routes[2].path
        },
        {
          label: labels.ROUTER.SIGN_UP,
          to: router.options.routes[3].path
        }
      ]
    });

    return {
      state
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 99;
  padding: 16px 0;
  width: 100%;

  .container {
    .row {
      @include column-wrapper();

      .wrapper {
        align-items: center;

        &:first-child {
          display: flex;
          gap: 8px;
        }

        &:last-child {
          display: grid;
          justify-content: space-between;
          grid-template-columns: auto auto;
        }
      }
    }
  }

  .back-button {
    display: none;
  }

  .title {
    position: relative;
    white-space: nowrap;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 48px;
      height: 100%;
      background: linear-gradient(270deg, rgba(31, 33, 40, 1) 0%, rgba(255, 255, 255, 0) 100%);
    }

    @include media-breakpoint-only(md) {
      width: 400px;
    }

    @include media-breakpoint-only(lg) {
      width: 480px;
    }

    @include media-breakpoint-only(xl) {
      width: 560px;
    }
  }

  @include media-breakpoint-down(sm) {
    position: fixed;
    background-color: $midnight;
    border-bottom: 1px solid $gray-800;

    .title,
    .navigation {
      display: none;
    }
  }
}
</style>
