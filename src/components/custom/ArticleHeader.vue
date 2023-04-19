<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img class="logo" src="@/assets/img/logo.svg" alt="Wild Hunt" />

          <div class="bar">
            <BaseButton class="button" icon-button icon="arrow-left" theme="dark" />

            <h2 class="page-title" v-text="route.meta.title" />
          </div>

          <div class="controls">
            <BaseLink
              v-for="button in state.navigation"
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
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'ArticleHeader',
  components: {
    BaseButton,
    BaseLink
  },
  setup() {
    const route = useRoute();

    const state = reactive({
      navigation: [
        {
          label: 'Вход в аккаунт',
          to: '/login'
        },
        {
          label: 'Регистрация аккаунта',
          to: '/signup'
        }
      ]
    });

    return {
      route,
      state
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 16px 0;
  width: 100%;

  .grid {
    display: grid;
    align-items: center;
    grid-template-columns: 120px 1fr 1fr;
    gap: 48px;
    width: 100%;

    .logo {
      width: 120px;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        opacity: 0.56;
      }
    }

    .bar {
      display: flex;
      align-items: center;
      gap: 16px;

      .page-title {
        font-weight: normal;
        margin: 0;
      }
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 32px;
    }
  }
}
</style>
