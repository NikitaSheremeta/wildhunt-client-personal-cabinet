import { regularExpressions } from '@/utils/regular-expressions';

export const required = (validationMessage) => (value) => value.trim() ? '' : validationMessage;

export const minLength = (number, validationMessage) => (value) => value.length >= number ? '' : validationMessage;

export const maxLength = (number, validationMessage) => (value) => value.length <= number ? '' : validationMessage;

export const email = (validationMessage) => (value) => value.match(regularExpressions.email) ? '' : validationMessage;

export const sameAs = (comparedValue, validationMessages) => (value) =>
  comparedValue.value === value ? '' : validationMessages;
