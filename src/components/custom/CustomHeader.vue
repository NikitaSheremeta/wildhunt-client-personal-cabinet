<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img
            class="logo"
            src="@/assets/img/logo.svg"
            alt="Wild Hunt"
            @click="onLogoClick"
          >

          <div class="controls">
            <BaseLink
              v-for="button in authorizationButtons"
              :key="button.to"
              color="secondary"
              :label="button.label"
              :href="button.to"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'BaseHeader',
  components: {
    BaseLink
  },
  data() {
    return {
      authorizationButtons: [
        {
          label: 'Вход в аккаунт',
          to: '/login'
        },
        {
          label: 'Регистрация аккаунта',
          to: '/signup'
        }
      ]
    };
  },
  methods: {
    onLogoClick() {
      this.$router.push({ path: '/' });
    },
    // defineAuthorizationButtons() {
    //   switch (this.$route.path) {
    //     case '/login':
    //       return this.authorizationButtons.filter((item) => item.to === '/signup');
    //     case '/signup':
    //       return this.authorizationButtons.filter((item) => item.to === '/login');
    //     default:
    //       return this.authorizationButtons;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 8px;
  padding: 24px 0;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  width: 100%;
}

.logo {
  width: 120px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.56;
  }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 32px;
}
</style>
