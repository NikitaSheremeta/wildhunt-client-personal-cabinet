<template>
  <button :class="['base-button', classes]" :disabled="disabled" @click="onClick">
    <BaseIcon v-if="loading" spin icon="preloader" />

    <BaseIcon v-if="icon" color="secondary" :icon="icon" width="14" height="14" />

    <span v-if="label" v-text="label" />
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
    fullWidth: {
      type: Boolean,
      default: false
    },
    iconButton: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter();

    const classes = computed(() => [
      props.theme ? props.theme : '',
      props.fullWidth ? 'full-width' : '',
      props.iconButton ? 'icon-button' : '',
      props.disabled ? 'disabled' : '',
      props.loading ? 'loading' : ''
    ]);

    const onClick = () => {
      if (props.to) {
        router.push(props.to);
      }
    };

    return {
      classes,
      onClick
    };
  }
};
</script>

<style lang="scss" scoped>
$theme-palette: (
  primary: (
    background-color: $primary,
    hover-background: darken($primary, 6%),
    active-background: lighten($primary, 6%)
  ),
  dark: (
    background-color: $gray-800,
    hover-background: $black,
    active-background: $black
  ),
  success: (
    background-color: $success,
    hover-background: darken($success, 6%),
    active-background: lighten($success, 6%)
  ),
  danger: (
    background-color: $danger,
    hover-background: darken($danger, 6%),
    active-background: lighten($danger, 6%)
  ),
  disabled: (
    background-color: $disabled-background,
    font-color: $disabled-color
  )
);

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 24px 48px;
  height: 32px;
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

  &:active {
    background-color: map-get($theme-palette, primary, active-background);
  }

  &.dark {
    background-color: map-get($theme-palette, dark, background-color);

    &:hover {
      background-color: map-get($theme-palette, dark, hover-background);
    }

    &:active {
      background-color: map-get($theme-palette, dark, active-background);
    }
  }

  &.success {
    background-color: map-get($theme-palette, success, background-color);

    &:hover {
      background-color: map-get($theme-palette, success, hover-background);
    }

    &:active {
      background-color: map-get($theme-palette, success, active-background);
    }
  }

  &.danger {
    background-color: map-get($theme-palette, danger, background-color);

    &:hover {
      background-color: map-get($theme-palette, danger, hover-background);
    }

    &:active {
      background-color: map-get($theme-palette, danger, active-background);
    }
  }

  &.full-width {
    width: 100%;
  }

  &.icon-button {
    padding: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;

    .base-icon {
      transition: 0.2s;
    }

    &:hover {
      .base-icon {
        fill: $white;
      }
    }
  }

  &.disabled {
    cursor: default;
    background-color: map-get($theme-palette, disabled, background-color);
    color: map-get($theme-palette, disabled, font-color);

    &:hover {
      background-color: map-get($theme-palette, disabled, background-color);
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
