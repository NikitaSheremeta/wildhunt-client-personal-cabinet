import { reactive } from 'vue';

export function useForm(element) {
  const data = reactive({
    valid: false,
    checkValidity: () => {
      checkValidity();
    }
  });

  const checkValidity = () => {
    const invalidFields = [];

    for (const field in element.value.validation) {
      const fieldValidation = element.value.validation[field];

      fieldValidation.blur();

      if (!fieldValidation.valid) {
        invalidFields.push(field);
      }
    }

    data.valid = !invalidFields.length;
  };

  return data;
}
