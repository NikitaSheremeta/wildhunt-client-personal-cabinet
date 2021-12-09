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
    }
  },
  computed: {
    computedClasses() {
      return [this.baseClassName, this.colorModifier];
    },
    colorModifier() {
      return this.color !== '' ? this.color : '';
    }
  }
};
</script>

<style lang="scss" scoped>
$colors: (
  primary: (
    color: $font-color-secondary,
    hover-color: $font-color-base
  )
);

.link {
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: $font-color-base;
    text-decoration: underline;
  }

  &.secondary {
    color: map-get($colors, primary, color);

    &:hover {
      color: map-get($colors, primary, hover-color);
    }
  }
}
</style>
