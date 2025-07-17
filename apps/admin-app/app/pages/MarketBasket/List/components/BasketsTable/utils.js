export const maskText = ({ text, maskCharacter = '*', visibleCharactersCount = 4 }) => {
  if (!text || text === '') return '';

  const maskedLength = Math.max(0, text.length - visibleCharactersCount);
  return maskCharacter.repeat(maskedLength) + text.slice(-visibleCharactersCount);
};
