import * as Yup from 'yup';
import moment from 'moment';
import { mapValues } from 'lodash';

import { t } from '@shared/i18n';
import { PARAMETER_TYPE } from '../../../constants';

const csvArrayOfObjectValidationSchema = Yup.array().of(Yup.lazy(obj => Yup.object(mapValues(obj, () => Yup.mixed()))));
export const getReportValidationFromReportType = (reportType, readOnly) => {
  let schema = Yup.object().shape({
    name: Yup.object()
      .shape({
        tr: Yup.string().trim().required(t('error:REQUIRED')),
        en: Yup.string().trim().required(t('error:REQUIRED')),
      })
      .required(t('error:REQUIRED')),
  });
  reportType.parameters.forEach(param => {
    const { type, variableName, dropdownOptions, isOptional, includeCurrentDay, isMultiSelect, isFutureDatesEnabled } = param;

    let paramSchema = null;

    switch (type) {
      case PARAMETER_TYPE.date:
        paramSchema = Yup.date();
        if (!includeCurrentDay && !isFutureDatesEnabled) {
          paramSchema = paramSchema.test('current-day-test', 'Cannot be current day', value => {
            if (moment().startOf('day').isBefore(moment(value))) {
              return false;
            }
            return true;
          });
        }
        break;
      case PARAMETER_TYPE.boolean:
        paramSchema = Yup.boolean();
        break;
      case PARAMETER_TYPE.string:
        paramSchema = Yup.string().trim();
        break;
      case PARAMETER_TYPE.number:
        paramSchema = Yup.number();
        break;
      case PARAMETER_TYPE.dropdown:
        paramSchema = isMultiSelect
          ? Yup.mixed()
          : Yup.mixed().oneOf(dropdownOptions.map(opt => opt.optionValue));
        break;
      case PARAMETER_TYPE.csvArrayOfObject:
        paramSchema = csvArrayOfObjectValidationSchema;
        break;
      case PARAMETER_TYPE.s3CsvUpload:
        paramSchema = Yup.string().trim();
        break;
      default:
        paramSchema = Yup.array().of(Yup.string());
        break;
    }
    if (!isOptional && !readOnly) {
      paramSchema = paramSchema.required(t('error:REQUIRED'));
    }
    else if (isOptional && !readOnly) {
      paramSchema = paramSchema.nullable();
    }

    schema = schema.shape({ [variableName]: paramSchema });
  });

  return schema;
};
