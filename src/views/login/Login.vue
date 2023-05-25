<template>
  <transition name="fade-slide-up">
    <LoginForm
      v-if="flags.shouldDisplayLoginForm"
      ref="loginForm"
      v-model="state.LoginFormData"
      :loading="flags.loading"
      :disabled="flags.disabled"
      @submit.prevent="onSubmitLoginForm"
    />
  </transition>
</template>

<script>
import { reactive, ref } from 'vue';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useStore } from 'vuex';
import LoginForm from '@/views/login/loginForm/LoginForm';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  setup() {
    const loginForm = ref(null);

    const formValidation = useFormValidation(loginForm);

    const store = useStore();

    const state = reactive({
      LoginFormData: {}
    });

    const flags = reactive({
      shouldDisplayLoginForm: true,
      loading: false,
      disabled: false
    });

    const onSubmitLoginForm = async () => {
      formValidation.checkValidity();

      if (formValidation.valid) {
        flags.loading = true;
        flags.disabled = true;

        await store
          .dispatch('LOGIN', state.LoginFormData)
          .then((result) =>
            debounce(() => {
              flags.shouldDisplayLoginForm = false;

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
      }
    };

    return {
      loginForm,
      state,
      flags,
      onSubmitLoginForm,
      labels
    };
  }
};
</script>
