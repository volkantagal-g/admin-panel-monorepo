import * as Yup from 'yup';
import moment from 'moment';

export const getInitialValues = () => {
  const initialValues = {
    testName: '',
    testCode: '',
    description: '',
    testStartDate: moment(),
    testEndDate: moment(),
    testType: null,
    templateId: null,
    controlGroupPercentage: 50,
    testGroupPercentage: 50,
    variations: [],
  };

  // TODO manipulate initial values

  return initialValues;
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      testName: Yup.string().required(),
      testCode: Yup.string().required(),
      testDescription: Yup.string().required(),
      testStartDate: Yup.date().required(),
      testEndDate: Yup.date().required(),
      testType: Yup.number(),
      templateId: Yup.string().nullable(),
      variationsCount: Yup.number(),
      controlGroupPercentage: Yup.number(),
      testGroupPercentage: Yup.number(),
      variations: Yup.array().of(
        Yup.object().shape({
          variationName: Yup.string().required(),
          variationDescription: Yup.string().required(),
          canFileUpload: Yup.boolean(),
          variationFileURL: Yup.string().when('canFileUpload', {
            is: true,
            then: Yup.string().required(),
            otherwise: Yup.string(),
          }),
        }),
      ),
    });
};

export const mapVariationsBeforeSubmit = variations => variations.map(variation => {
  const { totalCount, variationDescription, variationFileURL, variationName } = variation;
  return {
    totalCount,
    variationDescription,
    variationFileURL,
    variationName,
  };
});
