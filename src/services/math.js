// eslint-disable-next-line import/prefer-default-export
export const getRandomInteger = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
);
