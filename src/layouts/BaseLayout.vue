<template>
  <DefaultHeader />

  <section id="content" ref="content" :class="['content', classes]">
    <div class="container container--external">
      <div class="aside">
        <div ref="stickyBlock" class="container container--aside">
          <div class="row">
            <SideMenu id="side-menu" class="side-menu" />
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

  <DefaultFooter />
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import DefaultHeader from '@/components/default/DefaultHeader';
import SideMenu from '@/components/sideMenu/SideMenu';
import DefaultFooter from '@/components/default/DefaultFooter';
import { disableAllScrollingKeepMenuScrolling, enableAllScrollingKeepMenuScrolling } from '@/helpers/scroll-handling';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'BaseLayout',
  components: {
    DefaultHeader,
    SideMenu,
    DefaultFooter
  },
  setup() {
    const content = ref(null);
    const stickyBlock = ref(null);

    const store = useStore();

    const isSideMenuActive = computed(() => store.getters.GET_IS_SIDE_MENU_ACTIVE);

    const classes = computed(() => [isSideMenuActive.value ? 'active' : '']);

    const onScroll = () => {
      if (isSideMenuActive.value) {
        if (window.scrollY >= content.value.offsetTop) {
          stickyBlock.value.classList.add('sticky');
        }

        if (window.scrollY < content.value.offsetTop) {
          stickyBlock.value.classList.remove('sticky');
        }
      }
    };

    const onResize = async () => {
      if (window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        await store.dispatch('MOBILE_VIEW', false);
      }

      if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        await store.dispatch('MOBILE_VIEW', true);
      }

      // If the user switches from mobile view to desktop view
      if (window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        document.addEventListener('scroll', onScroll);
      }

      // If the user switches from desktop view to mobile view
      if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        document.removeEventListener('scroll', onScroll);
      }

      // If the sideMenu is open and user switches from desktop view to mobile view
      if (isSideMenuActive.value && window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
        disableAllScrollingKeepMenuScrolling();
      }

      // If the sideMenu is open and user switches from mobile view to desktop view
      if (isSideMenuActive.value && window.innerWidth > magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
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

    watch(
      () => isSideMenuActive.value,
      (value) => {
        if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
          value ? disableAllScrollingKeepMenuScrolling() : enableAllScrollingKeepMenuScrolling();
        }
      }
    );

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

      .side-menu {
        padding: 24px 0;
      }
    }
  }

  &.active {
    .container {
      &--external {
        @include column-wrapper();
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
