import { reactive, watch } from 'vue';
import { objectSorting } from '@/helpers/object-sorting';

export function useInput(properties) {
  const data = reactive({
    value: properties.value,
    valid: false,
    touched: false,
    errors: {},
    error: '',
    reset: () => {
      data.touched = false;
    },
    blur: () => {
      data.touched = true;
    }
  });

  const reassign = (value) => {
    data.valid = true;

    Object.keys(properties.rules ?? {}).map((name) => {
      const isNotValid = properties.rules[name](value);

      if (isNotValid) {
        data.errors[name] = isNotValid;

        data.valid = false;
      } else {
        delete data.errors[name];
      }
    });

    data.errors = objectSorting(data.errors, ['required', 'minLength', 'maxLength', 'email', 'sameAs']);

    data.error = Object.values(data.errors)[0];
  };

  reassign(data.value);

  watch(() => data.value, reassign);

  return data;
}
