export const convertStatusCodeToString = (code, t) => {
  if (code === 100) return t('WAITING');
  if (code === 200) return t('INPROGRESS');
  if (code === 300) return t('COMPLETED');
  return null;
};
