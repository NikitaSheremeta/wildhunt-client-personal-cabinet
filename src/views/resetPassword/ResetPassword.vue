<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <ResetPasswordForm
          v-if="flags.shouldDisplayResetPasswordForm"
          ref="resetPasswordForm"
          v-model="state.resetPasswordForm"
          :is-loading="flags.isLoading"
          :is-disabled="flags.isDisabled"
          @submit.prevent="onSubmitResetPasswordForm"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useForm } from '@/hooks/useForm';
import { useStore } from 'vuex';
import ResetPasswordForm from '@/views/resetPassword/resetPasswordForm/ResetPasswordForm';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'ResetPassword',
  components: {
    ResetPasswordForm
  },
  setup() {
    const resetPasswordForm = ref(null);

    const form = useForm(resetPasswordForm);

    const store = useStore();

    const state = reactive({ resetPasswordForm: {} });

    const flags = reactive({
      shouldDisplayResetPasswordForm: true,
      isLoading: false,
      isDisabled: false
    });

    const onSubmitResetPasswordForm = async () => {
      form.checkValidity();

      if (form.valid) {
        flags.isLoading = true;
        flags.isDisabled = true;

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
              flags.isLoading = false;
            }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)()
          );
      }
    };

    return {
      resetPasswordForm,
      state,
      flags,
      onSubmitResetPasswordForm
    };
  }
};
</script>
