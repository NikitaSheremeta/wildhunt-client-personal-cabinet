<template>
  <div class="container" :class="$style.container">
    <div class="row" :class="$style.row">
      <div :class="$style.form">
        <h2 :class="$style['form-title']">Регистрация аккаунта</h2>

        <BaseInput
          :class="$style['form-item']"
          type="text"
          placeholder="Никнейм"
        />

        <BaseInput
          :class="$style['form-item']"
          type="text"
          placeholder="Email"
        />

        <BaseInput
          :class="$style['form-item']"
          type="password"
          placeholder="Пароль"
        />

        <BaseInput
          :class="$style['form-item']"
          type="password"
          repeat-password
          placeholder="Подтвердите пароль"
        />
        <BaseCheckbox>
          Я принимаю правила игры на сервере <br />и политику
          конфиденциальности.
        </BaseCheckbox>
        <br />
        <BaseButton full-width> Зарегистрироваться </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/framework/BaseInput';
import BaseCheckbox from '@/components/framework/BaseCheckbox';
import BaseButton from '@/components/framework/BaseButton';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseCheckbox
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
}
</style>
