<template>
  <form class="form">
    <div class="form__top-bar">
      <BaseButton class="button" icon-button icon="arrow-left" theme="dark" @click.prevent="onClickBackButton" />

      <h2 class="form__title" v-text="labels.NEW_PASSWORD_VIEW.TITLE" />
    </div>

    <BasePassword
      v-model="state.password"
      class="form__field"
      create
      :placeholder="labels.LOGIN_VIEW.PASSWORD"
      :disabled="disabled"
      :validation="fieldsValidation['password']"
      @input="onInput"
    />

    <BasePassword
      v-model="state.passwordConfirmation"
      class="form__field"
      :placeholder="labels.SIGN_UP_VIEW.CONFIRMATION_PASSWORD"
      :disabled="disabled"
      :validation="fieldsValidation['passwordConfirmation']"
    />

    <div class="form__actions">
      <BaseButton full-width :label="labels.NEW_PASSWORD_VIEW.SUBMIT" :disabled="disabled" :loading="loading" />
    </div>
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useFieldsValidation } from '@/hooks/useFieldsValidation';
import BasePassword from '@/components/base/BasePassword';
import BaseButton from '@/components/base/BaseButton';
import { allowedCharacters, maxLength, minLength, required, sameAs } from '@/helpers/validators';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'NewPasswordForm',
  components: {
    BasePassword,
    BaseButton
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
  emits: ['update:model-value', 'close'],
  setup(props, context) {
    const state = reactive({
      password: ''
    });

    const rules = computed(() => {
      return {
        password: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.PASSWORD.MIN_LENGTH, validationMessages.PASSWORD.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.PASSWORD.MAX_LENGTH, validationMessages.PASSWORD.MAX_LENGTH),
          allowedCharacters: allowedCharacters(validationMessages.BASE.ALLOWED_CHARACTERS)
        },
        passwordConfirmation: {
          required: required(validationMessages.BASE.REQUIRED),
          sameAs: sameAs(state.password, validationMessages.CONFIRM_PASSWORD.SAME_AS),
          allowedCharacters: allowedCharacters(validationMessages.BASE.ALLOWED_CHARACTERS)
        }
      };
    });

    const fieldsValidation = useFieldsValidation(rules, state);

    const onClickBackButton = () => {
      context.emit('close');
    };

    const onInput = async () => {
      context.emit('update:model-value', {
        password: state.password
      });
    };

    return {
      state,
      fieldsValidation,
      onClickBackButton,
      onInput,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__top-bar {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  &__field {
    margin-top: 16px;

    &:nth-child(2) {
      margin-top: 24px;
    }

    &:nth-child(3) {
      margin-top: 8px;
    }
  }

  &__actions {
    margin-top: 24px;
  }
}
</style>
