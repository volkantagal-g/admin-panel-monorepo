import moment from 'moment';

import { getSelectedCountry, getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getLangKey, t } from '@shared/i18n';
import { SMS_STATUS, TEMPLATE_FIELDS } from '@app/pages/Sms/constants';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = values => {
  const [startDate, dueDate] = values.validDates;
  const tempValues = {
    ...values,
    startDate: startDate.toISOString(),
    endDate: dueDate.toISOString(),
  };
  delete tempValues.validDates;

  // Fe - content: { tr: {"designId": "string",...}, en: { "designId": "string",... } }
  // Backend Accept - content: [ { phoneLanguage:'tr', message: 'string',... }, { phoneLanguage:'en', message: 'string',... } ]
  tempValues.contents = values.phoneLanguages.map(lang => ({
    phoneLanguage: lang,
    message: values.contents[lang].message,
  }));

  // Fe - { template: { type:'number', csv: { "csvName": "string", originalFileName:'string' } } }
  // Backend Accept -{ template: { type:'number', csv: { "name": "string", originalName:'string' } } }
  TEMPLATE_FIELDS.forEach(templateField => {
    if (values[templateField].type === DRAFT_TYPES.CSV) {
      tempValues[templateField].csv = {
        name: values[templateField].csv?.csvName,
        originalFileName: values[templateField].csv?.originalFileName,
      };
    }
  });

  tempValues.status = SMS_STATUS.INACTIVE;
  return tempValues;
};

export const getInitialValues = () => {
  const selectedCountry = getSelectedCountry();

  return {
    country: { label: selectedCountry.name[getLangKey()], value: selectedCountry._id },
    validDates: [moment().add(15, 'minutes'), moment().endOf('day')],
    phoneLanguages: getSelectedCountryLanguages(),
    clientImportTemplate: { type: 1 },
  };
};
