<template>
  <header class="header">
    <div class="container-fluid">
      <div class="row">
        <div class="grid">
          <img class="logo" src="../assets/img/logo.svg" alt="Wild Hunt" />

          <div class="download-launcher">
            <BaseButton tag-name="a" target="_blank" color="secondary">
              Скачать лаунчер
            </BaseButton>
          </div>

          <div class="social-networks">
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
            <BaseButton
              tag-name="a"
              to="/login"
              target="_blank"
              color="secondary"
            >
              Вход в аккаунт
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
  data() {
    return {
      socialNetworks: ['vk', 'discord']
    };
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
  grid-template-columns: 240px 1fr 1fr 260px;
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

@include media-breakpoint-down(md) {
  .grid {
    grid-template-columns: 200px 1fr 1fr 220px;
  }
}
</style>
