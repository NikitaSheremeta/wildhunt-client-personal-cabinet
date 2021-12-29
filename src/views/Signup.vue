<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <div :class="$style.form">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="username"
          type="text"
          placeholder="Логин"
        >
          <template #error>
            <span v-if="isUserNameError"> К сожалению, логин занят </span>
          </template>
        </BaseInput>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="email"
          type="text"
          placeholder="Email"
        />

        <BaseInput
          :class="$style['form-item']"
          v-model:value="password"
          create-password
          type="password"
          placeholder="Придумайте пароль"
        />

        <BaseInput
          :class="$style['form-item']"
          v-model:value="repeatPassword"
          repeat-password
          :success-status="isPasswordEqual"
          type="password"
          placeholder="Повторите пароль"
          @blur="checkPasswordIsEqual"
        >
          <template #error>
            <span v-if="isPasswordEqualError">
              Подтверждение не совпадает с паролем
            </span>
          </template>
        </BaseInput>

        <div :class="$style['form-controls']">
          <BaseButton full-width> Зарегистрироваться </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';
import { useDebounce } from '../components/use/debounce';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      username: '',
      isUserNameError: false,
      email: '',
      password: '',
      repeatPassword: '',
      isPasswordEqual: null,
      isPasswordEqualError: false
    };
  },
  watch: {
    password: useDebounce(function (value) {
      if (this.repeatPassword.length !== 0) {
        this.isPasswordEqual =
          value.length !== 0 && value === this.repeatPassword;

        this.isPasswordEqualError =
          this.repeatPassword.length !== 0 && !this.isPasswordEqual;
      }
    }),
    repeatPassword: useDebounce(function (value) {
      this.isPasswordEqual =
        value.length !== 0 && value === this.password ? true : null;

      this.isPasswordEqualError = false;
    }, 0)
  },
  methods: {
    checkPasswordIsEqual(event) {
      const value = event.target.value;

      this.isPasswordEqual = value === this.password;

      this.isPasswordEqualError = value.length !== 0 && !this.isPasswordEqual;
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
  align-items: center;
  justify-content: center;
}

.form {
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
