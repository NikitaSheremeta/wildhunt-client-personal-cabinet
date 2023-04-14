import { regularExpressions } from '@/utils/regular-expressions';

export function required(validationMessage) {
  return function (value) {
    let localValue = null;

    if (typeof value === 'string') {
      localValue = value.trim();
    }

    return localValue ? '' : validationMessage;
  };
}

export function minLength(number, validationMessage) {
  return function (value) {
    return value.length >= number ? '' : validationMessage;
  };
}

export function maxLength(number, validationMessage) {
  return function (value) {
    return value.length <= number ? '' : validationMessage;
  };
}

export function email(validationMessage) {
  return function (value) {
    return value.match(regularExpressions.email) ? '' : validationMessage;
  };
}

export function sameAs(comparedValue, validationMessages) {
  return function (value) {
    return comparedValue === value ? '' : validationMessages;
  };
}

export function allowedCharacters(validationMessages) {
  return function (value) {
    return regularExpressions.allowedCharacters.test(value) ? '' : validationMessages;
  };
}
