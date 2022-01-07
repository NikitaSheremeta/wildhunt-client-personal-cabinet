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
          @input="v$.username.$reset()"
          @blur="v$.username.$touch()"
        >
          <template v-if="isUsernameInvalid()" #error>
            {{ usernameErrorMessage }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="email"
          type="email"
          placeholder="Электронная почта"
          @input="v$.email.$reset()"
          @blur="v$.email.$touch()"
        >
          <template v-if="isEmailInvalid()" #error>
            {{ emailErrorMessage }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="password"
          create-password
          type="password"
          placeholder="Пароль"
          @input="v$.password.$touch()"
        >
          <template v-if="isPasswordInvalid()" #error>
            {{ passwordErrorMessage }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="confirmPassword"
          repeat-password
          type="password"
          placeholder="Повторите пароль"
          @input="v$.confirmPassword.$reset()"
          @blur="v$.confirmPassword.$touch()"
        >
          <template v-if="isConfirmPasswordInvalid()" #error>
            {{ confirmPasswordErrorMessage }}
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
  maxLength,
  sameAs
} from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';

const onlyLatinCharacters = helpers.regex(
  /^[a-zA-Z0-9~!@#$%^&*()_+-={}\\|;',./<>?":]+$/
);

const MAGIC_NUMBERS = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 24
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
      usernameErrorMessage: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
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
        onlyLatinCharacters,
        minLength: minLength(MAGIC_NUMBERS.MIN_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.MAX_LENGTH)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        onlyLatinCharacters,
        minLength: minLength(MAGIC_NUMBERS.MIN_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.MAX_LENGTH)
      },
      confirmPassword: {
        required,
        sameAs: sameAs(this.password)
      }
    };
  },
  methods: {
    isUsernameInvalid() {
      const username = this.v$.username;

      if (username.$dirty) {
        if (username['required'].$invalid) {
          this.usernameErrorMessage = 'Необходимо придумать никнейм';

          return true;
        }

        if (username['minLength'].$invalid) {
          this.usernameErrorMessage = `Никнейм должен быть не менее ${MAGIC_NUMBERS.MIN_LENGTH} символов`;

          return true;
        }

        if (username['maxLength'].$invalid) {
          this.usernameErrorMessage = `Никнейм должен быть не более ${MAGIC_NUMBERS.MAX_LENGTH} символов`;

          return true;
        }

        if (username['onlyLatinCharacters'].$invalid) {
          this.usernameErrorMessage =
            'Никнейм не должен содержать русские буквы';

          return true;
        }
      }

      return null;
    },
    isEmailInvalid() {
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

      return null;
    },
    isPasswordInvalid() {
      const password = this.v$.password;

      if (password.$dirty) {
        if (password['required'].$invalid) {
          this.passwordErrorMessage = 'Необходимо придумать пароль';

          return true;
        }

        if (password['minLength'].$invalid) {
          this.passwordErrorMessage = `Пароль должен быть не менее ${MAGIC_NUMBERS.MIN_LENGTH} символов`;

          return true;
        }

        if (password['maxLength'].$invalid) {
          this.passwordErrorMessage = `Пароль должен быть не более ${MAGIC_NUMBERS.MAX_LENGTH} символов`;

          return true;
        }

        if (password['onlyLatinCharacters'].$invalid) {
          this.passwordErrorMessage =
            'Пароль не должен содержать русские буквы';

          return true;
        }
      }

      return null;
    },
    isConfirmPasswordInvalid() {
      const confirmPassword = this.v$.confirmPassword;

      if (confirmPassword.$dirty) {
        if (confirmPassword['required'].$invalid) {
          this.confirmPasswordErrorMessage = 'Введите пароль еще раз';

          return true;
        }

        if (confirmPassword['sameAs'].$invalid) {
          this.confirmPasswordErrorMessage =
            'Подтверждение не совпадает с паролем';

          return true;
        }
      }

      return null;
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
