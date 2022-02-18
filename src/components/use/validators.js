import { helpers } from '@vuelidate/validators';
import { validationMessages } from '../../utils/validation-messages';

export const allowedCharacters = helpers.regex(
  /^[a-zA-Z0-9~!@#$%^&*()_+-={}\\|;',./<>?":]+$/
);

export function useLoginUsernameValidator(login) {
  if (login.$dirty && login['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.LOGIN.USERNAME.REQUIRED
    };
  }

  if (login.$dirty && login['allowedCharacters'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.LOGIN.USERNAME.ALLOWED_CHARACTERS
    };
  }

  return {
    isInvalid: false
  };
}

export function useLoginPasswordValidator(password) {
  if (password.$dirty && password['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.LOGIN.PASSWORD.REQUIRED
    };
  }

  if (password.$dirty && password['allowedCharacters'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.LOGIN.PASSWORD.ALLOWED_CHARACTERS
    };
  }

  return {
    isInvalid: false
  };
}

export function useSignupUsernameValidator(username) {
  if (username.$dirty && username['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.USERNAME.REQUIRED
    };
  }

  if (username.$dirty && username['allowedCharacters'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.USERNAME.ALLOWED_CHARACTERS
    };
  }

  if (username.$dirty && username['minLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.USERNAME.MIN_LENGTH
    };
  }

  if (username.$dirty && username['maxLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.USERNAME.MAX_LENGTH
    };
  }

  return {
    isInvalid: false
  };
}

export function useSignupEmailValidator(email) {
  if (email.$dirty && email['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.EMAIL.REQUIRED
    };
  }

  if (email.$dirty && email['email'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.EMAIL.INCORRECT
    };
  }

  return {
    isInvalid: false
  };
}

export function useSignupPasswordValidator(password) {
  if (password.$dirty && password['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.PASSWORD.REQUIRED
    };
  }

  if (password.$dirty && password['allowedCharacters'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.PASSWORD.ALLOWED_CHARACTERS
    };
  }

  if (password.$dirty && password['minLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.PASSWORD.MIN_LENGTH
    };
  }

  if (password.$dirty && password['maxLength'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.PASSWORD.MAX_LENGTH
    };
  }

  return {
    isInvalid: false
  };
}

export function useSignupConfirmPasswordValidator(confirmPassword) {
  if (confirmPassword.$dirty && confirmPassword['required'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.CONFIRM_PASSWORD.REQUIRED
    };
  }

  if (confirmPassword.$dirty && confirmPassword['sameAs'].$invalid) {
    return {
      isInvalid: true,
      errorMessage: validationMessages.SIGNUP.CONFIRM_PASSWORD.SAME_AS
    };
  }

  return {
    isInvalid: false
  };
}
