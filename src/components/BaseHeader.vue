<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img
            class="logo"
            src="../assets/img/logo.svg"
            alt="Wild Hunt"
            @click="onLogoClick"
          />

          <div class="controls">
            <BaseButton
              v-for="button in defineAuthorizationButtons()"
              tag-name="a"
              target="_blank"
              color="secondary"
              :key="button.to"
              :icon-left="button.icon"
              :to="button.to"
            >
              {{ button.slot }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import BaseButton from './framework/BaseButton';

export default {
  name: 'BaseHeader',
  components: {
    BaseButton
  },
  data() {
    return {
      authorizationButtons: [
        {
          slot: 'Вход в аккаунт',
          to: '/login',
          icon: 'login'
        },
        {
          slot: 'Регистрация аккаунта',
          to: '/signup',
          icon: 'login'
        }
      ]
    };
  },
  methods: {
    onLogoClick() {
      this.$router.push({ path: '/' });
    },
    defineAuthorizationButtons() {
      switch (this.$route.path) {
        case '/login':
          return this.authorizationButtons.filter(
            (item) => item.to === '/signup'
          );
        case '/signup':
          return this.authorizationButtons.filter(
            (item) => item.to === '/login'
          );
        default:
          return this.authorizationButtons;
      }
    }
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
