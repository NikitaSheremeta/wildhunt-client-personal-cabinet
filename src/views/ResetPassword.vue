<template>
  <div class="container">
    <div class="row" :class="$style.row">
      <transition name="fade-slide-up">
        <form
          v-if="!isHideForm"
          :class="$style.form"
          @submit.prevent="submitHandler"
        >
          <h2 :class="$style['form-title']">Восстановление аккаунта</h2>

          <p :class="$style['form-description']">
            Укажите электронную почту, которую вы использовали при регистрации.
          </p>

          <BaseInput
            :class="$style['form-item']"
            :disabled="isDisableAllFields"
            v-model:value="login"
            type="text"
            placeholder="Электронная почта"
            @input="v$.login.$reset()"
            @blur="v$.login.$touch()"
          >
            <template v-if="isLoginInvalid()" #error>
              {{ errorMessage.login }}
            </template>
          </BaseInput>

          <div :class="$style['form-controls']">
            <BaseButton
              :loading="isButtonLoading"
              :disabled="isDisableAllFields"
              full-width
            >
              Восстановить
            </BaseButton>
          </div>
        </form>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="isResetPasswordSuccess">
          <BaseNotice :class="$style.notice" success>
            <span :class="$style.icon">🙌</span>

            <h2 :class="$style.title">Письмо успешно отправленно!</h2>

            <span :class="$style.content">
              На указанный почтовый ящик придет письмо, содержащее инструкцую по
              восстановлению пароля
            </span>

            <BaseButton
              :class="$style.button"
              color="success"
              @click="BaseNoticeOnClick"
            >
              Войти в аккаунт
            </BaseButton>
          </BaseNotice>
        </template>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="isResetPasswordError">
          <BaseNotice :class="$style.notice" error>
            <span :class="$style.icon">😞</span>

            <h2 :class="$style.title">Что-то пошло не так</h2>

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
import { required, email } from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';
import BaseNotice from '../components/framework/BaseNotice';
import { useSignupEmailValidator } from '../components/use/validators';
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
      errorMessage: {
        login: '',
        apiResponse: ''
      },
      isButtonLoading: false,
      isResetPasswordError: false,
      isResetPasswordSuccess: false,
      isDisableAllFields: false,
      isHideForm: false
    };
  },
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  validations() {
    return {
      login: {
        required,
        email
      }
    };
  },
  methods: {
    isLoginInvalid() {
      const validator = useSignupEmailValidator(this.v$.login);

      if (validator.isInvalid) {
        this.errorMessage.login = validator.errorMessage;

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
        .dispatch('FORGOT_PASSWORD', {
          email: this.login
        })
        .then((result) => {
          [this.isButtonLoading, this.isHideForm] = [false, true];

          if (Object.prototype.hasOwnProperty.call(result, 'error')) {
            this.errorMessage.apiResponse = result.error.message;

            return useDebounce(() => (this.isResetPasswordError = true))();
          }

          return useDebounce(() => (this.isResetPasswordSuccess = true))();
        })
        .catch(() => {
          this.errorMessage.apiResponse =
            'Повторите попытку еще раз или обратитесь в тех. поддержку';

          return useDebounce(() => (this.isResetPasswordError = true))();
        });
    },
    BaseNoticeOnClick() {
      if (this.isResetPasswordError) {
        [this.isResetPasswordError, this.isDisableAllFields] = [false, false];

        return useDebounce(() => (this.isHideForm = false))();
      }

      return this.$router.push({ path: '/login' });
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

  &-description {
    color: $font-color-secondary;
  }

  &-controls {
    margin-top: 24px;
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
