let previous = 1;

export function getAudioPath(effect) {
  return effect.file.replace(
    'C:\\fakepath\\',
    `${process.env.PUBLIC_URL}/audio/`
  );
}

export function generateUniqueRandom() {
  let number = previous;
  while (number < previous + 0.1 && number > previous - 0.1) {
    number = Math.random() * (1.4 - 0.75) + 0.75;
  }
  return (previous = number);
}
