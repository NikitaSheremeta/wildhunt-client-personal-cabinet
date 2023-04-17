<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <SignupForm
          v-if="flags.shouldDisplaySignupForm"
          ref="signupForm"
          v-model="state.signupFormData"
          :is-loading="flags.isLoading"
          :is-disabled="flags.isDisabled"
          @submit.prevent="onSubmitSignupForm"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useForm } from '@/hooks/useForm';
import { useStore } from 'vuex';
import SignupForm from '@/views/signup/signupForm/SignupForm';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'Signup',
  components: {
    SignupForm
  },
  setup() {
    const signupForm = ref(null);

    const form = useForm(signupForm);

    const store = useStore();

    const state = reactive({
      signupFormData: {}
    });

    const flags = reactive({
      shouldDisplaySignupForm: true,
      isLoading: false,
      isDisabled: false
    });

    const onSubmitSignupForm = async () => {
      form.checkValidity();

      if (form.valid) {
        flags.isLoading = true;
        flags.isDisabled = true;

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
              flags.isLoading = false;
            }, magicNumbers.ONE_THOUSAND_TWO_HUNDRED_MILLISECONDS)()
          );
      }
    };

    return {
      signupForm,
      state,
      flags,
      onSubmitSignupForm,
      labels,
      validationMessages
    };
  }
};
</script>
