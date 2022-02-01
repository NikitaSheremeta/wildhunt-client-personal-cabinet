<template>
  <div class="container">
    <div class="row" :class="$style.row">
      <div :class="$style['not-found']">
        <div :class="$style['not-found-code']">
          <span>4</span>
          <img
            src="../assets/img/dancing-parrot.gif"
            alt="Minecraft Wild Hunt"
          />
          <span>4</span>
          <i :class="$style['not-found-shadow']"></i>
        </div>
        <p>
          Мы не можем найти нужную вам страницу,
          <br />но не расстраивайтесь, вот вам танцующий попугай :)
        </p>
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
  }
};
</script>

<style lang="scss" module>
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

    span {
      line-height: 1;
      font-size: 156px;
      font-weight: $font-weight-bold;
    }

    img {
      position: relative;
      margin: 0 -32px 24px -32px;
      width: 128px;
    }
  }

  p {
    margin-top: 8px;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
