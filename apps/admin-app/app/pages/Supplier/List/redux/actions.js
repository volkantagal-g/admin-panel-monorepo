import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getSuppliersRequest: {},
  getSuppliersSuccess: { data: [] },
  getSuppliersFailure: { error: null },
  setSupplierTypes: { supplierTypes: [] },
  setSearchValue: { searchValue: "" },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SUPPLIER.LIST}_` });
