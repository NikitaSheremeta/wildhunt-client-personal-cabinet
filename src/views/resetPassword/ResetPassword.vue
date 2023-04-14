<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <form v-if="!flags.isHideForm" class="form" @submit.prevent="onSubmitForm">
          <h2 class="form__title" v-text="labels.RESET_PASSWORD_VIEW.TITLE" />

          <p class="form__description" v-text="labels.RESET_PASSWORD_VIEW.DESCRIPTION" />

          <BaseInput
            v-model="state.email"
            class="form__field"
            type="email"
            :placeholder="labels.RESET_PASSWORD_VIEW.EMAIL"
            :disabled="flags.isDisabled"
            :validation="validation['email']"
          />

          <div class="form__actions">
            <BaseButton
              type="submit"
              full-width
              :label="labels.RESET_PASSWORD_VIEW.SUBMIT"
              :disabled="flags.isDisabled"
              :loading="flags.isLoading"
            />
          </div>

          <BaseLink
            class="form__account-recover"
            href="support"
            color="secondary"
            :label="labels.RESET_PASSWORD_VIEW.ACCOUNT_RECOVER"
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
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { email, required } from '@/helpers/validators';
import { debounce } from '@/helpers/debounce';
import { labels } from '@/utils/labels';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseLink
  },
  setup() {
    const store = useStore();

    const state = reactive({ email: '' });

    const flags = reactive({
      isLoading: false,
      isDisabled: false,
      isHideForm: false
    });

    const rules = computed(() => {
      return {
        email: {
          required: required(validationMessages.EMAIL.REQUIRED),
          email: email(validationMessages.EMAIL.INCORRECT)
        }
      };
    });

    const validation = useValidation(rules, state);

    const onSubmitForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('FORGOT_PASSWORD', state)
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
