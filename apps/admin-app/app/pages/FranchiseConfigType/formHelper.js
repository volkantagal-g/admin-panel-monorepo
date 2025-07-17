import * as Yup from 'yup';

import { t } from '@shared/i18n';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { fieldTypes } from './constants';

// Note: Instead of using defaultValues and defaultFieldValues, we can use Yup's getDefault() method to get values,
// but it's not working with YupMultiLanguage (needs to be updated to support current interface).
// So, we have to use defaultValues and defaultFieldValues for a workaround.

export const defaultValues = {
  name: '',
  description: { tr: '', en: '' },
  fields: [],
};

export const defaultFieldValues = {
  name: '',
  label: { tr: '', en: '' },
  type: 'string',
  permissions: [],
  valueEnums: [],
  isRequired: false,
  isSelectable: false,
  isSortable: false,
  isHiddenFromListing: false,
};

Yup.addMethod(Yup.object, 'uniqueProperty', function uniqueProperty(propertyName, message) {
  return this.test('unique', message, function unique(value) {
    if (!value || !value[propertyName]) {
      return true;
    }

    if (this.parent.filter(v => v !== value).some(v => v[propertyName] === value[propertyName])) {
      throw this.createError({ path: `${this.path}.${propertyName}` });
    }

    return true;
  });
});

export const validationSchema = Yup.object({
  name: Yup.string().trim()
    .required(t('franchiseConfigType:VALIDATION.CONFIG_NAME_REQUIRED'))
    .matches(/^[\w\s]+$/i, t('franchiseConfigType:VALIDATION.CONFIG_NAME_REGEX')),
  description: YupMultiLanguage.string({
    isRequired: true,
    max: null,
  }),
  fields: Yup.array().of(
    Yup.object({
      name: Yup.string().trim()
        .required(t('franchiseConfigType:VALIDATION.FIELD_NAME_REQUIRED'))
        .matches(/^[\w\s]+$/i, t('franchiseConfigType:VALIDATION.FIELD_NAME_REGEX')),
      label: YupMultiLanguage.string({
        isRequired: true,
        max: null,
      }),
      type: Yup
        .string()
        .oneOf(fieldTypes.map(({ value }) => value))
        .required(t('franchiseConfigType:VALIDATION.FIELD_TYPE_REQUIRED')),
      permissions: Yup.array().of(Yup.string()),
      value_enums: Yup.array().of(Yup.string()),
      isRequired: Yup.boolean(),
      isSelectable: Yup.boolean(),
      isSortable: Yup.boolean(),
      isHiddenFromListing: Yup.boolean(),
    }).required().uniqueProperty('name', t('franchiseConfigType:VALIDATION.FIELD_NAME_UNIQUE')),
  ).required(t('franchiseConfigType:VALIDATION.FIELD_REQUIRED')),
});
