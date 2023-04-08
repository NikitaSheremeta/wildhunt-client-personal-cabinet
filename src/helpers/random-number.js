export function randomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomNumbers(length, max, min) {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(randomNumber(max, min));
  }

  return result;
}
