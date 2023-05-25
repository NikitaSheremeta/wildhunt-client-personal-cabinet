<template>
  <div id="side-menu-button" :class="['side-menu-button', classes]" @click="onClick">
    <span class="item"></span>
    <span class="item"></span>

    <BaseTooltip v-if="!isMobileView" target="side-menu-button" :label="computedTooltipLabel" />
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import BaseTooltip from '@/components/base/BaseTooltip';
import { labels } from '@/utils/labels';

export default {
  name: 'SideMenuButton',
  components: {
    BaseTooltip
  },
  setup() {
    const store = useStore();

    const flags = reactive({
      open: false
    });

    const classes = computed(() => [flags.open ? 'active' : '']);

    const isMobileView = computed(() => store.getters.GET_IS_MOBILE_VIEW);

    const computedTooltipLabel = computed(() => (flags.open ? labels.CLOSE_SIDE_MENU : labels.OPEN_SIDE_MENU));

    const isSideMenuActive = computed(() => store.getters.GET_IS_SIDE_MENU_ACTIVE);

    const onClick = async () => {
      const contentElement = document.querySelector('#content');

      flags.open = !flags.open;

      if (flags.open) {
        contentElement.classList.add('active');

        await store.dispatch('SIDE_MENU_ACTIVE', true);
      }

      if (!flags.open) {
        contentElement.classList.remove('active');

        await store.dispatch('SIDE_MENU_ACTIVE', false);
      }
    };

    onMounted(() => {
      nextTick(() => {
        flags.open = isSideMenuActive.value;
      });
    });

    watch(
      () => isSideMenuActive.value,
      (value) => {
        flags.open = value;
      }
    );

    return {
      classes,
      isMobileView,
      computedTooltipLabel,
      onClick
    };
  }
};
</script>

<style lang="scss" scoped>
.side-menu-button {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: 24px;
  cursor: pointer;
  overflow: hidden;

  .item {
    width: 100%;
    height: 2px;
    background-color: $gray-600;
    transition: 0.2s;
    transition-property: background-color;
  }

  &:hover {
    .item {
      &:first-child {
        transform: translateY(-2px);
      }

      &:last-child {
        transform: translateY(2px);
      }
    }
  }

  &.active {
    .item {
      &:first-child {
        transform: translateY(5px) rotate(45deg);
      }

      &:last-child {
        top: -2px;
        transform: translateY(-5px) rotate(-45deg);
      }
    }
  }

  @include media-breakpoint-up(md) {
    &:hover {
      .item {
        background-color: $white;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .item {
      transition: 0.2s;
    }

    &:active {
      .item {
        background-color: $white;
      }
    }
  }
}
</style>
