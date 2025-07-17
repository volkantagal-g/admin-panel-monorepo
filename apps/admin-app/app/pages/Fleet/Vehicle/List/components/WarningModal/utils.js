export const convertToSnakeCase = input => {
  return input
    .replace(/([A-Z])/g, (_match, letter, index) => (index === 0 ? letter : `_${letter}`))
    .toUpperCase();
};
