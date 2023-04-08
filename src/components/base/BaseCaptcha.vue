<template>
  <div :class="['base-captcha']">
    <div
      ref="code"
      class="code"
    >
      <div
        v-for="(number, numberIndex) in state.code"
        :key="numberIndex"
        class="number"
      >
        <div
          v-for="(cell, cellIndex) in state.numberMarkups[number]"
          :key="cellIndex"
          :class="['cell', cell ? 'active' : '']"
          v-text="valueRandomNumbers(10, null)"
        />
      </div>
    </div>

    <BaseInput
      ref="input"
      class="input"
      type="captcha"
      autofocus
      :placeholder="labels.CAPTCHA.PLACEHOLDER"
      :rules="rules.captcha"
      @input="onInput"
      @keydown="onKeydownDelete"
    >
      <template #icon>
        <BaseIcon
          class="redo-icon"
          icon="redo"
          color="secondary"
          @click="onClickRedoIcon"
        />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';
import { required, sameAs } from '@/helpers/validators';
import { valueRandomNumbers, arrayRandomNumbers } from '@/helpers/random-numbers';
import { labels } from '@/utils/labels';
import { validationMessages } from '@/utils/validation-messages';

const MINIMUM_VALUE = 3;
const MAXIMUM_VALUE = 10;
const CAPTCHA_NUMBERS_LENGTH = 8;

export default {
  name: 'BaseCaptcha',
  components: {
    BaseInput,
    BaseIcon
  },
  component: {
    BaseInput
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const code = ref(null);
    const input = ref(null);

    const state = reactive({
      input: '',
      code: arrayRandomNumbers(CAPTCHA_NUMBERS_LENGTH, MAXIMUM_VALUE),
      numberMarkups: [
        [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
      ]
    });

    const rules = {
      captcha: {
        required: required(validationMessages.CAPTCHA.REQUIRED),
        sameAs: sameAs(
          computed(() => captchaResult.value),
          validationMessages.CAPTCHA.INCORRECT
        )
      }
    };

    const captchaResult = computed(() => state.code.join(''));

    onMounted(() => {
      setRandomOpacity();
    });

    const cellsSelection = (callback) => {
      for (const number of code.value.children) {
        for (const cell of number.children) {
          callback(cell);
        }
      }
    };

    const setRandomOpacity = () => {
      cellsSelection((cell) => {
        if (Object.values(cell.classList).indexOf('active') > -1) {
          cell.style.opacity = `0.${valueRandomNumbers(MINIMUM_VALUE, MAXIMUM_VALUE)}`;
        }
      });
    };

    const removeCSSClasses = (cell) => {
      Object.keys(cell.classList).find((key) => {
        if (cell.classList[key] === 'error') {
          cell.classList.remove('error');
        }

        if (cell.classList[key] === 'success') {
          cell.classList.remove('success');
        }
      });
    };

    const resetCaptcha = () => {
      input.value.input.value = '';

      cellsSelection((cell) => removeCSSClasses(cell));
    };


    const onInput = (event) => {
      const value = event.target.value;

      if (value.length) {
        const index = event.target.selectionStart - 1;

        const setCSSClass = (CSSClass) => {
          for (const element of code.value.children[index].children) {
            if (Object.values(element.classList).indexOf('active') > -1) {
              element.classList.add(CSSClass);
            }
          }
        };

        Number(value.slice(-1)) === state.code[index] ?
          setCSSClass('success') :
          setCSSClass('error');
      }

      context.emit('update:modelValue', value === captchaResult.value);
    };

    const onKeydownDelete = (event) => {
      const value = event.target.value;

      if (value.length && (event.key === 'Backspace' || event.key === 'Delete')) {
        for (const cell of code.value.children[value.length - 1].children) {
          removeCSSClasses(cell);
        }
      }
    };

    const onClickRedoIcon = () => {
      state.code = arrayRandomNumbers(CAPTCHA_NUMBERS_LENGTH, MAXIMUM_VALUE);

      setRandomOpacity();
      resetCaptcha();
    };

    return {
      code,
      input,
      state,
      rules,
      labels,
      onInput,
      onKeydownDelete,
      onClickRedoIcon,
      valueRandomNumbers
    };
  }
};
</script>

<style lang="scss" scoped>
.base-captcha {
  width: 320px;

  .title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  .code {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 24px;
    font-size: $font-size-xs;

    .number {
      z-index: 9;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .cell {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 16px;

        &.active {
          background-color: $font-color-secondary;

          &.error {
            background-color: $danger;
          }

          &.success {
            background-color: $success;
          }
        }
      }
    }
  }

  .input {
    margin-top: 24px;

    .redo-icon {
      cursor: pointer;
    }
  }
}
</style>
