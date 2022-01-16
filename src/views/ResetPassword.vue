<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <form :class="$style.form" @submit.prevent="submitHandler">
        <h2 :class="$style['form-title']">Восстановление аккаунта</h2>

        <p :class="$style['form-description']">
          Укажите логин или электронную почту, которую вы использовали при
          регистрации. Мы отправим вам письмо с дальнейшими инструкциями
        </p>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="email"
          type="text"
          placeholder="Логин или электронная почта"
          @input="v$.email.$reset()"
          @blur="v$.email.$touch()"
        >
          <template v-if="isEmailInvalid()" #error>
            {{ errorMessage.email }}
          </template>
        </BaseInput>

        <div :class="$style['form-controls']">
          <BaseButton> Восстановить </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';
import { validationMessages } from '../utils/validation-messages';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      email: '',
      errorMessage: {
        email: ''
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
      email: {
        required,
        email
      }
    };
  },
  methods: {
    isEmailInvalid() {
      const email = this.v$.email;

      if (email.$dirty) {
        if (email['required'].$invalid) {
          this.errorMessage.email = validationMessages.EMAIL.REQUIRED;

          return true;
        }

        if (email['email'].$invalid) {
          this.errorMessage.email = validationMessages.EMAIL.INCORRECT;

          return true;
        }

        return false;
      }
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
.row {
  display: flex;
  justify-content: center;
}

.form {
  margin-top: 96px;
  margin-bottom: 48px;
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
