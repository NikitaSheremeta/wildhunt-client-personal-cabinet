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

          <div :class="$style['online-now']">
            <BaseIcon
              icon="online"
              color="transparent"
              width="22"
              height="22"
            />
            <span :class="$style['online-now-text']">Игроков в сети: 941</span>
          </div>

          <div :class="$style['social-networks']">
            <BaseIcon
              :class="$style['social-networks-icon']"
              icon="vk"
              color="secondary"
              width="24"
              height="24"
            />
            <BaseIcon
              :class="$style['social-networks-icon']"
              icon="discord"
              color="secondary"
              width="24"
              height="24"
            />
          </div>

          <div :class="$style.controls">
            <BaseButton
              :to="linkHrefModifier"
              :icon-right="linkIconModifier"
              tag-name="a"
              target="_blank"
            >
              {{ linkTextModifier }}
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
    },
    linkIconModifier() {
      return this.$route.fullPath === '/signup' ||
        this.$route.fullPath === '/reset-password'
        ? 'login'
        : 'signup';
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
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 320px;
  width: 100%;
}

.logo {
  width: 128px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.56;
  }
}

.online-now {
  display: flex;
  align-items: center;

  &-text {
    margin-top: 2px;
    margin-left: 12px;
    color: $font-color-secondary;
  }
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
