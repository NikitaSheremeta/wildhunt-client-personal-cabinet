<template>
  <div :class="computedClasses">
    <label class="label">
      <input v-bind="attrs" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    baseClassName: {
      type: String,
      default: 'base-input'
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClasses() {
      return [this.baseClassName];
    },
    attrs() {
      return {
        ref: 'field',
        class: 'field',
        placeholder: this.placeholder ?? null
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$input: (
  padding: (
    4px,
    24px
  ),
  height: 40px,
  border-radius: 12px,
  font-family: $font-family-base,
  font-weight: $font-weight-base,
  font-size: $font-size-base,
  font-style: normal
);

.base-input {
  display: block;
  position: relative;
  width: 100%;
  background-color: #2f323b;
  border-radius: map-get($input, border-radius);

  .label {
    display: flex;
    position: relative;
    width: 100%;
  }

  .field {
    display: block;
    width: 100%;
    min-width: 0;
    background-color: transparent;
    border: none;
    color: $font-color-base;
    font-family: inherit;
    text-overflow: ellipsis;
    padding: nth(map-get($input, padding), 1) nth(map-get($input, padding), 2);
    height: map-get($input, height);
    font-size: map-get($input, font-size);

    @include placeholder() {
      line-height: 1;
      color: $font-color-secondary;
      font-family: inherit;
      font-size: inherit;
      transition: 0.2s;
    }

    &:focus {
      box-shadow: none;
      outline: none;
    }

    &:focus::-webkit-input-placeholder {
      color: $gray-700;
    }
  }
}
</style>
