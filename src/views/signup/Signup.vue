<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <SignupForm
          v-if="state.shouldDisplaySignupForm"
          v-model="data.formData"
          :is-loading="flags.isLoading"
          :is-disabled="flags.isDisabled"
          @submit.prevent="onSubmitSignupForm"
        />
      </transition>

      <transition name="fade-slide-up">
        <BaseNotice
          v-if="state.shouldDisplayNotice"
          success
          :icon="labels.SIGN_UP_VIEW.SUCCESSFULLY_CREATED.ICON"
          :title="labels.SIGN_UP_VIEW.SUCCESSFULLY_CREATED.TITLE"
          :description="labels.SIGN_UP_VIEW.SUCCESSFULLY_CREATED.DESCRIPTION"
        >
          <template #extension>
            <BaseButton
              to="download-launcher"
              theme="success"
              :label="labels.SIGN_UP_VIEW.SUCCESSFULLY_CREATED.SUBMIT"
            />
          </template>
        </BaseNotice>
      </transition>
    </div>
  </div>
</template>

<script type="module">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import SignupForm from '@/views/signup/signupForm/SignupForm';
import BaseButton from '@/components/base/BaseButton';
import BaseNotice from '@/components/base/BaseNotice';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  components: {
    SignupForm,
    BaseButton,
    BaseNotice
  },
  setup() {
    const store = useStore();

    const data = reactive({
      signupFormData: {},
      confirmFormData: {}
    });

    const state = reactive({
      shouldDisplaySignupForm: true,
      shouldDisplayCodeForm: false,
      shouldDisplayNotice: false
    });

    const flags = reactive({
      isLoading: false,
      isDisabled: false
    });

    const onSubmitSignupForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('SIGNUP', data.signupFormData)
        .then((result) =>
          debounce(() => {
            state.shouldDisplaySignupForm = false;

            debounce(() => {
              state.shouldDisplayNotice = true;
            })();

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
      data,
      state,
      flags,
      labels,
      validationMessages,
      onSubmitSignupForm
    };
  }
};
</script>