import * as Yup from 'yup';
import moment from 'moment';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      testName: Yup.string().required(),
      testDescription: Yup.string().required(),
      testStartDate: Yup.date().required(),
      testEndDate: Yup.date().required(),
      owners: Yup.array().nullable(),
    });
};

export const destructTestData = testData => {
  const { testName, testStartDate, testEndDate, testDescription, owners = [] } = testData;
  return {
    testName,
    testStartDate: moment(testStartDate),
    testEndDate: moment(testEndDate),
    testDescription,
    owners: owners.map(owner => owner.value || owner._id),
  };
};
