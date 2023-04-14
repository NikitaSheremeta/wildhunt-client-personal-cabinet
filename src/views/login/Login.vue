<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <form v-if="!flags.isHideForm" class="form" @submit.prevent="onSubmitForm">
          <h2 class="form__title" v-text="labels.LOGIN_VIEW.TITLE" />

          <BaseInput
            v-model="state.login"
            class="form__field"
            :placeholder="labels.LOGIN_VIEW.USER_NAME"
            :disabled="flags.isDisabled"
            :validation="validation['login']"
          />

          <BasePassword
            v-model="state.password"
            class="form__field"
            :placeholder="labels.LOGIN_VIEW.PASSWORD"
            :disabled="flags.isDisabled"
            :validation="validation['password']"
          />

          <div class="form__actions">
            <BaseButton
              type="submit"
              :label="labels.LOGIN_VIEW.LOGIN"
              :disabled="flags.isDisabled"
              :loading="flags.isLoading"
            />

            <BaseButton to="signup" theme="success" :label="labels.LOGIN_VIEW.SIGN_UP" :disabled="flags.isDisabled" />
          </div>

          <BaseLink
            class="form__reset-password"
            href="reset-password"
            color="secondary"
            :label="labels.LOGIN_VIEW.RESET_PASSWORD"
            :disabled="flags.isDisabled"
            icon-left="question"
          />
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useValidation } from '@/hooks/useValidation';
import BaseInput from '@/components/base/BaseInput';
import BasePassword from '@/components/base/BasePassword';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { required, minLength, maxLength } from '@/helpers/validators';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  components: {
    BaseInput,
    BasePassword,
    BaseButton,
    BaseLink
  },
  setup() {
    const store = useStore();

    const state = reactive({
      login: '',
      password: ''
    });

    const flags = reactive({
      isLoading: false,
      isDisabled: false,
      isHideForm: false
    });

    const rules = computed(() => {
      return {
        login: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.LOGIN.MIN_LENGTH, validationMessages.LOGIN.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.LOGIN.MAX_LENGTH, validationMessages.LOGIN.MAX_LENGTH)
        },
        password: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.PASSWORD.MIN_LENGTH, validationMessages.PASSWORD.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.PASSWORD.MAX_LENGTH, validationMessages.PASSWORD.MAX_LENGTH)
        }
      };
    });

    const validation = useValidation(rules, state);

    const onSubmitForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('LOGIN', state)
        .then((result) =>
          debounce(() => {
            flags.isHideForm = true;

            if (Object.prototype.hasOwnProperty.call(result, 'error')) {
              debounce(() => console.log(result))();
            }
          }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)()
        )
        .catch((error) => debounce(() => console.log(error))())
        .finally(() =>
          debounce(() => {
            flags.isLoading = false;
          }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)()
        );
    };

    return {
      state,
      flags,
      validation,
      onSubmitForm,
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
