<template>
  <div :class="computedClasses">
    <label class="label">
      <input v-bind="attrs" v-on="listeners" />

      <a
        v-if="type === 'password' && !repeatPassword"
        href="#"
        class="field-icon"
        @click.stop.prevent="changePasswordType"
      >
        <BaseIcon
          :icon="local.type === 'password' ? 'eye' : 'eye-slash'"
          color="secondary"
        />
      </a>

      <span v-if="iconName" class="field-icon">
        <BaseIcon :icon="iconName" color="secondary" />
      </span>

      <span v-if="icon.success" class="field-icon">
        <BaseIcon icon="check" color="success" width="18" height="18" />
      </span>
    </label>

    <div
      v-if="strengthPasswordChecker()"
      class="strength-password-checker"
      :class="strength.status"
    >
      <div class="meter">
        <span class="meter__item"></span>
        <span class="meter__item"></span>
        <span class="meter__item"></span>
      </div>

      <span class="notice">
        {{ strength.notice }}
      </span>
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
      default: 'input',
      validator: (value) => ['input', 'textarea'].includes(value)
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
    createPassword: {
      type: Boolean,
      default: false
    },
    repeatPassword: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    local: {
      value: '',
      type: ''
    },
    icon: {
      success: false,
      error: false
    },
    strength: {}
  }),
  computed: {
    computedClasses() {
      return [this.baseClassName];
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.local.value = event.target.value;

          this.$emit('input', this.local.value);
        }
      };
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
      handler(val) {
        this.local.type = val;
      }
    }
  },
  methods: {
    changePasswordType() {
      this.local.type = this.local.type === 'password' ? 'text' : 'password';
    },
    strengthPasswordChecker() {
      return this.createPassword
        ? (this.strength = useStrengthPasswordChecker(this.local.value))
        : false;
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

    .notice {
      margin-top: 8px;
      color: $font-color-secondary;
      font-size: $font-size-xs;
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
}
</style>
