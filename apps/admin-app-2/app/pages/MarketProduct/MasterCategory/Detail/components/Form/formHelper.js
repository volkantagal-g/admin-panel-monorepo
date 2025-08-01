import _ from 'lodash';
import * as Yup from 'yup';

import { PRODUCT_MASTER_CATEGORY_LEVEL } from '@shared/shared/constants';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = values => {
  const isPickingOrderRequired = values.level && Number(values.level) === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS;
  return Yup.object()
    .shape({
      name: Yup.object().shape({
        tr: Yup.string().trim().min(2).required(),
        en: Yup.string().trim().min(2).required(),
      }),
      level: Yup.string().trim().required(),
      parent: !!values.level && Yup.string().trim().nullable(true)
        .when('a', (a, schema) => {
          if (Number(values.level) !== PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY) {
            return schema.required();
          }
          return schema;
        }),
      pickingOrder: isPickingOrderRequired && Yup.number().integer().moreThan(0).nullable(true)
        .required(),
      categoryRole: Yup.string().trim().nullable(true),
    });
};

const getModifiedInitialValues = values => {
  const level = _.toString(values.level);
  const newValues = { ...values, level };
  return newValues;
};

const getModifiedValues = values => {
  const newValues = { ...values };
  if (values.level) {
    delete newValues.level;
    if (Number(values.level) !== PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS) {
      delete newValues.pickingOrder;
    }
    if (Number(values.level) !== PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY) {
      delete newValues.categoryRole;
    }
  }

  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const _initialValues = getModifiedValues(initialValues);
  const _values = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = masterCategory => {
  const initialValues = {
    name: {
      en: _.get(masterCategory, 'name.en', null),
      tr: _.get(masterCategory, 'name.tr', null),
    },
    description: _.get(masterCategory, 'description', null),
    level: _.get(masterCategory, 'level', null),
    parent: _.get(masterCategory, 'parent', null),
    pickingOrder: _.get(masterCategory, 'pickingOrder', null),
    categoryRole: _.get(masterCategory, 'categoryRole', null),
  };

  return getModifiedInitialValues(initialValues);
};
