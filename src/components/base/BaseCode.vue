<template>
  <div :class="['base-code']">
    <div class="top-bar">
      <h2 class="title" v-text="labels.CONFIRMATION.TITLE" />

      <BaseButton class="button" icon-button icon="cross" theme="dark" @click="onClickButton" />
    </div>

    <p class="description" v-text="labels.CONFIRMATION.DESCRIPTION" />

    <div class="wrapper">
      <template v-for="(value, index) in state.code" :key="index">
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
      v-if="!flags.isDisplayNotice"
      class="resend-code"
      color="secondary"
      :label="labels.CONFIRMATION.RESEND_CODE"
      icon-left="redo"
      @click="onClickResend"
    />

    <span v-if="flags.isDisplayNotice" class="notice">
      Отправить код повторно можно будет через

      <span ref="timer"></span>
    </span>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { createTimer, checkTimer } from '@/helpers/timer';
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
    const timer = ref(null);

    const state = reactive({ code: ['', '', '', ''] });

    const flags = reactive({ isDisplayNotice: false });

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

        if (state.code[currentIndex] && currentIndex === state.code.length - 1) {
          const input = inputs.value[currentIndex].input;

          input.blur();
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

      createTimer(timer, magicNumbers.ONE_HUNDRED_TWENTY_MILLISECOND);

      flags.isDisplayNotice = true;
    };

    onMounted(() => {
      const timerOn = localStorage.getItem('timerOn');

      if (timerOn) {
        checkTimer(timer);

        flags.isDisplayNotice = true;
      }
    });

    return {
      inputs,
      timer,
      state,
      flags,
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
