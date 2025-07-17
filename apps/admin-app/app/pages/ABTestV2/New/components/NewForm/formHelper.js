import * as Yup from 'yup';
import moment from 'moment';

import { MIN_EXPERIMENT_MOTIVATION_LIMIT, MIN_HTML_EXPERIMENT_MOTIVATION_LIMIT } from '../../../constants';
import { t } from '@shared/i18n';

export const getInitialValues = () => {
  const initialValues = {
    testName: '',
    testCode: '',
    testDomain: null,
    description: '',
    experimentMotivation: '',
    testStartDate: moment(),
    testEndDate: moment(),
    templateId: null,
    templateName: null,
    variations: [],
    variationsCount: null,
  };
  return initialValues;
};

export const validationSchema = () => {
  const reg = /^[a-zA-Z0-9\s]+$/;

  return Yup.object().shape({
    testName: Yup.string().required(),
    testCode: Yup.string().required(),
    testDomain: Yup.string()
      .required()
      .test('testDomain', t('error:INVALID'), newItem => {
        return reg.test(newItem);
      }),
    description: Yup.string().required(),
    experimentMotivation: Yup.string()
      .required()
      .test('experimentMotivation', t('abTestingV2Page:MIN_CHARACTERS'), value => {
        return value?.length > (value[0] === '<' ? MIN_HTML_EXPERIMENT_MOTIVATION_LIMIT : MIN_EXPERIMENT_MOTIVATION_LIMIT);
      }),
    testStartDate: Yup.date().required(),
    testEndDate: Yup.date().required(),
    templateId: Yup.string().required(),
    templateName: Yup.string().required(),
    variationsCount: Yup.number().required(),
    variations: Yup.array().of(
      Yup.object().shape({
        variationName: Yup.string().required(),
        variationDescription: Yup.string().required(),
        variationMechanism: Yup.string().required(),
      }),
    ),
  });
};

export const mapVariationsBeforeSubmit = variations => variations.map(variation => {
  const { totalCount, variationDescription, variationName, variationMechanism } = variation;
  return {
    totalCount,
    variationDescription,
    variationName,
    variationMechanism,
  };
});
