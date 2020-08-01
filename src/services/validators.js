export const isSixDigitNumberString = (str) => {
  if (typeof str !== 'string') {
    return false;
  }
  return /^[0-9]{6}$/.test(str);
};

export const isEmptyOrNumberString = (str) => {
  if (typeof str !== 'string') {
    return false;
  }
  return /^[0-9]{0,}$/.test(str);
};
