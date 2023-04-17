<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <SignupForm
          v-if="flags.shouldDisplaySignupForm"
          ref="signupForm"
          v-model="state.signupFormData"
          :loading="flags.loading"
          :disabled="flags.disabled"
          @submit.prevent="onSubmitSignupForm"
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
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useStore } from 'vuex';
import SignupForm from '@/views/signup/signupForm/SignupForm';
import BaseCaptcha from '@/components/base/BaseCaptcha';
import BaseConfirmation from '@/components/base/BaseConfirmation';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'Signup',
  components: {
    SignupForm,
    BaseCaptcha,
    BaseConfirmation
  },
  setup() {
    const signupForm = ref(null);

    const formValidation = useFormValidation(signupForm);

    const store = useStore();

    const state = reactive({
      signupFormData: {}
    });

    const flags = reactive({
      shouldDisplaySignupForm: true,
      shouldDisplayCaptcha: false,
      shouldDisplayConfirmation: false,
      loading: false,
      disabled: false
    });

    const dispatchSignup = async () => {
      await store
        .dispatch('SIGNUP', state.signupFormData)
        .then((result) =>
          debounce(() => {
            flags.shouldDisplaySignupForm = false;

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

    const onSubmitSignupForm = async () => {
      formValidation.checkValidity();

      if (formValidation.valid) {
        flags.loading = true;
        flags.disabled = true;

        debounce(() => {
          flags.shouldDisplaySignupForm = false;
        })();

        debounce(() => {
          flags.loading = false;
          flags.disabled = false;

          flags.shouldDisplayCaptcha = true;
        }, magicNumbers.FOUR_HUNDRED_MILLISECONDS)();
      }
    };

    const onSuccessCaptcha = () => {
      dispatchSignup();

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
        flags.shouldDisplaySignupForm = true;
      })();
    };

    const onCloseConfirmation = () => {
      flags.loading = false;
      flags.disabled = false;
      flags.shouldDisplayConfirmation = false;

      debounce(() => {
        flags.shouldDisplaySignupForm = true;
      })();
    };

    return {
      signupForm,
      state,
      flags,
      onSubmitSignupForm,
      onSuccessCaptcha,
      onCloseCaptcha,
      onCloseConfirmation,
      labels,
      validationMessages
    };
  }
};
</script>
