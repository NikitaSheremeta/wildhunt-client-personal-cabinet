<template>
  <div :class="['base-social-networks']">
    <template v-for="(item, index) in state.socialNetworks" :key="index">
      <BaseButton class="button" icon-button theme="transparent" color="secondary" :to="item.to" :icon="item.icon" />
    </template>
  </div>
</template>

<script>
import { reactive } from 'vue';
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'BaseSocialNetworks',
  components: {
    BaseButton
  },
  setup() {
    const state = reactive({
      socialNetworks: [
        {
          icon: 'telegram',
          to: '/'
        },
        {
          icon: 'discord',
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
        }
      ]
    });

    return {
      state
    };
  }
};
</script>

<style lang="scss" scoped>
.base-social-networks {
  display: flex;
  gap: 24px;
  width: 100%;

  .button {
    width: 24px;
  }
}
</style>
