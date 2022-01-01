<template>
  <div :class="computedClasses">
    <label class="label">
      <input v-bind="attrs" @input="onInput" />

      <a
        v-if="type === 'password' && !repeatPassword"
        href="#"
        class="field-icon"
        @click.stop.prevent="changePasswordType"
      >
        <BaseIcon
          :icon="local.type === 'password' ? 'eye' : 'eye-slash'"
          width="20"
          height="20"
          color="secondary"
        />
      </a>

      <span v-if="iconName" class="field-icon">
        <BaseIcon :icon="iconName" color="secondary" />
      </span>

      <span v-if="successStatusModifier" class="field-icon">
        <BaseIcon icon="check" color="success" />
      </span>

      <span v-if="errorStatusModifier" class="field-icon">
        <BaseIcon icon="exclamation" color="danger" />
      </span>
    </label>

    <div
      v-if="createPassword"
      class="strength-password-checker"
      :class="strength.status"
    >
      <div class="meter">
        <span class="meter__item"></span>
        <span class="meter__item"></span>
        <span class="meter__item"></span>
      </div>

      <div class="notice info">
        <span>
          {{ strength.notice || 'Пароль должен быть не менее 8 символов' }}
        </span>
      </div>
    </div>

    <div v-if="hasInfoSlot" class="notice info">
      <slot name="info" />
    </div>

    <div v-if="hasErrorSlot" class="notice error">
      <slot name="error" />
    </div>

    <div v-if="hasSuccessSlot" class="notice success">
      <slot name="success" />
    </div>
  </div>
</template>

<script scoped>
import BaseIcon from './BaseIcon';
import { useStrengthPasswordChecker } from '../use/strength-password-checker';

export default {
  name: 'BaseInput',
  components: {
    BaseIcon
  },
  props: {
    tagName: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    baseClassName: {
      type: String,
      default: 'base-input'
    },
    required: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: null
    },
    successStatus: {
      type: Boolean,
      default: null
    },
    createPassword: {
      type: Boolean,
      default: false
    },
    repeatPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      local: {
        value: '',
        type: ''
      },
      strength: {}
    };
  },
  computed: {
    computedClasses() {
      return [this.baseClassName];
    },
    successStatusModifier() {
      return this.successStatus;
    },
    errorStatusModifier() {
      return !this.successStatus && this.successStatus !== null;
    },
    hasInfoSlot() {
      return Boolean(this.$slots.info);
    },
    hasErrorSlot() {
      return Boolean(this.$slots.error);
    },
    hasSuccessSlot() {
      return Boolean(this.$slots.success);
    },
    attrs() {
      return {
        ...this.$attrs,
        value: this.local.value,
        type: this.tagName !== 'textarea' ? this.local.type : null,
        ref: this.createPassword ? 'createPassword' : 'field',
        class: 'field'
      };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.local.value = val;
      }
    },
    type: {
      immediate: true,
      handler(value) {
        this.local.type = value;
      }
    }
  },
  methods: {
    onInput(event) {
      const value = event.target.value;

      this.local.value = value;

      this.$emit('update:value', value);

      if (this.createPassword) {
        this.strength = useStrengthPasswordChecker(value);
      }
    },
    changePasswordType() {
      this.local.type = this.local.type === 'password' ? 'text' : 'password';
    }
  }
};
</script>

<style lang="scss" scoped>
$input: (
  padding: (
    4px,
    24px
  ),
  height: 40px,
  border-radius: 12px,
  font-family: $font-family-base,
  font-weight: $font-weight-base,
  font-size: $font-size-base,
  font-style: normal
);

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
  font-family: map-get($input, font-family);
  font-weight: map-get($input, font-weight);
  font-size: map-get($input, font-size);
  font-style: map-get($input, font-style);

  .label {
    display: flex;
    position: relative;
    width: 100%;
  }

  .field {
    display: block;
    padding: nth(map-get($input, padding), 1) nth(map-get($input, padding), 2);
    width: 100%;
    min-width: 0;
    height: map-get($input, height);
    background-color: map-get($colors, primary, background-color);
    border: none;
    border-radius: map-get($input, border-radius);
    color: map-get($colors, primary, color);
    font-family: inherit;
    font-size: map-get($input, font-size);
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

    // This is necessary to reduce the interval between password dots
    &[type='password']:not(:placeholder-shown) {
      letter-spacing: -3px;
    }
  }

  .field-icon {
    z-index: 2;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 16px;
    width: map-get($input, height);
    height: 100%;
    border: none;
    color: $gray-600;
    text-decoration: none;

    &:hover {
      color: $gray-900;
    }
  }

  .strength-password-checker {
    .meter {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 12px;
      width: 100%;

      &__item {
        width: 100%;
        height: 8px;
        background-color: map-get($colors, primary, background-color);
        border-radius: 4px;
      }
    }

    &.danger {
      .notice {
        color: $danger;
      }

      .meter {
        &__item {
          &:first-child {
            background-color: $danger;
          }
        }
      }
    }

    &.warning {
      .notice {
        color: $warning;
      }

      .meter {
        &__item {
          &:nth-child(-n + 2) {
            background-color: $warning;
          }
        }
      }
    }

    &.success {
      .notice {
        color: $success;
      }

      .meter {
        &__item {
          background-color: $success;
        }
      }
    }
  }

  .notice {
    margin-top: 8px;
    color: $font-color-secondary;
    font-size: $font-size-xs;

    &.error {
      color: $danger;
    }
  }
}
</style>
