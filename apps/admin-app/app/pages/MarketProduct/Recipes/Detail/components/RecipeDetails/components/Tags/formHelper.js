import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = () => {
  return Yup.object().shape({
    tags: Yup.object({
      tr: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().when('type', {
            is: 'freeText',
            then: Yup.string().required('VALIDATION.REQUIRED_FIELD'),
            otherwise: Yup.string(),
          }),
          type: Yup.string().required('VALIDATION.REQUIRED_FIELD'),
        }),
      ),
      en: Yup.array().of(
        Yup.object().shape({
          text: Yup.string().when('type', {
            is: 'freeText',
            then: Yup.string().required('VALIDATION.REQUIRED_FIELD'),
            otherwise: Yup.string(),
          }),
          type: Yup.string().required('VALIDATION.REQUIRED_FIELD'),
        }),
      ),
    }),
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = recipe => {
  return { tags: recipe?.tags || [] };
};
