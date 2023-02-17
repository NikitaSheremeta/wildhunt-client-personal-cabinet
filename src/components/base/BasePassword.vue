<template>
  <div :class="['base-password']">
    <BaseInput :type="state.type" :placeholder="placeholder" :disabled="disabled" :rules="rules" @input="onInput">
      <template #icon>
        <BaseIcon
          v-if="!repeat"
          width="22"
          height="22"
          color="secondary"
          :icon="state.type === 'password' ? 'eye' : 'eye-slash'"
          @click="onIconClick"
        />
      </template>

      <template #extension>
        <div v-if="create" class="strength-password-checker">
          <div class="meter">
            <span class="meter__item"></span>
            <span class="meter__item"></span>
            <span class="meter__item"></span>
          </div>
        </div>
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { reactive } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BaseIcon from '@/components/base/BaseIcon';

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
    repeat: {
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
    const state = reactive({
      type: 'password'
    });

    const onInput = (event) => {
      context.emit('update:modelValue', event.target.value);
    };

    const onIconClick = () => {
      if (!props.disabled) {
        state.type = state.type === 'password' ? 'text' : 'password';
      }
    };

    return { state, onInput, onIconClick };
  }
};
</script>

<style lang="scss" scoped>
.base-password {
  .base-icon {
    cursor: pointer;
  }
}

.strength-password-checker {
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

  &.danger {
    .notice {
      color: $danger;
    }

    .meter {
      &__item {
        &:first-child {
          background-color: $danger;
        }
      }
    }
  }

  &.warning {
    .notice {
      color: $warning;
    }

    .meter {
      &__item {
        &:nth-child(-n + 2) {
          background-color: $warning;
        }
      }
    }
  }

  &.success {
    .notice {
      color: $success;
    }

    .meter {
      &__item {
        background-color: $success;
      }
    }
  }
}
</style>
