<template>
  <div :class="['base-social-networks', classes]">
    <template v-for="(item, index) in state.socialNetworks" :key="index">
      <BaseButton class="link" icon-button :icon="item.icon" :icon-size="iconSize" theme="transparent" />
    </template>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'BaseSocialNetworks',
  components: {
    BaseButton
  },
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const state = reactive({
      socialNetworks: [
        {
          icon: 'discord',
          to: '/'
        },
        {
          icon: 'telegram',
          to: '/'
        },
        {
          icon: 'vk',
          to: '/'
        },
        {
          icon: 'tiktok',
          to: '/'
        },
        {
          icon: 'instagram',
          to: '/'
        },
        {
          icon: 'you-tube',
          to: '/'
        },
        {
          icon: 'envelope',
          to: '/'
        }
      ]
    });

    const classes = computed(() => [props.small ? 'small' : '']);

    const iconSize = computed(() => (props.small ? '20' : '24'));

    return {
      state,
      classes,
      iconSize
    };
  }
};
</script>

<style lang="scss" scoped>
.base-social-networks {
  display: flex;
  gap: 12px;
  width: 100%;
}
</style>
