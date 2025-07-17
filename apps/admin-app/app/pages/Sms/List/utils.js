export const convertFilterPayload = filters => {
  const tempValues = filters;
  const queryParams = {
    page: tempValues?.page,
    size: tempValues?.size,
    sort: tempValues?.sort,
  };

  const filteredValues = {
    queryParams,
    params: tempValues,
  };
  return filteredValues;
};
