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

    const computedIconSize = computed(() => (props.small ? '14' : '18'));

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
$theme-palette: (
  primary: (
    background-color: $primary,
    border-color: $primary,
    hover-background: darken($primary, 6%)
  ),
  dark: (
    background-color: $gray-800,
    border-color: $gray-600,
    hover-background: $black
  ),
  success: (
    background-color: $success,
    border-color: $success,
    hover-background: darken($success, 6%)
  ),
  danger: (
    background-color: $danger,
    border-color: $danger,
    hover-background: darken($danger, 6%)
  ),
  disabled: (
    background-color: $disabled-background,
    border-color: $disabled-background,
    font-color: $disabled-color
  ),
  transparent: (
    background-color: transparent
  )
);

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
  background-color: map-get($theme-palette, primary, background-color);
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

  &:hover,
  &:focus {
    background-color: map-get($theme-palette, primary, hover-background);
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

    &:hover {
      .base-icon {
        fill: $white;
      }
    }
  }

  &:active {
    background-color: map-get($theme-palette, primary, active-background);
  }

  &.dark {
    background-color: map-get($theme-palette, dark, background-color);

    &:hover {
      background-color: map-get($theme-palette, dark, hover-background);
    }

    &.outline {
      border: 1px solid map-get($theme-palette, dark, border-color);
      background-color: transparent;
      color: $font-color-secondary;

      &:hover {
        background-color: map-get($theme-palette, dark, background-color);
      }
    }
  }

  &.success {
    background-color: map-get($theme-palette, success, background-color);

    &:hover {
      background-color: map-get($theme-palette, success, hover-background);
    }
  }

  &.danger {
    background-color: map-get($theme-palette, danger, background-color);

    &:hover {
      background-color: map-get($theme-palette, danger, hover-background);
    }
  }

  &.transparent {
    background-color: map-get($theme-palette, transparent, background-color);
  }

  &.disabled {
    cursor: default;
    background-color: map-get($theme-palette, disabled, background-color);
    color: map-get($theme-palette, disabled, font-color);

    &:hover {
      background-color: map-get($theme-palette, disabled, background-color);
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
