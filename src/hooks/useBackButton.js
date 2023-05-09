import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export function useBackButton() {
  const store = useStore();

  const router = useRouter();

  const routingHistory = computed(() => store.getters.GET_HISTORY);

  return async function () {
    if (routingHistory.value.length) {
      const previousRoutePath = routingHistory.value[routingHistory.value.length - 1];

      let previousRouteName = '';

      router.options.routes.forEach((item) => {
        if (previousRoutePath === item.path) {
          previousRouteName = item.name;
        }
      });

      await router.push({
        name: previousRouteName,
        params: {
          back: 'true'
        }
      });

      await store.dispatch('SIDE_MENU_ACTIVE', false);
      await store.dispatch('REMOVE_HISTORY_ITEM');
    }
  };
}
