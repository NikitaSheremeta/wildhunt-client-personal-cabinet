<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <div :class="$style.form">
        <h2 :class="$style['form-title']">Вход в аккаунт</h2>

        <BaseInput
          :class="$style['form-item']"
          type="text"
          placeholder="Логин или электронная почта"
        />

        <BaseInput
          :class="$style['form-item']"
          type="password"
          placeholder="Пароль"
        />

        <div :class="$style['form-controls']">
          <BaseButton> Войти </BaseButton>

          <BaseButton tag-name="a" to="reset-password" color="secondary">
            Восстановить аккаунт
          </BaseButton>
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
  justify-content: center;
}

.form {
  margin-top: 96px;
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
