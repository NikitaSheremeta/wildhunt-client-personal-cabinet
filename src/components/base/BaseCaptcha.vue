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
          v-text="cell"
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
      @input="onInput($event, 'input')"
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
import { maxLength, minLength, required, sameAs } from '@/helpers/validators';
import { valueRandomNumbers, arrayRandomNumbers } from '@/helpers/random-numbers';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

const MINIMUM_VALUE = 2;
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
        minLength: minLength(magicNumbers.CAPTCHA.MIN_LENGTH, validationMessages.CAPTCHA.MIN_LENGTH),
        maxLength: maxLength(magicNumbers.CAPTCHA.MAX_LENGTH, validationMessages.CAPTCHA.MAX_LENGTH),
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

    const cellSelection = (callback) => {
      for (const number of code.value.children) {
        for (const cell of number.children) {
          callback(cell);
        }
      }
    };

    const setRandomOpacity = () => {
      cellSelection((cell) => {
        if (Object.values(cell.classList).indexOf('active') > -1) {
          cell.style.opacity = `0.${valueRandomNumbers(MINIMUM_VALUE, MAXIMUM_VALUE)}`;
        }
      });
    };

    const addCSSClasses = (number) => {
      for (const cell of code.value.children[number].children) {
        if (Object.values(cell.classList).indexOf('active') > -1) {
          const valuesArray = input.value.input.value.split('');

          Number(valuesArray[number]) === state.code[number] ?
            cell.classList.add('success') :
            cell.classList.add('error');
        }
      }
    };

    const removeCSSClasses = (number) => {
      for (const cell of code.value.children[number].children) {
        if (Object.values(cell.classList).indexOf('error') > -1) {
          cell.classList.remove('error');
        }

        if (Object.values(cell.classList).indexOf('success') > -1) {
          cell.classList.remove('success');
        }
      }
    };

    const restCaptcha = () => {
      for (let i = 0; i < input.value.input.value.length; i++) {
        removeCSSClasses(i);
      }

      setRandomOpacity();

      state.code = arrayRandomNumbers(CAPTCHA_NUMBERS_LENGTH, MAXIMUM_VALUE);
      input.value.input.value = '';
    };

    const onInput = (event) => {
      const value = event.target.value;

      if (value.length) {
        for (let i = 0; i < value.length; i++) {
          removeCSSClasses(i);
          addCSSClasses(i);
        }
      }

      context.emit('update:modelValue', value === captchaResult.value);
    };

    const onKeydownDelete = (event) => {
      const value = event.target.value;

      if (value.length) {
        if (event.target.selectionStart > 0 && (event.key === 'Backspace' || event.key === 'Delete')) {
          for (let i = 0; i < value.length; i++) {
            removeCSSClasses(i);
          }
        }
      }
    };

    const onClickRedoIcon = () => {
      restCaptcha();
    };

    return {
      code,
      input,
      state,
      rules,
      labels,
      onInput,
      onKeydownDelete,
      onClickRedoIcon
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
