<template>
  <div :class="computedClasses">
    <span v-if="configuration.isShowEmoji" class="emoji">
      {{ emoji }}
    </span>

    <h2 v-if="configuration.isShowTitle" class="title">
      {{ title }}
    </h2>

    <span v-if="configuration.isShowContent" class="content">
      {{ content }}
    </span>

    <BaseButton
      v-if="configuration.isShowButton"
      :color="button.color"
      class="control"
    >
      {{ button.slot }}
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'BaseNotice',
  components: {
    BaseButton
  },
  props: {
    baseClassName: {
      type: String,
      default: 'base-notice'
    },
    signupSuccess: {
      type: Boolean,
      default: false
    },
    signupError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      configuration: {
        isShowEmoji: false,
        isShowTitle: false,
        isShowContent: false,
        isShowButton: false
      },
      status: {
        success: false,
        error: false
      },
      emoji: '',
      title: '',
      content: '',
      button: {
        slot: '',
        color: null
      }
    };
  },
  created() {
    if (this.signupSuccess) {
      this.signupSuccessModifier();
    }

    if (this.signupError) {
      this.signupErrorModifier();
    }
  },
  computed: {
    computedClasses() {
      return [this.baseClassName, this.successModifier, this.errorModifier];
    },
    successModifier() {
      return this.status.success ? 'success' : '';
    },
    errorModifier() {
      return this.status.error ? 'error' : '';
    }
  },
  methods: {
    signupSuccessModifier() {
      for (const key in this.configuration) {
        this.configuration[key] = true;
      }

      this.status.success = true;

      this.emoji = '🥳';
      this.title = 'Вы успешно зарегистрированы!';
      this.content =
        'На указанный почтовый ящик придет письмо, содержащее ссылку для подтверждения адреса.';
      this.button.slot = 'Подтвердить';
      this.button.color = 'success';
    },
    signupErrorModifier() {
      for (const key in this.configuration) {
        this.configuration[key] = true;
      }

      this.status.error = true;

      this.emoji = '💩';
      this.title = 'Вот это поворот';
      this.content =
        'Повторите попытку еще раз или обратитесь в тех. поддержку';
      this.button.slot = 'Повторить';
      this.button.color = 'danger';
    }
  }
};
</script>

<style lang="scss" scoped>
.base-notice {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 96px;
  padding: 32px 0 40px 0;
  width: 320px;
  background-color: $gray-900;
  border-radius: 24px;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    margin: auto;
    top: -64px;
    left: 0;
    right: 0;
    width: 156px;
    height: 156px;
    border-radius: 50%;
    filter: blur(64px);
  }

  &.success {
    &:before {
      background-color: $success;
    }
  }

  &.error {
    &:before {
      background-color: $danger;
    }
  }

  .emoji {
    z-index: 1;
    font-size: $font-size-h1;
  }

  .title {
    z-index: 1;
    padding: 0 24px;
    font-weight: $font-weight-base;
    text-align: center;
  }

  .content {
    z-index: 1;
    padding: 0 24px;
    color: $font-color-secondary;
    text-align: center;
  }

  .control {
    margin-top: 24px;
  }
}
</style>
