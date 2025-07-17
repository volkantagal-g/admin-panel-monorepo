import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.STOCK.TRANSFER.AUTO;

export const stockTransferAutoSelector = {
  getStockTranferAutoResponse: state => state?.[reducerKey]?.autoStockOrder.data,
  getStockTranferAutoIsPending: state => state?.[reducerKey]?.autoStockOrder?.isPending,
};
export const categoryParamsSelector = { getCategoryParams: state => state?.[reducerKey]?.categoryParams.data };
export const formWarehousesSelector = { getFormWarehouses: state => state?.[reducerKey]?.formWarehouses.data };
export const regularWarehousesSelector = { getRegularWarehouses: state => state?.[reducerKey]?.regularWarehouses.data };
export const productParamsSelector = { getProductParams: state => state?.[reducerKey]?.productParams.data };
export const supplierIdSelector = { getSupplierId: state => state?.[reducerKey]?.supplierId.data };
export const serviceTypeSelector = { getServiceType: state => state?.[reducerKey]?.serviceType.data };
export const getMarketProductMasterCategoriesOldSelector = {
  getMarketProductMasterCategoriesOld: state => state?.[reducerKey]?.getMarketProductMasterCategoriesOld.data,
  isPending: state => state?.[reducerKey]?.getMarketProductMasterCategoriesOld?.isPending,
};
