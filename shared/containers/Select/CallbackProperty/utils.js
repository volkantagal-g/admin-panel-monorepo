export const manipulateCallbackSearch = (current, textQuery, callbackType) => {
  return {
    sort: 'createdAt,desc',
    callbackType,
    size: 7,
    page: (current || 1) - 1,
    textQuery,
  };
};
