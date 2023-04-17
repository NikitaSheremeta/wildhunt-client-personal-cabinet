<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <LoginForm
          v-if="flags.shouldDisplayLoginForm"
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
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

import LoginForm from '@/views/login/loginForm/LoginForm';

export default {
  components: {
    LoginForm
  },
  setup() {
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
    };

    return {
      state,
      flags,
      onSubmitLoginForm,
      labels
    };
  }
};
</script>
