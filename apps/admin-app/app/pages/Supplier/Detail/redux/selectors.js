import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SUPPLIER.DETAIL;

export const getSupplierByIdSelector = {
  getData: state => state[reducerKey]?.getSupplierById?.data,
  getIsPending: state => state[reducerKey]?.getSupplierById?.isPending,
  getError: state => state[reducerKey]?.getSupplierById?.error,
};

export const updateSupplierSelector = {
  getData: state => state[reducerKey]?.updateSupplier?.data,
  getIsPending: state => state[reducerKey]?.updateSupplier?.isPending,
};

export const updateSupplierCustomSettingsSelector = {
  getData: state => state[reducerKey]?.updateSupplierCustomSettings?.data,
  getIsPending: state => state[reducerKey]?.updateSupplierCustomSettings?.isPending,
};

export const mapSupplierProductsSelector = { getIsPending: state => state[reducerKey]?.mapSupplierProducts?.isPending };

export const mapSupplierWarehousesSelector = { getIsPending: state => state[reducerKey]?.mapSupplierWarehoueses?.isPending };

export const getSupplierProductMappingsSelector = {
  getData: state => state[reducerKey]?.getSupplierProductMappings?.data,
  getIsPending: state => state[reducerKey]?.getSupplierProductMappings?.isPending,
};

export const activateSupplierSelector = { getIsPending: state => state[reducerKey]?.activateSupplier?.isPending };

export const deactivateSupplierSelector = { getIsPending: state => state[reducerKey]?.deactivateSupplier?.isPending };
