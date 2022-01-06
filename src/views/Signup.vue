<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <form :class="$style.form" @submit.prevent="submitHandler">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="username"
          type="text"
          placeholder="Никнейм"
          @input="onInput($event, 'username')"
          @blur="v$.username.$touch()"
        >
          <template #error>
            <span v-if="isUsernameValid()">
              {{ usernameErrorMessage }}
            </span>
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="email"
          type="email"
          placeholder="Электронная почта"
          @input="onInput($event, 'email')"
          @blur="v$.email.$touch()"
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
        >
          <template #error>
            <span v-if="false"> </span>
          </template>
        </BaseInput>

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
            <span v-if="isConfirmPassword()">
              {{ confirmPasswordErrorMessage }}
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
import {
  helpers,
  required,
  email,
  minLength,
  maxLength
} from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';

const latinCharacters = helpers.regex(/[a-z]/i);

const MAGIC_NUMBERS = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 24,
  USERNAME_MIN_LENGTH: 4,
  USERNAME_MAX_LENGTH: 32
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
      isPasswordEqualError: false,
      usernameErrorMessage: '',
      emailErrorMessage: '',
      confirmPasswordErrorMessage: ''
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
        required,
        latinCharacters,
        minLength: minLength(MAGIC_NUMBERS.USERNAME_MIN_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.USERNAME_MAX_LENGTH)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(MAGIC_NUMBERS.PASSWORD_MIN_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.PASSWORD_MAX_LENGTH)
      },
      confirmPassword: {
        required
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
    onInput(event, field) {
      event.target.value.length !== 0
        ? this.v$[field].$reset()
        : this.v$[field].$touch();
    },
    isUsernameValid() {
      const username = this.v$.username;

      if (username.$dirty) {
        if (username['required'].$invalid) {
          this.usernameErrorMessage = 'Придумайте никнейм';

          return true;
        }

        if (username['minLength'].$invalid) {
          this.usernameErrorMessage = 'Никнейм должен быть не менее 4 символов';

          return true;
        }

        if (username['maxLength'].$invalid) {
          this.usernameErrorMessage =
            'Никнейм должен быть не более 24 символов';

          return true;
        }

        if (username['latinCharacters'].$invalid) {
          this.usernameErrorMessage =
            'Никнейм не должен содержать русские буквы';

          return true;
        }
      }

      return false;
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
    isConfirmPassword() {
      const confirmPassword = this.v$.confirmPassword;

      if (confirmPassword.$dirty) {
        if (confirmPassword['required'].$invalid) {
          this.confirmPasswordErrorMessage = 'Необходимо ввести пароль еще раз';

          return true;
        }
      }
    },
    checkPasswordIsEqual(event) {
      this.v$.confirmPassword.$touch();

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
