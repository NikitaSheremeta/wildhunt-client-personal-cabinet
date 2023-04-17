<template>
  <form class="form">
    <div class="form__top-bar">
      <BaseButton class="form__button" icon-button icon="arrow-left" theme="dark" @click.prevent="onClickBackButton" />

      <h2 class="form__title" v-text="labels.CODE.TITLE" />
    </div>

    <p class="form__description" v-text="labels.CODE.DESCRIPTION" />

    <BaseCode class="form__code" />

    <BaseLink
      v-if="!timer.active"
      class="form__link"
      color="secondary"
      :label="labels.CODE.RESEND_CODE_LABEL"
      icon-left="redo"
      @click.prevent="onClickResendLink"
    />

    <span v-if="timer.active" class="form__notice" v-text="notice" />
  </form>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useTimer } from '@/hooks/useTimer';
import BaseButton from '@/components/base/BaseButton';
import BaseCode from '@/components/base/BaseCode';
import BaseLink from '@/components/base/BaseLink';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'ConfirmationForm',
  components: {
    BaseButton,
    BaseCode,
    BaseLink
  },
  emits: ['close-confirmation'],
  setup(props, context) {
    const timer = useTimer();

    const notice = computed(() => String(labels.CODE.RESEND_CODE_NOTICE) + ' ' + timer.time);

    const onClickBackButton = () => {
      context.emit('close-confirmation');
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
      onClickBackButton,
      onClickResendLink,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__top-bar {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  &__description {
    margin-top: 12px;
    margin-bottom: 0;
    color: $font-color-secondary;
  }

  &__code {
    margin-top: 24px;
  }

  &__link {
    margin-top: 16px;
    font-size: $font-size-xs;
  }

  &__notice {
    margin-top: 16px;
    font-size: $font-size-xs;
    color: $font-color-secondary;
  }
}
</style>
