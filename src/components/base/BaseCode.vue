<template>
  <div :class="['base-code']">
    <div class="top-bar">
      <h2 class="title" v-text="labels.CONFIRMATION.TITLE" />

      <BaseButton class="button" icon-button icon="cross" theme="dark" @click="onClickButton" />
    </div>

    <p class="description" v-text="labels.CONFIRMATION.DESCRIPTION" />

    <div class="wrapper">
      <template v-for="(value, index) in state.code" :key="value">
        <BaseInput
          :ref="
            (item) => {
              if (item) inputs[index] = item;
            }
          "
          v-model="state.code[index]"
          :class="['input', 'code-item']"
          type="number"
          :data-id="index"
          :autofocus="index === 0"
          placeholder="0"
          :max-length="1"
          @click="onClick"
          @keydown="onKeydown"
          @input="onInput"
          @focus="onFocus"
        />
      </template>
    </div>

    <BaseLink
      v-if="!timer.active"
      class="resend-code"
      color="secondary"
      :label="labels.CONFIRMATION.RESEND_CODE_LABEL"
      icon-left="redo"
      @click="onClickResend"
    />

    <span v-if="timer.active" class="notice" v-text="resendNotice" />
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useTimer } from '@/hooks/useTimer';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseCode',
  components: {
    BaseInput,
    BaseButton,
    BaseLink
  },
  emits: ['update:mode-value', 'close'],
  setup(props, context) {
    const inputs = ref([]);

    const timer = useTimer();

    const state = reactive({ code: ['', '', '', ''] });

    const resendNotice = computed(() => String(labels.CONFIRMATION.RESEND_CODE_NOTICE) + ' ' + timer.time);

    const onClickButton = () => {
      context.emit('close');
    };

    const onDelete = (event, currentIndex) => {
      event.preventDefault();

      state.code[currentIndex] = '';

      if (currentIndex > 0) {
        const input = inputs.value[currentIndex - 1].input;

        input.focus();
      }
    };

    const onArrowLeft = (event, currentIndex) => {
      event.preventDefault();

      if (currentIndex > 0) {
        const input = inputs.value[currentIndex - 1].input;

        input.focus();
      }
    };

    const onArrowRight = (event, currentIndex) => {
      event.preventDefault();

      if (currentIndex < state.code.length - 1) {
        const input = inputs.value[currentIndex + 1].input;

        input.focus();
      }
    };

    const onKeydown = (event) => {
      const currentIndex = parseInt(event.target.dataset.id);

      if (event.key === 'Backspace' || event.key === 'Delete') {
        onDelete(event, currentIndex);
      }

      if (event.key === 'ArrowLeft') {
        onArrowLeft(event, currentIndex);
      }

      if (event.key === 'ArrowRight') {
        onArrowRight(event, currentIndex);
      }
    };

    const onInput = (event) => {
      if (event.target.value) {
        const currentIndex = Number(event.target.dataset.id);

        state.code[currentIndex] = event.target.value;

        if (currentIndex < state.code.length - 1) {
          const input = inputs.value[currentIndex + 1].input;

          input.focus();
        }
      }
    };

    const onClick = (event) => {
      event.target.select(event);
    };

    const onFocus = (event) => {
      event.target.select(event);
    };

    const onClickResend = (event) => {
      event.preventDefault();

      timer.createTimer(magicNumbers.ONE_HUNDRED_TWENTY_MILLISECOND);
    };

    onMounted(() => {
      timer.checkTimer();
    });

    return {
      inputs,
      timer,
      state,
      resendNotice,
      onClickButton,
      onClick,
      onKeydown,
      onInput,
      onFocus,
      onClickResend,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-code {
  width: 320px;

  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      margin: 0;
      font-weight: $font-weight-base;
    }
  }

  .description {
    margin-top: 8px;
    margin-bottom: 0;
    color: $font-color-secondary;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 24px;
  }

  .resend-code {
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
