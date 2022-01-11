<template>
  <label :class="['checkbox', { checked: checked }]">
    <input
      v-bind="$attrs"
      :checked="checked"
      :value="value"
      type="checkbox"
      class="input"
      autocomplete="off"
      @change="onChange"
    />

    <span class="checkbox-wrapper">
      <span class="icon-wrapper">
        <BaseIcon class="icon" icon="check" color="primary" />
      </span>

      <span v-if="!!$slots.default" class="label">
        <slot />
      </span>
    </span>
  </label>
</template>

<script>
import BaseIcon from './BaseIcon';

export default {
  name: 'BaseCheckbox',
  components: {
    BaseIcon
  },
  inheritAttrs: false,
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(event) {
      this.$emit('update:checked', event.target.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
$colors: (
  border-color: $gray-800,
  color: #white,
  success: (
    active-background: $success
  )
);

.checkbox {
  position: relative;
  display: block;
  user-select: none;
  line-height: $line-height-secondary;
  font-size: $font-size-xs;

  .input {
    display: none;

    & + .checkbox-wrapper {
      display: flex;
      position: relative;
      max-width: 100%;
      cursor: pointer;

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-right: 12px;
        padding: 4px;
        width: 12px;
        height: 12px;
        background-color: transparent;
        border-radius: 4px;
        box-shadow: inset 0 0 0 2px map-get($colors, border-color);

        &:last-child {
          margin-right: 0;
        }
      }

      .icon {
        display: block;
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        transition: 0.2s;
        visibility: hidden;
        opacity: 0;
      }

      &:hover {
        .icon {
          visibility: visible;
          opacity: 1;
        }
      }

      &.label {
        display: none;
        margin-top: 41px;
      }
    }

    &:checked + .checkbox-wrapper {
      .icon-wrapper {
        background-color: map-get($colors, success, active-background);
        box-shadow: none;
        color: map-get($colors, success, color);
      }

      .icon {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
