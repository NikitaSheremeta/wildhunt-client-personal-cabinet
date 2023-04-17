<template>
  <form class="form">
    <h2 class="form__title" v-text="labels.SIGN_UP_VIEW.TITLE" />

    <BaseInput
      v-model="state.username"
      class="form__field"
      :placeholder="labels.SIGN_UP_VIEW.USER_NAME"
      :disabled="disabled"
      :validation="fieldsValidation['username']"
      @input="onInput"
    />

    <BaseInput
      v-model="state.email"
      class="form__field"
      type="email"
      :placeholder="labels.SIGN_UP_VIEW.EMAIL"
      :disabled="disabled"
      :validation="fieldsValidation['email']"
      @input="onInput"
    />

    <BasePassword
      v-model="state.password"
      class="form__field"
      create
      :placeholder="labels.SIGN_UP_VIEW.PASSWORD"
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
      <BaseButton
        full-width
        :label="labels.SIGN_UP_VIEW.SIGN_UP"
        :disabled="!flags.eula || disabled"
        :loading="loading"
      />
    </div>

    <div class="form__eula">
      <BaseCheckbox v-model="flags.eula" color="secondary" :label="labels.SIGN_UP_VIEW.EULA" :disabled="disabled">
        <BaseLink
          underline
          href="terms"
          target="_blank"
          color="secondary"
          :label="labels.SIGN_UP_VIEW.TERMS"
          :disabled="disabled"
        />

        <br />и

        <BaseLink
          underline
          href="privacy-policy"
          target="_blank"
          color="secondary"
          :label="labels.SIGN_UP_VIEW.PRIVACY_POLICY"
          :disabled="disabled"
        />
      </BaseCheckbox>
    </div>
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useFieldsValidation } from '@/hooks/useFieldsValidation';
import BaseInput from '@/components/base/BaseInput';
import BasePassword from '@/components/base/BasePassword';
import BaseButton from '@/components/base/BaseButton';
import BaseCheckbox from '@/components/base/BaseCheckbox';
import BaseLink from '@/components/base/BaseLink';
import { allowedCharacters, email, maxLength, minLength, required, sameAs } from '@/helpers/validators';
import { labels } from '@/utils/labels';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'SignupForm',
  components: {
    BaseInput,
    BasePassword,
    BaseButton,
    BaseCheckbox,
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
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });

    const flags = reactive({
      eula: true
    });

    const rules = computed(() => {
      return {
        username: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.LOGIN.MIN_LENGTH, validationMessages.LOGIN.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.LOGIN.MAX_LENGTH, validationMessages.LOGIN.MAX_LENGTH),
          allowedCharacters: allowedCharacters(validationMessages.BASE.ALLOWED_CHARACTERS)
        },
        email: {
          required: required(validationMessages.BASE.REQUIRED),
          email: email(validationMessages.EMAIL.INCORRECT)
        },
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

    const onInput = () => {
      context.emit('update:model-value', {
        username: state.username,
        email: state.email,
        password: state.password
      });
    };

    return {
      state,
      flags,
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

  &__title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  &__field {
    margin-top: 16px;

    &:nth-child(2) {
      margin-top: 24px;
    }

    &:nth-child(5) {
      margin-top: 8px;
    }
  }

  &__actions {
    margin-top: 24px;
  }

  &__eula {
    margin-top: 16px;
  }
}
</style>
