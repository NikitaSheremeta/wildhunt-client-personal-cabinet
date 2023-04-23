<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="grid">
          <div class="info">
            <div class="wrapper">
              <h3 class="title" v-text="copyright" />

              <span class="description" v-text="labels.FOOTER.POLICY" />
            </div>

            <BaseOnline class="online" small />
          </div>

          <div class="info">
            <div class="wrapper">
              <h3 class="title" v-text="labels.FOOTER.USEFUL_LINKS_TILE" />

              <BaseNavigation class="navigation" small :list="state.navigation" />
            </div>

            <BaseSocialNetworks class="social-networks" small />
          </div>

          <div class="info">
            <div class="wrapper">
              <h3 class="title" v-text="labels.ROUTER.SHOP" />

              <span class="description" v-text="labels.FOOTER.SHOP_DESCRIPTION" />
            </div>

            <BaseButton
              class="button"
              small
              theme="dark"
              :label="labels.FOOTER.SHOP_LABEL"
              :to="router.options.routes[5].path"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseOnline from '@/components/base/BaseOnline';
import BaseNavigation from '@/components/base/BaseNavigation';
import BaseSocialNetworks from '@/components/base/BaseSocialNetworks';
import BaseButton from '@/components/base/BaseButton';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseFooter',
  components: {
    BaseOnline,
    BaseNavigation,
    BaseSocialNetworks,
    BaseButton
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      navigation: [
        {
          label: labels.ROUTER.RULES,
          to: router.options.routes[15].path
        },
        {
          label: labels.ROUTER.SUPPORT,
          to: router.options.routes[11].path
        },
        {
          label: labels.ROUTER.TERMS,
          to: router.options.routes[12].path
        },
        {
          label: labels.ROUTER.PRIVACY_POLICY,
          to: router.options.routes[13].path
        }
      ]
    });

    const copyright = computed(() => `© ${new Date().getFullYear()} minecraft-wildhunt.com`);

    return {
      router,
      state,
      copyright,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 96px;
  padding: 32px 0;
  width: 100%;
  background-color: $gray-900;

  .row {
    .grid {
      display: grid;
      grid-template-columns: 1fr 320px 1fr;
      gap: 32px;
      width: 100%;
    }
  }

  .info {
    display: flex;
    flex-wrap: wrap;

    .title {
      margin-top: 0;
      margin-bottom: 8px;
      font-size: $font-size-h6;
      font-weight: $font-weight-regular;
    }

    .description {
      color: $font-color-secondary;
      line-height: $line-height-secondary;
      font-size: $font-size-xs;
    }

    .social-networks {
      display: flex;
      align-self: end;
    }

    .online,
    .social-networks,
    .button {
      margin-top: 16px;
    }
  }

  @include media-breakpoint-down(sm) {
    .row {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
