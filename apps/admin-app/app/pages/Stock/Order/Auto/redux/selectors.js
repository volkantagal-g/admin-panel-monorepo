import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.STOCK.ORDER.AUTO;

export const autoStockOrderSelector = {
  getAutoStockResponse: state => state?.[reducerKey]?.autoStockOrder.data,
  getAutoStockIsPending: state => state?.[reducerKey]?.autoStockOrder?.isPending,
};

export const itemParamsSelector = { getItemParams: state => state?.[reducerKey]?.itemParams.data };
export const supplierIdSelector = { getSupplierId: state => state?.[reducerKey]?.supplierId.data };
