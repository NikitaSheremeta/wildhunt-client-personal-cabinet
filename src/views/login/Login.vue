<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <LoginForm
          v-if="flags.shouldDisplayLoginForm"
          ref="loginForm"
          v-model="state.LoginFormData"
          :is-loading="flags.isLoading"
          :is-disabled="flags.isDisabled"
          @submit.prevent="onSubmitLoginForm"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useForm } from '@/hooks/useForm';
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

    const form = useForm(loginForm);

    const store = useStore();

    const state = reactive({
      LoginFormData: {}
    });

    const flags = reactive({
      shouldDisplayLoginForm: true,
      isLoading: false,
      isDisabled: false
    });

    const onSubmitLoginForm = async () => {
      form.checkValidity();

      if (form.valid) {
        flags.isLoading = true;
        flags.isDisabled = true;

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
              flags.isLoading = false;
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
