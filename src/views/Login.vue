<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <transition name="fade-slide-up">
        <form
          v-if="!is.hideForm"
          :class="$style['form']"
          @submit.prevent="submitHandler"
        >
          <h2 :class="$style['form-title']">Вход в аккаунт</h2>

          <BaseInput
            :class="$style['form-item']"
            :disabled="is.disableAllFields"
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
            :disabled="is.disableAllFields"
            v-model:value="password"
            password
            type="password"
            placeholder="Пароль"
            @input="v$.password.$reset()"
            @blur="v$.password.$touch()"
          >
            <template v-if="isPasswordInvalid()" #error>
              {{ errorMessage.password }}
            </template>
          </BaseInput>

          <div :class="$style['form-controls']">
            <BaseButton
              :loading="is.loadingButton"
              :disabled="is.disableAllFields"
            >
              Войти
            </BaseButton>

            <BaseButton to="reset-password" tag-name="a" color="secondary">
              Восстановить аккаунт
            </BaseButton>
          </div>
        </form>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="is.login.error">
          <BaseNotice login-error @click="BaseNoticeOnClick" />
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';
import BaseNotice from '../components/framework/BaseNotice';
import {
  allowedCharacters,
  useLoginUsernameValidator,
  useLoginPasswordValidator
} from '../components/use/validators';
import { magicNumbers } from '../utils/magic-numbers';
import { useDebounce } from '../components/use/debounce';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseNotice
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: {
        username: '',
        password: ''
      },
      is: {
        login: {
          error: false
        },
        loadingButton: false,
        disableAllFields: false,
        hideForm: false
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

      [this.is.loadingButton, this.is.disableAllFields] = [true, true];

      setTimeout(() => {
        [this.is.loadingButton, this.is.hideForm] = [false, true];

        useDebounce(
          () => (this.is.login.error = true),
          magicNumbers.TWO_HUNDRED_MILLISECONDS
        )();
      }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS);
    },
    BaseNoticeOnClick() {
      if (this.is.login.error) {
        [this.is.login.error, this.is.disableAllFields] = [false, false];

        useDebounce(
          () => (this.is.hideForm = false),
          magicNumbers.TWO_HUNDRED_MILLISECONDS
        )();
      }
    }
  }
};
</script>

<style lang="scss" module>
.row {
  display: flex;
  justify-content: center;
}

.form {
  margin-top: 24px;
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
