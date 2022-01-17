import { helpers } from '@vuelidate/validators';
import { validationMessages } from '../../utils/validation-messages';

export const allowedCharacters = helpers.regex(
  /^[a-zA-Z0-9~!@#$%^&*()_+-={}\\|;',./<>?":]+$/
);

export function useUsernameValidator(username) {
  if (username.$dirty && username['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.NICKNAME.REQUIRED
    };
  }

  if (username.$dirty && username['allowedCharacters'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.NICKNAME.ALLOWED_CHARACTERS
    };
  }

  if (username.$dirty && username['minLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.NICKNAME.MIN_LENGTH
    };
  }

  if (username.$dirty && username['maxLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.NICKNAME.MAX_LENGTH
    };
  }

  return {
    isInvalid: false
  };
}

export function useEmailValidator(email) {
  if (email.$dirty && email['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.EMAIL.REQUIRED
    };
  }

  if (email.$dirty && email['email'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.EMAIL.INCORRECT
    };
  }

  return {
    isInvalid: false
  };
}

export function usePasswordValidator(password) {
  if (password.$dirty && password['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.PASSWORD.REQUIRED
    };
  }

  if (password.$dirty && password['allowedCharacters'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.PASSWORD.ALLOWED_CHARACTERS
    };
  }

  if (password.$dirty && password['minLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.PASSWORD.MIN_LENGTH
    };
  }

  if (password.$dirty && password['maxLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.PASSWORD.MAX_LENGTH
    };
  }

  return {
    isInvalid: false
  };
}

export function useConfirmPasswordValidator(confirmPassword) {
  if (confirmPassword.$dirty && confirmPassword['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.CONFIRM_PASSWORD.REQUIRED
    };
  }

  if (confirmPassword.$dirty && confirmPassword['sameAs'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.CONFIRM_PASSWORD.SAME_AS
    };
  }

  return {
    isInvalid: false
  };
}
