import * as Yup from 'yup';
import { toString, get, fromPairs } from 'lodash';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { AB_TEST_VARIABLE_NAME_PATTERN, PRODUCT_GROUP_HIERARCHY, PRODUCT_GROUP_PLACEMENT, PRODUCT_GROUP_TYPE } from '@app/pages/MarketProduct/constants';

export const validationSchema = (_, { t, countryLanguages }) => {
  const requiredError = t('baseYupError:MIXED.REQUIRED');
  const typeError = t('baseYupError:MIXED.NOT_TYPE');
  const abTestVariableNamePatternError = t('AB_TEST_VARIABLE_NAME_VALIDATION_ERROR');

  return Yup.object({
    activeness: Yup.boolean(),
    order: Yup.number()
      .when('activeness', {
        is: true,
        then: Yup.number().required(requiredError),
      }),
    domainType: Yup.number().required(requiredError),
    name: Yup.object().shape(fromPairs(countryLanguages.map(lang => [lang, Yup.string({ min: 1 }).required(requiredError)]))).required(),
    placement: Yup.number().oneOf(Object.values(PRODUCT_GROUP_PLACEMENT), typeError).required(requiredError),
    hierarchy: Yup.string().oneOf(Object.values(PRODUCT_GROUP_HIERARCHY), typeError).required(requiredError),
    filterScenarioNames: Yup.array().of(Yup.string()),
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

const getModifiedValues = values => {
  const newValues = {
    ...values,
    domainTypes: [Number(values.domainType)],
  };
  delete newValues.domainType;
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const _initialValues = getModifiedValues(initialValues);
  const _values = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  setNullToEmptyStringDeep(changedValues);
  delete changedValues.type;
  delete changedValues.activeness;

  if (values.type === PRODUCT_GROUP_TYPE.MANUAL) {
    delete changedValues.scenarioVariant;
    delete changedValues.algorithmScenarioName;
  }

  return changedValues;
};

export const getInitialValues = (marketProductGroup, countryLanguages) => {
  return {
    activeness: get(marketProductGroup, 'activeness'),
    order: get(marketProductGroup, 'order'),
    domainType: toString(get(marketProductGroup, 'domainTypes.0')),
    type: get(marketProductGroup, 'type'),
    name: fromPairs(countryLanguages.map(lang => [lang, marketProductGroup?.name?.[lang]])),
    placement: get(marketProductGroup, 'placement'),
    abTestVariableName: get(marketProductGroup, 'abTestVariableName'),
    hierarchy: get(marketProductGroup, 'hierarchy'),
    algorithmScenarioName: get(marketProductGroup, 'algorithmScenarioName'),
    abTestValueId: get(marketProductGroup, 'abTestValueId'),
    scenarioVariant: get(marketProductGroup, 'scenarioVariant'),
    filterScenarioNames: get(marketProductGroup, 'filterScenarioNames', []),
  };
};
