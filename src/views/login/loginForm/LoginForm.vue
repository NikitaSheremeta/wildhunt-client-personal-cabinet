<template>
  <form class="form">
    <BaseTitle :title="labels.LOGIN_VIEW.TITLE" />

    <BaseInput
      v-model="state.login"
      class="form__field"
      :placeholder="labels.LOGIN_VIEW.USER_NAME"
      :disabled="disabled"
      trim
      :validation="fieldsValidation['login']"
      disable-success-icon
      @input="onInput"
    />

    <BasePassword
      v-model="state.password"
      class="form__field"
      :placeholder="labels.LOGIN_VIEW.PASSWORD"
      :disabled="disabled"
      :validation="fieldsValidation['password']"
      disable-success-icon
      @input="onInput"
    />

    <div class="form__actions">
      <BaseButton type="submit" full-width :label="labels.LOGIN_VIEW.LOGIN" :disabled="disabled" :loading="loading" />
    </div>

    <BaseLink
      class="form__reset-password"
      small
      href="reset-password"
      color="secondary"
      :label="labels.LOGIN_VIEW.RESET_PASSWORD"
      :disabled="disabled"
      icon-left="question"
    />
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useFieldsValidation } from '@/hooks/useFieldsValidation';
import BaseTitle from '@/components/base/BaseTitle';
import BaseInput from '@/components/base/BaseInput';
import BasePassword from '@/components/base/BasePassword';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { labels } from '@/utils/labels';
import { allowedCharacters, maxLength, minLength, required } from '@/helpers/validators';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'LoginForm',
  components: {
    BaseTitle,
    BaseInput,
    BasePassword,
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
    const state = reactive({
      login: '',
      password: ''
    });

    const rules = computed(() => {
      return {
        login: {
          required: required(validationMessages.BASE.REQUIRED),
          maxLength: maxLength(magicNumbers.LOGIN_OR_EMAIL.MAX_LENGTH, validationMessages.LOGIN_OR_EMAIL.MAX_LENGTH)
        },
        password: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.PASSWORD.MIN_LENGTH, validationMessages.PASSWORD.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.PASSWORD.MAX_LENGTH, validationMessages.PASSWORD.MAX_LENGTH),
          allowedCharacters: allowedCharacters(validationMessages.BASE.ALLOWED_CHARACTERS)
        }
      };
    });

    const fieldsValidation = useFieldsValidation(rules, state);

    const onInput = () => {
      context.emit('update:model-value', {
        login: state.login,
        password: state.password
      });
    };

    return {
      state,
      fieldsValidation,
      onInput,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__field {
    margin-top: 16px;

    &:nth-child(2) {
      margin-top: 24px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    gap: 16px;
  }

  &__reset-password {
    margin-top: 16px;
    font-size: $font-size-xs;
  }

  @include media-breakpoint-down(xxs) {
    width: 100%;
  }
}
</style>
