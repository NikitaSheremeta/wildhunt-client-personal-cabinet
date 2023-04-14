<template>
  <div :class="['base-password', classes]">
    <BaseInput
      v-model="password.value"
      :type="state.type"
      :placeholder="labels.SIGN_UP_VIEW.PASSWORD"
      :disabled="disabled"
      :validation="validation"
      v-on="inputListeners"
    >
      <template #icon>
        <BaseIcon
          width="22"
          height="22"
          color="secondary"
          :icon="state.type === 'password' ? 'eye' : 'eye-slash'"
          @click="onClickIcon"
        />
      </template>

      <template #extension>
        <div class="meter">
          <span class="meter__item" />
          <span class="meter__item" />
          <span class="meter__item" />
        </div>

        <span v-if="password.notice" class="notice" v-text="password.notice" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';
import { usePassword } from '@/hooks/usePassword';
import { labels } from '@/utils/labels';

export default {
  name: 'BasePassword',
  components: {
    BaseInput,
    BaseIcon
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    validation: {
      type: [Object, null],
      default: null
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const password = usePassword({ value: '' });

    const state = reactive({ type: 'password' });

    const classes = computed(() => [props.disabled ? 'disabled' : '', password.status]);

    const inputListeners = computed(() => {
      return {
        input: (event) => {
          const value = event.target.value;

          password.value = value;

          context.emit('update:model-value', value);

          // if (input.value.input.valid) {
          //   password.value = value;
          // }

          // passwordHookHandle();
        }
        // blur: () => {
        //   passwordHookHandle();
        // }
      };
    });

    const onClickIcon = () => {
      if (!props.disabled) {
        state.type = state.type === 'password' ? 'text' : 'password';
      }
    };

    // const passwordHookHandle = () => {
    //   if (!input.value.input.valid) {
    //     password.status = 'invalid';
    //     password.notice = input.value.input.error;
    //   }
    // };

    return {
      state,
      password,
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
