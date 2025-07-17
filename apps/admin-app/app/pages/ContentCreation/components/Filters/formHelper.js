import * as Yup from 'yup';

export const getInitialValues = () => {
  const initialValues = {
    promoCode: null,
    discount: null,
    discountProducts: null,
    conditionalProducts: null,
    minimumBasket: null,
    domainTypes: [],
    toneOfVoice: null,
    lifeStyle: null,
    occasion: null,
    timing: null,
    languages: ['en', 'tr'],
    aiTool: null,
  };
  return initialValues;
};

export const validationSchema = () => {
  const schema = Yup.object({
    languages: Yup.array()
      .of(Yup.string())
      .min(1, 'Select at least one language'),
  });
  return schema;
};

export const validateValuesBeforeSubmit = ({ values, t }) => {
  const { promoCode, discount } = values;
  if (!promoCode && !discount) {
    throw new Error(t('ERRORS.DOMAIN_OR_PROMO_CODE'));
  }
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  const newValues = {
    ...values,
    domainTypes: values?.domainTypes.map(domain => +domain),
    languages: values?.languages.map(lang => lang.toUpperCase()),
  };
  return newValues;
};

export const getTimingsOptions = () => {
  return ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night', 'Weekend', 'Weekday'].map(timing => {
    return {
      value: timing,
      label: timing,
    };
  });
};

export const getToneOfVoicesOptions = () => {
  return ['Friendly', 'Humorous', 'Appreciative', 'Direct', 'Reassuring', 'Exciting', 'Urgent'].map(voice => {
    return {
      value: voice,
      label: voice,
    };
  });
};

export const getPreferredAiToolsOptions = () => {
  return ['zephyr-pretrained', 'google-text-bison-2'].map(tool => {
    return {
      value: tool,
      label: tool,
    };
  });
};

export const languages = [{ label: 'Turkish', value: 'tr' }, { label: 'English', value: 'en' }];
