import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

export const setSizeAndDemographyFields = (values, demographyList, sizeList) => {
  const foundSize = sizeList?.find(size => size?.id === values?.size);
  const foundDemography = demographyList?.find(demography => demography?.id === values?.demography);
  const newBodyValue = {
    planogramConfigurations: values?.planogramConfigurations?.map(planogram => ({
      planogramId: planogram.planogramId,
      name: planogram?.name,
      isListed: planogram?.isListed,
    })),
    additionalNote: values?.additionalNote,
    sizeConfiguration: foundSize ? { sizeId: foundSize?.id, sizeName: foundSize?.name } : undefined,
    demographyConfiguration: foundDemography ? { demographyId: foundDemography?.id, name: foundDemography?.name } : undefined,
  };
  Object.keys(newBodyValue).forEach(key => (newBodyValue[key] === undefined ? delete newBodyValue[key] : {}));
  return newBodyValue;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values, demographyList, sizeList }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  const setChangedValued = setSizeAndDemographyFields(changedValues, demographyList, sizeList);
  return setChangedValued;
};

export const validationSchema = () => Yup.object().shape({
  warehouseId: Yup.string().required(),
  sizeId: Yup.string().required(),
  demographyId: Yup.string().required(),
  warehouseType: Yup.string().required(),
  domainTypes: Yup.array().of(Yup.number()).required(),
});

export const getInitialValues = values => ({
  warehouseName: values?.name,
  warehouseId: values?.warehouseId,
  warehouseType: values?.warehouseType,
  domainTypes: values?.domainTypes,
  city: values?.city?.name[getLangKey()],
  region: values?.region?.name[getLangKey()],
  demographyId: values?.demographyId,
  sizeId: values?.sizeId,
});

export const selectFormatter = data => data?.map(item => ({ value: item.id, label: item.name }));
export const selectFormatterForWarehouses = (data, id) => data?.filter(item => item.id !== id)
  ?.map(filteredItem => ({ value: filteredItem.id, label: filteredItem?.warehouseDetails?.name, warehouse: filteredItem }));

export const getModifiedAddedData = (addedData, planograms) => {
  const newData = [];
  const planogramItems = {};
  planograms.forEach(planogram => {
    planogramItems[planogram?.id] = planogram;
  });
  addedData.forEach(item => {
    const foundPlanogram = planogramItems[item?.planogramId];
    newData.push({
      planogramId: item?.planogramId,
      name: foundPlanogram?.name,
      domainType: foundPlanogram?.domainType,
      isListed: item?.isListed ?? true,
      demographyId: foundPlanogram?.demographyId,
      demographyName: foundPlanogram?.demographyName,
      sizeId: foundPlanogram?.sizeId,
      sizeName: foundPlanogram?.sizeName,
    });
  });
  return newData;
};

export const getDomainTypes = types => {
  return types?.map(type => {
    const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === type);
    return foundType?.name[getLangKey()];
  });
};
