<template>
  <div :class="computedClasses">
    <label class="label">
      <input v-bind="attrs" />
      <a
        v-if="type === 'password'"
        href="#"
        @click.stop.prevent="changePasswordType"
        >#</a
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    tagName: {
      type: String,
      default: 'input',
      validator: (value) => ['input', 'textarea'].includes(value)
    },
    type: {
      type: String,
      default: 'text'
    },
    baseClassName: {
      type: String,
      default: 'base-input'
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    localType: ''
  }),
  computed: {
    computedClasses() {
      return [this.baseClassName];
    },
    attrs() {
      return {
        ...this.$attrs,
        type: this.tagName !== 'textarea' ? this.localType : null,
        ref: 'field',
        class: 'field'
      };
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(val) {
        this.localType = val;
      }
    }
  },
  methods: {
    changePasswordType() {
      this.localType = this.localType === 'password' ? 'text' : 'password';
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

$colors: (
  primary: (
    background-color: $gray-800,
    color: $font-color-base,
    placeholder-color: $font-color-secondary,
    hover-placeholder-color: $gray-700
  )
);

.base-input {
  display: block;
  position: relative;
  width: 100%;
  font-family: map-get($input, font-family);
  font-weight: map-get($input, font-weight);
  font-size: map-get($input, font-size);
  font-style: map-get($input, font-style);

  .label {
    display: flex;
    position: relative;
    width: 100%;
  }

  .field {
    display: block;
    padding: nth(map-get($input, padding), 1) nth(map-get($input, padding), 2);
    width: 100%;
    min-width: 0;
    height: map-get($input, height);
    background-color: map-get($colors, primary, background-color);
    border: none;
    border-radius: map-get($input, border-radius);
    color: map-get($colors, primary, color);
    font-family: inherit;
    font-size: map-get($input, font-size);
    font-style: inherit;
    text-overflow: ellipsis;

    @include placeholder() {
      line-height: 1;
      color: map-get($colors, primary, placeholder-color);
      font-family: inherit;
      font-size: inherit;
      transition: 0.2s;
    }

    &:focus {
      box-shadow: none;
      outline: none;
    }

    &:focus::-webkit-input-placeholder {
      color: map-get($colors, primary, hover-placeholder-color);
    }
  }
}
</style>
