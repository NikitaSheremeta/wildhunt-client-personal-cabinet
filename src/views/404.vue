<template>
  <div class="container">
    <div class="row">
      <div class="not-found">
        <div class="not-found-code">
          <span class="not-found-code__number">4</span>

          <img class="not-found-code__image" src="@/assets/img/dancing-parrot.gif" alt="Minecraft Wild Hunt" />

          <span class="not-found-code__number">4</span>
        </div>

        <!-- eslint-disable vue/no-v-html -->
        <p class="not-found__description" v-html="labels.NOT_FOUND.DESCRIPTION" />

        <BaseButton :label="labels.NOT_FOUND.GO_BACK" @click="$router.go(-1)" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';
import { labels } from '@/utils/labels';
export default {
  name: '404',
  components: {
    BaseButton
  },
  setup() {
    return { labels };
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
