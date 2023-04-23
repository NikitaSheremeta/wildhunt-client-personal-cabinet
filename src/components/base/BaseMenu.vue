<template>
  <div :class="['base-menu', classes]">
    <div class="button" @click="onClickMenuButton">
      <span class="item"></span>
      <span class="item"></span>
    </div>

    <div class="menu">
      <ul>
        <li>Menu</li>
        <li>Menu</li>
        <li>Menu</li>
        <li>Menu</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';

export default {
  name: 'BaseMenu',
  setup() {
    const storageMenu = localStorage.getItem('menu');

    const flags = reactive({
      open: storageMenu === 'active'
    });

    const classes = computed(() => [flags.open ? 'active' : 'inactive']);

    const onClickMenuButton = () => {
      flags.open = !flags.open;

      flags.open ? localStorage.setItem('menu', 'active') : localStorage.setItem('menu', 'inactive');
    };

    return {
      classes,
      onClickMenuButton
    };
  }
};
</script>

<style lang="scss" scoped>
.base-menu {
  .button {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px 0;
    width: 24px;
    cursor: pointer;
    overflow: hidden;

    .item {
      width: 100%;
      height: 2px;
      background-color: $gray-600;
      transition: 0.2s;
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
  }

  .menu {
    z-index: 999;
    position: absolute;
    margin-top: 96px;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateX(-128px);
    transition: 0.2s;
  }

  &.active {
    .button {
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

    .menu {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @include media-breakpoint-down(sm) {
    .menu-button {
      width: 32px;
    }

    .menu {
      left: inherit;
      right: 0;
      transform: translateX(0);
    }

    &.active {
      .menu {
        opacity: 1;
        transform: translateX(-24px);
      }
    }
  }
}
</style>
