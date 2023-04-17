<template>
  <form class="form">
    <h2 class="form__title" v-text="labels.LOGIN_VIEW.TITLE" />

    <BaseInput
      v-model="state.login"
      class="form__field"
      :placeholder="labels.LOGIN_VIEW.USER_NAME"
      :disabled="isDisabled"
      :validation="validation['login']"
      @input="onInput"
    />

    <BasePassword
      v-model="state.password"
      class="form__field"
      :placeholder="labels.LOGIN_VIEW.PASSWORD"
      :disabled="isDisabled"
      :validation="validation['password']"
      @input="onInput"
    />

    <div class="form__actions">
      <BaseButton type="submit" :label="labels.LOGIN_VIEW.LOGIN" :disabled="isDisabled" :loading="isLoading" />

      <BaseButton to="signup" theme="success" :label="labels.LOGIN_VIEW.SIGN_UP" :disabled="isDisabled" />
    </div>

    <BaseLink
      class="form__reset-password"
      href="reset-password"
      color="secondary"
      :label="labels.LOGIN_VIEW.RESET_PASSWORD"
      :disabled="isDisabled"
      icon-left="question"
    />
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useValidation } from '@/hooks/useValidation';
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
    BaseInput,
    BasePassword,
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
    const state = reactive({
      login: '',
      password: ''
    });

    const rules = computed(() => {
      return {
        login: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.LOGIN.MIN_LENGTH, validationMessages.LOGIN.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.LOGIN.MAX_LENGTH, validationMessages.LOGIN.MAX_LENGTH),
          allowedCharacters: allowedCharacters(validationMessages.BASE.ALLOWED_CHARACTERS)
        },
        password: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.PASSWORD.MIN_LENGTH, validationMessages.PASSWORD.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.PASSWORD.MAX_LENGTH, validationMessages.PASSWORD.MAX_LENGTH),
          allowedCharacters: allowedCharacters(validationMessages.BASE.ALLOWED_CHARACTERS)
        }
      };
    });

    const validation = useValidation(rules, state);

    const onInput = async () => {
      context.emit('update:model-value', {
        login: state.login,
        password: state.password
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
}
</style>
