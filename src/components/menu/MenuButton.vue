<template>
  <div :class="['menu-button', classes]" @click="onClick">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MenuButton',
  setup() {
    const store = useStore();

    const flags = reactive({
      open: false
    });

    const isMenuActive = computed(() => store.getters.GET_IS_MENU_ACTIVE);

    const classes = computed(() => [flags.open ? 'active' : '']);

    const onClick = async () => {
      const contentElement = document.querySelector('#content');

      flags.open = !flags.open;

      if (flags.open) {
        contentElement.classList.add('active');

        await store.dispatch('MENU_ACTIVE', true);
      }

      if (!flags.open) {
        contentElement.classList.remove('active');

        await store.dispatch('MENU_ACTIVE', false);
      }
    };

    onMounted(() => {
      nextTick(() => {
        flags.open = store.getters.GET_IS_MENU_ACTIVE;
      });
    });

    watch(
      () => isMenuActive.value,
      (value) => {
        flags.open = value;
      }
    );

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
