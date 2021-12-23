<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <div :class="$style.form">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.username"
          type="text"
          placeholder="Логин"
        />

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.email"
          type="text"
          placeholder="Email"
        />

        <BaseInput
          :class="$style['form-item']"
          v-model:value="form.password"
          create-password
          type="password"
          placeholder="Придумайте пароль"
        />

        <BaseInput
          :class="$style['form-item']"
          v-model="repeatPassword"
          repeat-password
          type="password"
          placeholder="Повторите пароль"
        />

        <div :class="$style['form-controls']">
          <BaseButton full-width @click="some"> Зарегистрироваться </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '../components/framework/BaseInput';
import BaseButton from '../components/framework/BaseButton';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      repeatPassword: '',
      isPasswordEqual: false
    };
  },
  methods: {
    some() {
      alert(this.form.password);
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
