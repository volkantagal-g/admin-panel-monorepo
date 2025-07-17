import * as Yup from 'yup';

import { getTextFromUnorderedHtmlList, getUnorderedHtmlListFromText } from './utils';

export const validationSchema = () => {
  return Yup.object().shape({ ingredientsTr: Yup.string().required(), ingredientsEn: Yup.string().required() });
};

export const getInitialValues = ingredients => {
  const initialValues = {
    ingredientsTr: ingredients?.tr ? getTextFromUnorderedHtmlList(ingredients.tr) : '',
    ingredientsEn: ingredients?.en ? getTextFromUnorderedHtmlList(ingredients.en) : '',
  };
  return initialValues;
};

export const getModifiedValues = values => {
  const trText = values.ingredientsTr;
  const enText = values.ingredientsEn;

  const trTextHtml = getUnorderedHtmlListFromText(trText);
  const enTextHtml = getUnorderedHtmlListFromText(enText);

  return { ingredients: { tr: trTextHtml, en: enTextHtml } };
};
