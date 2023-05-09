<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="wrapper">
          <SideMenuButton />

          <BaseLogo />

          <BaseButton
            v-if="shouldShowBackButton"
            class="back-button"
            icon-button
            theme="transparent"
            color="secondary"
            icon="arrow-left"
            @click="backButton"
          />
        </div>

        <div :class="['wrapper', !!route.meta['baseTitle'] ? 'space-between' : 'flex-end']">
          <BaseTitle v-if="!!route.meta['baseTitle']" class="title" back-button />

          <BaseNavigation class="navigation" inline :list="state.navigation" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useBackButton } from '@/hooks/useBackButton';
import SideMenuButton from '@/components/sideMenu/SideMenuButton';
import BaseButton from '@/components/base/BaseButton';
import BaseLogo from '@/components/base/BaseLogo';
import BaseTitle from '@/components/base/BaseTitle';
import BaseNavigation from '@/components/base/BaseNavigation';
import { labels } from '@/utils/labels';

export default {
  name: 'DefaultHeader',
  components: {
    SideMenuButton,
    BaseLogo,
    BaseButton,
    BaseTitle,
    BaseNavigation
  },
  setup() {
    const store = useStore();

    const route = useRoute();

    const router = useRouter();

    const backButton = useBackButton();

    const shouldShowBackButton = computed(() => Boolean(store.getters.GET_HISTORY.length));

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
      route,
      backButton,
      shouldShowBackButton,
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

          @include media-breakpoint-down(sm) {
            width: 100%;
            justify-content: space-between;
            flex-direction: row-reverse;
          }
        }

        &:last-child {
          display: grid;
          grid-template-columns: auto auto;

          &.space-between {
            justify-content: space-between;
          }

          &.flex-end {
            justify-content: flex-end;
          }
        }
      }
    }
  }

  .back-button {
    display: none;
  }

  .title {
    position: relative;
    display: flex;
    justify-content: flex-start;
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

  .navigation {
    display: flex;
    justify-content: flex-end;
  }

  @include media-breakpoint-down(sm) {
    position: fixed;
    background-color: $midnight;
    border-bottom: 1px solid $gray-800;

    .back-button {
      display: flex;
    }

    .title,
    .navigation {
      display: none;
    }
  }
}
</style>
