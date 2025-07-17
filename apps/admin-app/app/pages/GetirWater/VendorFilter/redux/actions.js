import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getBrandsRequest: {},
    getBrandsSuccess: { data: [] },
    getBrandsFailure: { error: null },
    getFirmsRequest: { data: {} },
    getFirmsSuccess: { data: [] },
    getFirmsFailure: { error: null },
    getStatusRequest: { data: {} },
    getStatusSuccess: { data: [] },
    getStatusFailure: { error: null },
    filterVendorsRequest: { data: {} },
    filterVendorsSuccess: { data: [] },
    filterVendorsFailure: { error: null },
    getVendorFilterCountRequest: { data: {} },
    getVendorFilterCountSuccess: { data: {} },
    getVendorFilterCountFailure: { error: null },
    getExcelRequest: { data: {} },
    getExcelSuccess: { data: {} },
    getExcelFailure: { error: null },
    setFilters: { filters: {} },
    resetFilters: {},
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_WATER.VENDOR_FILTER}_` },
);
