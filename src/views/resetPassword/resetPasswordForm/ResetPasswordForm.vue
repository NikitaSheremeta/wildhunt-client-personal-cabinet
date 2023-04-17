<template>
  <form class="form">
    <h2 class="form__title" v-text="labels.RESET_PASSWORD_VIEW.TITLE" />

    <p class="form__description" v-text="labels.RESET_PASSWORD_VIEW.DESCRIPTION" />

    <BaseInput
      v-model="state.email"
      class="form__field"
      type="email"
      :placeholder="labels.RESET_PASSWORD_VIEW.EMAIL"
      :disabled="isDisabled"
      :validation="validation['email']"
      @input="onInput"
    />

    <div class="form__actions">
      <BaseButton
        type="submit"
        full-width
        :label="labels.RESET_PASSWORD_VIEW.SUBMIT"
        :disabled="isDisabled"
        :loading="isLoading"
      />
    </div>

    <BaseLink
      class="form__account-recover"
      href="support"
      color="secondary"
      :label="labels.RESET_PASSWORD_VIEW.ACCOUNT_RECOVER"
      :disabled="isDisabled"
      icon-left="question"
    />
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useValidation } from '@/hooks/useValidation';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { email, required } from '@/helpers/validators';
import { validationMessages } from '@/utils/validation-messages';
import { labels } from '@/utils/labels';

export default {
  name: 'ResetPasswordForm',
  components: {
    BaseInput,
    BaseButton,
    BaseLink
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const state = reactive({ email: '' });

    const rules = computed(() => {
      return {
        email: {
          required: required(validationMessages.BASE.REQUIRED),
          email: email(validationMessages.EMAIL.INCORRECT)
        }
      };
    });

    const validation = useValidation(rules, state);

    const onInput = async () => {
      context.emit('update:model-value', {
        email: state.email
      });
    };

    return {
      state,
      validation,
      onInput,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  &__description {
    margin-top: 8px;
    margin-bottom: 0;
    color: $font-color-secondary;
  }

  &__field {
    margin-top: 24px;
  }

  &__actions {
    margin-top: 24px;
  }

  &__account-recover {
    margin-top: 16px;
    font-size: $font-size-xs;
  }
}
</style>
