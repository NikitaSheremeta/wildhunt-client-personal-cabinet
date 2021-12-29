const SIX_HUNDRED_MILLISECONDS = 600;

export function useDebounce(callback, delay = SIX_HUNDRED_MILLISECONDS) {
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
