import moment from 'moment';

import { getSelectedCountry, getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getLangKey, t } from '@shared/i18n';
import { EMAIL_STATUS, TEMPLATE_FIELDS } from '@app/pages/Email/constants';
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

  // Fe - { clientImportTemplate: { type:'number', csv: { "csvName": "string", originalFileName:'string' } } }
  // Backend Accept -{ clientImportTemplate: { type:'number', csv: { "name": "string", originalName:'string' } } }
  TEMPLATE_FIELDS.forEach(templateField => {
    if (values[templateField].type === DRAFT_TYPES.CSV) {
      tempValues[templateField].csv = {
        name: values[templateField].csv?.csvName,
        originalName: values[templateField].csv?.originalFileName,
      };
    }
  });

  tempValues.status = EMAIL_STATUS.INACTIVE;
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
