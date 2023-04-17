<template>
  <div class="container">
    <div class="row">
      <div class="work-in-progress">
        <img class="work-in-progress__image" src="@/assets/img/wolf-and-cat.gif" alt="Minecraft Wild Hunt" />

        <!-- eslint-disable vue/no-v-html -->
        <p class="work-in-progress__description" v-html="labels.WIP.DESCRIPTION" />

        <BaseButton :label="labels.WIP.GO_BACK" @click="$router.go(-1)" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';
import { labels } from '@/utils/labels';
export default {
  name: 'WIP',
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
