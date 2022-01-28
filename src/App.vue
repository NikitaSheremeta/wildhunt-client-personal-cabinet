<template>
  <header :class="$style.header">
    <div class="container-fluid">
      <div class="row" :class="$style.row">
        <div :class="$style.grid">
          <img
            :class="$style.logo"
            src="./assets/img/logo.svg"
            alt="Wild Hunt"
          />

          <div :class="$style['download-launcher']">
            <BaseButton
              tag-name="a"
              target="_blank"
              color="secondary"
              icon-left="download"
            >
              Скачать лаунчер
            </BaseButton>
          </div>

          <div :class="$style['social-networks']">
            <BaseIcon
              v-for="item in socialNetworks"
              :key="item"
              :class="$style['social-networks-icon']"
              :icon="item"
              width="24"
              height="24"
              color="secondary"
              hover
            />
          </div>

          <div :class="$style.controls">
            <BaseButton
              :to="authorizationHrefModifier"
              :icon-right="authorizationIconModifier"
              :color="authorizationColorModifier"
              tag-name="a"
              target="_blank"
            >
              {{ authorizationTextModifier }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
import BaseIcon from './components/framework/BaseIcon';
import BaseButton from './components/framework/BaseButton';

export default {
  components: {
    BaseIcon,
    BaseButton
  },
  data() {
    return {
      socialNetworks: ['vk', 'discord']
    };
  },
  computed: {
    authorizationHrefModifier() {
      return this.$route.fullPath === '/login' ? '/signup' : '/login';
    },
    authorizationIconModifier() {
      return this.$route.fullPath === '/login' ? 'signup' : 'login';
    },
    authorizationColorModifier() {
      return this.$route.fullPath === '/login' ? 'secondary' : 'secondary';
    },
    authorizationTextModifier() {
      return this.$route.fullPath === '/login'
        ? 'Регистрация аккаунта'
        : 'Войти в аккаунт';
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
  margin-bottom: 8px;
  padding: 24px 0;
  top: 0;
  left: 0;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 320px;
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

.download-launcher {
  display: flex;
  align-items: center;
}

.social-networks {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &-icon {
    display: none;
    margin-left: 24px;
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
}
</style>
