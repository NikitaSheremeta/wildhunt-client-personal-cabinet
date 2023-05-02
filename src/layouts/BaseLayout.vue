<template>
  <BaseHeader />

  <section id="content" ref="content" :class="['content', classes]">
    <div class="container container--external">
      <div class="aside">
        <div ref="stickyBlock" class="container container--aside">
          <div class="row">
            <Menu id="menu" class="menu" />
          </div>
        </div>
      </div>

      <div class="container container--content">
        <div class="row">
          <router-view />
        </div>
      </div>
    </div>
  </section>

  <BaseFooter />
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseHeader from '@/components/base/BaseHeader';
import Menu from '@/components/menu/Menu';
import BaseFooter from '@/components/base/BaseFooter';
import { disableAllScrollingKeepMenuScrolling, enableAllScrollingKeepMenuScrolling } from '@/helpers/scroll-handling';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'BaseLayout',
  components: {
    BaseHeader,
    Menu,
    BaseFooter
  },
  setup() {
    const content = ref(null);
    const stickyBlock = ref(null);

    const store = useStore();

    const isMenuActive = computed(() => store.getters.GET_IS_MENU_ACTIVE);

    const classes = computed(() => [isMenuActive.value ? 'active' : '']);

    const onScroll = () => {
      if (isMenuActive.value) {
        if (window.scrollY >= content.value.offsetTop) {
          stickyBlock.value.classList.add('sticky');
        }

        if (window.scrollY < content.value.offsetTop) {
          stickyBlock.value.classList.remove('sticky');
        }
      }
    };

    const onResize = () => {
      // If the user switches from mobile view to desktop view
      if (window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        document.addEventListener('scroll', onScroll);
      }

      // If the user switches from desktop view to mobile view
      if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        document.removeEventListener('scroll', onScroll);
      }

      // If the menu is open and user switches from desktop view to mobile view
      if (isMenuActive.value && window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        disableAllScrollingKeepMenuScrolling();
      }

      // If the menu is open and user switches from mobile view to desktop view
      if (isMenuActive.value && window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        enableAllScrollingKeepMenuScrolling();
      }
    };

    onMounted(() => {
      addEventListener('resize', onResize);

      // If it's not the default mobile view
      if (window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        document.addEventListener('scroll', onScroll);
      }
    });

    onUnmounted(() => {
      document.removeEventListener('resize', onResize);
      document.removeEventListener('scroll', onScroll);
    });

    return {
      content,
      stickyBlock,
      classes
    };
  }
};
</script>

<style lang="scss" scoped>
$header-height: 80px; // Because the header height is 80px
$gap-width: 24px;
$gap-width-xl: 32px;

.content {
  .container {
    &--aside {
      .row {
        max-height: calc(100vh - $header-height);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }

    &--content {
      @include media-breakpoint-down(sm) {
        margin-top: calc($header-height + 32px);
      }
    }
  }

  .aside {
    z-index: 9;
    opacity: 0;
    pointer-events: none;

    // The display none is only needed for viewing on the desktop
    @include media-breakpoint-up(md) {
      display: none;
    }

    // Mobile setting
    @include media-breakpoint-down(sm) {
      position: fixed;
      padding-top: calc($header-height);
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: $midnight;
      transform: translateY(96px);
      transition: 0.2s;
      transition-property: transform, opacity;

      .menu {
        padding: 24px 0;
      }
    }
  }

  &.active {
    .container {
      &--external {
        @include media-breakpoint-only(md) {
          display: grid;
          grid-template-columns: 240px calc(720px - $gap-width-xl);
          gap: $gap-width-xl;
        }

        @include media-breakpoint-only(lg) {
          display: grid;
          grid-template-columns: 240px calc(840px - $gap-width-xl);
          gap: $gap-width-xl;
        }

        @include media-breakpoint-only(xl) {
          display: grid;
          grid-template-columns: 240px calc(960px - $gap-width-xl);
          gap: $gap-width-xl;
        }
      }

      &--content {
        margin-right: 0;
      }
    }

    .aside {
      opacity: 1;
      pointer-events: auto;

      // The display block is only needed for viewing on the desktop
      @include media-breakpoint-up(md) {
        display: block;
      }

      // Animation is only needed for viewing on the mobile
      @include media-breakpoint-down(sm) {
        transform: translateY(0);
      }
    }
  }
}
</style>
