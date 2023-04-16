<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <SignupForm
          v-if="!flags.shouldDisplaySignupForm"
          v-model="state.signupFormData"
          :is-loading="flags.isLoading"
          :is-disabled="flags.isDisabled"
          @submit.prevent="onSubmitSignupForm"
        />
      </transition>

      <transition name="fade-slide-up">
        <BaseCaptcha v-if="flags.shouldDisplayCaptcha" v-model="flags.isCaptchaValid" @close="onCloseCaptcha" />
      </transition>

      <transition name="fade-slide-up">
        <BaseCode />
      </transition>

      <transition name="fade-slide-up">
        <BaseNotice
          v-if="flags.shouldDisplayNotice"
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
import BaseCaptcha from '@/components/base/BaseCaptcha';
import BaseCode from '@/components/base/BaseCode';
import BaseNotice from '@/components/base/BaseNotice';
import BaseButton from '@/components/base/BaseButton';
import { debounce } from '@/helpers/debounce';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  components: {
    SignupForm,
    BaseCaptcha,
    BaseCode,
    BaseNotice,
    BaseButton
  },
  setup() {
    const store = useStore();

    const state = reactive({
      signupFormData: {},
      confirmationFormData: {}
    });

    const flags = reactive({
      shouldDisplaySignupForm: true,
      shouldDisplayCaptcha: false,
      shouldDisplayNotice: false,
      isCaptchaValid: false,
      isLoading: false,
      isDisabled: false
    });

    const onSubmitSignupForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('SIGNUP', state.signupFormData)
        .then((result) =>
          debounce(() => {
            flags.shouldDisplaySignupForm = false;

            debounce(() => {
              // state.shouldDisplayNotice = true;
              flags.shouldDisplayCaptcha = true;
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

    const onCloseCaptcha = () => {
      flags.shouldDisplayCaptcha = false;

      debounce(() => {
        flags.shouldDisplaySignupForm = true;
        flags.isLoading = false;
        flags.isDisabled = false;
      })();
    };

    return {
      state,
      flags,
      onSubmitSignupForm,
      onCloseCaptcha,
      labels,
      validationMessages
    };
  }
};
</script>
