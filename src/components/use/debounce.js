const THREE_HUNDRED_MILLISECONDS = 300;

export function useDebounce(callback, delay = THREE_HUNDRED_MILLISECONDS) {
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
