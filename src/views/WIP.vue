<template>
  <div class="container">
    <div class="row" :class="$style.row">
      <div :class="$style['wip']">
        <img
          :class="$style['wip-image']"
          src="../assets/img/wolf-and-cat.gif"
          alt="Minecraft Wild Hunt"
        />
        <p>
          Данный раздел находится в разработке,
          <br />но не расстраивайтесь, в скором времени он появится!
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

.wip {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-image {
    width: 288px;
  }

  p {
    margin-top: 8px;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
