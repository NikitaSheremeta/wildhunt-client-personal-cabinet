<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img class="logo" src="../assets/img/logo.svg" alt="Wild Hunt" />

          <div v-if="!isAuthorizationPages" class="social-networks">
            <BaseIcon
              v-for="item in socialNetworks"
              :key="item"
              :icon="item"
              class="social-networks-icon"
              width="24"
              height="24"
              color="secondary"
              hover
            />
          </div>

          <div class="controls">
            <template v-if="!isAuthorizationPages">
              <BaseButton
                tag-name="a"
                to="/signup"
                target="_blank"
                color="secondary"
              >
                Регистрация аккаунта
              </BaseButton>

              <BaseButton to="/login" color="dark"> Вход в аккаунт </BaseButton>
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
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import BaseIcon from './framework/BaseIcon';
import BaseButton from './framework/BaseButton';

export default {
  name: 'authorizationHeader',
  components: {
    BaseIcon,
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
  data() {
    return {
      socialNetworks: ['vk', 'tiktok', 'discord']
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 24px 0;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 220px 1fr 4fr;
  width: 100%;
}

.authorization-page {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.logo {
  width: 128px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.56;
  }
}

.download-launcher {
  display: flex;
  align-items: center;

  .steve-head {
    margin-right: 16px;
    width: 28px;
  }

  .base-link {
    margin-top: 6px;
  }
}

.social-networks {
  display: flex;
  align-items: center;

  &-icon {
    margin-left: 32px;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }
  }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
}
</style>
