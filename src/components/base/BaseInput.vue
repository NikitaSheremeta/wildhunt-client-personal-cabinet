<template>
  <div :class="['base-input', classes]">
    <div class="wrapper">
      <input
        class="field"
        :value="modelValue"
        :type="type"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        v-on="inputListeners"
      />

      <div class="icon" @mousedown="onMousedownIcon">
        <slot v-if="!!$slots.icon" name="icon" />

        <BaseIcon v-if="validation.valid && validation.touched" icon="check" color="success" />

        <BaseIcon v-if="!validation.valid && validation.touched" icon="exclamation" color="danger" />

        <BaseIcon v-if="icon" :icon="icon" color="secondary" />
      </div>
    </div>

    <slot v-if="!!$slots.extension" name="extension" />

    <span
      v-if="validation.touched && validation.notice && !disableNotice"
      class="validation-notice"
      v-text="validation.notice"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import BaseIcon from '@/components/base/BaseIcon';
import { magicNumbers } from '@/utils/magic-numbers';

const ALLOWED_KEYS = [
  'Backspace',
  'Delete',
  'ArrowRight',
  'ArrowLeft',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
];

export default {
  name: 'BaseInput',
  components: {
    BaseIcon
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false
    },
    icon: {
      type: String,
      default: ''
    },
    maxLength: {
      type: [Number, null],
      default: null
    },
    notice: {
      type: String,
      default: ''
    },
    disableNotice: {
      type: Boolean,
      default: false
    },
    validation: {
      type: [Object, null],
      default: null
    }
  },
  emits: ['keydown', 'input', 'update:model-value', 'blur'],
  setup: function (props, context) {
    const classes = computed(() => [
      props.disabled ? 'disabled' : '',
      props.validation.touched && props.validation.valid ? 'valid' : '',
      props.validation.touched && !props.validation.valid ? 'invalid' : ''
    ]);

    const inputListeners = computed(() => {
      return {
        keydown: (event) => {
          if (props.type === 'number') {
            if (!ALLOWED_KEYS.includes(event.key)) {
              event.preventDefault();
            }
          }

          context.emit('keydown', event);
        },
        input: (event) => {
          if (props.maxLength && props.maxLength < event.target.value.length) {
            event.target.value = event.target.value.substring(0, props.maxLength);
          }

          context.emit('input', event);
          context.emit('update:model-value', event.target.value);
        },
        blur: (event) => {
          props.validation.blur();

          context.emit('blur', event);
        }
      };
    });

    const onMousedownIcon = (event) => {
      event.preventDefault();
    };

    return {
      classes,
      inputListeners,
      onMousedownIcon,
      magicNumbers
    };
  }
};
</script>

<style lang="scss">
$colors: (
  primary: (
    background-color: $gray-800,
    color: $font-color-base,
    placeholder-color: $font-color-secondary,
    hover-placeholder-color: $gray-700
  )
);

.base-input {
  display: block;
  position: relative;
  width: 100%;
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  font-style: normal;

  .wrapper {
    display: flex;
    position: relative;
    width: 100%;

    .field {
      display: block;
      padding: 6px 24px;
      width: 100%;
      min-width: 0;
      height: 40px;
      background-color: map-get($colors, primary, background-color);
      border: none;
      border-radius: 12px;
      color: map-get($colors, primary, color);
      font-family: inherit;
      font-size: $font-size-base;
      font-style: inherit;

      @include placeholder() {
        line-height: 1;
        color: map-get($colors, primary, placeholder-color);
        font-family: inherit;
        font-size: inherit;
        transition: 0.2s;
      }

      &:focus {
        box-shadow: none;
        outline: none;
      }

      &:focus::-webkit-input-placeholder {
        color: map-get($colors, primary, hover-placeholder-color);
      }

      &:disabled {
        background-color: $disabled-background;
        color: $disabled-color;

        @include placeholder() {
          color: $disabled-color;
        }

        &:focus {
          cursor: default;
        }

        + .icon {
          .base-icon {
            fill: $disabled-color;
            stroke: $disabled-color;
            cursor: default;
          }
        }
      }

      &[type='password']:not(:placeholder-shown) {
        font-weight: $font-weight-bold;
        letter-spacing: -2px;
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    .icon {
      z-index: 2;
      display: flex;
      align-items: center;
      align-self: center;
      position: absolute;
      gap: 8px;
      right: 16px;
    }
  }

  .validation-notice {
    margin-top: 8px;
    font-size: $font-size-xs;
    user-select: none;
  }

  &.invalid {
    .validation-notice {
      color: $danger;
    }
  }

  &.valid {
    .validation-notice {
      color: $success;
    }
  }
}
</style>
