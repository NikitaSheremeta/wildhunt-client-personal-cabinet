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
    }
  },
  computed: {
    computedClasses() {
      return [this.baseClassName];
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: $font-color-secondary;
  font-size: 16px;
}
</style>
