import useUrlQueryParams from './useUrlQueryParams';

function parseData(value) {
  try {
    return JSON.parse(value);
  }
  catch (error) {
    return value;
  }
}

export default function useGetUrlQueryParamsMap() {
  const queryParams = useUrlQueryParams();
  const queryParamsObj = {};
  if (queryParams.size === 0) return queryParamsObj;

  queryParams.forEach((value, key) => {
    queryParamsObj[key] = parseData(value);
  });
  return queryParamsObj;
}
