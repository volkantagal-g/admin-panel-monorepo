import * as Yup from 'yup';
import { fromPairs } from 'lodash';

import { AB_TEST_VARIABLE_NAME_PATTERN, PRODUCT_GROUP_HIERARCHY, PRODUCT_GROUP_PLACEMENT, PRODUCT_GROUP_TYPE } from '@app/pages/MarketProduct/constants';

export const getInitialValues = countryLanguages => {
  return {
    order: undefined,
    domainType: undefined,
    type: PRODUCT_GROUP_TYPE.MANUAL,
    name: fromPairs(countryLanguages.map(lang => [lang, ''])),
    placement: undefined,
    hierarchy: undefined,
    algorithmScenarioName: '',
    abTestVariableName: '',
    abTestValueId: '',
    scenarioVariant: '',
    filterScenarioNames: [],
  };
};

export const getValidationSchema = (_, { t, countryLanguages }) => {
  const requiredError = t('baseYupError:MIXED.REQUIRED');
  const typeError = t('baseYupError:MIXED.NOT_TYPE');
  const abTestVariableNamePatternError = t('AB_TEST_VARIABLE_NAME_VALIDATION_ERROR');

  return Yup.object({
    order: Yup.number().required(requiredError),
    domainType: Yup.number().required(requiredError),
    type: Yup.string().required(requiredError),
    name: Yup.object().shape(fromPairs(countryLanguages.map(lang => [lang, Yup.string({ min: 1 }).required(requiredError)]))).required(),
    placement: Yup.number().oneOf(Object.values(PRODUCT_GROUP_PLACEMENT), typeError).required(requiredError),
    hierarchy: Yup.string().oneOf(Object.values(PRODUCT_GROUP_HIERARCHY), typeError).required(requiredError),
    filterScenarioNames: Yup.array().of(Yup.string().required()),
    abTestVariableName: Yup.string().matches(AB_TEST_VARIABLE_NAME_PATTERN, abTestVariableNamePatternError).required(requiredError),
    abTestValueId: Yup.string().required(requiredError),
  })
    .when(({ type }, schema) => {
      if (type === PRODUCT_GROUP_TYPE.ALGORITHM) {
        return schema.shape({
          algorithmScenarioName: Yup.string().required(requiredError),
          scenarioVariant: Yup.string().required(requiredError),
        });
      }

      return schema.shape();
    });
};

export const getModifiedValues = values => {
  const newValues = { ...values, domainTypes: [Number(values.domainType)] };
  delete newValues.domainType;

  if (values.type === PRODUCT_GROUP_TYPE.MANUAL) {
    delete newValues.scenarioVariant;
    delete newValues.algorithmScenarioName;
  }

  return newValues;
};
