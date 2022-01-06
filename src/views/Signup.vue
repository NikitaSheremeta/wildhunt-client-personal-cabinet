<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <form :class="$style.form" @submit.prevent="submitHandler">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="username"
          type="text"
          placeholder="Логин"
        >
          <template #error>
            <span v-if="isUserNameError">
              К сожалению, данный логин уже занят
            </span>
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="email"
          type="text"
          placeholder="Электронная почта"
          @input="onInput"
          @blur="onBlur"
        >
          <template #error>
            <span v-if="isEmailValid()">
              {{ emailErrorMessage }}
            </span>
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="password"
          create-password
          type="password"
          placeholder="Пароль"
        />

        <BaseInput
          :class="$style['form-item']"
          v-model:value="confirmPassword"
          repeat-password
          :success-status="isPasswordEqual"
          type="password"
          placeholder="Повторите пароль"
          @blur="checkPasswordIsEqual"
        >
          <template #error>
            <span v-if="isPasswordEqualError">
              Подтверждение не совпадает с паролем
            </span>
          </template>
        </BaseInput>

        <div :class="$style['form-controls']">
          <BaseButton full-width> Зарегистрироваться </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';

const MAGIC_NUMBERS = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 24
};

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isPasswordEqual: null,
      isUserNameError: false,
      isPasswordEqualError: false,
      emailErrorMessage: ''
    };
  },
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  validations() {
    return {
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(MAGIC_NUMBERS.PASSWORD_MIN_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.PASSWORD_MAX_LENGTH)
      }
    };
  },
  watch: {
    password: {
      handler(value) {
        if (this.confirmPassword.length !== 0) {
          this.isPasswordEqual =
            value.length !== 0 && value === this.confirmPassword;

          this.isPasswordEqualError = !this.isPasswordEqual;
        }
      }
    },
    confirmPassword: {
      handler(value) {
        this.isPasswordEqual =
          value.length !== 0 && value === this.password ? true : null;

        this.isPasswordEqualError = false;
      }
    }
  },
  methods: {
    onInput(event) {
      event.target.value.length !== 0 ? this.v$.$reset() : this.v$.$touch();
    },
    onBlur() {
      this.v$.$touch();
    },
    isEmailValid() {
      const email = this.v$.email;

      if (email.$dirty) {
        if (email['required'].$invalid) {
          this.emailErrorMessage = 'Введите электронную почту';

          return true;
        }

        if (email['email'].$invalid) {
          this.emailErrorMessage = 'Неправильный адрес электронной почты';

          return true;
        }
      }

      return false;
    },
    checkPasswordIsEqual(event) {
      const value = event.target.value;

      if (value.length !== 0) {
        this.isPasswordEqual = value === this.password;

        this.isPasswordEqualError = !this.isPasswordEqual;
      }
    },
    async submitHandler() {
      return false;
    }
  }
};
</script>

<style lang="scss" module>
.container,
.row {
  height: 100%;
}

.row {
  display: flex;
  justify-content: center;
}

.form {
  margin-top: 128px;
  width: 320px;

  &-title {
    font-weight: $font-weight-base;
  }

  &-item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
  }
}
</style>
