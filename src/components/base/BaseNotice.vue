<template>
  <div :class="computedClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseNotice',
  props: {
    baseClassName: {
      type: String,
      default: 'base-notice'
    },
    success: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClasses() {
      return [this.baseClassName, this.successModifier, this.errorModifier];
    },
    successModifier() {
      return this.success ? 'success' : '';
    },
    errorModifier() {
      return this.error ? 'error' : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.base-notice {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 40px 0;
  width: 320px;
  background-color: $gray-900;
  border-radius: 24px;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    margin: auto;
    top: -64px;
    left: 0;
    right: 0;
    width: 156px;
    height: 156px;
    border-radius: 50%;
    filter: blur(64px);
  }

  &.success {
    &:before {
      background-color: $success;
    }
  }

  &.error {
    &:before {
      background-color: $danger;
    }
  }
}
</style>
