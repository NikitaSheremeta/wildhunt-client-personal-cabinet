<template>
  <header :class="$style.header">
    <div class="container-fluid">
      <div class="row" :class="$style.row">
        <img :class="$style.logo" src="./assets/img/logo.svg" />

        <BaseButton
          :to="linkHrefModifier"
          tag-name="a"
          target="_blank"
          color="secondary"
        >
          {{ linkTextModifier }}
        </BaseButton>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
import BaseButton from './components/framework/BaseButton';

export default {
  components: {
    BaseButton
  },
  computed: {
    linkTextModifier() {
      return this.$route.fullPath === '/signup' ||
        this.$route.fullPath === '/reset-password'
        ? 'Войти в аккаунт'
        : 'Регистрация аккаунта';
    },
    linkHrefModifier() {
      return this.$route.fullPath === '/signup' ||
        this.$route.fullPath === '/reset-password'
        ? '/login'
        : '/signup';
    }
  }
};
</script>

<style lang="scss" module>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  padding: 24px 0;
  top: 0;
  left: 0;
  width: 100%;

  .logo {
    width: 56px;

    &-image {
      width: 100%;
    }
  }
}
</style>
