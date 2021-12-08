<template>
  <div class="home" style="width: 320px; padding: 32px">
    <h2>Впервые на Wild Hunt?</h2>
    <BaseInput :placeholder="'Ваш почтовый адрес'" />
    <BaseInput :placeholder="'Ваш никнейм'" />
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
