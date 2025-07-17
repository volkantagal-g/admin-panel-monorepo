import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { PAGE_TYPES } from '@shared/constants/marketing/pageTypes';
import { NOTIFICATION_STATUS, NOTIF_REGION, TEMPLATE_FIELDS } from '@app/pages/PushNotification/constants';
import { DRAFT_TYPES } from '@shared/components/Marketing/DraftImporter/constant';

export const NormalizePushNotificationFormValues = (values, type) => {
  const [startDate, dueDate] = values?.validDates || [];
  const selectedCountry = getSelectedCountry();
  let tempValues = {
    ...values,
    startDate: startDate.toISOString(),
    dueDate: dueDate.toISOString(),
    targetCountry: selectedCountry._id,
  };

  // Fe - content: { tr: {"title": "string",...}, en: { "title": "string",... } }
  // Backend Accept - content: [ { phoneLanguage:'tr', title: 'string',... }, { phoneLanguage:'en', title: 'string',... } ]
  tempValues.contents = values.phoneLanguages.map(lang => ({
    phoneLanguage: lang,
    title: values.contents[lang].title,
    message: values.contents[lang].message,
    imageName: values.contents[lang].imageName,
  }));

  // Fe - { template: { type:'number', draft: {"id": "string",query:[]} || csv: { "csvName": "string",originalFileName:'string' } } }
  // Backend Accept -{ template: { type:'number', draftId: 'string',draftQuery:'string',csvName:'string',originalFileName:'string'} }
  TEMPLATE_FIELDS.forEach(templateField => {
    if (values[templateField].type === DRAFT_TYPES.CSV || values[templateField].type === DRAFT_TYPES.DRAFT) {
      tempValues[templateField] = {
        type: values[templateField].type,
        draftId: values[templateField].draft?.id,
        draftQuery: values[templateField].draft?.query,
        csvName: values[templateField].csv?.csvName,
        originalFileName: values[templateField].csv?.originalFileName,
      };
    }
  });

  // Sample promo obj /*{ "value": "55dc2f7d48f5ff910187cc71", "label": [ "5TLODE20TLYAP2"] }*/
  if (values.promo) {
    tempValues.promo = { _id: values.promo.value, promoCode: values.promo.label[0] };
  }

  // Remove Unnecessary Fields
  delete tempValues.phoneLanguages;
  delete tempValues.validDates;

  if (!values.excludedTemplate.type) {
    if (type === PAGE_TYPES.PUSH_NOTIFICATION_NEW) {
      delete tempValues.excludedTemplate;
    }
    else {
      tempValues.excludedTemplate = {};
    }
  }
  if (!values.template.type) {
    delete tempValues.template;
  }

  if (values?.daysOfWeek) {
    const daysOfWeek = values.daysOfWeek.map(cell => {
      return cell[1] + 1;
    });
    tempValues = {
      ...tempValues,
      daysOfWeek,
    };
  }

  if (type === PAGE_TYPES.PUSH_NOTIFICATION_NEW) {
    tempValues.status = NOTIFICATION_STATUS.INACTIVE;
  }

  tempValues.targetArea = NOTIF_REGION.NO_REGION;

  return tempValues;
};
