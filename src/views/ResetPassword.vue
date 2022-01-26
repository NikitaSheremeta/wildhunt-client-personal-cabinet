<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <transition name="fade-slide-up">
        <form
          v-if="!is.hideForm"
          :class="$style.form"
          @submit.prevent="submitHandler"
        >
          <h2 :class="$style['form-title']">Восстановление аккаунта</h2>

          <p :class="$style['form-description']">
            Укажите электронную почту, которую вы использовали при регистрации.
            Мы отправим вам письмо с дальнейшими инструкциями по восстановлению
            пароля
          </p>

          <BaseInput
            :class="$style['form-item']"
            :disabled="is.disableAllFields"
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
              :loading="is.loadingButton"
              :disabled="is.disableAllFields"
            >
              Восстановить
            </BaseButton>
          </div>
        </form>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="is.resetPassword.success">
          <BaseNotice reset-password-success @click="BaseNoticeOnClick" />
        </template>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="is.resetPassword.error">
          <BaseNotice reset-password-error @click="BaseNoticeOnClick" />
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
import { magicNumbers } from '../utils/magic-numbers';

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
        login: ''
      },
      is: {
        resetPassword: {
          success: false,
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

      [this.is.loadingButton, this.is.disableAllFields] = [true, true];

      setTimeout(() => {
        [this.is.loadingButton, this.is.hideForm] = [false, true];

        useDebounce(
          () => (this.is.resetPassword.success = true),
          magicNumbers.TWO_HUNDRED_MILLISECONDS
        )();
      }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS);
    },
    BaseNoticeOnClick() {
      if (this.is.resetPassword.error) {
        [this.is.resetPassword.error, this.is.disableAllFields] = [
          false,
          false
        ];

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
</style>
