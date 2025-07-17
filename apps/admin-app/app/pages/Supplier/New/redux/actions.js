import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createSupplierRequest: { body: null },
  createSupplierSuccess: { data: [] },
  createSupplierFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.SUPPLIER.NEW}_` });
