<template>
  <div :class="['base-title']">
    <BaseButton
      v-if="backButton"
      class="button"
      icon-button
      theme="transparent"
      color="secondary"
      icon="arrow-left"
      @click="onClickButton"
    />

    <h2 class="title" v-text="computedTitle" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'BaseTitle',
  components: {
    BaseButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    backButton: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, context) {
    const route = useRoute();

    const computedTitle = computed(() => (props.title ? props.title : route.meta['title']));

    const onClickButton = () => {
      context.emit('close');
    };

    return {
      computedTitle,
      onClickButton
    };
  }
};
</script>

<style lang="scss" scoped>
.base-title {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;

  .title {
    font-weight: $font-weight-regular;
    margin: 0;
  }
}
</style>
