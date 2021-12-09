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
            type="text"
            placeholder="Ваш никнейм"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from '@/components/BaseInput';

export default {
  components: {
    BaseInput
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
  width: 400px;

  &-item {
    margin-bottom: 16px;
  }
}
</style>
