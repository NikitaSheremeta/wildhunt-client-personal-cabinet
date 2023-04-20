<template>
  <div :class="['base-confirmation']">
    <BaseTitle close-button :title="labels.CONFIRMATION.TITLE" @close="onClickCloseButton" />

    <p class="description" v-text="labels.CONFIRMATION.DESCRIPTION" />

    <BaseCode class="code" />

    <BaseLink
      v-if="!timer.active"
      class="link"
      color="secondary"
      :label="labels.CONFIRMATION.RESEND_CODE_LABEL"
      icon-left="redo"
      @click.prevent="onClickResendLink"
    />

    <span v-if="timer.active" class="notice" v-text="notice" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useTimer } from '@/hooks/useTimer';
import BaseTitle from '@/components/base/BaseTitle';
import BaseCode from '@/components/base/BaseCode';
import BaseLink from '@/components/base/BaseLink';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseConfirmation',
  components: {
    BaseTitle,
    BaseCode,
    BaseLink
  },
  emits: ['close'],
  setup(props, context) {
    const timer = useTimer();

    const notice = computed(() => String(labels.CONFIRMATION.RESEND_CODE_NOTICE) + ' ' + timer.time);

    const onClickCloseButton = () => {
      context.emit('close');
    };

    const onClickResendLink = () => {
      timer.createTimer(magicNumbers.ONE_HUNDRED_TWENTY_MILLISECOND);
    };

    onMounted(() => {
      timer.checkTimer();
    });

    return {
      timer,
      notice,
      onClickCloseButton,
      onClickResendLink,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-confirmation {
  width: 320px;

  .description {
    margin-top: 12px;
    margin-bottom: 0;
    color: $font-color-secondary;
  }

  .code {
    margin-top: 24px;
  }

  .link {
    margin-top: 16px;
    font-size: $font-size-xs;
  }

  .notice {
    margin-top: 16px;
    font-size: $font-size-xs;
    color: $font-color-secondary;
  }
}
</style>
