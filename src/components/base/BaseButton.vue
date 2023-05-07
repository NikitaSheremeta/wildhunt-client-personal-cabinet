<template>
  <button :class="['base-button', classes]" :disabled="disabled" @click="onClick">
    <BaseIcon v-if="loading" spin icon="preloader" />

    <BaseIcon v-if="iconLeft" :color="color" :icon="iconLeft" :width="computedIconSize" :height="computedIconSize" />

    <BaseIcon v-if="icon" :icon="icon" :color="color" :width="computedIconSize" :height="computedIconSize" />

    <span v-if="label" v-text="label" />

    <BaseIcon v-if="iconRight" :color="color" :icon="iconRight" :width="computedIconSize" :height="computedIconSize" />
  </button>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'BaseButton',
  components: {
    BaseIcon
  },
  props: {
    small: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    iconButton: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'primary'
    },
    color: {
      type: String,
      default: 'primary'
    },
    to: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter();

    const classes = computed(() => [
      props.small ? 'small' : '',
      props.outline ? 'outline' : '',
      props.fullWidth ? 'full-width' : '',
      props.iconButton ? 'icon-button' : '',
      props.theme ? props.theme : '',
      props.disabled ? 'disabled' : '',
      props.iconLeft ? 'icon-left' : '',
      props.iconRight ? 'icon-right' : '',
      props.loading ? 'loading' : ''
    ]);

    const computedIconSize = computed(() => {
      if (!props.iconSize) {
        return props.small ? '14' : '18';
      }

      return props.iconSize;
    });

    const onClick = () => {
      if (props.to) {
        router.push(props.to);
      }
    };

    return {
      classes,
      computedIconSize,
      onClick
    };
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 48px;
  height: 48px;
  border: 0;
  border-radius: 12px;
  background-color: map-get($button-palette, primary, background-color);
  line-height: $line-height-base;
  color: $font-color-base;
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  font-size: $font-size-base;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  user-select: none;
  transition: 0.2s;

  @include media-breakpoint-up(md) {
    &:hover,
    &:focus {
      background-color: map-get($button-palette, primary, hover-background);
    }
  }

  @include media-breakpoint-down(sm) {
    &:active {
      background-color: map-get($button-palette, primary, hover-background);
    }
  }

  &.full-width {
    width: 100%;
  }

  &.icon-button {
    padding: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;

    &.small {
      width: 32px;
      height: 32px;
    }

    .base-icon {
      transition: 0.2s;
    }

    @include media-breakpoint-up(md) {
      &:hover {
        .base-icon {
          fill: $white;
        }
      }
    }

    @include media-breakpoint-down(sm) {
      &:active {
        .base-icon {
          fill: $white;
        }
      }
    }
  }

  &:active {
    background-color: map-get($button-palette, primary, active-background);
  }

  &.dark {
    background-color: map-get($button-palette, dark, background-color);

    @include media-breakpoint-up(md) {
      &:hover {
        background-color: map-get($button-palette, dark, hover-background);
      }
    }

    @include media-breakpoint-down(sm) {
      &:active {
        background-color: map-get($button-palette, dark, hover-background);
      }
    }

    &.outline {
      border: 1px solid map-get($button-palette, dark, border-color);
      background-color: transparent;
      color: $font-color-secondary;

      @include media-breakpoint-up(md) {
        &:hover {
          background-color: map-get($button-palette, dark, background-color);
        }
      }

      @include media-breakpoint-down(sm) {
        &:active {
          background-color: map-get($button-palette, dark, background-color);
        }
      }
    }
  }

  &.success {
    background-color: map-get($button-palette, success, background-color);

    @include media-breakpoint-up(md) {
      &:hover {
        background-color: map-get($button-palette, success, hover-background);
      }
    }

    @include media-breakpoint-down(sm) {
      &:active {
        background-color: map-get($button-palette, success, hover-background);
      }
    }
  }

  &.danger {
    background-color: map-get($button-palette, danger, background-color);

    @include media-breakpoint-up(md) {
      &:hover {
        background-color: map-get($button-palette, danger, hover-background);
      }
    }

    @include media-breakpoint-down(sm) {
      &:active {
        background-color: map-get($button-palette, danger, hover-background);
      }
    }
  }

  &.transparent {
    background-color: map-get($button-palette, transparent, background-color);
  }

  &.disabled {
    cursor: default;
    background-color: map-get($button-palette, disabled, background-color);
    color: map-get($button-palette, disabled, font-color);

    @include media-breakpoint-up(md) {
      &:hover {
        background-color: map-get($button-palette, disabled, background-color);
      }
    }
  }

  &.icon-left {
    .base-icon {
      margin-right: 12px;
    }
  }

  &.icon-right {
    .base-icon {
      margin-left: 12px;
    }
  }

  &.loading {
    color: rgba(0, 0, 0, 0);

    .base-icon {
      position: absolute;
    }
  }
}
</style>
