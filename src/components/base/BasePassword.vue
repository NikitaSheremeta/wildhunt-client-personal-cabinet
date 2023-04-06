<template>
  <div :class="['base-password', classes]">
    <BaseInput
      ref="input"
      :type="state.type"
      :placeholder="placeholder"
      :disabled="disabled"
      :rules="rules"
      :debounce-validation="create"
      :validation-notice="!create"
      @input="onInput"
      @blur="onBlur"
    >
      <template v-if="create" #icon>
        <BaseIcon
          width="22"
          height="22"
          color="secondary"
          :icon="state.type === 'password' ? 'eye' : 'eye-slash'"
          @click="onClick"
        />
      </template>

      <template v-if="create" #extension>
        <div class="meter">
          <span class="meter__item"></span>
          <span class="meter__item"></span>
          <span class="meter__item"></span>
        </div>

        <span v-if="password.notice" class="notice" v-text="password.notice" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';
import { usePassword } from '@/hooks/usePassword';

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
      type: [String, null],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const state = reactive({ type: 'password' });

    const input = ref(null);

    const password = usePassword({ value: '' });

    const classes = computed(() => [props.disabled ? 'disabled' : '', password.status]);

    const onInput = (event) => {
      const value = event.target.value;

      context.emit('update:modelValue', value);

      if (input.value.input.valid) {
        password.value = value;
      }

      passwordHookHandle();
    };

    const onClick = () => {
      if (!props.disabled) {
        state.type = state.type === 'password' ? 'text' : 'password';
      }
    };

    const onBlur = () => {
      passwordHookHandle();
    };

    const passwordHookHandle = () => {
      if (!input.value.input.valid) {
        password.status = 'invalid';
        password.notice = input.value.input.error;
      }
    };

    return { state, input, password, classes, onInput, onBlur, onClick };
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
    color: $font-color-secondary;
    font-size: $font-size-xs;
    user-select: none;
  }

  &.invalid {
    .notice {
      color: $danger;
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
    .notice {
      color: $disabled-color;
    }

    .meter__item {
      background-color: $disabled-background;
    }
  }
}
</style>
