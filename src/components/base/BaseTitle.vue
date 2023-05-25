<template>
  <div :class="['base-title']">
    <BaseButton
      v-if="backButton"
      id="base-title-button"
      class="button"
      small
      icon-button
      theme="dark"
      color="secondary"
      icon="arrow-left"
      aria-label="arrow-left"
      @click="onClickButton"
    />

    <h2 id="base-title-title" class="title" v-text="computedTitle" />

    <BaseTooltip v-if="backButton && !isMobileView" target="base-title-button" :label="labels.GO_BACK" />

    <BaseTooltip v-if="tooltip && !isMobileView" target="base-title-title" :label="computedTitle" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useBackButton } from '@/hooks/useBackButton';
import BaseButton from '@/components/base/BaseButton';
import BaseTooltip from '@/components/base/BaseTooltip';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseTitle',
  components: {
    BaseButton,
    BaseTooltip
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    backButton: {
      type: Boolean,
      default: false
    },
    preventBackButton: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, context) {
    const store = useStore();

    const route = useRoute();

    const backButton = useBackButton();

    const isMobileView = computed(() => store.getters.GET_IS_MOBILE_VIEW);

    const computedTitle = computed(() => (props.title ? props.title : route.meta['title']));

    const onClickButton = () => {
      if (!props.preventBackButton) {
        backButton();
      }

      context.emit('close');
    };

    return {
      isMobileView,
      computedTitle,
      onClickButton,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-title {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 24px;

  .title {
    font-weight: $font-weight-regular;
    margin: 0;

    @include media-breakpoint-up(md) {
      @include truncate();
    }
  }
}
</style>
