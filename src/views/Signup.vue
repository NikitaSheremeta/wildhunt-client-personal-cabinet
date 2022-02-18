<template>
  <div class="container">
    <div class="row" :class="$style.row">
      <transition name="fade-slide-up">
        <form
          v-if="!isHideForm"
          :class="$style['form']"
          @submit.prevent="submitHandler"
        >
          <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

          <BaseInput
            :class="$style['form-item']"
            :loading="isUsernameLoading"
            :disabled="isDisableAllFields"
            v-model:value="username"
            type="text"
            placeholder="Логин"
            @input="v$.username.$reset()"
            @blur="v$.username.$touch()"
          >
            <template v-if="isUsernameInvalid()" #error>
              {{ errorMessage.username }}
            </template>
          </BaseInput>

          <BaseInput
            :class="$style['form-item']"
            :disabled="isDisableAllFields"
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
            :disabled="isDisableAllFields"
            v-model:value="password"
            password
            create-password
            type="password"
            placeholder="Пароль"
            @input="v$.password.$touch()"
            @blur="v$.password.$touch()"
          >
            <template v-if="isPasswordInvalid()" #error>
              {{ errorMessage.password }}
            </template>
          </BaseInput>

          <BaseInput
            :class="$style['form-item']"
            :disabled="isDisableAllFields"
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
            <BaseButton
              :loading="isButtonLoading"
              :disabled="!eula || isDisableAllFields"
              full-width
            >
              Зарегистрироваться
            </BaseButton>
          </div>

          <div :class="$style['form-eula']">
            <BaseCheckbox v-model:checked="eula">
              Я принимаю
              <BaseButton tag-name="a" target="_blank" to="terms" underline>
                пользовательское соглашение
              </BaseButton>

              <br />и

              <BaseButton
                tag-name="a"
                target="_blank"
                to="privacy-policy"
                underline
              >
                политику конфиденциальности
              </BaseButton>
            </BaseCheckbox>
          </div>
        </form>
      </transition>

      <transition name="fade-slide-up">
        <template v-if="isSignupSuccess">
          <BaseNotice :class="$style.notice" success>
            <span :class="$style.icon">🥳</span>

            <h2 :class="$style.title">Вы успешно зарегистрированы!</h2>

            <span :class="$style.content">
              На указанный почтовый ящик придет письмо, содержащее ссылку для
              подтверждения адреса
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
        <template v-if="isSignupError">
          <BaseNotice :class="$style.notice" error>
            <span :class="$style.icon">💩</span>

            <h2 :class="$style.title">Вот это поворот</h2>

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
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';
import BaseCheckbox from '../components/framework/BaseCheckbox';
import BaseNotice from '../components/framework/BaseNotice';
import { useDebounce } from '../components/use/debounce';
import {
  allowedCharacters,
  useSignupUsernameValidator,
  useSignupEmailValidator,
  useSignupPasswordValidator,
  useSignupConfirmPasswordValidator
} from '../components/use/validators';
import { magicNumbers } from '../utils/magic-numbers';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseCheckbox,
    BaseNotice
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      eula: true,
      errorMessage: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        apiResponse: ''
      },
      isUsernameLoading: false,
      isButtonLoading: false,
      isSignupError: false,
      isSignupSuccess: false,
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
      username: {
        required,
        allowedCharacters,
        minLength: minLength(magicNumbers.MIN_USERNAME_LENGTH),
        maxLength: maxLength(magicNumbers.MAX_USERNAME_LENGTH)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        allowedCharacters,
        minLength: minLength(magicNumbers.MIN_PASSWORD_LENGTH),
        maxLength: maxLength(magicNumbers.MAX_PASSWORD_LENGTH)
      },
      confirmPassword: {
        required,
        sameAs: sameAs(this.password)
      }
    };
  },
  computed: {
    isConfirmPasswordValid() {
      return (
        this.confirmPassword.length !== 0 &&
        this.password === this.confirmPassword
      );
    }
  },
  watch: {
    username: useDebounce(function () {
      this.v$.username.$touch();
    }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)
  },
  methods: {
    isUsernameInvalid() {
      const validator = useSignupUsernameValidator(this.v$.username);

      if (validator.isInvalid) {
        this.errorMessage.username = validator.errorMessage;

        return validator.isInvalid;
      }

      return validator.isInvalid;
    },
    isEmailInvalid() {
      const validator = useSignupEmailValidator(this.v$.email);

      if (validator.isInvalid) {
        this.errorMessage.email = validator.errorMessage;

        return validator.isInvalid;
      }

      return validator.isInvalid;
    },
    isPasswordInvalid() {
      const validator = useSignupPasswordValidator(this.v$.password);

      if (validator.isInvalid) {
        this.errorMessage.password = validator.errorMessage;

        return validator.isInvalid;
      }

      return validator.isInvalid;
    },
    isConfirmPasswordInvalid() {
      const validator = useSignupConfirmPasswordValidator(
        this.v$.confirmPassword
      );

      if (validator.isInvalid) {
        this.errorMessage.confirmPassword = validator.errorMessage;

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
        .dispatch('SIGNUP', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then((result) => {
          [this.isButtonLoading, this.isHideForm] = [false, true];

          if (Object.prototype.hasOwnProperty.call(result, 'error')) {
            this.errorMessage.apiResponse = result.error.message;

            return useDebounce(() => (this.isSignupError = true))();
          }

          return useDebounce(() => (this.isSignupSuccess = true))();
        })
        .catch(() => {
          this.errorMessage.apiResponse =
            'Повторите попытку еще раз или обратитесь в тех. поддержку';

          return useDebounce(() => (this.isSignupError = true))();
        });
    },
    BaseNoticeOnClick() {
      if (this.isSignupError) {
        [this.isSignupError, this.isDisableAllFields] = [false, false];

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

  &-item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-controls {
    margin-top: 24px;
  }

  &-eula {
    margin-top: 24px;

    > span {
      margin-bottom: 12px;
      color: $font-color-secondary;
      font-size: $font-size-xs;
    }
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
