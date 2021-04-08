export const isSixDigitNumberString = (value: unknown) => {
  if (typeof value !== 'string') {
    return false;
  }
  return /^[0-9]{6}$/.test(value);
};

export const isEmptyOrNumberString = (value: unknown) => {
  if (typeof value !== 'string') {
    return false;
  }
  return /^[0-9]{0,}$/.test(value);
};
