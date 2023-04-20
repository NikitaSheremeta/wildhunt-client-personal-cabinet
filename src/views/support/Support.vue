<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <SupportForm
          v-if="flags.shouldDisplaySupportForm"
          ref="supportForm"
          v-model="state.supportFormData"
          :loading="flags.loading"
          :disabled="flags.disabled"
          @submit.prevent="onSubmitSupportForm"
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
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useStore } from 'vuex';
import SupportForm from '@/views/support/supportForm/SupportForm';
import BaseCaptcha from '@/components/base/BaseCaptcha';
import { debounce } from '@/helpers/debounce';
import { magicNumbers } from '@/utils/magic-numbers';

export default {
  name: 'Support',
  components: {
    SupportForm,
    BaseCaptcha
  },
  setup() {
    const supportForm = ref(null);

    const supportFormValidation = useFormValidation(supportForm);

    const store = useStore();

    const state = reactive({
      supportFormData: {}
    });

    const flags = reactive({
      shouldDisplaySupportForm: true,
      shouldDisplayCaptcha: false,
      loading: false,
      disabled: false
    });

    const dispatchSupport = async () => {
      await store
        .dispatch('SUPPORT', state.supportFormData)
        .then((result) =>
          debounce(() => {
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

    const onSubmitSupportForm = () => {
      supportFormValidation.checkValidity();

      if (supportFormValidation.valid) {
        flags.loading = true;
        flags.disabled = true;

        debounce(() => {
          flags.shouldDisplaySupportForm = false;
        })();

        debounce(() => {
          flags.loading = false;
          flags.disabled = false;

          flags.shouldDisplayCaptcha = true;
        }, magicNumbers.FOUR_HUNDRED_MILLISECONDS)();
      }
    };

    const onSuccessCaptcha = () => {
      dispatchSupport();

      debounce(() => {
        flags.shouldDisplayCaptcha = false;
      })();
    };

    const onCloseCaptcha = () => {
      flags.loading = false;
      flags.disabled = false;
      flags.shouldDisplayCaptcha = false;

      debounce(() => {
        flags.shouldDisplaySupportForm = true;
      })();
    };

    return {
      supportForm,
      state,
      flags,
      onSubmitSupportForm,
      onSuccessCaptcha,
      onCloseCaptcha
    };
  }
};
</script>
