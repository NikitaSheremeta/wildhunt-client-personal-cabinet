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
        <BaseCaptcha
          v-if="flags.shouldDisplayCaptcha"
          :disabled="flags.disabled"
          @success="onSuccessCaptcha"
          @close="onCloseCaptcha"
        />
      </transition>

      <transition name="fade-slide-up">
        <BaseConfirmation
          v-if="flags.shouldDisplayConfirmation"
          :disabled="flags.disabled"
          @close="onCloseConfirmation"
        />
      </transition>

      <transition name="fade-slide-up">
        <NewPasswordForm
          v-if="flags.shouldDisplayNewPasswordForm"
          ref="newPasswordForm"
          :loading="flags.loading"
          :disabled="flags.disabled"
          @submit.prevent="onSubmitNewPasswordForm"
          @close="onCloseNewPasswordForm"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useStore } from 'vuex';
import ResetPasswordForm from '@/views/resetPassword/resetPasswordForm/ResetPasswordForm';
import BaseCaptcha from '@/components/base/BaseCaptcha';
import BaseConfirmation from '@/components/base/BaseConfirmation';
import NewPasswordForm from '@/views/resetPassword/newPasswordForm/NewPasswordForm';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'ResetPassword',
  components: {
    ResetPasswordForm,
    BaseCaptcha,
    BaseConfirmation,
    NewPasswordForm
  },
  setup() {
    const resetPasswordForm = ref(null);
    const newPasswordForm = ref(null);

    const resetPasswordFormValidation = useFormValidation(resetPasswordForm);
    const newPasswordFormValidation = useFormValidation(newPasswordForm);

    const store = useStore();

    const state = reactive({ resetPasswordForm: {} });

    const flags = reactive({
      shouldDisplayResetPasswordForm: false,
      shouldDisplayCaptcha: false,
      shouldDisplayConfirmation: false,
      shouldDisplayNewPasswordForm: false,
      shouldDisplayErrorNotice: false,
      shouldDisplaySuccessNotice: false,
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
          flags.loading = false;
          flags.disabled = false;

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
        flags.shouldDisplayNewPasswordForm = true;
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

    const onSubmitNewPasswordForm = () => {
      newPasswordFormValidation.checkValidity();

      if (newPasswordFormValidation.valid) {
        flags.loading = true;
        flags.disabled = true;

        debounce(() => {
          flags.shouldDisplayNewPasswordForm = false;
        })();
      }
    };

    const onCloseNewPasswordForm = () => {
      flags.loading = false;
      flags.disabled = false;
      flags.shouldDisplayNewPasswordForm = false;

      debounce(() => {
        flags.shouldDisplayResetPasswordForm = true;
      })();
    };

    onMounted(() => {
      const storageNewPassword = localStorage.getItem('newPassword');

      if (storageNewPassword) {
        flags.shouldDisplayNewPasswordForm = true;
      }

      if (!storageNewPassword) {
        flags.shouldDisplayResetPasswordForm = true;
      }
    });

    return {
      resetPasswordForm,
      newPasswordForm,
      state,
      flags,
      onSubmitResetPasswordForm,
      onSuccessCaptcha,
      onCloseCaptcha,
      onCloseConfirmation,
      onSubmitNewPasswordForm,
      onCloseNewPasswordForm
    };
  }
};
</script>
