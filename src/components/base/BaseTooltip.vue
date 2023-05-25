<template>
  <teleport to="body">
    <div ref="tooltip" :class="['base-tooltip']">
      <span class="label" v-text="label"></span>
    </div>
  </teleport>
</template>

<script>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { elementCoordinates } from '@/helpers/element-coordinates';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'BaseTooltip',
  props: {
    target: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  setup(props) {
    const tooltip = ref(null);

    const element = ref(null);

    const state = reactive({
      timeout: null
    });

    const resetState = () => {
      clearTimeout(state.timeout);

      if (tooltip.value) {
        tooltip.value.classList.remove('active');
      }
    };

    const onMousemoveHandler = (event) => {
      resetState();

      state.timeout = setTimeout(() => {
        const coordinates = elementCoordinates(element.value);

        if (props.placement === 'top' || props.placement === 'bottom') {
          tooltip.value.style.left = `${event['clientX'] - tooltip.value.clientWidth / magicNumbers.TWO_TIMES}px`;
        }

        if (props.placement === 'top') {
          tooltip.value.style.top = `${coordinates.top - tooltip.value.offsetHeight - magicNumbers.EIGHT_PIXELS}px`;
        }

        if (props.placement === 'bottom') {
          tooltip.value.style.top = `${coordinates.bottom + magicNumbers.EIGHT_PIXELS}px`;
        }

        if (props.placement === 'left' || props.placement === 'right') {
          tooltip.value.style.top = `${coordinates.top - element.value.clientHeight / magicNumbers.TWO_TIMES + 1}px`;
        }

        if (props.placement === 'left') {
          tooltip.value.style.left = `${
            coordinates.left - tooltip.value.offsetWidth - magicNumbers.THIRTY_TWO_PIXELS
          }px`;
        }

        if (props.placement === 'right') {
          tooltip.value.style.left = `${coordinates.right + magicNumbers.THIRTY_TWO_PIXELS}px`;
        }

        tooltip.value.classList.add('active');
      }, magicNumbers.ONE_THOUSAND_MILLISECONDS);
    };

    const onMouseleaveHandler = () => {
      resetState();

      tooltip.value.style.left = 0;
      tooltip.value.style.top = 0;
    };

    onMounted(() => {
      element.value = document.querySelector(`#${props.target}`);

      element.value.addEventListener('mousemove', onMousemoveHandler);
      element.value.addEventListener('mouseleave', onMouseleaveHandler);
    });

    onUnmounted(() => {
      clearTimeout(state.timeout);

      element.value.removeEventListener('mousemove', onMousemoveHandler);
      element.value.removeEventListener('mouseleave', onMouseleaveHandler);
    });

    return {
      tooltip
    };
  }
};
</script>

<style lang="scss" scoped>
.base-tooltip {
  z-index: 99;
  position: absolute;
  padding: 4px 12px;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: $black;
  border-radius: $tooltip-border-radius;
  box-shadow: 0 1px 3px rgba(19, 22, 24, 0.12), 0 1px 2px rgba(19, 22, 24, 0.24);
  font-size: $font-size-xs;
  pointer-events: none;

  &.active {
    opacity: 1;
    transition: 0.2s;
    transition-property: opacity;
  }
}
</style>
