<template>
  <div :class="['base-captcha']">
    <div class="top-bar">
      <BaseButton class="button" icon-button icon="arrow-left" theme="dark" @click.prevent="onClickBackButton" />

      <h2 class="title" v-text="labels.CAPTCHA.TITLE" />
    </div>

    <p class="description" v-text="labels.CAPTCHA.DESCRIPTION" />

    <div ref="captcha" class="captcha">
      <div v-for="(number, numberIndex) in state.captcha" :key="numberIndex" class="number">
        <div
          v-for="(cell, cellIndex) in state.numberMarkups[number]"
          :key="cellIndex"
          :class="['cell', cell ? 'active' : '']"
          v-text="cell"
        />
      </div>
    </div>

    <BaseCode v-model="state.code" class="code" :disabled="disabled" v-on="codeListeners" />

    <BaseLink
      class="link"
      color="secondary"
      :label="labels.CAPTCHA.RESET_CAPTCHA_LABEL"
      icon-left="redo"
      @click.prevent="onClickResetIcon"
    />
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import BaseButton from '@/components/base/BaseButton';
import BaseCode from '@/components/base/BaseCode';
import BaseLink from '@/components/base/BaseLink';
import { valueRandomNumbers, arrayRandomNumbers } from '@/helpers/random-numbers';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseCaptcha',
  components: {
    BaseButton,
    BaseCode,
    BaseLink
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['success', 'close'],
  setup(props, context) {
    const captcha = ref(null);

    const state = reactive({
      code: [],
      captcha: [...arrayRandomNumbers(magicNumbers.CAPTCHA.NUMBERS_LENGTH, magicNumbers.CAPTCHA.NUMBERS_MAX_VALUE)],
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

    const allCellsSelection = (callback) => {
      for (const number of captcha.value.children) {
        for (const cell of number.children) {
          callback(cell);
        }
      }
    };

    const setRandomOpacity = () => {
      allCellsSelection((cell) => {
        if (Object.values(cell.classList).indexOf('active') > -1) {
          cell.style.opacity = `0.${valueRandomNumbers(
            magicNumbers.CAPTCHA.NUMBERS_MIN_VALUE,
            magicNumbers.CAPTCHA.NUMBERS_MAX_VALUE
          )}`;
        }
      });
    };

    const removeCSSClasses = () => {
      allCellsSelection((cell) => {
        if (Object.values(cell.classList).indexOf('error') > -1) {
          cell.classList.remove('error');
        }

        if (Object.values(cell.classList).indexOf('success') > -1) {
          cell.classList.remove('success');
        }
      });
    };

    const addCSSClasses = () => {
      state.code.forEach((value, key) => {
        if (value) {
          for (const cell of captcha.value.children[key].children) {
            if (Object.values(cell.classList).indexOf('active') > -1) {
              Number(state.code[key]) === state.captcha[key]
                ? cell.classList.add('success')
                : cell.classList.add('error');
            }
          }
        }
      });
    };

    const onClickBackButton = () => {
      context.emit('close');
    };

    const onClickResetIcon = () => {
      state.code = [];
      state.captcha = arrayRandomNumbers(magicNumbers.CAPTCHA.NUMBERS_LENGTH, magicNumbers.CAPTCHA.NUMBERS_MAX_VALUE);

      removeCSSClasses();
      setRandomOpacity();
    };

    const isCaptchaValid = computed(() => state.code.join('') === state.captcha.join(''));

    const codeListeners = computed(() => {
      return {
        keydown: (event) => {
          if (event.key === 'Backspace' || event.key === 'Delete') {
            removeCSSClasses();
            addCSSClasses();
          }

          if (isCaptchaValid.value) {
            context.emit('success', isCaptchaValid.value);
          }
        },
        input: () => {
          const value = state.code.join('');

          if (value.length) {
            removeCSSClasses();
            addCSSClasses();
          }

          if (isCaptchaValid.value) {
            context.emit('success', isCaptchaValid.value);
          }
        }
      };
    });

    onMounted(() => {
      setRandomOpacity();
    });

    return {
      captcha,
      state,
      codeListeners,
      onClickBackButton,
      onClickResetIcon,
      labels
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
    gap: 16px;

    .title {
      margin: 0;
      font-weight: $font-weight-base;
    }
  }

  .description {
    margin-top: 12px;
    margin-bottom: 0;
    color: $font-color-secondary;
  }

  .captcha {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
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

  .code {
    margin-top: 24px;
  }

  .link {
    margin-top: 16px;
    font-size: $font-size-xs;
  }
}
</style>
