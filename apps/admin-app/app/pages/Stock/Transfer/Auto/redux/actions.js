import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { AUTO_TRANSFER_SERVICE_TYPE } from '@app/pages/Stock/Transfer/constants';

export const { Types, Creators } = createActions(
  {
    initPage: null,
    getStockTransferAutoRequest: { data: {} },
    getStockTransferAutoSuccess: { data: {} },
    getStockTransferAutoFailure: { error: null },
    setCategoryParams: { data: {} },
    setFormWarehouses: { data: [] },
    setRegularWarehouses: { data: [] },
    setProductParams: { data: [] },
    setSupplierId: { data: null },
    setServiceType: { data: AUTO_TRANSFER_SERVICE_TYPE.DEFAULT },
    getMarketProductMasterCategoriesOldRequest: { limit: null, offset: null, isSubCategory: null },
    getMarketProductMasterCategoriesOldSuccess: { data: [] },
    getMarketProductMasterCategoriesOldFailure: { error: null },
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.STOCK.TRANSFER.AUTO}_` },
);
