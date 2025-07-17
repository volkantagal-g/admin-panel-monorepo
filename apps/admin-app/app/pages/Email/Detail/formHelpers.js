import moment from 'moment';

import { t } from '@shared/i18n';
// eslint-disable-next-line no-unused-vars
import { getSelectedCountry, getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { TEMPLATE_FIELDS } from '@app/pages/Email/constants';
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
    dueDate: dueDate.toISOString(),
  };
  delete tempValues.validDates;

  // Fe - content: { tr: {"designId": "string",...}, en: { "designId": "string",... } }
  // Backend Accept - content: [ { phoneLanguage:'tr', designId: 'string',... }, { phoneLanguage:'en', designId: 'string',... } ]
  tempValues.contents = values?.phoneLanguages.map(lang => ({
    phoneLanguage: lang,
    designId: values?.contents[lang]?.designId,
    senderEmail: values?.contents[lang]?.senderEmail,
    senderName: values?.contents[lang]?.senderName,
  }));

  // Fe - { template: { type:'number', csv: { "csvName": "string", originalFileName:'string' } } }
  // Backend Accept -{ template: { type:'number', csv: { "name": "string", originalName:'string' } } }
  TEMPLATE_FIELDS.forEach(templateField => {
    if (values[templateField].type === DRAFT_TYPES.CSV) {
      tempValues[templateField].csv = {
        name: values[templateField].csv?.csvName,
        originalName: values[templateField].csv?.originalFileName,
      };
    }
  });

  return tempValues;
};

export const getInitialValues = values => {
  // Fe Handle With - contents: { tr: {"title": "string",...}, en: { "title": "string",... } }
  // Backend Response - contents: [ { phoneLanguage:'tr', title: 'string',... }, { phoneLanguage:'en', title: 'string',... } ]
  const contents = {};
  const phoneLanguages = [];
  values?.contents?.forEach(({ phoneLanguage, designId, senderEmail, senderName }) => {
    phoneLanguages.push(phoneLanguage);
    contents[phoneLanguage] = { designId, senderEmail, senderName };
  });

  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  const validFrom = moment(moment.utc(values.startDate).tz(selectedCountryPrimaryTimeZone).format(dateFormat));
  const validUntil = moment(moment.utc(values.dueDate).tz(selectedCountryPrimaryTimeZone).format(dateFormat));

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
        csv: { csvName: values.clientImportTemplate?.csv?.name, originalFileName: values.clientImportTemplate?.csv?.originalName },
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
