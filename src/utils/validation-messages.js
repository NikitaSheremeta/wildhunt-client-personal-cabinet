import { magicNumbers } from '@/utils/magic-numbers';

export const validationMessages = {
  BASE: {
    REQUIRED: 'Это поле необходимо заполнить',
    ALLOWED_CHARACTERS: 'Используйте латинские буквы, цифры и символы'
  },
  LOGIN: {
    MIN_LENGTH: `Логин должен быть не менее ${magicNumbers.LOGIN.MIN_LENGTH}-x символов`,
    MAX_LENGTH: `Логин должен быть не более ${magicNumbers.LOGIN.MAX_LENGTH}-x символов`
  },
  PASSWORD: {
    MIN_LENGTH: `Пароль должен быть не менее ${magicNumbers.PASSWORD.MIN_LENGTH}-x символов`,
    MAX_LENGTH: `Пароль должен быть не более ${magicNumbers.PASSWORD.MAX_LENGTH}-x символов`
  },
  CONFIRM_PASSWORD: {
    SAME_AS: 'Подтверждение не совпадает с паролем'
  },
  EMAIL: {
    INCORRECT: 'Введенная электронная почта некорректна'
  }
};
