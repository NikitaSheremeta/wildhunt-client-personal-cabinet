<template>
  <form class="form">
    <BaseTitle title="Техническая поддржка" />

    <BaseInput
      v-model="state.email"
      class="form__field"
      placeholder="Электронная почта"
      :disabled="disabled"
      trim
      @input="onInput"
    />

    <BaseInput
      v-model="state.topic"
      class="form__field"
      placeholder="Заголовок темы"
      :disabled="disabled"
      @input="onInput"
    />

    <div class="form__eula">
      <BaseCheckbox v-model="flags.eula" color="secondary" label="Я принимаю" :disabled="disabled">
        <BaseLink
          underline
          href="terms"
          target="_blank"
          color="secondary"
          label="условия предоставления технической поддержки"
          :disabled="disabled"
        />
      </BaseCheckbox>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue';
import BaseTitle from '@/components/base/BaseTitle';
import BaseInput from '@/components/base/BaseInput';
import BaseCheckbox from '@/components/base/BaseCheckbox';
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'SupportForm',
  components: {
    BaseTitle,
    BaseInput,
    BaseCheckbox,
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
    const state = reactive({
      email: '',
      topic: ''
    });

    const flags = reactive({
      eula: true
    });

    const onInput = () => {
      context.emit('update:model-value', {
        topic: state.topic
      });
    };

    return {
      state,
      flags,
      onInput
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: map-get($container-width, 'xs');

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
    margin-top: 24px;
  }

  &__eula {
    margin-top: 16px;
  }
}
</style>
