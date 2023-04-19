<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img class="logo" src="@/assets/img/logo.svg" alt="Wild Hunt" />

          <h3 v-text="route.name" />

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
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'ArticleHeader',
  components: {
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
  margin-bottom: 8px;
  padding: 16px 0;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: 120px 200px 1fr;
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
