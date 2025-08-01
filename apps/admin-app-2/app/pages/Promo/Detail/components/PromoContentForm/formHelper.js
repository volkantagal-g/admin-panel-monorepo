import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { contentSections } from '@app/pages/Promo/constantValues';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

export const validationSchema = (promo, isListingPromo) => {
  return () => Yup.object().shape({
    title: YupMultiLanguage.string({
      isRequired: true,
      max: isListingPromo ? 40 : 5000,
    }),
    description: YupMultiLanguage.string({ isRequired: true, max: 5000 }),
    accessibilityLabel: YupMultiLanguage.string({ isRequired: true, max: 5000 }),
    promoContentSectionTitle: YupMultiLanguage.string({ isRequired: true, max: 5000 }),
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  const contentTitles = values.promoContentSectionTitle;
  delete contentTitles?.['en-us'];
  return {
    ...values,
    promoContentSectionTitle: contentTitles,
  };
};

const getDefaultContentSection = () => {
  const selectedLanguages = getSelectedCountryLanguages();
  const options = selectedLanguages.reduce((acc, lang) => {
    acc[lang.toLowerCase()] = contentSections[lang.toLowerCase()];
    return acc;
  }, {});
  return options;
};

export const getContentSectionOptions = langKey => {
  const options = getDefaultContentSection();
  return [{
    label: options[langKey.toLowerCase()],
    value: options[langKey.toLowerCase()],
  }];
};

export const getInitialValues = promo => {
  const initialValues = {
    title: promo?.title,
    description: promo?.description,
    accessibilityLabel: promo?.accessibilityLabel,
    promoContentSectionTitle: promo?.promoContentSectionTitle ?? getDefaultContentSection(),

  };
  return initialValues;
};
