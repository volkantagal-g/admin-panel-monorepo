import * as Yup from 'yup';
import _get from 'lodash/get';

export const defaultValues = {
  isStoreConversionSupplier: false,
  waybillCheck: false,
  multipleWaybillAllowed: false,
  isAllowedForBlockedStockSupplierMistakeReason: false,
  isFactory: false,
  isEWaybillIntegrated: false,
  isSelfPurchaseOrderAllowed: false,
  isGoodsAcceptanceReceiptRequired: false,
  accountingMailAddresses: [],
  commercialMailAddresses: [],
  opsTeamMailAddresses: [],
};

export const validationSchema = () => {
  return Yup.object().shape({
    isStoreConversionSupplier: Yup.boolean(),
    waybillCheck: Yup.boolean(),
    multipleWaybillAllowed: Yup.boolean(),
    isAllowedForBlockedStockSupplierMistakeReason: Yup.boolean(),
    isFactory: Yup.boolean(),
    isEWaybillIntegrated: Yup.boolean(),
    isSelfPurchaseOrderAllowed: Yup.boolean(),
    isGoodsAcceptanceReceiptRequired: Yup.boolean(),
    accountingMailAddresses: Yup.array().of(Yup.string().email('INVALID_EMAIL')),
    commercialMailAddresses: Yup.array().of(Yup.string().email('INVALID_EMAIL')),
    opsTeamMailAddresses: Yup.array().of(Yup.string().email('INVALID_EMAIL')),
  });
};

export const getInitialValues = supplier => {
  if (!_get(supplier, '_id')) return defaultValues;
  const initialValues = {
    isStoreConversionSupplier: _get(supplier, 'isStoreConversionSupplier'),
    waybillCheck: _get(supplier, 'waybillCheck'),
    multipleWaybillAllowed: _get(supplier, 'multipleWaybillAllowed'),
    isAllowedForBlockedStockSupplierMistakeReason: _get(
      supplier,
      'isAllowedForBlockedStockSupplierMistakeReason',
    ),
    isFactory: _get(supplier, 'isFactory'),
    isEWaybillIntegrated: _get(supplier, 'isEWaybillIntegrated'),
    isSelfPurchaseOrderAllowed: _get(supplier, 'isSelfPurchaseOrderAllowed'),
    isGoodsAcceptanceReceiptRequired: _get(
      supplier,
      'isGoodsAcceptanceReceiptRequired',
    ),
    accountingMailAddresses: _get(supplier, 'accountingMailAddresses'),
    commercialMailAddresses: _get(supplier, 'commercialMailAddresses'),
    opsTeamMailAddresses: _get(supplier, 'opsTeamMailAddresses'),
  };
  return initialValues;
};
