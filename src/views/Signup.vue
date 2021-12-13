<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <div :class="$style.form">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          type="text"
          placeholder="Логин"
        />

        <BaseInput
          :class="$style['form-item']"
          type="text"
          placeholder="Email"
        />

        <BaseInput
          :class="$style['form-item']"
          type="password"
          strength-checker
          placeholder="Придумайте пароль"
        />

        <BaseInput
          :class="$style['form-item']"
          type="password"
          repeat-password
          placeholder="Повторите пароль"
        />

        <div :class="$style['form-controls']">
          <BaseButton full-width> Зарегистрироваться </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/framework/BaseInput';
import BaseButton from '@/components/framework/BaseButton';

export default {
  components: {
    BaseInput,
    BaseButton
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
