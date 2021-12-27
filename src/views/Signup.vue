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
        />

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
          :is-password-equal="isPasswordEqual"
          type="password"
          placeholder="Повторите пароль"
        >
          <template #note> Подтверждение не совпадает с паролем </template>
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
      email: '',
      password: '',
      repeatPassword: '',
      isPasswordEqual: false
    };
  },
  watch: {
    password: {
      handler(value) {
        if (value.length !== 0) {
          this.isPasswordEqual = value === this.repeatPassword;
        } else {
          this.isPasswordEqual = false;
        }
      }
    },
    repeatPassword: useDebounce(function (value) {
      if (value.length !== 0) {
        this.isPasswordEqual = value === this.password;
      } else {
        this.isPasswordEqual = false;
      }
    })
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
