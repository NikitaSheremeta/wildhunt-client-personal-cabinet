<template>
  <label
    :class="['checkbox', { '-checked': isChecked, '-disabled': disabled }]"
  >
    <input
      v-bind="$attrs"
      :checked="isChecked"
      :disabled="disabled"
      :value="value"
      type="checkbox"
      class="input"
      autocomplete="off"
      v-on="listeners"
    />

    <span class="checkbox-wrapper">
      <span class="icon-wrapper">
        <svg-icon class="icon" icon="check"></svg-icon>
      </span>

      <span v-if="!!$slots.default" class="label">
        <slot />
      </span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  inheritAttrs: false,
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: null,
      default: null
    },
    modelValue: {
      type: null,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    valueFieldName: {
      type: String,
      default: 'value'
    }
  },
  computed: {
    isChecked() {
      return this.isModelArray ? this.isArrayIncludeValue : this.modelValue;
    },
    isArrayIncludeValue() {
      if (typeof this.value !== 'object') {
        return this.isModelArray && this.modelValue.includes(this.value);
      }

      return (
        this.isModelArray &&
        this.modelValue.findIndex(
          (item) =>
            item[this.valueFieldName] === this.value[this.valueFieldName]
        ) !== -1
      );
    },
    isModelArray() {
      return Array.isArray(this.modelValue);
    },
    listeners() {
      return {
        change: () => {
          if (this.isModelArray) {
            this.setArray();
          } else if (['string', 'number'].includes(typeof this.value)) {
            this.setValueString();
          } else {
            this.$emit('change', !this.modelValue);
          }
        }
      };
    }
  },
  methods: {
    setArray() {
      const value = [...this.modelValue];

      if (this.isArrayIncludeValue) {
        value.splice(value.indexOf(this.value), 1);
        this.$emit('change', value);
      } else {
        value.push(this.value);
        this.$emit('change', value);
      }
    },
    setValueString() {
      this.$emit('change', this.modelValue !== this.value ? this.value : null);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: block;
  user-select: none;
  font-size: 14px;
  line-height: 20px;

  .input {
    display: none;

    & + .checkbox-wrapper {
      display: flex;
      max-width: 100%;
      position: relative;
      cursor: pointer;

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        box-shadow: inset 0 0 0 2px $gray-800;
        color: $gray-800;
        background-color: transparent;
        border-radius: 4px;
        margin-right: 24px;

        &:last-child {
          margin-right: 0;
        }
      }

      .icon {
        display: block;
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        transition: opacity 0.2s linear;
        visibility: hidden;
        opacity: 0;
      }

      &:hover {
        .icon {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    &:checked + .checkbox-wrapper {
      .icon-wrapper {
        box-shadow: none;
        color: $white;
        background-color: $primary;
      }

      .icon {
        visibility: visible;
        opacity: 1;
      }
    }

    &:disabled + .checkbox-wrapper {
      cursor: default;

      .icon-wrapper {
        box-shadow: inset 0 0 0 2px $gray-400;
        color: $gray-400;
        background-color: transparent;
      }

      &,
      &:hover {
        .icon {
          display: none;
        }
      }
    }

    &:disabled:checked + .checkbox-wrapper {
      cursor: default;

      .icon-wrapper {
        box-shadow: none;
        color: $white;
        background-color: $gray-400;
      }

      &,
      &:hover {
        .icon {
          display: block;
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: rgba($gray-400, 0.8);
  }

  &.-checked {
    &:hover {
      background-color: rgba($red, 0.05);
    }

    &:focus {
      background-color: rgba($gray-400, 0.8);
    }

    &:active {
      background-color: rgba($red, 0.2);
    }
  }
}
</style>
