<template>
  <div :class="['base-title']">
    <BaseButton
      v-if="closeButton"
      class="button"
      small
      icon-button
      icon="arrow-left"
      theme="dark"
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
    closeButton: {
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
  display: flex;
  align-items: center;
  gap: 16px;

  .title {
    font-weight: $font-weight-regular;
    margin: 0;
  }
}
</style>
