import * as Yup from 'yup';

import { customValidationNames } from './customValidations';
import { YUP_VALIDATION_TYPES } from './constants';
import { getTranslatedText } from './helpers';

const createYupSchema = t => (schema, config) => {
  const { name, validationType, validations = [] } = config;
  if (!Yup[validationType]) {
    return schema;
  }
  let validator = Yup[validationType]();

  validations.forEach(validation => {
    const { params, type, validationName, to, is, dependType, regex } = validation;

    const paramMsg = getTranslatedText(t, params);

    switch (type) {
      case YUP_VALIDATION_TYPES.REQUIRED:
        validator = validator[type](paramMsg);
        break;
      case YUP_VALIDATION_TYPES.TEST:
        validator = validator[type](validationName, paramMsg, customValidationNames[validationName]);
        break;
      case YUP_VALIDATION_TYPES.WHEN:
        validator = validator[type](to, {
          is,
          then: Yup[validationType]()[dependType](paramMsg),
        });
        break;
      case YUP_VALIDATION_TYPES.MATCHES:
        validator = validator[type](regex, { message: paramMsg });
        break;
      default:
        break;
    }
  });

  if (validator.tests.length === 0) {
    // eslint-disable-next-line no-param-reassign
    schema[name] = validator.nullable();
  }
  else {
    // eslint-disable-next-line no-param-reassign
    schema[name] = validator;
  }
  return schema;
};

const yupSchemaCreator = (t, formItemGroups) => {
  const yupSchemaArray = formItemGroups?.map(formItemGroup => formItemGroup.children.reduce(createYupSchema(t), {}));
  let yupSchema = {};
  yupSchemaArray?.forEach(schema => {
    yupSchema = { ...yupSchema, ...schema };
  });
  return Yup.object().shape(yupSchema);
};

export { yupSchemaCreator };
