<template>
  <div class="container">
    <div class="row" :class="$style.row">
      <transition name="fade-slide-up">
        <form
          v-if="!isHideForm"
          :class="$style['form']"
          @submit.prevent="submitHandler"
        >
          <h2 :class="$style['form-title']">Вход в аккаунт</h2>

          <BaseInput
            :class="$style['form-item']"
            :disabled="isDisableAllFields"
            v-model:value="login"
            type="text"
            placeholder="Логин или электронная почта"
            @input="v$.login.$reset()"
            @blur="v$.login.$touch()"
          >
            <template v-if="isUsernameInvalid()" #error>
              {{ errorMessage.login }}
            </template>
          </BaseInput>

          <BaseInput
            :class="$style['form-item']"
            :disabled="isDisableAllFields"
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
              :loading="isButtonLoading"
              :disabled="isDisableAllFields"
            >
              Войти
            </BaseButton>

            <BaseButton color="success" to="signup" @click.prevent>
              Регистрация
            </BaseButton>
          </div>

          <BaseButton
            :class="$style['form-reset-password']"
            tag-name="a"
            to="reset-password"
            icon-left="question"
            underline
          >
            Забыли пароль или не можете войти?
          </BaseButton>
        </form>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="isLoginError">
          <BaseNotice :class="$style.notice" error>
            <span :class="$style.icon">😵</span>

            <h2 :class="$style.title">Ошибка аунтификации</h2>

            <span :class="$style.content">
              {{ errorMessage.apiResponse }}
            </span>

            <BaseButton
              :class="$style.button"
              color="danger"
              @click="BaseNoticeOnClick"
            >
              Повторить
            </BaseButton>
          </BaseNotice>
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
      login: '',
      password: '',
      errorMessage: {
        login: '',
        password: '',
        apiResponse: ''
      },
      isButtonLoading: false,
      isLoginError: false,
      isDisableAllFields: false,
      isHideForm: false
    };
  },
  setup() {
    return {
      v$: useVuelidate({ $lazy: true })
    };
  },
  validations() {
    return {
      login: {
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
      const validator = useLoginUsernameValidator(this.v$.login);

      if (validator.isInvalid) {
        this.errorMessage.login = validator.errorMessage;

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

      [this.isButtonLoading, this.isDisableAllFields] = [true, true];

      await this.$store
        .dispatch('LOGIN', {
          username: this.username,
          password: this.password
        })
        .then((result) => {
          [this.isButtonLoading, this.isHideForm] = [false, true];

          if (Object.prototype.hasOwnProperty.call(result, 'error')) {
            this.errorMessage.apiResponse = result.error.message;

            return useDebounce(() => (this.isLoginError = true))();
          }
        })
        .catch(() => {
          this.errorMessage.apiResponse =
            'Повторите попытку еще раз или обратитесь в тех. поддержку';

          return useDebounce(() => (this.isLoginError = true))();
        });
    },
    BaseNoticeOnClick() {
      if (this.isLoginError) {
        [this.isLoginError, this.isDisableAllFields] = [false, false];

        useDebounce(() => (this.isHideForm = false))();
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
    gap: 12px;
  }

  &-reset-password {
    margin-top: 24px;
    font-size: $font-size-xs;
  }
}

.notice {
  .icon {
    z-index: 1;
    font-size: $font-size-h1;
  }

  .title {
    z-index: 1;
    padding: 0 24px;
    font-weight: $font-weight-base;
    text-align: center;
  }

  .content {
    z-index: 1;
    padding: 0 24px;
    color: $font-color-secondary;
    text-align: center;
  }

  .button {
    margin-top: 24px;
  }
}
</style>
