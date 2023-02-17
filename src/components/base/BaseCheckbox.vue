<template>
  <label :class="['base-checkbox', classes]">
    <input class="field" type="checkbox" :checked="modelValue" v-on="listeners" />

    <span class="wrapper">
      <span class="check-icon">
        <BaseIcon icon="check" />
      </span>

      <span v-if="!!$slots.default || label" class="label" v-text="label">
        <slot />
      </span>
    </span>
  </label>
</template>

<script>
import { computed } from 'vue';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'BaseCheckbox',
  components: {
    BaseIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    label: {
      type: [String, null],
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const classes = computed(() => [props.color ? props.color : '']);

    const listeners = computed(() => {
      return {
        change: (event) => {
          context.emit('update:modelValue', event.target.checked);
        }
      };
    });

    return { classes, listeners };
  }
};
</script>

<style lang="scss" scoped>
$color-palette: (
  primary: (
    color: $font-color-base
  ),
  secondary: (
    color: $font-color-secondary
  )
);

.base-checkbox {
  user-select: none;
  line-height: $line-height-secondary;
  font-size: $font-size-xs;

  .field {
    display: none;

    & + .wrapper {
      display: flex;
      cursor: pointer;

      .check-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        padding: 4px;
        width: 12px;
        height: 12px;
        background-color: transparent;
        border-radius: 4px;
        box-shadow: inset 0 0 0 2px $gray-800;

        .base-icon {
          width: 100%;
          height: 100%;
          flex-shrink: 0;
          transition: 0.2s;
          visibility: hidden;
          opacity: 0;
        }
      }

      &:hover {
        .base-icon {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    &:checked + .wrapper {
      .check-icon {
        background-color: $success;
        box-shadow: none;

        .base-icon {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }

  &.secondary {
    .label {
      color: map-get($color-palette, secondary, color);
    }
  }
}
</style>
