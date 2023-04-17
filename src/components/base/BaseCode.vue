<template>
  <div :class="['base-code']">
    <template v-for="(value, index) in state.code" :key="value">
      <BaseInput
        :ref="
          (item) => {
            if (item) inputs[index] = item;
          }
        "
        :class="['input', 'code-item']"
        type="number"
        :data-id="index"
        :autofocus="index === 0"
        placeholder="0"
        :disabled="disabled"
        :max-length="magicNumbers.CODE.MAX_LENGTH"
        v-on="inputListeners"
      />
    </template>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useTimer } from '@/hooks/useTimer';
import BaseInput from '@/components/base/BaseInput';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'BaseCode',
  components: {
    BaseInput
  },
  props: {
    modelValue: {
      type: Array,
      default: () => ['', '', '', '']
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:model-value', 'close'],
  setup(props, context) {
    const inputs = ref([]);

    const timer = useTimer();

    const state = reactive({ code: ['', '', '', ''] });

    const focusOnPrevious = (currentIndex) => {
      const input = inputs.value[currentIndex - 1].input;

      input.focus();
    };

    const focusOnNext = (currentIndex) => {
      const input = inputs.value[currentIndex + 1].input;

      input.focus();
    };

    const inputListeners = computed(() => {
      return {
        keydown: (event) => {
          const currentIndex = parseInt(event.target.dataset.id);

          if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();

            if (currentIndex > 0 && !state.code[currentIndex]) {
              focusOnPrevious(currentIndex);
            }

            state.code[currentIndex] = '';

            context.emit('update:model-value', state.code);
          }

          if (event.key === 'ArrowLeft') {
            event.preventDefault();

            if (currentIndex > 0) {
              focusOnPrevious(currentIndex);
            }
          }

          if (event.key === 'ArrowRight') {
            event.preventDefault();

            if (currentIndex < state.code.length - 1) {
              focusOnNext(currentIndex);
            }
          }
        },
        input: (event) => {
          if (event.target.value) {
            const currentIndex = Number(event.target.dataset.id);

            state.code[currentIndex] = event.target.value;

            if (currentIndex < state.code.length - 1) {
              focusOnNext(currentIndex);
            }
          }

          context.emit('update:model-value', state.code);
        },
        click: (event) => {
          event.target.select(event);
        },
        focus: (event) => {
          event.target.select(event);
        }
      };
    });

    return {
      inputs,
      timer,
      state,
      inputListeners,
      magicNumbers,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-code {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
</style>
