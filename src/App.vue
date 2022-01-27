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
            <div :class="$style['online-now-icon']">
              <span></span>
              <span></span>
            </div>
            <span :class="$style['online-now-text']">Игроков в сети: 941</span>
          </div>

          <div :class="$style['social-networks']">
            <BaseIcon
              :class="$style['social-networks-icon']"
              icon="vk"
              color="secondary"
              width="24"
              height="24"
              hover
            />
            <BaseIcon
              :class="$style['social-networks-icon']"
              icon="discord"
              color="secondary"
              width="24"
              height="24"
              hover
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

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 16px;
    height: 16px;

    span {
      position: absolute;
      background-color: $success;
      border-radius: 50%;
      animation-duration: 2s;
      animation-timing-function: ease-out;
      animation-iteration-count: infinite;
    }

    span:first-child {
      width: 8px;
      height: 8px;
      animation-name: small-circle;
    }

    span:last-child {
      width: 16px;
      height: 16px;
      opacity: 0.3;
      animation-name: big-circle;
    }
  }

  &-text {
    margin-top: 2px;
    margin-left: 12px;
    color: $font-color-secondary;
  }

  @keyframes small-circle {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes big-circle {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
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
