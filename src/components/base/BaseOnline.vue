<template>
  <div :class="['base-online', classes]">
    <span class="point"></span>

    <span> Игроков на сервере: <b>0</b> </span>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'BaseOnline',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed(() => [props.small ? 'small' : '']);

    return {
      classes
    };
  }
};
</script>

<style lang="scss" scoped>
.base-online {
  display: flex;
  align-items: center;
  gap: 12px;
  color: $font-color-secondary;
  font-size: $font-size-base;

  .point {
    position: relative;
    top: -1px;
    width: 12px;
    height: 12px;
    background-color: $success;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(108, 176, 102, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
    @include pulse;
  }

  &.small {
    font-size: $font-size-xs;

    .point {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
