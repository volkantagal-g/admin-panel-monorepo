import * as Yup from 'yup';
import { TFunction } from 'react-i18next';
import { isNumber as _isNumber } from 'lodash';

import { FIELD_TYPES, ASSIGNABLE_STATUS, REGISTRATION_OWNERS } from '@app/pages/Employee/AssetManagement/constants';

const generateYupFieldSchema = ({ t, column }: {t: TFunction, column: any}) => {
  const { required = false, type: fieldType = '', fieldName = '' } = column || {};
  const { validationRules = [] } = column?.component || {};

  let validator: any;
  switch (fieldType) {
    case FIELD_TYPES.STRING:
      validator = Yup.string().trim();
      validationRules?.forEach((rule: any) => {
        if (rule.match) {
          validator = validator.matches(rule.match, t(`assetManagement:FORM_ERRORS.${rule.errorKey}`));
        }
      });
      break;
    case FIELD_TYPES.NUMBER:
      validator = Yup.number();
      validationRules?.forEach((rule: any) => {
        if (_isNumber(rule.min)) {
          validator = validator.min(rule.min, t(`assetManagement:FORM_ERRORS.${rule.errorKey}`));
        }

        if (_isNumber(rule.max)) {
          validator = validator.max(rule.max, t(`assetManagement:FORM_ERRORS.${rule.errorKey}`));
        }

        if (rule.typeError) {
          validator = validator.typeError(t(`assetManagement:FORM_ERRORS.${rule.errorKey}`));
        }

        if (rule.integer) {
          validator = validator.integer(t(`assetManagement:FORM_ERRORS.${rule.errorKey}`));
        }
      });
      break;
    case FIELD_TYPES.OBJECT_ID:
      validator = Yup.string().trim();
      validationRules?.forEach((rule: any) => {
        if (rule.match) {
          validator = validator.matches(rule.match, t(`assetManagement:FORM_ERRORS.${rule.errorKey}`));
        }
      });
      break;
    default:
      validator = Yup.string().trim();
      break;
  }

  // if assignableStatus is non-assignable, then assignableStatusReason is required
  // otherwise, assignableStatusReason is not required
  switch (fieldName) {
    case 'assignableStatusReason':
      validator = validator.when('assignableStatus', {
        is: ASSIGNABLE_STATUS.NON_ASSIGNABLE,
        then: validator.required(t('error:REQUIRED')),
      });
      validator = validator.when('assignableStatus', {
        is: ASSIGNABLE_STATUS.ASSIGNABLE,
        then: validator.notRequired().nullable(),
      });
      break;
    case 'financialLeasingCompany':
      validator = validator.when('registrationOwner', {
        is: (val: any) => val === REGISTRATION_OWNERS.FINANCIAL_RENTING,
        then: (schema: any) => schema.required(t('error:REQUIRED')).nullable(),
        otherwise: (schema: any) => schema.notRequired().nullable(),
      });
      break;
    case 'financialLeasingValidationDate':
      validator = validator.when('registrationOwner', {
        is: (val: any) => val === REGISTRATION_OWNERS.FINANCIAL_RENTING,
        then: (schema:any) => schema.required(t('error:REQUIRED')),
        otherwise: (schema: any) => schema.notRequired(),
      });
      break;
    case 'shortLongTermRentingCompany':
      validator = validator.when('registrationOwner', {
        is: (val: any) => val === REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING,
        then: (schema: any) => schema.required(t('error:REQUIRED')).nullable(),
        otherwise: (schema: any) => schema.notRequired().nullable(),
      });
      break;
    case 'shortLongTermRentingValidationDate':
      validator = validator.when('registrationOwner', {
        is: (val: any) => val === REGISTRATION_OWNERS.SHORT_LONG_TERM_RENTING,
        then: (schema: any) => schema.required(t('error:REQUIRED')),
        otherwise: (schema: any) => schema.notRequired(),
      });
      break;
    default:
      break;
  }

  if (required) {
    validator = validator?.required(t('error:REQUIRED'));
  }

  return validator;
};

export const getValidationSchema = (
  { t, columns } : { t: TFunction<'global | error'>, columns: any[] },
): Yup.ObjectSchema<any | undefined> => {
  const fieldSchemaArray = columns.map(column => ({ [column.fieldName]: generateYupFieldSchema({ t, column }) }));
  const mergedSchema = Object.assign({}, ...fieldSchemaArray);

  return Yup.object(mergedSchema);
};
