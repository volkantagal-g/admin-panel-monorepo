import { getLangKey } from '@shared/i18n';

export const convertDomainTypes = (values = {}, activeDomainsFromConfig) => {
  const types = Object.entries(values).map(([value, label]) => {
    if (!activeDomainsFromConfig) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    if (activeDomainsFromConfig && activeDomainsFromConfig.includes(parseInt(value, 10))) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    return null;
  }).filter(value => value !== null);
  return types;
};

export const convertFilterPayload = filters => {
  const tempValues = filters;
  const queryParams = {
    page: tempValues?.page ? tempValues?.page : 0,
    size: tempValues?.size ? tempValues?.size : 10,
    sort: tempValues?.sort,
    clientLanguage: getLangKey(),
  };
  delete tempValues?.page;
  delete tempValues?.size;
  delete tempValues?.sort;
  delete tempValues?.clientLanguage;

  const filteredValues = {
    queryParams,
    params: tempValues,
  };
  return filteredValues;
};
