<template>
  <div :class="['side-menu']">
    <ul class="list">
      <li v-for="(item, index) in state.menuList" :key="index" class="item">
        <BaseLink
          class="link"
          :href="item.to"
          color="secondary"
          :label="item.label"
          :active="route.path === item.to"
          :icon-left="item.icon"
          @click="onClickLink"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import BaseLink from '@/components/base/BaseLink';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'SideMenu',
  components: {
    BaseLink
  },
  setup() {
    const store = useStore();

    const route = useRoute();

    const router = useRouter();

    const state = reactive({
      innerWidth: 0,
      menuList: [
        {
          to: '/',
          label: labels.ROUTER.HOME,
          icon: 'home'
        },
        {
          to: router.options.routes[5].path,
          label: labels.ROUTER.SHOP,
          icon: 'store'
        },
        {
          to: '/map',
          label: labels.ROUTER.MAP,
          icon: 'map'
        },
        {
          to: router.options.routes[6].path,
          label: labels.ROUTER.FORUM,
          icon: 'users'
        },
        {
          to: router.options.routes[7].path,
          label: labels.ROUTER.NEWS,
          icon: 'news'
        },
        {
          to: router.options.routes[8].path,
          label: labels.ROUTER.WIKI,
          icon: 'question'
        },
        {
          to: router.options.routes[11].path,
          label: labels.ROUTER.SUPPORT,
          icon: 'info'
        },
        {
          to: router.options.routes[9].path,
          label: labels.ROUTER.FAQ,
          icon: 'play'
        },
        {
          to: router.options.routes[10].path,
          label: labels.ROUTER.DOWNLOAD_LAUNCHER,
          icon: 'download'
        }
      ]
    });

    const onClickLink = async () => {
      if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        await store.dispatch('SIDE_MENU_ACTIVE', false);
      }
    };

    return {
      route,
      state,
      onClickLink
    };
  }
};
</script>

<style lang="scss" scoped>
.side-menu {
  width: 100%;

  .list {
    margin: 0;
    padding: 0;

    .item {
      margin: 0;
      list-style: none;

      .link {
        display: flex;
        padding: 12px;
        border-radius: $menu-border-radius;

        @include media-breakpoint-up(md) {
          &:hover {
            background-color: $gray-800;
            color: map-get($link-palette, primary, color);

            .icon {
              fill: map-get($link-palette, primary, color);
              stroke: map-get($link-palette, primary, color);
            }
          }
        }

        @include media-breakpoint-down(sm) {
          &:active {
            background-color: $gray-800;
            color: map-get($link-palette, primary, color);

            .icon {
              fill: map-get($link-palette, primary, color);
              stroke: map-get($link-palette, primary, color);
            }
          }
        }
      }
    }
  }
}
</style>
