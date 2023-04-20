<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img class="logo" src="@/assets/img/logo.svg" alt="Wild Hunt" />

          <BaseTitle close-button @close="onClose" />

          <div class="authorization">
            <template v-for="item in state.authorization" :key="item.to">
              <BaseLink color="secondary" :label="item.label" :href="item.to" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseTitle from '@/components/base/BaseTitle';
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'ArticleHeader',
  components: {
    BaseTitle,
    BaseLink
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      authorization: [
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

    const onClickLogo = () => {
      router.push({ path: '/' });
    };

    const onClose = () => {
      router.back();
    };

    return {
      state,
      onClickLogo,
      onClose
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

    .authorization {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 32px;
    }
  }
}
</style>
