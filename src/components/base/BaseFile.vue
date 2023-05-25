<template>
  <div :class="['base-file', classes]">
    <div class="wrapper" @click="onClickWrapper">
      <input ref="field" class="field" type="file" @change="onChange" />

      <template v-if="placeholder && !state.file">
        <span class="placeholder" v-text="placeholder" />
      </template>

      <template v-if="state.file">
        <span class="value" v-text="state.file.name" />
      </template>

      <div class="icon">
        <BaseIcon
          v-if="state.file"
          icon="cross"
          color="secondary"
          width="12"
          height="12"
          @click.stop="onClickCrossIcons"
        />

        <BaseIcon :id="baseTooltipHash" icon="attach" color="secondary" />

        <BaseTooltip v-if="!isMobileView" :target="baseTooltipHash" :label="labels.ATTACH" placement="right" />

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
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import BaseIcon from '@/components/base/BaseIcon';
import BaseTooltip from '@/components/base/BaseTooltip';
import { randomHash } from '@/helpers/random-hash';
import { labels } from '@/utils/labels';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'BaseFile',
  components: {
    BaseIcon,
    BaseTooltip
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    accept: {
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
  setup(props) {
    const baseTooltipHash = randomHash(magicNumbers.THIRTY_TWO_PIXELS);

    const store = useStore();

    const field = ref(null);

    const state = reactive({
      file: null
    });

    const classes = computed(() => [props.disabled ? 'disabled' : '']);

    const isMobileView = computed(() => store.getters.GET_IS_MOBILE_VIEW);

    const shouldDisplayValidationMessage = computed(
      () => props.validation && props.validation.touched && props.validation.notice
    );

    const onClickWrapper = () => {
      if (!props.disabled) {
        field.value.click();
      }
    };

    const onClickCrossIcons = () => {
      field.value.value = '';

      state.file = null;
    };

    const onChange = (event) => {
      const file = event.target.files[0];

      if (file) {
        state.file = file;
      }
    };

    return {
      baseTooltipHash,
      field,
      state,
      classes,
      isMobileView,
      shouldDisplayValidationMessage,
      onClickWrapper,
      onClickCrossIcons,
      onChange,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-file {
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

    .field {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      margin: 0;
      overflow: hidden;
    }

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
