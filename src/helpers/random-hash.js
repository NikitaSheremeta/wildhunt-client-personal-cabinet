export function randomHash(length) {
  let result = '';
  let counter = 0;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const charactersLength = characters.length;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));

    counter += 1;
  }

  return result;
}
