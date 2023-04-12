<template>
  <form class="form">
    <h2
      class="form__title"
      v-text="labels.SIGN_UP_VIEW.TITLE"
    />

    <BaseInput
      v-model="data.username"
      class="form__field"
      type="text"
      :placeholder="labels.SIGN_UP_VIEW.USER_NAME"
      :disabled="isDisabled"
      @input="onInput"
    />

    <BaseInput
      v-model="data.email"
      class="form__field"
      type="email"
      :placeholder="labels.SIGN_UP_VIEW.EMAIL"
      :disabled="isDisabled"
      @input="onInput"
    />

    <BasePassword
      v-model="data.password"
      class="form__field"
      create
      :placeholder="labels.SIGN_UP_VIEW.PASSWORD"
      :disabled="isDisabled"
      @input="onInput"
    />

    <BasePassword
      v-model="state.confirmationPassword"
      class="form__field"
      :placeholder="labels.SIGN_UP_VIEW.CONFIRMATION_PASSWORD"
      :disabled="isDisabled"
    />

    <div class="form__actions">
      <BaseButton
        full-width
        :label="labels.SIGN_UP_VIEW.SIGN_UP"
        :loading="isLoading"
        :disabled="!state.eula || isDisabled"
      />
    </div>

    <div class="form__eula">
      <BaseCheckbox
        v-model="state.eula"
        color="secondary"
        :label="labels.SIGN_UP_VIEW.EULA"
        :disabled="isDisabled"
      >
        <BaseLink
          underline
          href="terms"
          target="_blank"
          color="secondary"
          :label="labels.SIGN_UP_VIEW.TERMS"
          :disabled="isDisabled"
        />

        <br>и

        <BaseLink
          underline
          href="privacy-policy"
          target="_blank"
          color="secondary"
          :label="labels.SIGN_UP_VIEW.PRIVACY_POLICY"
          :disabled="isDisabled"
        />
      </BaseCheckbox>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue';
import BaseInput from '@/components/base/BaseInput';
import BasePassword from '@/components/base/BasePassword';
import BaseButton from '@/components/base/BaseButton';
import BaseCheckbox from '@/components/base/BaseCheckbox';
import BaseLink from '@/components/base/BaseLink';
import { email, maxLength, minLength, required } from '@/helpers/validators';
import { labels } from '@/utils/labels';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  components: {
    BaseInput,
    BasePassword,
    BaseButton,
    BaseCheckbox,
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
  emits: ['update:modelValue'],
  setup(props, context) {
    const data = reactive({
      username: '',
      email: '',
      password: ''
    });

    const state = reactive({
      confirmationPassword: '',
      eula: true
    });

    const rules = {
      username: {
        required: required(validationMessages.LOGIN.REQUIRED),
        minLength: minLength(magicNumbers.LOGIN.MIN_LENGTH, validationMessages.LOGIN.MIN_LENGTH),
        maxLength: maxLength(magicNumbers.LOGIN.MAX_LENGTH, validationMessages.LOGIN.MAX_LENGTH)
      },
      email: {
        required: required(validationMessages.EMAIL.REQUIRED),
        email: email(validationMessages.EMAIL.INCORRECT)
      },
      password: {
        required: required(validationMessages.PASSWORD.REQUIRED_LOGIN_PAGE),
        minLength: minLength(magicNumbers.PASSWORD.MIN_LENGTH, validationMessages.PASSWORD.MIN_LENGTH),
        maxLength: maxLength(magicNumbers.PASSWORD.MAX_LENGTH, validationMessages.PASSWORD.MAX_LENGTH)
      },
      repeatPassword: {
        required: required(validationMessages.CONFIRM_PASSWORD.REQUIRED)
      }
    };

    const onInput = async () => {
      context.emit('update:modelValue', data);
    };

    return { data, state, rules, labels, onInput };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__title {
    margin-top: 0;
    font-weight: $font-weight-base;
  }

  &__field {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__eula {
    margin-top: 16px;
  }
}
</style>
