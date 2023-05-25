<template>
  <form class="form">
    <BaseTitle :title="labels.SUPPORT_VIEW.TITLE" />

    <BaseInput
      v-model="state.login"
      class="form__field"
      name="topic"
      :placeholder="labels.SUPPORT_VIEW.LOGIN"
      :disabled="disabled"
      trim
      :validation="fieldsValidation['login']"
      @input="onInput"
    />

    <BaseInput
      v-model="state.topic"
      class="form__field"
      name="topic"
      :placeholder="labels.SUPPORT_VIEW.TOPIC"
      :disabled="disabled"
      :validation="fieldsValidation['topic']"
      @input="onInput"
    />

    <BaseSelect
      v-model="state.category"
      class="form__field"
      :options="labels.SUPPORT_VIEW.CATEGORY_OPTIONS"
      :placeholder="labels.SUPPORT_VIEW.CATEGORY"
      :disabled="disabled"
      :validation="fieldsValidation['category']"
    />

    <BaseFile v-model="state.file" class="form__field" :placeholder="labels.SUPPORT_VIEW.FILE" :disabled="disabled" />

    <BaseInput
      v-model="state.message"
      class="form__field"
      textarea
      name="message"
      :placeholder="labels.SUPPORT_VIEW.MESSAGE"
      :disabled="disabled"
      :validation="fieldsValidation['message']"
      disable-success-icon
    />

    <div class="form__actions">
      <BaseButton
        type="submit"
        class="button"
        :label="labels.SUPPORT_VIEW.SUBMIT"
        :disabled="disabled"
        :loading="loading"
      />

      <BaseLink
        class="link"
        underline
        href="terms-support"
        color="secondary"
        :label="labels.SUPPORT_VIEW.TERMS_SUPPORT"
        :disabled="disabled"
      />
    </div>
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useFieldsValidation } from '@/hooks/useFieldsValidation';
import BaseTitle from '@/components/base/BaseTitle';
import BaseInput from '@/components/base/BaseInput';
import BaseFile from '@/components/base/BaseFile';
import BaseSelect from '@/components/base/BaseSelect';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';
import { maxLength, minLength, required } from '@/helpers/validators';
import { validationMessages } from '@/utils/validation-messages';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export default {
  name: 'SupportForm',
  components: {
    BaseTitle,
    BaseInput,
    BaseFile,
    BaseSelect,
    BaseButton,
    BaseLink
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:model-value'],
  setup(props, context) {
    const route = useRoute();

    const state = reactive({
      login: '',
      topic: '',
      category: route.params.category ?? '',
      file: null,
      message: ''
    });

    const rules = computed(() => {
      return {
        login: {
          required: required(validationMessages.BASE.REQUIRED),
          maxLength: maxLength(magicNumbers.LOGIN_OR_EMAIL.MAX_LENGTH, validationMessages.LOGIN_OR_EMAIL.MAX_LENGTH)
        },
        topic: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.TOPIC.MIN_LENGTH, validationMessages.TOPIC.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.TOPIC.MAX_LENGTH, validationMessages.TOPIC.MAX_LENGTH)
        },
        category: {
          required: required(validationMessages.BASE.REQUIRED)
        },
        message: {
          required: required(validationMessages.BASE.REQUIRED),
          minLength: minLength(magicNumbers.MESSAGE.MIN_LENGTH, validationMessages.MESSAGE.MIN_LENGTH),
          maxLength: maxLength(magicNumbers.MESSAGE.MAX_LENGTH, validationMessages.MESSAGE.MAX_LENGTH)
        }
      };
    });

    const fieldsValidation = useFieldsValidation(rules, state);

    const onInput = () => {
      context.emit('update:model-value', {
        topic: state.topic
      });
    };

    return {
      state,
      fieldsValidation,
      onInput,
      labels
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 448px;

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
    gap: 16px;
    margin-top: 24px;

    .link {
      margin-bottom: 2px;
      font-size: $font-size-xs;
    }
  }

  @include media-breakpoint-down(xxs) {
    width: 100%;

    &__actions {
      flex-direction: column;
      align-items: inherit;

      .button {
        width: 100%;
      }
    }
  }
}
</style>
