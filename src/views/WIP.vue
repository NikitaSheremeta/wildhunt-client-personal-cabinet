<template>
  <div class="container">
    <div class="row">
      <div class="work-in-progress">
        <img class="work-in-progress__image" src="@/assets/img/wolf-and-cat.gif" alt="Minecraft Wild Hunt" />

        <p class="work-in-progress__description">
          'Данный раздел находится в разработке,
          <br />но не расстраивайтесь, в скором времени он появится!'
        </p>

        <BaseButton @click="$router.go(-1)"> Вернуться назад </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';

export default {
  components: {
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: center;
}

.work-in-progress {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image {
    width: 288px;
  }

  &__description {
    margin-top: 8px;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
