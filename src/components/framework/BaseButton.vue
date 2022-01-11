<template>
  <component
    :is="tagName"
    :class="computedClasses"
    :type="type"
    :disabled="disabledAttribute"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    tagName: {
      type: String,
      default: 'button'
    },
    href: {
      type: [String, Object],
      default: null
    },
    type: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    baseClassName: {
      type: String,
      default: 'base-button'
    }
  },
  computed: {
    computedClasses() {
      return [this.baseClassName, this.fullWidthModifier, this.colorModifier];
    },
    disabledAttribute() {
      return this.tagName === 'button' && this.disabled;
    },
    fullWidthModifier() {
      return this.fullWidth ? 'full-width' : '';
    },
    colorModifier() {
      return this.color !== '' ? this.color : '';
    }
  }
};
</script>

<style lang="scss" scoped>
$border-radius: 12px;
$padding: 24px 48px;
$height: 32px;

$colors: (
  primary: (
    background-color: $primary,
    hover-background: darken($primary, 4%),
    color: $font-color-base
  ),
  dark: (
    background-color: $black,
    hover-background: darken($black, 4%)
  ),
  success: (
    background-color: $success,
    hover-background: darken($success, 4%)
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
  background-color: map-get($colors, primary, background-color);
  line-height: $line-height-base;
  color: map-get($colors, primary, color);
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
    background-color: map-get($colors, primary, hover-background);
  }

  &.full-width {
    width: 100%;
  }

  &.dark {
    background-color: map-get($colors, dark, background-color);

    &:hover {
      background-color: map-get($colors, dark, hover-background);
    }
  }

  &.success {
    background-color: map-get($colors, success, background-color);

    &:hover {
      background-color: map-get($colors, success, hover-background);
    }
  }
}
</style>
