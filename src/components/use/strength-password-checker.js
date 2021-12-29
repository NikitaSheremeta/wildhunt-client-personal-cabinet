export function useStrengthPasswordChecker(password) {
  const score = createStrengthPasswordScore(password);
  const strengthChecker = createStrengthPasswordChecker(password, score);

  return { ...strengthChecker };
}

function createStrengthPasswordScore(password) {
  let score = 0;

  if (password === '') {
    return score;
  }

  const letters = {};

  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;

    score += 5.0 / letters[password[i]];
  }

  const variations = {
    digits: /\d/.test(password),
    lower: /[a-z]]/.test(password),
    upper: /[A-Z]]/.test(password),
    special: /\W/.test(password)
  };

  let variationsCount = 0;

  for (const check in variations) {
    variationsCount += variations[check] === true ? 1 : 0;
  }

  score += (variationsCount - 1) * 10;

  return score;
}

function createStrengthPasswordChecker(password, score) {
  if (password.length === 0) {
    return {
      status: null,
      notice: null
    };
  }

  if (score <= 50 && password.length >= 8) {
    return {
      status: 'danger',
      notice: 'Слабый пароль, его легко подобрать'
    };
  }

  if (score > 50 && score <= 85 && password.length !== 0) {
    return {
      status: 'warning',
      notice: 'Пароль может быть более надежным'
    };
  }

  if (score > 85 && password.length !== 0) {
    return {
      status: 'success',
      notice: 'Пароль - надежен, только не забудьте его'
    };
  }
}
