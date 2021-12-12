<template>
  <section :class="$style.authentication">
    <div class="container" :class="$style.container">
      <div class="row" :class="$style.row">
        <div :class="$style.form">
          <h2 :class="$style['form-title']">Вход в аккаунт</h2>

          <BaseInput
            :class="$style['form-item']"
            type="text"
            placeholder="Никнейм или email"
          />

          <BaseInput
            :class="$style['form-item']"
            type="password"
            placeholder="Пароль"
          />

          <div :class="$style['form-controls']">
            <BaseButton> Войти </BaseButton>

            <Link :class="$style['form-link']" color="secondary">
              Восстановить аккаунт
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from '@/components/BaseInput';
import BaseButton from '@/components/BaseButton';
import Link from '@/components/Link';

export default {
  components: {
    BaseInput,
    BaseButton,
    Link
  }
};
</script>

<style lang="scss" module>
.authentication,
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
