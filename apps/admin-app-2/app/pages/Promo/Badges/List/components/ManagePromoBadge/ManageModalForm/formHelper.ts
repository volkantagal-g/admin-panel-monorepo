import * as Yup from 'yup';

import { badgePromoMechanics } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';
import { PromoBadge } from '../../../interfaces';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

const selectedLanguages = getSelectedCountryLanguages();

type TLanguageString = {
  [key: string]: string;
};

const validateAfterRemovingVariables = (min: number, max: number) => Yup.lazy(
  (value: TLanguageString) => Yup.object().shape(
    Object.keys(value).reduce((acc, lang) => {
      acc[lang] = Yup.string()
        .transform(str => str.replace(
          /REQUIRED_PRODUCT_COUNT|REQUIRED_PRODUCT_AMOUNT|MAX_ITEM_COUNT|DISCOUNT_AMOUNT|DISCOUNTED_PRICE|MIN_REQUIRED_ITEM_COUNT/g,
          '',
        ))
        .required()
        .min(min)
        .max(max);
      return acc;
    }, {} as Record<string, Yup.StringSchema>),
  ) as Yup.ObjectSchema<Yup.Shape<TLanguageString, TLanguageString>>,
);

export const mapLanguagesToStrings = (languages: string[], str = '') => {
  const languageString = {} as TLanguageString;
  languages.forEach(lang => {
    languageString[lang] = str;
  });
  return languageString;
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required().min(3).max(50),
    promoMechanic: Yup.number().required(),
    productListingPage: validateAfterRemovingVariables(3, 15),
    productDetailPage: validateAfterRemovingVariables(3, 41),
    basketNotApplied: validateAfterRemovingVariables(3, 35),
    basketApplied: validateAfterRemovingVariables(3, 35),
  });
};

export const getPromoMechanicOptions = () => {
  return Object.entries(badgePromoMechanics).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getModifiedValuesBeforeSubmit = (values: Partial<PromoBadge>) => {
  const promoMechanic = +values.promoMechanic!;
  const {
    productListingPage,
    productDetailPage,
    basketNotApplied,
    basketApplied,
  } = values;

  const newValues = {
    ...values,
    promoMechanic,
    productListingPage: productListingPage!,
    productDetailPage: productDetailPage!,
    basketNotApplied: basketNotApplied!,
    basketApplied: basketApplied!,
  };
  return newValues;
};

export const getInitialValues = (promoBadge: PromoBadge | null) => {
  const initialValues = {
    _id: promoBadge?._id,
    name: promoBadge?.name ?? '',
    promoMechanic: promoBadge?.promoMechanic,
    productListingPage:
      promoBadge?.productListingPage ??
      mapLanguagesToStrings(selectedLanguages),
    productDetailPage:
      promoBadge?.productDetailPage ?? mapLanguagesToStrings(selectedLanguages),
    basketNotApplied:
      promoBadge?.basketNotApplied ?? mapLanguagesToStrings(selectedLanguages),
    basketApplied:
      promoBadge?.basketApplied ?? mapLanguagesToStrings(selectedLanguages),
  };
  return initialValues;
};
