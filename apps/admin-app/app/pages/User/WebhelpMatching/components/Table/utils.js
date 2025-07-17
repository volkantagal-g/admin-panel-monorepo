export const getFormattedCsvData = data => {
  const formatted = data.map(({ getirEmail, webhelpId }) => ({ getirEmail, webhelpId: webhelpId.toString() }));
  return formatted;
};
