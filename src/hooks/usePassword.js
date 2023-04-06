import { reactive, watch } from 'vue';
import { magicNumbers } from '@/utils/magic-numbers';
import { labels } from '@/utils/labels';

export function usePassword(properties) {
  const data = reactive({
    value: properties.value,
    status: '',
    notice: 'Используйте латинские буквы, цифры и символы'
  });

  const reassign = (value) => {
    const passwordStrengthScore = getPasswordStrengthScore(value);

    // eslint-disable-next-line no-magic-numbers
    if (passwordStrengthScore <= 25 && value.length >= magicNumbers.PASSWORD.MIN_LENGTH) {
      data.status = 'danger';
      data.notice = labels.PASSWORD_STRENGTH_NOTICE.DANGER;
    }

    // eslint-disable-next-line no-magic-numbers
    if (passwordStrengthScore > 20 && passwordStrengthScore <= 50 && value.length !== 0) {
      data.status = 'warning';
      data.notice = labels.PASSWORD_STRENGTH_NOTICE.WARNING;
    }

    // eslint-disable-next-line no-magic-numbers
    if (passwordStrengthScore > 50 && value.length !== 0) {
      data.status = 'success';
      data.notice = labels.PASSWORD_STRENGTH_NOTICE.SUCCESS;
    }
  };

  reassign(data.value);

  watch(() => data.value, reassign);

  return data;
}

function getPasswordStrengthScore(value) {
  let score = 0;

  if (value === '') {
    return score;
  }

  const letters = {};

  for (let i = 0; i < value.length; i++) {
    letters[value[i]] = (letters[value[i]] || 0) + 1;

    // eslint-disable-next-line no-magic-numbers
    score += 5.0 / letters[value[i]];
  }

  const variations = {
    digits: /\d/.test(value),
    lower: /[a-z]]/.test(value),
    upper: /[A-Z]]/.test(value),
    special: /\W/.test(value)
  };

  let variationsCount = 0;

  for (const check in variations) {
    variationsCount += variations[check] === true ? 1 : 0;
  }

  // eslint-disable-next-line no-magic-numbers
  score += (variationsCount - 1) * 10;

  return score;
}
