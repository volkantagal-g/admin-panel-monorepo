import * as Yup from 'yup';

import { MARKET_PRODUCT_MASTER_CATEGORY_STATUS, PRODUCT_MASTER_CATEGORY_LEVEL } from '@shared/shared/constants';

export const validationSchema = values => {
  const isParentRequired = values.level && Number(values.level) !== PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY;
  const isPickingOrderRequired = values.level && Number(values.level) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS;
  return Yup.object()
    .shape({
      name: Yup.object().shape({
        tr: Yup.string().trim().min(2).required(),
        en: Yup.string().trim().min(2).required(),
      }),
      level: Yup.string().trim().required(),
      parent: !!values.level && Yup.string().trim()
        .when('a', (a, schema) => {
          if (isParentRequired) {
            return schema.required();
          }
          return schema;
        }),
      pickingOrder: isPickingOrderRequired && Yup.number()
        .integer().moreThan(0).nullable(true)
        .required(),
      categoryRole: Yup.string().trim().nullable(true),
    });
};

const getModifiedInitialValues = values => {
  const newValues = { ...values };
  return newValues;
};

export const getInitialValues = () => {
  const initialValues = {
    name: {
      en: undefined,
      tr: undefined,
    },
    description: undefined,
    level: undefined,
    status: MARKET_PRODUCT_MASTER_CATEGORY_STATUS.INACTIVE,
    pickingOrder: undefined,
    categoryRole: undefined,
  };
  return getModifiedInitialValues(initialValues);
};
