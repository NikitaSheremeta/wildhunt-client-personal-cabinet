<template>
  <a :class="['base-link', classes]" :href="href" :target="target">
    <BaseIcon v-if="iconLeft" :icon="iconLeft" />

    <span v-if="label" v-text="label" />

    <BaseIcon v-if="iconRight" :icon="iconRight" />
  </a>
</template>

<script>
import { computed } from 'vue';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'BaseLink',
  components: {
    BaseIcon
  },
  props: {
    label: {
      type: [String, null],
      default: null
    },
    href: {
      type: [String, null],
      default: null
    },
    target: {
      type: [String, null],
      default: null
    },
    underline: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: [String, null],
      default: null
    },
    iconRight: {
      type: [String, null],
      default: null
    }
  },
  setup(props) {
    const classes = computed(() => [
      props.underline ? 'underline' : '',
      props.color ? props.color : '',
      props.disabled ? 'disabled' : '',
      props.iconLeft ? 'icon-left' : '',
      props.iconRight ? 'icon-right' : ''
    ]);

    return { classes };
  }
};
</script>

<style lang="scss" scoped>
$color-palette: (
  primary: (
    color: $font-color-base
  ),
  secondary: (
    color: $font-color-secondary
  ),
  disabled: (
    color: $disabled-color
  )
);

.base-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  .base-icon {
    transition: 0.2s;
  }

  &.primary {
    color: map-get($color-palette, primary, color);

    &:hover {
      color: map-get($color-palette, secondary, color);

      .base-icon {
        fill: map-get($color-palette, secondary, color);
        stroke: map-get($color-palette, secondary, color);
      }
    }
  }

  &.secondary {
    color: map-get($color-palette, secondary, color);

    .base-icon {
      fill: map-get($color-palette, secondary, color);
      stroke: map-get($color-palette, secondary, color);
    }

    &:hover {
      color: map-get($color-palette, primary, color);

      .base-icon {
        fill: map-get($color-palette, primary, color);
        stroke: map-get($color-palette, primary, color);
      }
    }
  }

  &.disabled {
    pointer-events: none;
    color: map-get($color-palette, disabled, color);

    .base-icon {
      fill: map-get($color-palette, disabled, color);
      stroke: map-get($color-palette, disabled, color);
    }
  }

  &.underline {
    text-decoration: underline;
  }

  &.icon-left {
    .base-icon {
      margin-right: 8px;
    }
  }

  &.icon-right {
    .base-icon {
      margin-left: 8px;
    }
  }
}
</style>
