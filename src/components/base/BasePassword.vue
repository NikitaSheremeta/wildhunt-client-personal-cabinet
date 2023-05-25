<template>
  <div :class="['base-password', classes]">
    <BaseInput
      v-model="state.value"
      :type="state.type"
      name="password"
      :placeholder="placeholder"
      :disabled="disabled"
      trim
      :disable-notice="create"
      :validation="validation"
      :disable-success-icon="disableSuccessIcon"
      v-on="inputListeners"
    >
      <template #icon>
        <BaseIcon color="secondary" :icon="state.type === 'password' ? 'eye' : 'eye-slash'" @click="onClickIcon" />
      </template>

      <template v-if="create" #extension>
        <div class="meter">
          <span class="meter__item" />
          <span class="meter__item" />
          <span class="meter__item" />
        </div>

        <span v-if="state.notice" class="notice" v-text="state.notice" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';
import { magicNumbers } from '@/utils/magic-numbers';
import { regularExpressions } from '@/utils/regular-expressions';
import { labels } from '@/utils/labels';

export default {
  name: 'BasePassword',
  components: {
    BaseInput,
    BaseIcon
  },
  props: {
    create: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validation: {
      type: [Object, null],
      default: null
    },
    disableSuccessIcon: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const state = reactive({
      value: '',
      type: 'password',
      status: '',
      notice: labels.PASSWORD_STRENGTH_NOTICE.DEFAULT
    });

    const classes = computed(() => [
      props.disabled ? 'disabled' : '',
      props.validation.touched ? 'touched' : '',
      props.validation.touched && !props.validation.valid ? 'invalid' : '',
      state.status
    ]);

    const inputListeners = computed(() => {
      return {
        input: (event) => {
          context.emit('update:model-value', event.target.value);
        },
        blur: () => {
          props.validation.blur();

          handleValidation();
        }
      };
    });

    watch(
      () => state.value,
      () => reassign()
    );

    const onClickIcon = () => {
      if (!props.disabled) {
        state.type = state.type === 'password' ? 'text' : 'password';
      }
    };

    const handleValidation = () => {
      if (!props.validation.valid) {
        state.status = 'invalid';
        state.notice = props.validation.notice;
      }
    };

    const getStrengthScore = () => {
      let score = 0;

      if (state.value === '') {
        return score;
      }

      const letters = {};

      for (let i = 0; i < state.value.length; i++) {
        letters[state.value[i]] = (letters[state.value[i]] || 0) + 1;

        // eslint-disable-next-line no-magic-numbers
        score += 5.0 / letters[state.value[i]];
      }

      const variations = {
        digits: regularExpressions.digits.test(state.value),
        lower: regularExpressions.lower.test(state.value),
        upper: regularExpressions.upper.test(state.value),
        special: regularExpressions.special.test(state.value)
      };

      let variationsCount = 0;

      for (const check in variations) {
        variationsCount += variations[check] === true ? 1 : 0;
      }

      // eslint-disable-next-line no-magic-numbers
      score += (variationsCount - 1) * 10;

      return score;
    };

    const reassign = () => {
      handleValidation();

      if (props.validation.valid && state.value.length >= magicNumbers.PASSWORD.MIN_LENGTH) {
        const strengthScore = getStrengthScore();

        // eslint-disable-next-line no-magic-numbers
        if (strengthScore <= 25 && state.value.length >= magicNumbers.PASSWORD.MIN_LENGTH) {
          state.status = 'danger';
          state.notice = labels.PASSWORD_STRENGTH_NOTICE.DANGER;
        }

        // eslint-disable-next-line no-magic-numbers
        if (strengthScore > 20 && strengthScore <= 50 && state.value.length !== 0) {
          state.status = 'warning';
          state.notice = labels.PASSWORD_STRENGTH_NOTICE.WARNING;
        }

        // eslint-disable-next-line no-magic-numbers
        if (strengthScore > 50 && state.value.length !== 0) {
          state.status = 'success';
          state.notice = labels.PASSWORD_STRENGTH_NOTICE.SUCCESS;
        }
      }
    };

    return {
      state,
      classes,
      inputListeners,
      onClickIcon,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.base-password {
  .base-icon {
    cursor: pointer;
  }

  .meter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 12px;
    width: 100%;

    &__item {
      width: 100%;
      height: 8px;
      background-color: $gray-800;
      border-radius: 4px;
    }
  }

  .notice {
    margin-top: 8px;
    width: 100%;
    color: $font-color-secondary;
    font-size: $font-size-xs;
    user-select: none;
  }

  &.invalid {
    &.touched {
      .notice {
        color: $danger;
      }
    }
  }

  &.danger {
    .notice {
      color: $danger;
    }

    .meter__item {
      &:first-child {
        background-color: $danger;
      }
    }
  }

  &.warning {
    .notice {
      color: $warning;
    }

    .meter__item {
      &:nth-child(-n + 2) {
        background-color: $warning;
      }
    }
  }

  &.success {
    .notice {
      color: $success;
    }

    .meter__item {
      background-color: $success;
    }
  }

  &.disabled {
    .icon {
      .base-icon {
        fill: map-get($field-palette, disabled, color);
        stroke: map-get($field-palette, disabled, color);
        cursor: default;
      }
    }

    .notice {
      color: $disabled-color !important;
    }

    .meter__item {
      background-color: $disabled-background !important;
    }
  }
}
</style>
