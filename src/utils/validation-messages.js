import { magicNumbers } from '@/utils/magic-numbers';

export const validationMessages = {
  LOGIN: {
    ALLOWED_CHARACTERS: 'Логин содержит запрещенные символы',
    REQUIRED: 'Необходимо придумать логин',
    REQUIRED_LOGIN_PAGE: 'Необходимо ввести логин или электронную почту',
    MIN_LENGTH: `Логин должен быть не менее ${magicNumbers.LOGIN.MIN_LENGTH} символов`,
    MAX_LENGTH: `Логин должен быть не более ${magicNumbers.LOGIN.MAX_LENGTH} символов`
  },
  PASSWORD: {
    REQUIRED: 'Необходимо придумать пароль',
    REQUIRED_LOGIN_PAGE: 'Необходимо ввести пароль',
    MIN_LENGTH: `Пароль должен быть не менее ${magicNumbers.PASSWORD.MIN_LENGTH} символов`,
    MAX_LENGTH: `Пароль должен быть не более ${magicNumbers.PASSWORD.MAX_LENGTH} символов`,
    ALLOWED_CHARACTERS: 'Пароль содержит запрещенные символы'
  },
  CONFIRM_PASSWORD: {
    REQUIRED: 'Введите пароль еще раз',
    SAME_AS: 'Подтверждение не совпадает с паролем'
  },
  EMAIL: {
    REQUIRED: 'Введите электронную почту',
    INCORRECT: 'Неправильный адрес электронной почты'
  }
};
