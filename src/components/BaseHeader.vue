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

          <span class="online">
            На сервере: <span class="online-number">51</span>
          </span>

          <div class="controls">
            <template v-if="!isAuthorizationPages">
              <BaseButton
                tag-name="a"
                to="/login"
                target="_blank"
                color="secondary"
              >
                Вход в аккаунт
              </BaseButton>

              <BaseButton
                tag-name="a"
                to="/signup"
                target="_blank"
                color="secondary"
              >
                Регистрация аккаунта
              </BaseButton>
            </template>

            <BaseButton
              v-if="isLoginLink || isSignupLink"
              :to="authorizationLinkHrefModifier"
              tag-name="a"
              target="_blank"
              color="secondary"
            >
              {{ authorizationLinkSlotModifier }}
            </BaseButton>

            <div class="menu-button">
              <span class="menu-button-item"></span>
              <span class="menu-button-item"></span>
              <span class="menu-button-item"></span>
            </div>
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
  computed: {
    isAuthorizationPages() {
      switch (this.$route.path) {
        case '/login':
          return true;
        case '/signup':
          return true;
        case '/reset-password':
          return true;
        default:
          return false;
      }
    },
    isLoginLink() {
      return (
        this.$route.path === '/signup' || this.$route.path === '/reset-password'
      );
    },
    isSignupLink() {
      return this.$route.path === '/login';
    },
    authorizationLinkHrefModifier() {
      return this.isSignupLink ? 'signup' : 'login';
    },
    authorizationLinkSlotModifier() {
      return this.isSignupLink ? 'Регистрация аккаунта' : 'Вход в аккаунт';
    }
  },
  methods: {
    onLogoClick() {
      this.$router.push({ path: '/' });
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
  grid-template-columns: 120px auto auto;
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

.online {
  display: flex;
  align-items: center;
  color: $font-color-secondary;

  &-number {
    color: $success;
  }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 48px;
}

.menu-button {
  display: flex;
  gap: 8px;
  padding: 16px 8px;
  cursor: pointer;
  $this: &;

  &-item {
    width: 6px;
    height: 6px;
    background-color: $secondary;
    border-radius: 50%;
    transition: 0.2s ease-out;
  }

  &:hover {
    #{$this}-item {
      background-color: $white;
      transform: scale(2);

      &:first-child {
        transform: translateX(12px);
      }

      &:last-child {
        transform: translateX(-12px);
      }
    }
  }
}
</style>
