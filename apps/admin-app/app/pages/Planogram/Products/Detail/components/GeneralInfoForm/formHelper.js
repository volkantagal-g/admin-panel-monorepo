import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

const formatLabelText = (data, name) => {
  const itemName = data?.name?.[getLangKey()];
  const labelText = name ? `${itemName} / ${name}` : itemName;

  if (data?.parent) {
    return formatLabelText(data?.parent, labelText);
  }

  return labelText;
};

export const getDomainTypes = types => {
  return types?.map(type => {
    const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === type);
    return foundType?.name[getLangKey()] ?? ' ';
  });
};

export const selectFormatter = data => data?.map(item => ({ value: item.id, label: item.name }));

export const selectFormatterWithKey = (data, valueKey = 'id', labelKey = 'name') => data?.map(item => ({ value: item[valueKey], label: item[labelKey] }));

export const getInitialValues = (planogramProduct, assignedWarehouses) => {
  const cityIds = [];
  assignedWarehouses?.map(warehouse => !cityIds.includes(warehouse?.city?._id) && cityIds.push(warehouse?.city?._id));
  const mainWarehouseIds = [];
  assignedWarehouses?.map(warehouse => warehouse?.mainWarehouses?.map(id => !mainWarehouseIds?.includes(id) && mainWarehouseIds.push(id)));

  return {
    id: planogramProduct?.id,
    productName: planogramProduct?.name[getLangKey()],
    planogramProductId: planogramProduct?.productId,
    warehouseTypes: planogramProduct?.warehouseTypes || [],
    domainTypes: planogramProduct?.domainTypes,
    demographyIds: planogramProduct?.demographyIds,
    sizeIds: planogramProduct?.sizeIds,
    isActive: planogramProduct?.status === MARKET_PRODUCT_STATUS.ACTIVE,
    isEnabled: planogramProduct?.isEnabled,
    isLocal: planogramProduct?.isManuelAssignment,
    warehouseIds: assignedWarehouses?.map(warehouse => warehouse?.warehouseId),
    cityIds,
    mainWarehouseIds,
  };
};

export const validationSchema = () => Yup.object().shape({
  productName: Yup.string().required(),
  planogramProductId: Yup.string().required(),
  warehouseTypes: Yup.array().of(Yup.number()).required(),
  domainTypes: Yup.array().of(Yup.number()).required(),
  demographyIds: Yup.array().of(Yup.number()).required(),
  sizeIds: Yup.array().of(Yup.number()).required(),
  isLocal: Yup.boolean().required(),
  warehouseIds: Yup.array().when('isLocal', {
    is: true,
    then: Yup.array().of(Yup.string()).required(),
  }),
});

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const formatDataForSelect = data => data?.map(item => ({ value: item._id, label: formatLabelText(item) }));

export const getPlanogramsDependsOnActions = (initialValues, values, demographyList, sizeList) => {
  const addedOrUpdatedPlanograms = values?.planograms?.map(planogram => {
    const foundProduct = planogram?.products?.find(item => item?.id === values.id);
    const isListed = planogram?.isListed ?? foundProduct?.isListed;
    return { id: planogram?.id, isListed };
  });
  const removedPlanograms = initialValues?.planograms
    .filter(planogramInValues => values?.planograms?.every(planogram => planogram.id !== planogramInValues.id))?.map(planogram => ({ id: planogram?.id }));
  if (addedOrUpdatedPlanograms.length > 0 || removedPlanograms.length > 0) {
    const foundSizes = values?.sizeIds?.map(sizeInValue => sizeList?.find(size => size?.id === sizeInValue));
    const foundDemography = demographyList.find(demography => demography.id === values.demographyId);

    return {
      product: {
        id: initialValues?.id,
        productId: initialValues?.planogramProductId,
        sizes: foundSizes?.map(size => ({ id: size?.id, name: size?.name })),
        demography: { name: foundDemography.name, id: foundDemography.id },
        isListed: values?.isListed,
        levelFourId: initialValues?.masterCategoryV2Id,
      },
      addedOrUpdatedPlanograms,
      removedPlanograms,
    };
  }
  return null;
};
