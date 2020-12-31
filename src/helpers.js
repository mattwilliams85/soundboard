export function getAudioPath(effect) {
  return effect.file.replace(
    'C:\\fakepath\\',
    `${process.env.PUBLIC_URL}/audio/`
  );
}
