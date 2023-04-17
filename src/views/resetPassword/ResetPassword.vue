<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <ResetPasswordForm
          v-if="flags.shouldDisplayResetPasswordForm"
          ref="resetPasswordForm"
          v-model="state.resetPasswordForm"
          :loading="flags.loading"
          :disabled="flags.disabled"
          @submit.prevent="onSubmitResetPasswordForm"
        />
      </transition>

      <transition name="fade-slide-up">
        <BaseCaptcha v-if="flags.shouldDisplayCaptcha" @success="onSuccessCaptcha" @close="onCloseCaptcha" />
      </transition>

      <transition name="fade-slide-up">
        <BaseConfirmation v-if="flags.shouldDisplayConfirmation" @close="onCloseConfirmation" />
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useStore } from 'vuex';
import ResetPasswordForm from '@/views/resetPassword/resetPasswordForm/ResetPasswordForm';
import BaseCaptcha from '@/components/base/BaseCaptcha';
import BaseConfirmation from '@/components/base/BaseConfirmation';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'ResetPassword',
  components: {
    ResetPasswordForm,
    BaseCaptcha,
    BaseConfirmation
  },
  setup() {
    const resetPasswordForm = ref(null);

    const resetPasswordFormValidation = useFormValidation(resetPasswordForm);

    const store = useStore();

    const state = reactive({ resetPasswordForm: {} });

    const flags = reactive({
      shouldDisplayResetPasswordForm: true,
      shouldDisplayCaptcha: false,
      shouldDisplayConfirmation: false,
      loading: false,
      disabled: false
    });

    const dispatchForgotPassword = async () => {
      await store
        .dispatch('FORGOT_PASSWORD', state.resetPasswordForm)
        .then((result) =>
          debounce(() => {
            flags.shouldDisplayResetPasswordForm = false;

            if (Object.prototype.hasOwnProperty.call(result, 'error')) {
              debounce(() => console.log(result))();
            }
          }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)()
        )
        .catch((error) =>
          debounce(() => {
            console.log(error);
          })()
        )
        .finally(() =>
          debounce(() => {
            flags.loading = false;
          }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)()
        );
    };

    const onSubmitResetPasswordForm = () => {
      resetPasswordFormValidation.checkValidity();

      if (resetPasswordFormValidation.valid) {
        flags.loading = true;
        flags.disabled = true;

        debounce(() => {
          flags.shouldDisplayResetPasswordForm = false;
        })();

        debounce(() => {
          flags.shouldDisplayCaptcha = true;
        }, magicNumbers.FOUR_HUNDRED_MILLISECONDS)();
      }
    };

    const onSuccessCaptcha = () => {
      dispatchForgotPassword();

      debounce(() => {
        flags.shouldDisplayCaptcha = false;
      })();

      debounce(() => {
        flags.shouldDisplayConfirmation = true;
      }, magicNumbers.FOUR_HUNDRED_MILLISECONDS)();
    };

    const onCloseCaptcha = () => {
      flags.loading = false;
      flags.disabled = false;
      flags.shouldDisplayCaptcha = false;

      debounce(() => {
        flags.shouldDisplayResetPasswordForm = true;
      })();
    };

    const onCloseConfirmation = () => {
      flags.loading = false;
      flags.disabled = false;
      flags.shouldDisplayConfirmation = false;

      debounce(() => {
        flags.shouldDisplayResetPasswordForm = true;
      })();
    };

    return {
      resetPasswordForm,
      state,
      flags,
      onSubmitResetPasswordForm,
      onSuccessCaptcha,
      onCloseCaptcha,
      onCloseConfirmation
    };
  }
};
</script>
