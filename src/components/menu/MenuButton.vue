<template>
  <div :class="['menu-button', classes]" @click="onClick">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { disableAllScrollingKeepMenuScrolling, enableAllScrollingKeepMenuScrolling } from '@/helpers/scroll-handling';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'MenuButton',
  setup() {
    const store = useStore();

    const flags = reactive({
      open: false
    });

    const classes = computed(() => [flags.open ? 'active' : '']);

    const onClick = async () => {
      const contentElement = document.querySelector('#content');

      flags.open = !flags.open;

      if (flags.open) {
        contentElement.classList.add('active');

        localStorage.setItem('menu', 'active');

        await store.dispatch('MENU_ACTIVE', true);

        if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
          disableAllScrollingKeepMenuScrolling();
        }
      }

      if (!flags.open) {
        contentElement.classList.remove('active');

        localStorage.setItem('menu', 'inactive');

        await store.dispatch('MENU_ACTIVE', false);

        if (window.innerWidth <= magicNumbers.SWITCHING_WIDTH_ON_TABLET) {
          enableAllScrollingKeepMenuScrolling();
        }
      }
    };

    onMounted(() => {
      nextTick(() => {
        flags.open = store.getters.GET_IS_MENU_ACTIVE;
      });
    });

    return {
      classes,
      onClick
    };
  }
};
</script>

<style lang="scss" scoped>
.menu-button {
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
      background-color: $white;

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

  @include media-breakpoint-down(sm) {
    .item {
      transition: 0.2s;
    }
  }
}
</style>
