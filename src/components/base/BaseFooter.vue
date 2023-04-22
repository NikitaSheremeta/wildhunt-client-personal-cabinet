<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="grid">
          <span class="copyright" v-text="copyright" />

          <BaseNavigation class="navigation" inline :list="state.navigation" />
        </div>
      </div>

      <div class="row">
        <div class="grid">
          <div class="policy">
            <template v-for="(value, index) in labels.POLICY" :key="index"> <span v-text="value" /><br /> </template>
          </div>

          <BaseNavigation class="information" inline size="xs" :list="state.information" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseNavigation from '@/components/base/BaseNavigation';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseFooter',
  components: {
    BaseNavigation
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      navigation: [
        {
          label: labels.ROUTER.SHOP,
          to: router.options.routes[5].path
        },
        {
          label: labels.ROUTER.FORUM,
          to: router.options.routes[6].path
        },
        {
          label: labels.ROUTER.NEWS,
          to: router.options.routes[7].path
        },
        {
          label: labels.ROUTER.WIKI,
          to: router.options.routes[8].path
        },
        {
          label: labels.ROUTER.FAQ,
          to: router.options.routes[9].path
        },
        {
          label: labels.ROUTER.DOWNLOAD_LAUNCHER,
          to: router.options.routes[10].path
        }
      ],
      information: [
        {
          label: labels.ROUTER.SUPPORT,
          to: router.options.routes[11].path,
          icon: 'chat-messages'
        },
        {
          label: labels.ROUTER.TERMS,
          to: router.options.routes[12].path,
          icon: 'file-contract'
        },
        {
          label: labels.ROUTER.PRIVACY_POLICY,
          to: router.options.routes[13].path,
          icon: 'file-lines'
        }
      ]
    });

    const copyright = computed(() => `© ${new Date().getFullYear()} minecraft-wildhunt.com`);

    return {
      state,
      copyright,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
  padding: 32px 0;
  width: 100%;
  background-color: $gray-900;

  .grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    width: 100%;
  }

  .navigation,
  .information {
    display: flex;
    justify-content: flex-end;
    gap: 32px;
  }

  .information {
    align-items: flex-end;
  }

  .copyright,
  .policy {
    color: $font-color-secondary;
  }

  .policy {
    line-height: $line-height-secondary;
    font-size: $font-size-xxs;
  }
}
</style>
