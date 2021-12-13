<template>
  <a :class="computedClasses">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'Link',
  props: {
    baseClassName: {
      type: String,
      default: 'link'
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
      return [this.baseClassName, this.colorModifier, this.underlineModifier];
    },
    colorModifier() {
      return this.color !== '' ? this.color : '';
    },
    underlineModifier() {
      return this.underline ? 'underline' : '';
    }
  }
};
</script>

<style lang="scss" scoped>
$colors: (
  secondary: (
    color: $font-color-secondary,
    hover-color: $font-color-base
  )
);

.link {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: $font-color-secondary;
  }

  &.secondary {
    color: map-get($colors, secondary, color);

    &:hover {
      color: map-get($colors, secondary, hover-color);
    }
  }

  &.underline {
    text-decoration: underline;
  }
}
</style>
