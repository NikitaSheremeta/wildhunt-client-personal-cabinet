<template>
  <div class="container">
    <div class="row">
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
.form-item {
  margin-bottom: 24px;
}
</style>
