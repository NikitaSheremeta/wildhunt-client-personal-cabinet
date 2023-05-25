<template>
  <div :class="['base-input', classes]">
    <div class="wrapper">
      <input
        v-if="!textarea"
        ref="input"
        class="field"
        :value="modelValue"
        :type="type"
        :data-id="dataId"
        :name="name"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        v-on="inputListeners"
      />

      <textarea
        v-if="textarea"
        class="field"
        :value="modelValue"
        :name="name"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        v-on="inputListeners"
      />

      <div v-if="shouldDisplayIcon" class="icon" @mousedown="onMousedownIcon" @mouseup="onMouseupIcon">
        <slot v-if="!!$slots.icon" name="icon" />

        <BaseIcon v-if="icon" :icon="icon" color="secondary" />

        <BaseIcon
          v-if="validation && !disableSuccessIcon && validation.valid"
          icon="check"
          color="success"
          width="16"
          height="16"
        />

        <BaseIcon
          v-if="validation && validation.touched && !validation.valid"
          icon="exclamation"
          color="danger"
          width="16"
          height="16"
        />
      </div>
    </div>

    <slot v-if="!!$slots.extension" name="extension" />

    <span v-if="shouldDisplayValidationMessage" class="validation-notice" v-text="validation.notice" />
  </div>
</template>

<script>
import { computed, ref, useSlots } from 'vue';
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
    textarea: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    dataId: {
      type: [Number, null],
      default: null
    },
    name: {
      type: String,
      required: true
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
    trim: {
      type: Boolean,
      default: false
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
    },
    disableSuccessIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ['keydown', 'input', 'update:model-value', 'click', 'focus', 'blur'],
  setup: function (props, context) {
    const input = ref(null);

    const slots = useSlots();

    const classes = computed(() => [
      props.textarea ? 'textarea' : '',
      props.disabled ? 'disabled' : '',
      props.validation && props.validation.touched && props.validation.valid ? 'valid' : '',
      props.validation && props.validation.touched && !props.validation.valid ? 'invalid' : ''
    ]);

    const shouldDisplayIcon = computed(
      () =>
        Boolean(slots.icon) ||
        props.icon ||
        (props.validation && !props.disableSuccessIcon && props.validation.valid) ||
        (props.validation && props.validation.touched && !props.validation.valid)
    );

    const shouldDisplayValidationMessage = computed(
      () => props.validation && props.validation.touched && props.validation.notice && !props.disableNotice
    );

    const inputListeners = computed(() => {
      return {
        keydown: (event) => {
          if (event.key === 'Escape') {
            input.value.blur();
          }

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

          if (props.trim) {
            event.target.value = event.target.value.replace(/\s/g, '');
          }

          context.emit('input', event);
          context.emit('update:model-value', event.target.value);
        },
        click: (event) => {
          context.emit('click', event);
        },
        focus: (event) => {
          context.emit('focus', event);
        },
        blur: (event) => {
          if (props.validation) {
            props.validation.blur();
          }

          context.emit('blur', event);
        }
      };
    });

    const onMousedownIcon = (event) => {
      event.preventDefault();
    };

    // Fixing a bag with the cursor moving to the beginning of the line on the onMousedownIcon event
    const onMouseupIcon = () => {
      setTimeout(() => {
        input.value.selectionStart = input.value.value.length;
      });
    };

    return {
      input,
      classes,
      shouldDisplayIcon,
      shouldDisplayValidationMessage,
      inputListeners,
      onMousedownIcon,
      onMouseupIcon,
      magicNumbers
    };
  }
};
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  font-style: normal;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    user-select: none;
    @include field;

    .field {
      padding: 0 24px;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
      border-radius: $field-border-radius;
      color: map-get($field-palette, primary, color);
      font-family: inherit;
      font-size: $font-size-base;
      font-style: inherit;
      box-sizing: border-box;

      @include placeholder() {
        line-height: 1;
        color: map-get($field-palette, primary, placeholder-color);
        font-family: inherit;
        font-size: inherit;
        transition: 0.2s;
      }

      &[type='text'] {
        @include truncate;
      }

      &[type='email'] {
        @include truncate;
      }

      &[type='password']:not(:placeholder-shown) {
        font-weight: $font-weight-bold;
        letter-spacing: -2px;
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }

      &:focus {
        box-shadow: none;
        outline: none;
      }

      &:focus::-webkit-input-placeholder {
        color: map-get($field-palette, primary, hover-placeholder-color);
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:disabled {
        color: map-get($field-palette, disabled, color);

        @include placeholder() {
          color: map-get($field-palette, disabled, placeholder-color);
        }

        &:focus {
          cursor: default;
        }
      }
    }

    .icon {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-right: 24px;
    }
  }

  &.textarea {
    .wrapper {
      align-items: inherit;
      height: 160px;

      .field {
        padding-top: 18px;
        padding-bottom: 18px;
        white-space: normal;
        resize: none;
      }

      .icon {
        margin-top: 18px;
        align-items: inherit;
      }
    }
  }

  &.code-item {
    .wrapper {
      display: inherit;

      .field {
        padding: 0;
        text-align: center;

        &:focus {
          background-color: map-get($field-palette, primary, hover-background-color);
        }
      }
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

  &.disabled {
    .wrapper {
      background-color: map-get($field-palette, disabled, background-color);

      .icon {
        .base-icon {
          fill: map-get($field-palette, disabled, color);
          stroke: map-get($field-palette, disabled, color);
          cursor: default;
        }
      }
    }

    .validation-notice {
      color: map-get($field-palette, disabled, color);
    }
  }
}
</style>
