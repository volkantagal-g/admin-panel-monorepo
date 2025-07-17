const { REDUX_KEY } = require('@shared/shared/constants');

const createSelector = (keys, reduxKeyPrefix = REDUX_KEY.GETIR_WATER.VENDOR_FILTER) => state => {
  return keys.reduce((acc, key) => {
    return acc[key];
  }, state[reduxKeyPrefix]);
};

export const brandsSelector = createSelector(['brands', 'data']);
export const firmsSelector = createSelector(['firms', 'data']);
export const citiesSelector = createSelector(['getCities', 'data'], REDUX_KEY.COMMON);
export const statusesSelector = createSelector(['statuses', 'data']);
export const filtersSelector = createSelector(['filters']);
export const vendorsSelector = createSelector(['vendors', 'data']);
export const isVendorsPendingSelector = createSelector(['vendors', 'isPending']);
export const countSelector = createSelector(['count', 'data']);
export const isCountPendingSelector = createSelector(['count', 'isPending']);
export const excelSelector = createSelector(['excel', 'data']);
export const isExcelPendingSelector = createSelector(['excel', 'isPending']);
