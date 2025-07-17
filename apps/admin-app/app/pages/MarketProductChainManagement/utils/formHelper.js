import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import {
  BOOLEAN_LABELS,
  DEMOGRAPHY_LABELS,
  DETAIL_INFO_KEYS,
  DETAIL_INFO_LABEL_MAPPING,
  DETAIL_INFO_SEPARATORS,
  getirMarketDomainTypes,
  SEGMENT_LABELS,
  SIZE_LABELS,
  STORAGE_TYPE_LABELS,
  WAREHOUSE_TYPE_LABELS,
} from '@app/pages/MarketProductChainManagement/constants';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

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

export function getLabels(types, labelType, language = getLangKey()) {
  if (typeof types === 'boolean') {
    return BOOLEAN_LABELS[types][language];
  }

  const labelSource = {
    domainTypes: getirMarketDomainTypes,
    demography: DEMOGRAPHY_LABELS,
    segment: SEGMENT_LABELS,
    size: SIZE_LABELS,
    storage_type: STORAGE_TYPE_LABELS,
    warehouseType: WAREHOUSE_TYPE_LABELS,
  }[labelType];

  if (!labelSource) {
    return Array.isArray(types) ? types.join(', ') : types;
  }

  const typeArray = Array.isArray(types) ? types : [types];
  return typeArray
    .map(type => labelSource[type]?.[language])
    .filter(label => label !== undefined)
    .join(', ');
}

const contentHandlers = {
  [DETAIL_INFO_KEYS.WAREHOUSE_TYPE]: (productData, contentKey) => {
    return getLabels(productData[contentKey], DETAIL_INFO_LABEL_MAPPING[DETAIL_INFO_KEYS.WAREHOUSE_TYPE]);
  },
  [DETAIL_INFO_KEYS.DOMAIN]: productData => {
    return productData.domainTypes.map(type => getLabels(type, DETAIL_INFO_LABEL_MAPPING[DETAIL_INFO_KEYS.DOMAIN]));
  },
  [DETAIL_INFO_KEYS.LOCAL]: (productData, contentKey) => {
    return getLabels(productData[contentKey], DETAIL_INFO_LABEL_MAPPING[DETAIL_INFO_KEYS.LOCAL]);
  },
};

export function getContent(key, contentKey, _data, mockData) {
  const productData = mockData('PRODUCT');
  const handler = contentHandlers[key];

  return handler
    ? handler(productData, contentKey)
    : getLabels(productData[contentKey], DETAIL_INFO_LABEL_MAPPING[key] || key.toLowerCase());
}

export function formatDisplayContent(key, content) {
  const separator = DETAIL_INFO_SEPARATORS[key] || DETAIL_INFO_SEPARATORS.DEFAULT;
  return Array.isArray(content) ? content.filter(Boolean).join(separator) : content;
}
