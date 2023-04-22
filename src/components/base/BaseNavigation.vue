<template>
  <div :class="['base-navigation', classes]">
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="item">
        <BaseLink
          color="secondary"
          :href="item.to"
          :label="item.label"
          :active="route.path === item.to"
          :icon-left="item.icon"
          @click="onClickLink(route.path === item.to, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseLink from '@/components/base/BaseLink';

export default {
  name: 'BaseNavigation',
  components: {
    BaseLink
  },
  props: {
    size: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();

    const classes = computed(() => [props.size ? props.size : '', props.inline ? 'inline' : '']);

    const onClickLink = (active, event) => {
      if (active) {
        return event.preventDefault();
      }
    };

    return {
      route,
      classes,
      onClickLink
    };
  }
};
</script>

<style lang="scss" scoped>
.base-navigation {
  width: 100%;

  .list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    .item {
      margin: 0;
      list-style: none;
    }
  }

  &.xs {
    .list {
      .item {
        line-height: $line-height-secondary;
        font-size: $font-size-xs;
      }
    }
  }

  &.inline {
    .list {
      flex-direction: row;
      gap: 32px;
    }
  }
}
</style>
