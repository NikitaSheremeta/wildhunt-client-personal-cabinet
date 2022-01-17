<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <form :class="$style.form" @submit.prevent="submitHandler">
        <h2 :class="$style['form-title']">Вход в аккаунт</h2>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="username"
          type="text"
          placeholder="Логин или электронная почта"
          @input="v$.username.$reset()"
          @blur="v$.username.$touch()"
        >
          <template v-if="isUsernameInvalid()" #error>
            {{ errorMessage.username }}
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="password"
          type="password"
          placeholder="Пароль"
          @input="v$.password.$touch()"
          @blur="v$.password.$touch()"
        >
          <template v-if="isPasswordInvalid()" #error>
            {{ errorMessage.password }}
          </template>
        </BaseInput>

        <div :class="$style['form-controls']">
          <BaseButton> Войти </BaseButton>

          <BaseButton tag-name="a" to="reset-password" color="secondary">
            Восстановить аккаунт
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';
import {
  allowedCharacters,
  useLoginUsernameValidator,
  useLoginPasswordValidator
} from '../components/use/validators';
import { magicNumbers } from '../utils/magic-numbers';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: {
        username: '',
        password: ''
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
        allowedCharacters,
        minLength: minLength(magicNumbers.MIN_USERNAME_LENGTH),
        maxLength: maxLength(magicNumbers.MAX_USERNAME_LENGTH)
      },
      password: {
        required,
        allowedCharacters,
        minLength: minLength(magicNumbers.MIN_PASSWORD_LENGTH),
        maxLength: maxLength(magicNumbers.MAX_PASSWORD_LENGTH)
      }
    };
  },
  methods: {
    isUsernameInvalid() {
      const validator = useLoginUsernameValidator(this.v$.username);

      if (validator.isInvalid) {
        this.errorMessage.username = validator.errorMessage;

        return validator.isInvalid;
      }

      return validator.isInvalid;
    },
    isPasswordInvalid() {
      const validator = useLoginPasswordValidator(this.v$.password);

      if (validator.isInvalid) {
        this.errorMessage.password = validator.errorMessage;

        return validator.isInvalid;
      }

      return validator.isInvalid;
    },
    async submitHandler() {
      const isFormValid = await this.v$.$validate();

      if (!isFormValid) {
        return false;
      }
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
    margin-top: 0;
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
