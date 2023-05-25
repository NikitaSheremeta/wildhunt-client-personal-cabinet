<template>
  <div :class="['base-select', classes]" :tabindex="tabindex" @blur="onBlur">
    <div class="wrapper" @click="onClickSelect">
      <template v-if="placeholder && !state.selected">
        <span class="placeholder" v-text="placeholder" />
      </template>

      <template v-if="state.selected">
        <span class="value" v-text="state.selected" />
      </template>

      <div class="icon">
        <BaseIcon
          v-if="state.selected"
          icon="cross"
          color="secondary"
          width="12"
          height="12"
          @click.stop="onClickCrossIcons"
        />

        <BaseIcon :id="baseTooltipHash" :icon="computedIcon" color="secondary" />

        <BaseTooltip v-if="!isMobileView" :target="baseTooltipHash" :label="computedTooltipLabel" placement="right" />

        <BaseIcon
          v-if="validation && validation.touched && !validation.valid"
          icon="exclamation"
          color="danger"
          width="16"
          height="16"
        />
      </div>
    </div>

    <span v-if="shouldDisplayValidationMessage" class="validation-notice" v-text="validation.notice" />

    <div class="options">
      <ul class="list">
        <li
          v-for="(value, index) of computedOptions"
          :key="index"
          class="item"
          @click="onClickItemList(value)"
          v-text="value"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import BaseIcon from '@/components/base/BaseIcon';
import BaseTooltip from '@/components/base/BaseTooltip';
import { randomHash } from '@/helpers/random-hash';
import { labels } from '@/utils/labels';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'BaseSelect',
  components: {
    BaseIcon,
    BaseTooltip
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false
    },
    validation: {
      type: [Object, null],
      default: null
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const baseTooltipHash = randomHash(magicNumbers.THIRTY_TWO_PIXELS);

    const store = useStore();

    const state = reactive({
      selected: props.modelValue
    });

    const flags = reactive({
      open: false
    });

    const classes = computed(() => [
      flags.open ? 'open' : '',
      props.disabled ? 'disabled' : '',
      props.validation && props.validation.touched && props.validation.valid ? 'valid' : '',
      props.validation && props.validation.touched && !props.validation.valid ? 'invalid' : ''
    ]);

    const computedOptions = computed(() => props.options.filter((item) => item !== state.selected));

    const computedIcon = computed(() => (flags.open ? 'chevron-top' : 'chevron-bottom'));

    const isMobileView = computed(() => store.getters.GET_IS_MOBILE_VIEW);

    const computedTooltipLabel = computed(() => (flags.open ? labels.CLOSE_LIST : labels.OPEN_LIST));

    const shouldDisplayValidationMessage = computed(
      () => props.validation && props.validation.touched && props.validation.notice
    );

    const onBlur = () => {
      flags.open = false;

      if (props.validation && !props.disabled) {
        props.validation.blur();
      }
    };

    const onClickSelect = () => {
      if (!props.disabled) {
        flags.open = !flags.open;
      }
    };

    const onClickCrossIcons = () => {
      if (!props.disabled) {
        state.selected = '';

        context.emit('update:model-value', state.selected);
      }
    };

    const onClickItemList = (option) => {
      state.selected = option;
      flags.open = false;

      context.emit('update:model-value', state.selected);
    };

    return {
      baseTooltipHash,
      state,
      flags,
      classes,
      computedOptions,
      computedIcon,
      isMobileView,
      computedTooltipLabel,
      shouldDisplayValidationMessage,
      onBlur,
      onClickSelect,
      onClickCrossIcons,
      onClickItemList
    };
  }
};
</script>

<style lang="scss" scoped>
.base-select {
  display: block;
  position: relative;
  width: 100%;
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  font-style: normal;
  outline: none;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 52px;
    cursor: pointer;
    user-select: none;
    @include field;

    @include media-breakpoint-down(xxs) {
      .value,
      .placeholder {
        white-space: nowrap;
        overflow: hidden;
        @include truncate;
      }
    }

    .placeholder {
      color: map-get($field-palette, primary, placeholder-color);
    }

    .icon {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: 12px;
    }
  }

  .options {
    display: none;
    position: absolute;
    width: 100%;
    top: 42px;
    background-color: map-get($field-palette, primary, background-color);
    border-bottom-left-radius: $field-border-radius;
    border-bottom-right-radius: $field-border-radius;
    box-shadow: 0 8px 6px rgba(19, 22, 24, 0.16), 0 8px 6px rgba(19, 22, 24, 0.23);

    .list {
      padding: 8px;

      .item {
        margin: 0;
        padding: 12px 16px;
        border-radius: $option-item-border-radius;
        color: $font-color-base;
        list-style: none;
        cursor: pointer;
        user-select: none;

        @include media-breakpoint-up(md) {
          &:hover {
            background-color: map-get($field-palette, primary, hover-background-color);
          }
        }

        @include media-breakpoint-down(sm) {
          &:active {
            background-color: map-get($field-palette, primary, hover-background-color);
          }
        }
      }
    }
  }

  &.open {
    z-index: 9;

    .wrapper {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .value {
        color: map-get($field-palette, primary, placeholder-color);
      }
    }

    .options {
      display: block;
    }
  }

  .validation-notice {
    margin-top: 8px;
    font-size: $font-size-xs;
    user-select: none;
  }

  &.invalid {
    .validation-notice {
      color: $danger;
    }
  }

  &.valid {
    .validation-notice {
      color: $success;
    }
  }

  &.disabled {
    .wrapper {
      background-color: map-get($field-palette, disabled, background-color);
      cursor: default;

      .placeholder,
      .value {
        color: map-get($field-palette, disabled, color);
      }

      .icon {
        .base-icon {
          fill: map-get($field-palette, disabled, color);
          stroke: map-get($field-palette, disabled, color);
          cursor: default;
        }
      }
    }

    .validation-notice {
      color: map-get($field-palette, disabled, color);
    }
  }
}
</style>
