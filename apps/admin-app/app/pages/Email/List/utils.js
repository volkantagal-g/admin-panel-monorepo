export const convertFilterPayload = filters => {
  const tempValues = filters;
  const queryParams = {
    page: tempValues?.page ? tempValues?.page : 0,
    size: tempValues?.size ? tempValues?.size : 10,
    sort: tempValues?.sort,
  };
  delete tempValues?.page;
  delete tempValues?.size;
  delete tempValues?.sort;

  const filteredValues = {
    queryParams,
    params: tempValues,
  };
  return filteredValues;
};
