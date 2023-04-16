<template>
  <div :class="['base-code']">
    <h2 class="title" v-text="labels.CONFIRMATION.TITLE" />

    <p class="description" v-text="labels.CONFIRMATION.DESCRIPTION" />

    <div class="wrapper">
      <template v-for="(value, index) in state.code" :key="index">
        <BaseInput
          :ref="
            (el) => {
              if (el) inputs[index] = el;
            }
          "
          v-model="state.code[index]"
          :class="['input', 'text-center', 'caret-transparent']"
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
      class="resend-code"
      href="support"
      color="secondary"
      :label="labels.CONFIRMATION.RESEND_CODE"
      icon-left="redo"
    />
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseLink from '@/components/base/BaseLink';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseCode',
  components: {
    BaseInput,
    BaseLink
  },
  setup() {
    const inputs = ref([]);

    const state = reactive({
      code: ['', '', '', '']
    });

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

    return {
      inputs,
      state,
      onClick,
      onKeydown,
      onInput,
      onFocus,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-code {
  width: 320px;

  .title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  .description {
    margin-top: 8px;
    margin-bottom: 0;
    color: $font-color-secondary;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 24px;
  }

  .resend-code {
    margin-top: 16px;
    font-size: $font-size-xs;
  }
}
</style>
