<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <form :class="$style.form" @submit.prevent="submitHandler">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          :autofocus="true"
          v-model:value="username"
          type="text"
          placeholder="Никнейм"
          @input="v$.username.$reset()"
          @blur="v$.username.$touch()"
        >
          <template v-if="isUsernameInvalid()" #error>
            {{ errorMessage.username }}
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
            {{ errorMessage.email }}
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
            {{ errorMessage.password }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          :success="isConfirmPasswordValid"
          v-model:value="confirmPassword"
          repeat-password
          type="password"
          placeholder="Повторите пароль"
          @input="v$.confirmPassword.$reset()"
          @blur="v$.confirmPassword.$touch()"
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
import { useDebounce } from '../components/use/debounce';

const onlyLatinCharacters = helpers.regex(
  /^[a-zA-Z0-9~!@#$%^&*()_+-={}\\|;',./<>?":]+$/
);

const MAGIC_NUMBERS = {
  MIN_USERNAME_LENGTH: 2,
  MAX_USERNAME_LENGTH: 24,
  MIN_PASSWORD_LENGTH: 4,
  MAX_PASSWORD_LENGTH: 24,
  ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS: 1200
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
      v$: useVuelidate({ $lazy: true })
    };
  },
  validations() {
    return {
      username: {
        required,
        onlyLatinCharacters,
        minLength: minLength(MAGIC_NUMBERS.MIN_USERNAME_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.MAX_USERNAME_LENGTH)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        onlyLatinCharacters,
        minLength: minLength(MAGIC_NUMBERS.MIN_PASSWORD_LENGTH),
        maxLength: maxLength(MAGIC_NUMBERS.MAX_PASSWORD_LENGTH)
      },
      confirmPassword: {
        required,
        sameAs: sameAs(this.password)
      }
    };
  },
  computed: {
    isConfirmPasswordValid() {
      const isInvalid = this.isConfirmPasswordInvalid();

      return isInvalid !== undefined && !isInvalid;
    }
  },
  watch: {
    username: useDebounce(function () {
      this.v$.username.$touch();
    }, MAGIC_NUMBERS.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)
  },
  methods: {
    isUsernameInvalid() {
      const username = this.v$.username;

      if (username.$dirty) {
        if (username['required'].$invalid) {
          this.errorMessage.username = 'Необходимо придумать никнейм';

          return true;
        }

        if (username['minLength'].$invalid) {
          this.errorMessage.username = `Никнейм должен быть не менее ${MAGIC_NUMBERS.MIN_USERNAME_LENGTH} символов`;

          return true;
        }

        if (username['maxLength'].$invalid) {
          this.errorMessage.username = `Никнейм должен быть не более ${MAGIC_NUMBERS.MAX_USERNAME_LENGTH} символов`;

          return true;
        }

        if (username['onlyLatinCharacters'].$invalid) {
          this.errorMessage.username =
            'Никнейм не должен содержать русские буквы';

          return true;
        }

        return false;
      }
    },
    isEmailInvalid() {
      const email = this.v$.email;

      if (email.$dirty) {
        if (email['required'].$invalid) {
          this.errorMessage.email = 'Введите электронную почту';

          return true;
        }

        if (email['email'].$invalid) {
          this.errorMessage.email = 'Неправильный адрес электронной почты';

          return true;
        }

        return false;
      }
    },
    isPasswordInvalid() {
      const password = this.v$.password;

      if (password.$dirty) {
        if (password['required'].$invalid) {
          this.errorMessage.password = 'Необходимо придумать пароль';

          return true;
        }

        if (password['minLength'].$invalid) {
          this.errorMessage.password = `Пароль должен быть не менее ${MAGIC_NUMBERS.MIN_PASSWORD_LENGTH} символов`;

          return true;
        }

        if (password['maxLength'].$invalid) {
          this.errorMessage.password = `Пароль должен быть не более ${MAGIC_NUMBERS.MAX_PASSWORD_LENGTH} символов`;

          return true;
        }

        if (password['onlyLatinCharacters'].$invalid) {
          this.errorMessage.password =
            'Пароль не должен содержать русские буквы';

          return true;
        }

        return false;
      }
    },
    isConfirmPasswordInvalid() {
      const confirmPassword = this.v$.confirmPassword;

      if (confirmPassword.$dirty) {
        if (confirmPassword['required'].$invalid) {
          this.errorMessage.confirmPassword = 'Введите пароль еще раз';

          return true;
        }

        if (confirmPassword['sameAs'].$invalid) {
          this.errorMessage.confirmPassword =
            'Подтверждение не совпадает с паролем';

          return true;
        }

        return false;
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
  margin-top: 96px;
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
