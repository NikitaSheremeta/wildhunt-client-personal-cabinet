<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="grid">
          <img class="logo" src="@/assets/img/logo.svg" alt="Wild Hunt" @click="onClickLogo" />

          <div class="authorization">
            <template v-for="item in state.authorization" :key="item.to">
              <BaseLink
                :class="[route.path === item.to ? 'active' : '']"
                color="secondary"
                :label="item.label"
                :href="item.to"
                @click="onClickLink(route.path === item.to, $event)"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseLink from '@/components/base/BaseLink';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseHeader',
  components: {
    BaseLink
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      authorization: [
        {
          label: labels.ROUTER.LOGIN,
          to: router.options.routes[2].path
        },
        {
          label: labels.ROUTER.SIGN_UP,
          to: router.options.routes[3].path
        }
      ]
    });

    const onClickLogo = () => {
      router.push({ path: '/' });
    };

    const onClickLink = (active, event) => {
      if (active) {
        return event.preventDefault();
      }
    };

    return {
      route,
      state,
      onClickLogo,
      onClickLink
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
    grid-template-columns: repeat(2, 1fr);
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
