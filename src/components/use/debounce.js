import { magicNumbers } from '@/utils/magic-numbers';

export function useDebounce(
  callback,
  delay = magicNumbers.TWO_HUNDRED_MILLISECONDS
) {
  let timeout = null;

  return function () {
    const args = arguments;
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}
