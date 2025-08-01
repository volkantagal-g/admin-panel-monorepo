import * as Yup from 'yup';

import { getListFromText, getTextFromList } from '../Preparation/utils';

export const validationSchema = () => {
  return Yup.object().shape({ ingredientsTr: Yup.string().required(), ingredientsEn: Yup.string().required() });
};

export const getInitialValues = ingredients => {
  const initialValues = {
    ingredientsTr: ingredients?.tr?.length ? getTextFromList(ingredients.tr) : '',
    ingredientsEn: ingredients?.en?.length ? getTextFromList(ingredients.en) : '',
  };
  return initialValues;
};

export const getModifiedValues = values => {
  const trText = values.ingredientsTr;
  const enText = values.ingredientsEn;

  const trTextHtml = getListFromText(trText);
  const enTextHtml = getListFromText(enText);

  return { ingredients: { tr: trTextHtml, en: enTextHtml } };
};
