<template>
  <section :class="$style.authentication">
    <div class="container" :class="$style.container">
      <div class="row" :class="$style.row">
        <div :class="$style.form">
          <div :class="$style['form-controls']">
            <BaseInput
              :class="$style['form-item']"
              type="text"
              placeholder="Ваш почтовый адрес"
            />
            <BaseInput
              :class="$style['form-item']"
              type="password"
              placeholder="Ваш никнейм"
            />
          </div>
          <div :class="$style['form-controls']">
            <BaseButton> Войти </BaseButton>
            <Link :class="$style['form-link']"> Забыли пароль? </Link>
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

  &-item {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-controls {
    &:first-child {
      margin-bottom: 24px;
    }
  }

  &-link {
    margin-left: 24px;
  }
}
</style>
