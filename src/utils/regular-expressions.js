export const regularExpressions = {
  digits: /\D/g,
  lower: /[a-z]]/,
  upper: /[A-Z]]/,
  special: /\W/,
  email:
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}e\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
