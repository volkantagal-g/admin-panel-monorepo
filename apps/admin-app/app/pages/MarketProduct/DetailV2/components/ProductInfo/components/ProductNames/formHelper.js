import * as Yup from 'yup';
import { get } from 'lodash';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

export const validationSchema = (values, { isProductActive } = {}) => {
  const countryLanguages = getSelectedCountryLanguages();
  const isAnyShortDescriptionEntered = countryLanguages.some(countryLanguage => !!get(values, ['shortDescription', countryLanguage]));
  return (Yup.object()
    .shape({
      name: YupMultiLanguage.string({ isRequired: true, isValidationSkipped: !isProductActive }),
      displayName: YupMultiLanguage.string({ isRequired: true, isValidationSkipped: !isProductActive }),
      shortName: YupMultiLanguage.string({ isRequired: true, isValidationSkipped: !isProductActive }),
      shortDescription: isAnyShortDescriptionEntered && YupMultiLanguage.string(),
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
    name: getLangDataOfItem(marketProduct, ['name'], ''),
    shortName: getLangDataOfItem(marketProduct, ['shortName'], ''),
    displayName: getLangDataOfItem(marketProduct, ['displayName'], ''),
    shortDescription: getLangDataOfItem(marketProduct, ['shortDescription'], ''),
  };
};
