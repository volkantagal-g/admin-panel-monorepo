import * as Yup from 'yup';
import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { MIN_EXPERIMENT_MOTIVATION_LIMIT, MIN_HTML_EXPERIMENT_MOTIVATION_LIMIT } from '@app/pages/ABTestV2/constants';
import { t } from '@shared/i18n';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      testName: Yup.string().required(),
      testCode: Yup.string().required(),
      description: Yup.string().required(),
      testStartDate: Yup.date().required(),
      testEndDate: Yup.date().required(),
      experimentMotivation: Yup.string()
        .required()
        .test('experimentMotivation', t('abTestingV2Page:MIN_CHARACTERS'), value => {
          return value?.length > (value[0] === '<' ? MIN_HTML_EXPERIMENT_MOTIVATION_LIMIT : MIN_EXPERIMENT_MOTIVATION_LIMIT);
        }),
      owners: Yup.array().required(),
      variations: Yup.array().of(
        Yup.object().shape({ variationDescription: Yup.string().required(), variationMechanism: Yup.string().required() }),
      ),
    });
};

export const destructTestData = testData => {
  const { testName, testStartDate, testEndDate, description, owners = [], variations, experimentMotivation, excludeDate, testDomain, testCode } = testData;

  const formattedExcludeList = [];
  const currentOwner = [];

  if (excludeDate?.length > 0) {
    excludeDate.map(element => formattedExcludeList.push({
      startDate: element.startDate,
      endDate: element.endDate,
    }));
  }

  if (owners?.length > 0) {
    owners.map(item => currentOwner.push({ name: item.label, id: item.value }));
  }

  return {
    testName,
    testCode,
    testEndDate: moment(testEndDate).format(DEFAULT_DATE_FORMAT),
    testStartDate: moment(testStartDate).format(DEFAULT_DATE_FORMAT),
    description,
    owners: currentOwner,
    variations,
    experimentMotivation,
    excludeDate: formattedExcludeList,
    testDomain,
  };
};
