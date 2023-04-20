<template>
  <div :class="['base-title']">
    <BaseButton v-if="closeButton" class="button" icon-button icon="arrow-left" theme="dark" @click="onClickButton" />

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
    z-index: 9;
    position: relative;
    font-weight: normal;
    margin: 0;
  }

  &.underline {
    .title {
      &:before {
        z-index: 1;
        content: '';
        position: absolute;
        left: 0;
        bottom: 10px;
        opacity: 0.75;
        width: 100%;
        height: 8px;
        background-color: $warning;
      }
    }
  }
}
</style>
