<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <form :class="$style.form" @submit.prevent="submitHandler">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.username"
          type="text"
          placeholder="Никнейм"
          @input="v$.form['username'].$reset()"
          @blur="v$.form['username'].$touch()"
        >
          <template v-if="isUsernameInvalid()" #error>
            {{ errorMessage.username }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.email"
          type="email"
          placeholder="Электронная почта"
          @input="v$.form['email'].$reset()"
          @blur="v$.form['email'].$touch()"
        >
          <template v-if="isEmailInvalid()" #error>
            {{ errorMessage.email }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.password"
          create-password
          type="password"
          placeholder="Пароль"
          @input="v$.form['password'].$touch()"
          @blur="v$.form['password'].$touch()"
        >
          <template v-if="isPasswordInvalid()" #error>
            {{ errorMessage.password }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.confirmPassword"
          repeat-password
          type="password"
          placeholder="Повторите пароль"
          @input="v$.form['confirmPassword'].$reset()"
          @blur="v$.form['confirmPassword'].$touch()"
        >
          <template v-if="isConfirmPasswordInvalid()" #error>
            {{ errorMessage.confirmPassword }}
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
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errorMessage: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  validations() {
    return {
      form: {
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
          sameAs: sameAs(this.form.password)
        }
      }
    };
  },
  methods: {
    isUsernameInvalid() {
      const username = this.v$.form['username'];

      if (username.$dirty) {
        if (username.required.$invalid) {
          this.errorMessage.username = 'Необходимо придумать никнейм';

          return true;
        }

        if (username.minLength.$invalid) {
          this.errorMessage.username = `Никнейм должен быть не менее ${MAGIC_NUMBERS.MIN_LENGTH} символов`;

          return true;
        }

        if (username.maxLength.$invalid) {
          this.errorMessage.username = `Никнейм должен быть не более ${MAGIC_NUMBERS.MAX_LENGTH} символов`;

          return true;
        }

        if (username.onlyLatinCharacters.$invalid) {
          this.errorMessage.username =
            'Никнейм не должен содержать русские буквы';

          return true;
        }
      }

      return null;
    },
    isEmailInvalid() {
      const email = this.v$.form['email'];

      if (email.$dirty) {
        if (email.required.$invalid) {
          this.errorMessage.email = 'Введите электронную почту';

          return true;
        }

        if (email.email.$invalid) {
          this.errorMessage.email = 'Неправильный адрес электронной почты';

          return true;
        }
      }

      return null;
    },
    isPasswordInvalid() {
      const password = this.v$.form['password'];

      if (password.$dirty) {
        if (password.required.$invalid) {
          this.errorMessage.password = 'Необходимо придумать пароль';

          return true;
        }

        if (password.minLength.$invalid) {
          this.errorMessage.password = `Пароль должен быть не менее ${MAGIC_NUMBERS.MIN_LENGTH} символов`;

          return true;
        }

        if (password.maxLength.$invalid) {
          this.errorMessage.password = `Пароль должен быть не более ${MAGIC_NUMBERS.MAX_LENGTH} символов`;

          return true;
        }

        if (password.onlyLatinCharacters.$invalid) {
          this.errorMessage.password =
            'Пароль не должен содержать русские буквы';

          return true;
        }
      }

      return null;
    },
    isConfirmPasswordInvalid() {
      const confirmPassword = this.v$.form['confirmPassword'];

      if (confirmPassword.$dirty) {
        if (confirmPassword.required.$invalid) {
          this.errorMessage.confirmPassword = 'Введите пароль еще раз';

          return true;
        }

        if (confirmPassword.sameAs.$invalid) {
          this.errorMessage.confirmPassword =
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
