<template>
  <form class="form">
    <BaseTitle :title="labels.RESET_PASSWORD_VIEW.TITLE" />

    <p class="form__description" v-text="labels.RESET_PASSWORD_VIEW.DESCRIPTION" />

    <BaseInput
      v-model="state.email"
      class="form__field"
      :placeholder="labels.RESET_PASSWORD_VIEW.EMAIL"
      :disabled="disabled"
      trim
      :validation="fieldsValidation['email']"
      @input="onInput"
    />

    <div class="form__actions">
      <BaseButton
        type="submit"
        full-width
        :label="labels.RESET_PASSWORD_VIEW.SUBMIT"
        :disabled="disabled"
        :loading="loading"
      />
    </div>

    <BaseLink
      class="form__account-recover"
      small
      color="secondary"
      :label="labels.RESET_PASSWORD_VIEW.ACCOUNT_RECOVER"
      :disabled="disabled"
      @click="onClickAccountRecoverLink"
    />
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useFieldsValidation } from '@/hooks/useFieldsValidation';
import BaseTitle from '@/components/base/BaseTitle';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { email, required } from '@/helpers/validators';
import { validationMessages } from '@/utils/validation-messages';
import { labels } from '@/utils/labels';

export default {
  name: 'ResetPasswordForm',
  components: {
    BaseTitle,
    BaseInput,
    BaseButton,
    BaseLink
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const router = useRouter();

    const state = reactive({ email: '' });

    const rules = computed(() => {
      return {
        email: {
          required: required(validationMessages.BASE.REQUIRED),
          email: email(validationMessages.EMAIL.INCORRECT)
        }
      };
    });

    const fieldsValidation = useFieldsValidation(rules, state);

    const onInput = (event) => {
      context.emit('update:model-value', {
        email: event.target.value
      });
    };

    const onClickAccountRecoverLink = () => {
      router.push({
        path: '/support',
        name: 'Support',
        params: {
          category: labels.SUPPORT_VIEW.CATEGORY_OPTIONS[3]
        }
      });
    };

    return {
      state,
      fieldsValidation,
      onInput,
      onClickAccountRecoverLink,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__description {
    margin-top: 12px;
    margin-bottom: 0;
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

  @include media-breakpoint-down(xxs) {
    width: 100%;
  }
}
</style>
