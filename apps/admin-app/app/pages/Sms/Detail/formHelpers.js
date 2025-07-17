import moment from 'moment';

import { t } from '@shared/i18n';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { TEMPLATE_FIELDS } from '@app/pages/Sms/constants';
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

  // Fe - content: { tr: {"message": "string",...}, en: { "message": "string",... } }
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

  return tempValues;
};

export const getInitialValues = values => {
  const contents = {};
  const phoneLanguages = [];

  // Fe Handle With - contents: { tr: {"message": "string",...}, en: { "message": "string",... } }
  // Backend Response - contents: [ { phoneLanguage:'tr', message: 'string',... }, { phoneLanguage:'en', message: 'string',... } ]
  values?.contents?.forEach(({ phoneLanguage, message }) => {
    phoneLanguages.push(phoneLanguage);
    contents[phoneLanguage] = { message };
  });

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  const validFrom = moment(moment.utc(values.startDate).tz(selectedCountryPrimaryTimeZone).format(dateFormat));
  const validUntil = moment(moment.utc(values.endDate).tz(selectedCountryPrimaryTimeZone).format(dateFormat));

  const tempValues = {
    phoneLanguages,
    validDates: [validFrom, validUntil],
    contents,
  };

  // Fe Handle With - { template: { type:'number', csv: { "csvName": "string",originalFileName:'string' } } }
  // Backend Response -{ template: { type:'number',  csv: { "name": "string",originalFileName:'string' } } }
  if (values?.clientImportTemplate) {
    tempValues.clientImportTemplate = { type: values?.clientImportTemplate?.type };
    if (values.clientImportTemplate.type === DRAFT_TYPES.CSV) {
      tempValues.clientImportTemplate = {
        ...tempValues.clientImportTemplate,
        csv: { csvName: values.clientImportTemplate?.csv?.name, originalFileName: values.clientImportTemplate?.csv?.originalFileName },
      };
    }

    if (values?.clientImportTemplate?.type === DRAFT_TYPES.DRAFT) {
      tempValues.clientImportTemplate = {
        ...tempValues.clientImportTemplate,
        draft: { id: values?.clientImportTemplate?.draft.id, query: values?.clientImportTemplate?.draft.query },
      };
    }
  }

  return {
    ...values,
    ...tempValues,
  };
};
