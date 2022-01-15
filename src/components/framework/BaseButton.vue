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

    <slot v-if="!!$slots.default && !loading" />
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
        this.underlineModifier
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
    active-background: lighten($primary, 6%),
    color: $font-color-base
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
  color: map-get($button-colors, primary, color);
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

  &.preloader {
    pointer-events: none;
    cursor: default;
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

  &.disabled {
    cursor: default;
    background-color: map-get($button-colors, disabled, background-color);
    color: map-get($button-colors, disabled, color);
  }
}

.base-link {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: map-get($link-colors, secondary, color);
  }

  &.secondary {
    color: map-get($link-colors, secondary, color);

    &:hover {
      color: map-get($link-colors, secondary, hover-color);
    }
  }

  &.underline {
    text-decoration: underline;
  }
}
</style>
