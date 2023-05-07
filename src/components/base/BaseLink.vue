<template>
  <router-link :class="['base-link', classes]" :to="href" :target="target">
    <BaseIcon v-if="iconLeft" :icon="iconLeft" :width="computedIconSize" :height="computedIconSize" />

    <template v-if="label">
      {{ label }}
    </template>

    <span v-if="active" class="point" />

    <BaseIcon v-if="iconRight" :icon="iconRight" :width="computedIconSize" :height="computedIconSize" />
  </router-link>
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
    small: {
      type: Boolean,
      default: false
    },
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
    active: {
      type: Boolean,
      default: false
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
      props.small ? 'small' : '',
      props.underline ? 'underline' : '',
      props.color ? props.color : '',
      props.active ? 'active' : '',
      props.disabled ? 'disabled' : '',
      props.iconLeft ? 'icon-left' : '',
      props.iconRight ? 'icon-right' : ''
    ]);

    const computedIconSize = computed(() => (props.small ? '14' : '18'));

    return {
      classes,
      computedIconSize
    };
  }
};
</script>

<style lang="scss" scoped>
.base-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  .base-icon {
    transition: 0.2s;
  }

  .point {
    margin-left: 8px;
    width: 6px;
    height: 6px;
    background-color: $success;
    border-radius: 50%;
  }

  &.small {
    font-size: $font-size-xs;
  }

  &.underline {
    text-decoration: underline;
  }

  &.primary {
    color: map-get($link-palette, primary, color);

    @include media-breakpoint-up(md) {
      &:hover {
        color: map-get($link-palette, secondary, color);

        .base-icon {
          fill: map-get($link-palette, secondary, color);
          stroke: map-get($link-palette, secondary, color);
        }
      }
    }

    @include media-breakpoint-down(sm) {
      &:active {
        color: map-get($link-palette, secondary, color);

        .base-icon {
          fill: map-get($link-palette, secondary, color);
          stroke: map-get($link-palette, secondary, color);
        }
      }
    }
  }

  &.secondary {
    color: map-get($link-palette, secondary, color);

    .base-icon {
      fill: map-get($link-palette, secondary, color);
      stroke: map-get($link-palette, secondary, color);
    }

    @include media-breakpoint-up(md) {
      &:hover {
        color: map-get($link-palette, primary, color);

        .base-icon {
          fill: map-get($link-palette, primary, color);
          stroke: map-get($link-palette, primary, color);
        }
      }
    }

    @include media-breakpoint-down(sm) {
      &:active {
        color: map-get($link-palette, primary, color);

        .base-icon {
          fill: map-get($link-palette, primary, color);
          stroke: map-get($link-palette, primary, color);
        }
      }
    }
  }

  &.disabled {
    pointer-events: none;
    color: map-get($link-palette, disabled, color);

    .base-icon {
      fill: map-get($link-palette, disabled, color);
      stroke: map-get($link-palette, disabled, color);
    }
  }

  &.active {
    &.secondary {
      color: map-get($link-palette, primary, color);

      .base-icon {
        fill: map-get($link-palette, primary, color);
        stroke: map-get($link-palette, primary, color);
      }
    }
  }

  &.icon-left {
    .base-icon {
      margin-right: 24px;
    }
  }

  &.icon-right {
    .base-icon {
      margin-left: 24px;
    }
  }
}
</style>
