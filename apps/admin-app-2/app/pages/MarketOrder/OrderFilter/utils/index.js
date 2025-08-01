import { cloneDeep, isArray, isEmpty, isFunction, isObject } from 'lodash';

export const removeEmptyOrNullValues = payload => {
  if (
    !isEmpty(payload) &&
    isObject(payload) &&
    !isArray(payload) &&
    !isFunction(payload)
  ) {
    const objMap = cloneDeep(payload);
    Object.keys(objMap).forEach(key => {
      const value = objMap[key];
      if (value === null || value === undefined || value === '') {
        delete objMap[key];
      }
      else if (typeof value === 'object') {
        if (Object.keys(value).length === 0) {
          delete objMap[key];
        }
        else {
          removeEmptyOrNullValues(value);
        }
      }
    });
    return objMap;
  }
  return payload;
};

export const getDomainBasedOrderCount = orders => {
  return orders?.reduce(
    (orderMap, { domainType, count }) => ({ ...orderMap, [domainType]: count + (orderMap[domainType] ?? 0) }),
    {},
  );
};
