import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { hfssFoodCategoryTypes } from '@app/pages/MarketProduct/constantValues';
import { HFSS_FOOD_OR_DRINK_TYPE, HFSS_INDICATOR_TYPE } from '@app/pages/MarketProduct/constants';

export const validationSchema = (values, { isProductActive } = {}) => {
  const isHfss = values?.hfssInfo?.hfssIndicator === HFSS_INDICATOR_TYPE.HFSS;
  return (Yup.object().shape({
    hfssInfo: Yup.object().shape({
      hfssIndicator: Yup.string().required(),
      hfssFoodOrDrink: Yup.string().nullable(true),
      hfssFoodCategory: Yup.string()
        .when('a', (a, schema) => {
          if (!isHfss) {
            return schema.nullable(true);
          }
          if (isHfss || isProductActive) {
            return schema.required();
          }
          return schema;
        }),
      hfssNutrientProfileScore: Yup.number().nullable(true),
    }),
  })
  );
};

export const getHfssIndicatorTypeOptions = () => {
  return Object.values(HFSS_INDICATOR_TYPE).map(value => {
    return {
      value,
      label: value,
    };
  });
};

export const getHfssFoodOrDrinkTypeOptions = () => {
  return Object.values(HFSS_FOOD_OR_DRINK_TYPE).map(value => {
    return {
      value,
      label: value,
    };
  });
};

export const getHfssFoodCategoryTypeOptions = () => {
  return hfssFoodCategoryTypes.map(value => {
    return {
      value,
      label: value,
    };
  });
};

const getModifiedValues = values => {
  const newValues = { ...values, hfssInfo: values.hfssInfo };
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const modifiedInitialValues = getModifiedValues(initialValues);
  const modifiedValues = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(modifiedInitialValues, modifiedValues);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  const initialValues = {
    hfssInfo: {
      hfssIndicator: marketProduct?.hfssInfo?.hfssIndicator,
      hfssFoodOrDrink: marketProduct?.hfssInfo?.hfssFoodOrDrink,
      hfssFoodCategory: marketProduct?.hfssInfo?.hfssFoodCategory,
      hfssNutrientProfileScore: marketProduct?.hfssInfo?.hfssNutrientProfileScore,
    },
  };
  return initialValues;
};
