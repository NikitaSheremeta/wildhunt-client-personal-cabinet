<template>
  <div :class="['base-logo']">
    <img class="image" src="@/assets/img/logo.svg" alt="Wild Hunt" @click="onClickLogo" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'BaseLogo',
  setup() {
    const store = useStore();

    const router = useRouter();

    const onClickLogo = async () => {
      await store.dispatch('SIDE_MENU_ACTIVE', false);

      await router.push({ path: '/' });
    };

    return {
      onClickLogo
    };
  }
};
</script>

<style lang="scss" scoped>
.base-logo {
  display: flex;
  cursor: pointer;
  transition: 0.2s;
  transition-property: opacity;

  .image {
    width: 120px;
    height: 60px;
  }

  @include media-breakpoint-up(md) {
    &:hover {
      opacity: 0.56;
    }
  }

  @include media-breakpoint-down(sm) {
    width: 96px;
    height: 48px;

    &:active {
      opacity: 0.56;
    }
  }
}
</style>
