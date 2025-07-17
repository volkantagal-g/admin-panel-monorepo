import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getInitialValues = values => ({
  brandId: values?.brandId,
  isCreated: !!values?.productId,
});
export const validationSchema = () => Yup.object().shape({ brand: Yup.string() });

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated };
};
export const getSupplyBrandsOption = (data = [], supplyLogisticInfo) => {
  const getSupplytBrandsDataOptions = data?.map(item => ({
    value: item?._id,
    label: item?.name,
  }));

  if (supplyLogisticInfo?.brandId && supplyLogisticInfo?.brandName) {
    const isBrandAvailable = getSupplytBrandsDataOptions?.find(({ value }) => value === supplyLogisticInfo?.brandId);
    if (!isBrandAvailable) {
      getSupplytBrandsDataOptions?.push({ value: supplyLogisticInfo?.brandId, label: supplyLogisticInfo?.brandName });
    }
  }
  return getSupplytBrandsDataOptions;
};
