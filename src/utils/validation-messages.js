import { magicNumbers } from '@/utils/magic-numbers';

export const validationMessages = {
  LOGIN: {
    ALLOWED_CHARACTERS: 'Логин содержит запрещенные символы',
    REQUIRED: 'Это поле необходимо заполнить',
    REQUIRED_LOGIN_PAGE: 'Необходимо ввести логин или электронную почту',
    MIN_LENGTH: `Логин должен быть не менее ${magicNumbers.LOGIN.MIN_LENGTH}-и символов`,
    MAX_LENGTH: `Логин должен быть не более ${magicNumbers.LOGIN.MAX_LENGTH}-и символов`
  },
  PASSWORD: {
    REQUIRED: 'Необходимо придумать пароль',
    REQUIRED_LOGIN_PAGE: 'Это поле необходимо заполнить',
    MIN_LENGTH: `Пароль должен быть не менее ${magicNumbers.PASSWORD.MIN_LENGTH}-и символов`,
    MAX_LENGTH: `Пароль должен быть не более ${magicNumbers.PASSWORD.MAX_LENGTH}-и символов`,
    ALLOWED_CHARACTERS: 'Пароль содержит запрещенные символы'
  },
  CONFIRM_PASSWORD: {
    REQUIRED: 'Введите пароль еще раз',
    SAME_AS: 'Подтверждение не совпадает с паролем'
  },
  EMAIL: {
    REQUIRED: 'Это поле необходимо заполнить',
    INCORRECT: 'Неправильный адрес электронной почты'
  },
  CAPTCHA: {
    REQUIRED: 'Это поле необходимо заполнить',
    MIN_LENGTH: `Код должен быть не менее ${magicNumbers.CAPTCHA.MIN_LENGTH}-и цифр`,
    MAX_LENGTH: `Код должен быть не более ${magicNumbers.CAPTCHA.MAX_LENGTH}-и цифр`,
    INCORRECT: 'Введенный код неверен'
  }
};
