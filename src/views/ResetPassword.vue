<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <form v-if="!flags.isHideForm" class="form" @submit.prevent="onSubmitForm">
          <h2 class="form__title" v-text="labels.RESET_PASSWORD_VIEW.TITLE" />

          <p class="form__description" v-text="labels.RESET_PASSWORD_VIEW.DESCRIPTION" />

          <BaseInput
            v-model="data.email"
            class="form__field"
            type="text"
            :placeholder="labels.RESET_PASSWORD_VIEW.EMAIL"
            :disabled="flags.isDisabled"
            :rules="rules.email"
          />

          <div class="form__actions">
            <BaseButton
              full-width
              type="submit"
              :label="labels.RESET_PASSWORD_VIEW.SUBMIT"
              :disabled="flags.isDisabled"
              :loading="flags.isLoading"
            />
          </div>

          <BaseLink
            class="form__account-recover"
            href="support"
            color="secondary"
            icon-left="question"
            :label="labels.RESET_PASSWORD_VIEW.ACCOUNT_RECOVER"
            :disabled="flags.isDisabled"
          />
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { labels } from '@/utils/labels';
import { email, required } from '@/helpers/validators';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseLink
  },
  setup() {
    const store = useStore();

    const data = reactive({ email: '' });

    const flags = reactive({
      isLoading: false,
      isDisabled: false,
      isHideForm: false
    });

    const rules = {
      email: {
        required: required(validationMessages.EMAIL.REQUIRED),
        email: email(validationMessages.EMAIL.INCORRECT)
      }
    };

    const onSubmitForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('FORGOT_PASSWORD', data)
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
      flags,
      rules,
      labels,
      onSubmitForm
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
    color: $font-color-secondary;
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
