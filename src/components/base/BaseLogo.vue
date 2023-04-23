<template>
  <div :class="['base-logo']">
    <img class="image" src="@/assets/img/logo.svg" alt="Wild Hunt" @click="onClickLogo" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'BaseLogo',
  setup() {
    const router = useRouter();

    const onClickLogo = () => {
      router.push({ path: '/' });
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
  width: 120px;
  cursor: pointer;
  transition: 0.2s;

  .image {
    width: 100%;
  }

  &:hover {
    opacity: 0.56;
  }
}
</style>
