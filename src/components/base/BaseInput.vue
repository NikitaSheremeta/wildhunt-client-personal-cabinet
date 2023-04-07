<template>
  <div :class="['base-input', classes]">
    <div class="wrapper">
      <input
        v-model="input.value"
        class="field"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :autofocus="autofocus"
        v-on="listeners"
      />

      <div class="icon">
        <slot v-if="!!$slots.icon" name="icon"></slot>

        <BaseIcon v-if="icon" :icon="icon" color="secondary" />

        <BaseIcon v-if="input.valid" icon="check" color="success" />

        <BaseIcon v-if="state.validationMessage" icon="exclamation" color="danger" />
      </div>
    </div>

    <slot v-if="!!$slots.extension" name="extension"></slot>

    <span
      v-if="validationNotice && state.validationMessage"
      class="validation-message"
      v-text="state.validationMessage"
    />
  </div>
</template>

<script type="module">
import { computed, reactive, watch } from 'vue';
import BaseIcon from '@/components/base/BaseIcon';
import { useInput } from '@/hooks/useInput';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'BaseInput',
  components: {
    BaseIcon
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, null],
      default: null
    },
    debounceValidation: {
      type: Boolean,
      default: true
    },
    validationNotice: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'blur'],
  setup(props, context) {
    const state = reactive({ validationMessage: '' });

    const input = useInput({
      value: '',
      rules: props.rules
    });

    const classes = computed(() => [
      props.disabled ? 'disabled' : '',
      input.touched && input.valid ? 'valid' : '',
      input.touched && !input.valid ? 'invalid' : ''
    ]);

    const listeners = computed(() => {
      return {
        input: (event) => {
          const value = event.target.value;

          context.emit('update:modelValue', value);

          input.value = value;

          state.validationMessage = '';
        },
        blur: () => {
          context.emit('blur');

          validationHandle();
        }
      };
    });

    if (props.debounceValidation) {
      watch(
        () => input.value,
        debounce(() => validationHandle(), magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)
      );
    }

    const validationHandle = () => {
      input.blur();

      if (props.rules && !input.valid) {
        state.validationMessage = input.error;
      }
    };

    return {
      state,
      input,
      classes,
      listeners
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

  .validation-message {
    margin-top: 8px;
    font-size: $font-size-xs;
    user-select: none;
  }

  &.invalid {
    .validation-message {
      color: $danger;
    }
  }

  &.valid {
    .validation-message {
      color: $success;
    }
  }
}
</style>
