<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <BaseLogo />

          <BaseOnline />

          <BaseNavigation class="navigation" inline :list="state.navigation" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseLogo from '@/components/base/BaseLogo';
import BaseOnline from '@/components/base/BaseOnline';
import BaseNavigation from '@/components/base/BaseNavigation';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseHeader',
  components: {
    BaseOnline,
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
    grid-template-columns: 120px 1fr 1fr;
    gap: 48px;
    width: 100%;

    .navigation {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
