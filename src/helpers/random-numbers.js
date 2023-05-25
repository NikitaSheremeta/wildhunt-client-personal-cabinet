export function valueRandomNumbers(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function arrayRandomNumbers(length, max, min) {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(valueRandomNumbers(max, min));
  }

  return result;
}
