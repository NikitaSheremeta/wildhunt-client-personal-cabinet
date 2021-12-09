<template>
  <section :class="$style.authentication">
    <div class="container" :class="$style.container">
      <div class="row" :class="$style.row">
        <div :class="$style.form">
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
          <BaseButton>Войти</BaseButton>
          <Link :class="$style['form-link']" color="secondary"
            >Забыли пароль?
          </Link>
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
  }

  &-link {
    margin-left: 24px;
  }
}
</style>
