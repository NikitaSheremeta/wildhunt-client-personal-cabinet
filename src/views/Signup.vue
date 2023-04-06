<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <form v-if="!flags.isHideForm" class="form" @submit.prevent="onSubmitForm">
          <h2 class="form__title" v-text="labels.SIGN_UP_VIEW.TITLE" />

          <BaseInput
            v-model="data.username"
            class="form__field"
            type="text"
            :placeholder="labels.SIGN_UP_VIEW.USER_NAME"
            :loading="flags.isLoading"
            :disabled="flags.isDisabled"
            :rules="rules.username"
          />

          <BaseInput
            v-model="data.email"
            class="form__field"
            type="email"
            :placeholder="labels.SIGN_UP_VIEW.EMAIL"
            :disabled="flags.isDisabled"
            :rules="rules.email"
            :debounce-validation="false"
          />

          <BasePassword
            v-model="data.password"
            class="form__field"
            create
            :placeholder="labels.SIGN_UP_VIEW.PASSWORD"
            :disabled="flags.isDisabled"
            :rules="rules.password"
          />

          <div class="form__actions">
            <BaseButton
              full-width
              :label="labels.SIGN_UP_VIEW.SIGN_UP"
              :loading="flags.isLoading"
              :disabled="!state.eula || flags.isDisabled"
            />
          </div>

          <div class="form__eula">
            <BaseCheckbox
              v-model="state.eula"
              color="secondary"
              :label="labels.SIGN_UP_VIEW.EULA"
              :disabled="flags.isDisabled"
            >
              <BaseLink
                underline
                href="terms"
                target="_blank"
                color="secondary"
                :label="labels.SIGN_UP_VIEW.TERMS"
                :disabled="flags.isDisabled"
              />

              <br />и

              <BaseLink
                underline
                href="privacy-policy"
                target="_blank"
                color="secondary"
                :label="labels.SIGN_UP_VIEW.PRIVACY_POLICY"
                :disabled="flags.isDisabled"
              />
            </BaseCheckbox>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script type="module">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '@/components/base/BaseInput';
import BasePassword from '@/components/base/BasePassword';
import BaseButton from '@/components/base/BaseButton';
import BaseCheckbox from '@/components/base/BaseCheckbox';
import BaseLink from '@/components/base/BaseLink';
import { required, minLength, maxLength, email } from '@/helpers/validators';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  components: {
    BaseInput,
    BasePassword,
    BaseButton,
    BaseCheckbox,
    BaseLink
  },
  setup() {
    const store = useStore();

    const data = reactive({
      username: '',
      email: '',
      password: ''
    });

    const state = reactive({ eula: true });

    const flags = reactive({
      isLoading: false,
      isDisabled: false,
      isHideForm: false
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

    const onSubmitForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('SIGNUP', data)
        .then((result) => {
          // flags.isHideForm = true;

          if (Object.prototype.hasOwnProperty.call(result, 'error')) {
            debounce(() => console.log(result))();
          }
        })
        .catch((error) => debounce(() => console.log(error))())
        .finally(() => (flags.isLoading = false));
    };

    return {
      data,
      state,
      flags,
      rules,
      labels,
      validationMessages,
      onSubmitForm
    };
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
