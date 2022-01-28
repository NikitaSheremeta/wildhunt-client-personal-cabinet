<template>
  <component
    :is="tagName"
    :class="computedClasses"
    :type="type"
    :href="href"
    :disabled="disabledAttribute"
    :target="targetAttribute"
    @click="onClick"
  >
    <BaseIcon
      v-if="loading"
      class="button-icon"
      icon="preloader"
      spin
      width="24"
      height="24"
    />

    <BaseIcon
      v-if="iconLeft"
      :icon="iconLeft"
      class="button-icon"
      width="20"
      height="20"
    />

    <slot v-if="!!$slots.default" />

    <BaseIcon
      v-if="iconRight"
      :icon="iconRight"
      class="button-icon"
      width="20"
      height="20"
    />
  </component>
</template>

<script>
import BaseIcon from './BaseIcon';

export default {
  name: 'BaseButton',
  components: {
    BaseIcon
  },
  props: {
    tagName: {
      type: String,
      default: 'button'
    },
    to: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    baseClassName: {
      type: String,
      default: 'base-button'
    },
    color: {
      type: String,
      default: 'primary'
    },
    underline: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedClasses() {
      return [
        this.baseClassNameModifier,
        this.colorModifier,
        this.disabledModifier,
        this.fullWidthModifier,
        this.preloaderModifier,
        this.underlineModifier,
        this.iconLeftModifier,
        this.iconRightModifier
      ];
    },
    disabledAttribute() {
      return this.tagName === 'button' && this.disabled ? this.disabled : null;
    },
    targetAttribute() {
      return this.tagName !== 'button' && this.target ? this.target : null;
    },
    baseClassNameModifier() {
      return this.tagName === 'button' ? this.baseClassName : 'base-link';
    },
    colorModifier() {
      return this.color !== '' ? this.color : '';
    },
    disabledModifier() {
      return this.disabled ? 'disabled' : '';
    },
    fullWidthModifier() {
      return this.fullWidth ? 'full-width' : '';
    },
    preloaderModifier() {
      return this.loading ? 'preloader' : '';
    },
    underlineModifier() {
      return this.underline ? 'underline' : '';
    },
    iconLeftModifier() {
      return this.iconLeft ? 'icon-left' : '';
    },
    iconRightModifier() {
      return this.iconRight ? 'icon-right' : '';
    }
  },
  methods: {
    onClick() {
      if (this.to !== null) {
        this.$router.push(this.to);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$border-radius: 12px;
$padding: 24px 48px;
$height: 32px;

$button-colors: (
  primary: (
    background-color: $primary,
    hover-background: darken($primary, 6%),
    active-background: lighten($primary, 6%)
  ),
  dark: (
    background-color: $black,
    hover-background: darken($black, 6%),
    active-background: lighten($black, 6%)
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
    color: $disabled-color
  )
);

$link-colors: (
  secondary: (
    color: $font-color-secondary,
    hover-color: $font-color-base
  )
);

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: $padding;
  height: $height;
  border: 0;
  border-radius: $border-radius;
  background-color: map-get($button-colors, primary, background-color);
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
    background-color: map-get($button-colors, primary, hover-background);
  }

  &:active {
    background-color: map-get($button-colors, primary, active-background);
  }

  &.full-width {
    width: 100%;
  }

  &.dark {
    background-color: map-get($button-colors, dark, background-color);

    &:hover {
      background-color: map-get($button-colors, dark, hover-background);
    }

    &:active {
      background-color: map-get($button-colors, dark, active-background);
    }
  }

  &.success {
    background-color: map-get($button-colors, success, background-color);

    &:hover {
      background-color: map-get($button-colors, success, hover-background);
    }

    &:active {
      background-color: map-get($button-colors, success, active-background);
    }
  }

  &.danger {
    background-color: map-get($button-colors, danger, background-color);

    &:hover {
      background-color: map-get($button-colors, danger, hover-background);
    }

    &:active {
      background-color: map-get($button-colors, danger, active-background);
    }
  }

  &.disabled {
    cursor: default;
    background-color: map-get($button-colors, disabled, background-color);
    color: map-get($button-colors, disabled, color);
  }

  &.preloader {
    color: rgba(0, 0, 0, 0);
  }

  .base-icon {
    position: absolute;
  }
}

.base-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  .base-icon {
    transition: 0.2s;
  }

  &:hover {
    color: map-get($link-colors, secondary, color);

    .base-icon {
      fill: map-get($link-colors, secondary, color);
      stroke: map-get($link-colors, secondary, color);
    }
  }

  &.secondary {
    color: map-get($link-colors, secondary, color);

    .base-icon {
      fill: map-get($link-colors, secondary, color);
      stroke: map-get($link-colors, secondary, color);
    }

    &:hover {
      color: map-get($link-colors, secondary, hover-color);

      .base-icon {
        fill: map-get($link-colors, secondary, hover-color);
        stroke: map-get($link-colors, secondary, hover-color);
      }
    }
  }

  &.underline {
    text-decoration: underline;
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
}
</style>
