import * as Yup from 'yup';

import { get } from 'lodash';

import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      details: Yup.object()
        .shape({
          additionalInfos: YupMultiLanguage.string({
            min: null,
            max: null,
          }),
          disclaimer: YupMultiLanguage.string({
            min: null,
            max: null,
          }),
        }),
    })
  );
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  return {
    details: {
      ...(get(marketProduct, 'details', {})),
      additionalInfos: getLangDataOfItem(marketProduct, ['details', 'additionalInfos'], ''),
      disclaimer: getLangDataOfItem(marketProduct, ['details', 'disclaimer'], ''),
    },
  };
};
