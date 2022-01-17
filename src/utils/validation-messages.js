export const validationMessages = {
  LOGIN: {
    USERNAME: {
      REQUIRED: 'Необходимо указать логин или электронную почту',
      ALLOWED_CHARACTERS: 'Поле содержит запрещенные символы'
    },
    PASSWORD: {
      REQUIRED: 'Необходимо указать пароль',
      ALLOWED_CHARACTERS: 'Пароль содержит запрещенные символы'
    }
  },
  SIGNUP: {
    USERNAME: {
      ALLOWED_CHARACTERS: 'Логин содержит запрещенные символы',
      REQUIRED: 'Необходимо придумать логин',
      MIN_LENGTH: 'Логин должен быть не менее 2 символов',
      MAX_LENGTH: 'Логин должен быть не более 24 символов'
    },
    EMAIL: {
      REQUIRED: 'Введите электронную почту',
      INCORRECT: 'Неправильный адрес электронной почты'
    },
    PASSWORD: {
      REQUIRED: 'Необходимо придумать пароль',
      MIN_LENGTH: 'Пароль должен быть не менее 4 символов',
      MAX_LENGTH: 'Пароль должен быть не более 24 символов',
      ALLOWED_CHARACTERS: 'Пароль содержит запрещенные символы'
    },
    CONFIRM_PASSWORD: {
      REQUIRED: 'Введите пароль еще раз',
      SAME_AS: 'Подтверждение не совпадает с паролем'
    }
  }
};
