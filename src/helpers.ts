const crypto = (() => {
  const isBrowser = typeof window === 'object' && typeof document === 'object' && typeof navigator !== 'undefined';
  if (isBrowser) return window.crypto;
  /* eslint-disable-next-line */
  return require('node:crypto');
})();

const MAX_RANGE = 2 ** 32;

export const random = (min: number, max: number): number => {
  const range = max - min;
  const byteArray = new Uint32Array(1);

  crypto.getRandomValues(byteArray);
  while (byteArray[0] >= Math.floor(MAX_RANGE / range) * range) {
    crypto.getRandomValues(byteArray);
  }
  return min + (byteArray[0] % range);
};
