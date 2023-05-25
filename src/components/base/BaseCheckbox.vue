<template>
  <label :class="['base-checkbox', classes]">
    <input
      class="field"
      type="checkbox"
      name="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />

    <span class="wrapper">
      <span class="check-icon">
        <BaseIcon icon="check" />
      </span>

      <span v-if="!!$slots.default || label" class="label">
        {{ label }}

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
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const classes = computed(() => [props.disabled ? 'disabled' : '', props.color ? props.color : '']);

    const onChange = (event) => {
      const value = event.target.checked;

      context.emit('update:model-value', value);
    };

    return {
      classes,
      onChange
    };
  }
};
</script>

<style lang="scss" scoped>
.base-checkbox {
  user-select: none;
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
        margin-top: 2px;
        margin-right: 16px;
        padding: 4px;
        width: 12px;
        height: 12px;
        background-color: transparent;
        border-radius: 4px;
        box-shadow: inset 0 0 0 2px $gray-800;

        .base-icon {
          transition: 0.2s;
          visibility: hidden;
          opacity: 0;
        }
      }

      @include media-breakpoint-up(md) {
        &:hover {
          .base-icon {
            visibility: visible;
            opacity: 1;
          }
        }
      }

      @include media-breakpoint-down(sm) {
        &:active {
          .base-icon {
            visibility: visible;
            opacity: 1;
          }
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

    &:disabled + .wrapper {
      .check-icon {
        background-color: $disabled-background;
      }

      .base-icon {
        fill: $disabled-color;
      }
    }
  }

  &.secondary {
    .label {
      color: $font-color-secondary;
    }
  }

  &.disabled {
    pointer-events: none;

    .label {
      color: $disabled-color;
    }
  }
}
</style>
