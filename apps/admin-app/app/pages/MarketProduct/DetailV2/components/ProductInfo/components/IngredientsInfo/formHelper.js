import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = () => {
  return (Yup.object()
    .shape({ ingredients: YupMultiLanguage.string({ min: null, max: null }) })
  );
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  return { ingredients: getLangDataOfItem(marketProduct, ['ingredients'], '') };
};
