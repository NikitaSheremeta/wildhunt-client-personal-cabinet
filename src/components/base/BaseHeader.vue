<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <BaseLogo />

          <BaseNavigation class="navigation" inline :list="state.navigation" />

          <div class="menu-button">
            <span class="item"></span>
            <span class="item"></span>
            <span class="item"></span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseLogo from '@/components/base/BaseLogo';
import BaseNavigation from '@/components/base/BaseNavigation';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseHeader',
  components: {
    BaseLogo,
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
  padding: 16px 0;
  width: 100%;

  .grid {
    display: grid;
    align-items: center;
    grid-template-columns: 120px 1fr auto;
    gap: 48px;
    width: 100%;

    .navigation {
      display: flex;
      justify-content: flex-end;
    }

    .menu-button {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 24px 0;
      cursor: pointer;

      .item {
        width: 7px;
        height: 7px;
        background-color: $gray-600;
        border-radius: 50%;
        transition: 0.2s;
      }

      &:hover {
        .item {
          background-color: $white;
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .grid {
      grid-template-columns: 120px auto;

      .online,
      .navigation {
        display: none;
      }
    }
  }
}
</style>
