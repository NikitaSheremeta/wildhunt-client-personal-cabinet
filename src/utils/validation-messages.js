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
  LOGIN_OR_EMAIL: {
    MAX_LENGTH: `Значение должно быть не более ${magicNumbers.LOGIN_OR_EMAIL.MAX_LENGTH}-и символов`
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
  },
  TOPIC: {
    MIN_LENGTH: `Заголовок темы должен быть не менее ${magicNumbers.TOPIC.MIN_LENGTH}-и символов`,
    MAX_LENGTH: `Заголовок темы должен быть не более ${magicNumbers.TOPIC.MAX_LENGTH}-и символов`
  }
};
