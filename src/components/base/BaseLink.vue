<template>
  <a :class="['base-link', classes]" :href="href" :target="target">
    <BaseIcon v-if="iconLeft" :icon="iconLeft" width="14" height="14px" />

    <template v-if="label">
      {{ label }}
    </template>

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
    underline: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
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

  &.active {
    &.secondary {
      color: map-get($color-palette, primary, color);
    }
  }

  &.underline {
    text-decoration: underline;
  }

  &.icon-left {
    span {
      margin-top: 1px;
    }

    .base-icon {
      margin-right: 12px;
    }
  }

  &.icon-right {
    span {
      margin-top: 1px;
    }

    .base-icon {
      margin-left: 12px;
    }
  }
}
</style>
