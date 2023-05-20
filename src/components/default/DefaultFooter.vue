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

            <div class="wrapper">
              <BaseOnline class="online" />

              <BaseLink
                class="link"
                :href="`mailto:${labels.EMAILS.ADMIN}`"
                color="secondary"
                :label="labels.EMAILS.ADMIN"
                icon-left="envelope"
              />
            </div>
          </div>

          <div class="info">
            <div class="wrapper">
              <h3 class="title" v-text="labels.FOOTER.USEFUL_LINKS_TILE" />

              <BaseNavigation class="navigation" small :list="state.navigation" />
            </div>

            <div class="wrapper">
              <BaseSocialNetworks class="social-networks" />
            </div>
          </div>

          <div class="info">
            <div class="wrapper">
              <h3 class="title" v-text="labels.ROUTER.SHOP" />

              <span class="description" v-text="labels.FOOTER.SHOP_DESCRIPTION" />
            </div>

            <div class="wrapper">
              <BaseButton
                class="button"
                outline
                theme="dark"
                color="secondary"
                :to="router.options.routes[5].path"
                :label="labels.FOOTER.SHOP_LABEL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseLink from '@/components/base/BaseLink';
import BaseOnline from '@/components/base/BaseOnline';
import BaseNavigation from '@/components/base/BaseNavigation';
import BaseSocialNetworks from '@/components/base/BaseSocialNetworks';
import BaseButton from '@/components/base/BaseButton';
import { labels } from '@/utils/labels';

export default {
  name: 'DefaultFooter',
  components: {
    BaseLink,
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
          label: labels.ROUTER.TERMS_SUPPORT,
          to: router.options.routes[14].path
        },
        {
          label: labels.ROUTER.TERMS,
          to: router.options.routes[12].path
        },
        {
          label: labels.ROUTER.PRIVACY_POLICY,
          to: router.options.routes[13].path
        },
        {
          label: labels.ROUTER.RULES,
          to: router.options.routes[15].path
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
  position: relative;
  background-image: url('../../assets/img/grass.svg');
  background-size: 96px;
  background-repeat: repeat-x;
  margin-top: 96px;
  padding-top: 96px;
  padding-bottom: 32px;
  width: 100%;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: lighten(#1f2128, 5%);
  }

  .row {
    .grid {
      display: grid;
      grid-template-columns: 1fr 320px 1fr;
      gap: 24px;
      width: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: $font-size-h6;
      font-weight: $font-weight-regular;
    }

    .description {
      color: $font-color-secondary;
      font-size: $font-size-xs;
    }

    .link {
      padding: 10px 0;
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
