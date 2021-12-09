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
      return this.color !== '' ? `-${this.color}` : '';
    }
  }
};
</script>

<style lang="scss" scoped>
$border-radius: 12px;
$padding: 24px 56px;

$colors-default: (
  background-color: $primary,
  hover-background: darken($primary, 5%),
  color: $font-color-base
);

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 32px;
  background-color: $primary;
  border: 0;
  padding: $padding;
  border-radius: $border-radius;
  color: $white;
  line-height: $line-height-base;
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  font-size: $font-size-base;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  transition: 0.2s;

  &:hover,
  &:focus {
    background-color: map-get($colors-default, hover-background);
  }

  &.full-width {
    width: 100%;
  }
}
</style>
