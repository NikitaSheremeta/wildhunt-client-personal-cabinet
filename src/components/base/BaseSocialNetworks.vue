<template>
  <div :class="['base-social-networks']">
    <template v-for="(item, index) in state.socialNetworks" :key="index">
      <BaseButton
        :id="`base-social-${item.icon}`"
        class="button"
        icon-button
        theme="transparent"
        color="secondary"
        :to="item.to"
        :icon="item.icon"
        :aria-label="item.icon"
      />

      <BaseTooltip v-if="!isMobileView" :target="`base-social-${item.icon}`" :label="item.label" placement="top" />
    </template>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '@/components/base/BaseButton';
import BaseTooltip from '@/components/base/BaseTooltip';

export default {
  name: 'BaseSocialNetworks',
  components: {
    BaseButton,
    BaseTooltip
  },
  setup() {
    const store = useStore();

    const state = reactive({
      socialNetworks: [
        {
          icon: 'telegram',
          label: 'Читайте нас в Telegram',
          to: '/'
        },
        {
          icon: 'discord',
          label: 'Присоединяйтесь к нам в Discord',
          to: '/'
        },
        {
          icon: 'vk',
          label: 'Подписывайтесь на нас в Вконтакте',
          to: '/'
        },
        {
          icon: 'tiktok',
          label: 'Подписывайтесь на нас в Tiktok',
          to: '/'
        },
        {
          icon: 'instagram',
          label: 'Подписывайтесь на нас в Instagram',
          to: '/'
        },
        {
          icon: 'you-tube',
          label: 'Смотрите нас на YouTube',
          to: '/'
        }
      ]
    });

    const isMobileView = computed(() => store.getters.GET_IS_MOBILE_VIEW);

    return {
      state,
      isMobileView
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
