<template>
  <div class="container">
    <div class="row">
      <div class="not-found">
        <div class="not-found-code">
          <span class="not-found-code__number">4</span>

          <img
            class="not-found-code__image"
            src="../assets/img/dancing-parrot.gif"
            alt="Minecraft Wild Hunt"
          />

          <span class="not-found-code__number">4</span>
        </div>

        <p class="not-found__description" v-html="pageDescription"></p>

        <BaseButton @click="$router.go(-1)"> Вернуться назад </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/framework/BaseButton';

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      pageDescription:
        'Мы не можем найти нужную вам страницу,\n <br />но не расстраивайтесь, вот вам танцующий попугай :)'
    };
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: center;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-code {
    display: flex;
    align-items: center;
    justify-content: center;

    &__number {
      line-height: 1;
      font-size: 156px;
      font-weight: $font-weight-bold;
    }

    &__image {
      margin: 0 -32px 24px -32px;
      width: 128px;
    }
  }

  &__description {
    margin-top: 8px;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
