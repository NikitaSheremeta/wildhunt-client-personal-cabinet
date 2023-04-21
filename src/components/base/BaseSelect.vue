<template>
  <div :class="['base-select', classes]" :tabindex="tabindex" @blur="onBlur">
    <div class="select" @click="onClickSelect">
      {{ state.selected }}

      <BaseIcon class="icon" icon="chevron-bottom" color="secondary" />
    </div>

    <div class="list">
      <div v-for="(value, index) of options" :key="index" class="item" @click="onClickListItem(value)" v-text="value" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'BaseSelect',
  components: {
    BaseIcon
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  emits: ['input'],
  setup(props, context) {
    const state = reactive({
      selected: props.options.length > 0 ? props.options[0] : ''
    });

    const flags = reactive({
      open: false
    });

    const classes = computed(() => [flags.open ? 'open' : '']);

    const onBlur = () => {
      flags.open = false;
    };

    const onClickSelect = () => {
      flags.open = !flags.open;
    };

    const onClickListItem = (option) => {
      state.selected = option;
      flags.open = false;
      context.emit('input', option);
    };

    onMounted(() => {
      context.emit('input', state.selected);
    });

    return {
      state,
      flags,
      classes,
      onBlur,
      onClickSelect,
      onClickListItem
    };
  }
};
</script>

<style lang="scss" scoped>
.base-select {
  display: block;
  position: relative;
  width: 100%;
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  font-style: normal;

  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $font-color-secondary;
    cursor: pointer;
    user-select: none;
    @include field;
  }

  .list {
    z-index: 9;
    display: none;
    position: absolute;
    width: 100%;
    background-color: $field-background;
    border-bottom-left-radius: $field-border-radius;
    border-bottom-right-radius: $field-border-radius;

    .item {
      padding: 6px 24px;
      color: $font-color-base;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: $field-background-hover;
      }
    }
  }

  &.open {
    .select {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .icon {
        transform: rotate(180deg);
      }
    }

    .list {
      display: block;
    }
  }
}
</style>
