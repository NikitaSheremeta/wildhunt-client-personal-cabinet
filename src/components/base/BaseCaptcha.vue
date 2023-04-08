<template>
  <div :class="['base-captcha']">
    <h2 class="title" v-text="'Каптча!'" />

    <div ref="codeItem" class="code">
      <div v-for="(item, itemIndex) in state.captchaCode" :key="itemIndex" class="code__item">
        <div
          v-for="(cell, cellIndex) in state.numberMarkups[item]"
          :key="cellIndex"
          :class="['code__item-cell', cell ? 'active' : '']"
          :style="randomOpacity()"
          v-text="cell"
        />
      </div>
    </div>

    <BaseInput
      ref="input"
      class="field"
      type="captcha"
      autofocus
      :placeholder="'Введите код'"
      :rules="rules.captcha"
      @input="onInput"
    >
      <template #icon>
        <BaseIcon class="field__icon" icon="redo" color="secondary" @click="onIconClick" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';
import { required, sameAs } from '@/helpers/validators';
import { randomNumber } from '@/helpers/random-number';

const MINIMUM_VALUE = 1;
const MAXIMUM_VALUE = 10;
const CAPTCHA_NUMBERS_QUANTITY = 8;

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
    const state = reactive({
      captchaCode: [],
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

    const codeItem = ref(null);
    const input = ref(null);

    const rules = {
      captcha: {
        required: required('Необходимо ввести код'),
        sameAs: sameAs(
          computed(() => captchaResult.value),
          'Введенный код неверен'
        )
      }
    };

    onMounted(() => {
      randomNumbers();
    });

    const randomNumbers = () => {
      state.captchaCode = [];

      for (let i = 0; i < CAPTCHA_NUMBERS_QUANTITY; i++) {
        state.captchaCode.push(randomNumber(MAXIMUM_VALUE));
      }
    };

    const randomOpacity = () => `opacity: 0.${randomNumber(MINIMUM_VALUE, MAXIMUM_VALUE)}`;

    const captchaResult = computed(() => state.captchaCode.join(''));

    const onInput = (event) => {
      const value = event.target.value;

      const array = [];

      for (let i = 0; i < value.length; i++) {
        array.push(Number(value[i]));
      }

      array.forEach((item, index) => {
        if (item === state.captchaCode[index]) {
          for (const element of codeItem.value.children[index].children) {
            if (Object.values(element.classList).indexOf('active') > -1) {
              element.classList.value += ' success';
            }
          }
        } else {
          for (const element of codeItem.value.children[index].children) {
            if (Object.values(element.classList).indexOf('active') > -1) {
              element.classList.value += ' error';
            }
          }
        }
      });

      context.emit('update:modelValue', value === captchaResult.value);
    };

    const onIconClick = () => {
      randomNumbers();
    };

    return { state, input, rules, codeItem, randomOpacity, onInput, onIconClick };
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

    &__item {
      z-index: 9;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      &-cell {
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

  .field {
    margin-top: 24px;

    &__icon {
      cursor: pointer;
    }
  }
}
</style>
