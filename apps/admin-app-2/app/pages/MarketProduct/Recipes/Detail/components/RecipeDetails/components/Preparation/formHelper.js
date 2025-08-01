import * as Yup from 'yup';

import { getTextFromList, getListFromText } from './utils';

export const validationSchema = () => {
  return Yup.object().shape({ preparationTr: Yup.string().required(), preparationEn: Yup.string().required() });
};

export const getInitialValues = preparation => {
  const initialValues = {
    preparationTr: preparation?.tr?.length ? getTextFromList(preparation.tr) : '',
    preparationEn: preparation?.en?.length ? getTextFromList(preparation.en) : '',
  };
  return initialValues;
};

export const getModifiedValues = values => {
  const trText = values.preparationTr;
  const enText = values.preparationEn;

  const trTextHtml = getListFromText(trText);
  const enTextHtml = getListFromText(enText);

  return { preparation: { tr: trTextHtml, en: enTextHtml } };
};
