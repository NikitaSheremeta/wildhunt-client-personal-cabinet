<template>
  <div :class="['base-notice', classes]">
    <div class="wrapper">
      <span class="icon" v-text="icon" />

      <h2 class="title" v-text="title" />

      <p class="description" v-text="description" />

      <div v-if="!!$slots.extension" class="extension">
        <slot name="extension" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    success: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const classes = computed(() => [props.success ? 'success' : '', props.error ? 'error' : '']);

    return { classes };
  }
};
</script>

<style lang="scss" scoped>
.base-notice {
  position: relative;
  padding: 40px 0;
  width: 320px;
  background-color: $gray-900;
  border-radius: 24px;
  overflow: hidden;

  &:before {
    z-index: 9;
    content: '';
    position: absolute;
    margin: auto;
    top: -40px;
    left: 0;
    right: 0;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    filter: blur(64px);
  }

  &:after {
    content: '';
    position: absolute;
    margin: auto;
    bottom: -40px;
    left: 0;
    right: 0;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    filter: blur(64px);
    background-color: $midnight;
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

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 16px;

    .icon {
      z-index: 9;
      font-size: $font-size-base * 4;
    }

    .title {
      z-index: 9;
      margin: 0;
      font-weight: $font-weight-base;
      text-align: center;
    }

    .description {
      z-index: 9;
      text-align: center;
    }

    .extension {
      z-index: 9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 16px;
    }
  }
}
</style>
