<template>
  <div :class="['base-captcha']">
    <div class="top-bar">
      <h2
        class="title"
        v-text="labels.CAPTCHA.TITLE"
      />

      <BaseButton
        class="button"
        icon-button
        icon="cross"
        theme="dark"
        @click="onClickButton"
        @mousedown="onMousedownButton"
      />
    </div>

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
      v-model="state.input"
      class="input"
      type="number"
      autofocus
      :placeholder="labels.CAPTCHA.PLACEHOLDER"
      :max-length="CAPTCHA_NUMBERS_LENGTH"
      @keydown="onKeydownInput"
      @input="onInput"
    >
      <template #icon>
        <BaseIcon
          class="redo-icon"
          icon="redo"
          color="secondary"
          @click="onClickIcon"
        />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import BaseButton from '@/components/base/BaseButton';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';
// import { maxLength, minLength, required, sameAs } from '@/helpers/validators';
import { valueRandomNumbers, arrayRandomNumbers } from '@/helpers/random-numbers';
// import { validationMessages } from '@/utils/validation-messages';
// import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

const MINIMUM_VALUE = 2;
const MAXIMUM_VALUE = 10;
const CAPTCHA_NUMBERS_LENGTH = 8;

export default {
  name: 'BaseCaptcha',
  components: {
    BaseButton,
    BaseInput,
    BaseIcon
  },
  component: {
    BaseInput
  },
  emits: ['update:mode-value', 'close'],
  setup(props, context) {
    const code = ref(null);

    const state = reactive({
      input: '',
      code: [...arrayRandomNumbers(CAPTCHA_NUMBERS_LENGTH, MAXIMUM_VALUE)],
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

    // const rules = {
    //   captcha: {
    //     required: required(validationMessages.CAPTCHA.REQUIRED),
    //     minLength: minLength(magicNumbers.CAPTCHA.MIN_LENGTH, validationMessages.CAPTCHA.MIN_LENGTH),
    //     maxLength: maxLength(magicNumbers.CAPTCHA.MAX_LENGTH, validationMessages.CAPTCHA.MAX_LENGTH),
    //     sameAs: sameAs(
    //       computed(() => captchaResult.value),
    //       validationMessages.CAPTCHA.INCORRECT
    //     )
    //   }
    // };

    const captchaResult = computed(() => state.code.join(''));

    onMounted(() => {
      setRandomOpacity();
    });

    const allCellsSelection = (callback) => {
      for (const number of code.value.children) {
        for (const cell of number.children) {
          callback(cell);
        }
      }
    };

    const setRandomOpacity = () => {
      allCellsSelection((cell) => {
        if (Object.values(cell.classList).indexOf('active') > -1) {
          cell.style.opacity = `0.${valueRandomNumbers(MINIMUM_VALUE, MAXIMUM_VALUE)}`;
        }
      });
    };

    const addCSSClasses = (number, value) => {
      for (const cell of code.value.children[number].children) {

        if (Object.values(cell.classList).indexOf('active') > -1) {
          const valuesArray = Array.from(String(value), Number);

          valuesArray[number] === state.code[number] ?
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
      for (let i = 0; i < CAPTCHA_NUMBERS_LENGTH; i++) {
        removeCSSClasses(i);
      }

      setRandomOpacity();

      state.input = '';
      state.code = arrayRandomNumbers(CAPTCHA_NUMBERS_LENGTH, MAXIMUM_VALUE);
    };

    const onClickButton = () => {
      context.emit('close');
    };

    const onMousedownButton = (event) => {
      event.preventDefault();
    };

    const onInput = (event) => {
      const value = event.target.value;

      if (value.length) {
        for (let i = 0; i < value.length; i++) {
          removeCSSClasses(i);
          addCSSClasses(i, value);
        }
      }

      context.emit('update:mode-value', value === captchaResult.value);
    };

    const onKeydownInput = (event) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        for (let i = 0; i < event.target.value.length; i++) {
          removeCSSClasses(i);
        }
      }
    };

    const onClickIcon = () => {
      restCaptcha();
    };

    return {
      code,
      state,
      labels,
      onClickButton,
      onMousedownButton,
      onInput,
      onKeydownInput,
      onClickIcon,
      CAPTCHA_NUMBERS_LENGTH
    };
  }
};
</script>

<style lang="scss" scoped>
.base-captcha {
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

  .code {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 24px;
    font-size: $font-size-xs;
    user-select: none;

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
