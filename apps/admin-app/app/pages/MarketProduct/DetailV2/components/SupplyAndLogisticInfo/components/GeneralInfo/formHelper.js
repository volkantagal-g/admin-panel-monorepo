import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getInitialValues = values => {
  const {
    criticalStockStore, minStock, maxStock, minStockDay, maxStockDay, inventoryCheckPeriod,
    isCriticalStockWarningEnabled, isIncludedToGeneralInventoryCheck, isConsumable, isEquipment, isKuzeydenEquipment,
  } = values;
  return {
    criticalStockStore,
    minStock,
    maxStock,
    minStockDay,
    maxStockDay,
    inventoryCheckPeriod,
    isCriticalStockWarningEnabled: !!isCriticalStockWarningEnabled,
    isIncludedToGeneralInventoryCheck: !!isIncludedToGeneralInventoryCheck,
    isConsumable: !!isConsumable,
    isEquipment: !!isEquipment,
    isKuzeydenEquipment: !!isKuzeydenEquipment,
    isCreated: !!values?.productId,
  };
};
export const validationSchema = () => Yup.object().shape({
  criticalStockStore: Yup.number().min(0).nullable(true),
  minStock: Yup.number().min(0).nullable(true),
  maxStock: Yup.number().min(0).nullable(true),
  minStockDay: Yup.number().min(0).nullable(true),
  maxStockDay: Yup.number().min(0).nullable(true),
  inventoryCheckPeriod: Yup.number().min(0).nullable(true),
  isCriticalStockWarningEnabled: Yup.boolean(),
  isIncludedToGeneralInventoryCheck: Yup.boolean(),
  isConsumable: Yup.boolean(),
  isEquipment: Yup.boolean(),
  isKuzeydenEquipment: Yup.boolean(),
});
export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated };
};
