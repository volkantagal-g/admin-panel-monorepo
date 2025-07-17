import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';

export const validationSchema = () => Yup.object().shape({
  sizeId: Yup.string().required(),
  demographyId: Yup.string().required(),
  warehouseId: Yup.string().required(),
});

export const getInitialValues = values => ({
  warehouseName: values?.name,
  warehouseId: values?.warehouseId,
  warehouseType: values?.warehouseType,
  domainTypes: values?.domainTypes,
  city: values?.city?.name[getLangKey()],
  region: values?.region?.name[getLangKey()],
  demographyId: values?.demographyId || null,
  sizeId: values?.sizeId || null,
});

export const selectFormatter = data => data?.map(item => ({ value: item.id, label: item.name }));
export const selectFormatterForWarehouses = data => data?.map(item => ({ value: item.id, label: item?.warehouseDetails?.name, warehouse: item }));

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
export const setSizeAndDemographyForRequest = ({ planogramConfigurations, warehouseId, additionalNote, ...values }) => ({
  demographyConfiguration: { demographyId: values?.demography },
  sizeConfiguration: { sizeId: values?.sizes },
  planogramConfigurations,
  warehouseId,
  additionalNote,
});

export const getDomainTypes = types => {
  return types?.map(type => {
    const foundType = PLANOGRAM_PRODUCT_DOMAIN_TYPES.find(domainType => domainType?.key === type);
    return foundType?.name?.[getLangKey()];
  });
};
