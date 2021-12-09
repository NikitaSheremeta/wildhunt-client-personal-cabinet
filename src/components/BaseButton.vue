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
    disabled: {
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
      return [this.baseClassName];
    },
    disabledAttribute() {
      return this.tagName === 'button' && this.disabled;
    }
  }
};
</script>

<style lang="scss" scoped>
$border-radius: 12px;
$padding: 24px 56px;

.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 40px;
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
}
</style>
