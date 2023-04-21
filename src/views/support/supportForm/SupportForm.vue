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

    <BaseSelect
      v-model="state.category"
      class="form__field"
      :options="[
        'Выбирете категорию вашего обращения',
        'Проблема со входом в аккаунт',
        'Кража аккаунта',
        'Обжалование бана',
        'Сообщить о баге'
      ]"
      :default="'go'"
    />

    <div class="form__actions">
      <BaseButton label="Отправить" :disabled="disabled" :loading="loading" />

      <BaseLink
        class="link"
        underline
        href="terms-support"
        color="secondary"
        label="условия предоставления технической поддержки"
        :disabled="disabled"
      />
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue';
import BaseTitle from '@/components/base/BaseTitle';
import BaseInput from '@/components/base/BaseInput';
import BaseSelect from '@/components/base/BaseSelect';
import BaseButton from '@/components/base/BaseButton';
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'SupportForm',
  components: {
    BaseTitle,
    BaseInput,
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
    const state = reactive({
      email: '',
      topic: '',
      category: ''
    });

    const onInput = () => {
      context.emit('update:model-value', {
        topic: state.topic
      });
    };

    return {
      state,
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
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 24px;

    .link {
      margin-bottom: 2px;
      font-size: $font-size-sm;
      line-height: $line-height-secondary;
    }
  }
}
</style>
