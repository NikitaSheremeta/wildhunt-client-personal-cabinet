<template>
  <div class="container">
    <div class="row">
      <transition name="fade-slide-up">
        <form
          v-if="!flags.isHideForm"
          class="form"
          @submit.prevent="onSubmitForm"
        >
          <h2
            class="form__title"
            v-text="labels.LOGIN_VIEW.TITLE"
          />

          <BaseInput
            v-model="data.username"
            class="form__field"
            :placeholder="labels.LOGIN_VIEW.USER_NAME"
            :disabled="flags.isDisabled"
          />

          <BaseInput
            v-model="data.password"
            class="form__field"
            type="password"
            :placeholder="labels.LOGIN_VIEW.PASSWORD"
            :disabled="flags.isDisabled"
          />

          <div class="form__actions">
            <BaseButton
              type="submit"
              :label="labels.LOGIN_VIEW.LOGIN"
              :disabled="flags.isDisabled"
              :loading="flags.isLoading"
            />

            <BaseButton
              to="signup"
              theme="success"
              :label="labels.LOGIN_VIEW.SIGN_UP"
              :disabled="flags.isDisabled"
            />
          </div>

          <BaseLink
            class="form__reset-password"
            href="reset-password"
            color="secondary"
            :label="labels.LOGIN_VIEW.RESET_PASSWORD"
            :disabled="flags.isDisabled"
            icon-left="question"
          />
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '@/components/base/BaseInput';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
// import { required, minLength, maxLength } from '@/helpers/validators';
import { debounce } from '@/helpers/debounce';
// import { validationMessages } from '@/utils/validation-messages';
// import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseLink
  },
  setup() {
    const store = useStore();

    const data = reactive({
      username: '',
      password: ''
    });

    const flags = reactive({
      isLoading: false,
      isDisabled: false,
      isHideForm: false
    });

    // const rules = {
    //   username: {
    //     required: required(validationMessages.LOGIN.REQUIRED_LOGIN_PAGE),
    //     minLength: minLength(magicNumbers.LOGIN.MIN_LENGTH, validationMessages.LOGIN.MIN_LENGTH),
    //     maxLength: maxLength(magicNumbers.LOGIN.MAX_LENGTH, validationMessages.LOGIN.MAX_LENGTH)
    //   },
    //   password: {
    //     required: required(validationMessages.PASSWORD.REQUIRED_LOGIN_PAGE),
    //     minLength: minLength(magicNumbers.PASSWORD.MIN_LENGTH, validationMessages.PASSWORD.MIN_LENGTH),
    //     maxLength: maxLength(magicNumbers.PASSWORD.MAX_LENGTH, validationMessages.PASSWORD.MAX_LENGTH)
    //   }
    // };

    const onSubmitForm = async () => {
      flags.isLoading = true;
      flags.isDisabled = true;

      await store
        .dispatch('LOGIN', data)
        .then((result) => {
          // flags.isHideForm = true;

          if (Object.prototype.hasOwnProperty.call(result, 'error')) {
            debounce(() => console.log(result))();
          }
        })
        .catch((error) => debounce(() => console.log(error))())
        .finally(() => (flags.isLoading = false));
    };

    return {
      data,
      flags,
      labels,
      onSubmitForm
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__title {
    margin: 0;
    font-weight: $font-weight-base;
  }

  &__field {
    margin-top: 16px;

    &:nth-child(2) {
      margin-top: 24px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    gap: 16px;
  }

  &__reset-password {
    margin-top: 16px;
    font-size: $font-size-xs;
  }
}
</style>
