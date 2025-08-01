import { get } from 'lodash';

import * as Yup from 'yup';

import {
  imperialProductRefrigeratorTemperatureTypes,
  imperialProductStorageTypes,
  productDemandTypes, productRefrigeratorTemperatureTypes,
  productStorageTypes,
} from '@app/pages/MarketProduct/constantValues';
import { getLangKey } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getInitialValues = values => ({
  demandType: values?.demandType,
  storageType: values?.storageType,
  refrigeratorTemperature: values?.refrigeratorTemperature,
  isCreated: !!values?.productId,
});
export const validationSchema = () => Yup.object().shape({
  demandType: Yup.string(),
  storageType: Yup.string(),
  refrigeratorTemperature: Yup.string(),
});

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated };
};
export const getStorageTemperatureDemandType = (isImperialUnitUsed, typeOfStorageOrTemperature) => {
  let types;
  if (typeOfStorageOrTemperature === 'storage') {
    types = isImperialUnitUsed ? imperialProductStorageTypes : productStorageTypes;
  }
  else if (typeOfStorageOrTemperature === 'demand') {
    types = productDemandTypes;
  }
  else {
    types = isImperialUnitUsed ? imperialProductRefrigeratorTemperatureTypes : productRefrigeratorTemperatureTypes;
  }

  return Object.entries(types)
    .map(([key, value]) => {
      return {
        value: key,
        label: get(value, [getLangKey()], ''),
      };
    });
};
