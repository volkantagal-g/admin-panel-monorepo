import { setLocale } from 'yup';
import { isArray, isNumber } from 'lodash';

import { t, i18nPromise } from '@shared/i18n';

i18nPromise.then(() => {
  setLocale({
    mixed: {
      default: t('baseYupError:MIXED.DEFAULT'),
      required: t('baseYupError:MIXED.REQUIRED'),
      notType: t('baseYupError:MIXED.NOT_TYPE'),
    },
    string: {
      min: ({ min }) => {
        return t('baseYupError:STRING.MIN', { min });
      },
      max: ({ max }) => {
        return t('baseYupError:STRING.MAX', { max });
      },
      email: () => {
        return t('baseYupError:STRING.EMAIL');
      },
    },
    number: {
      min: ({ min }) => {
        return t('baseYupError:NUMBER.MIN', { min });
      },
      max: ({ max }) => {
        return t('baseYupError:NUMBER.MAX', { max });
      },
      positive: () => {
        return t('baseYupError:NUMBER.POSITIVE');
      },
      lessThan: ({ less }) => {
        return t('baseYupError:NUMBER.LESS_THAN', { less });
      },
      moreThan: ({ more }) => {
        return t('baseYupError:NUMBER.MORE_THAN', { more });
      },
      integer: () => {
        return t('baseYupError:NUMBER.INTEGER');
      },
    },
    array: {
      min: ({ min }) => {
        return t('baseYupError:ARRAY.MIN', { min });
      },
    },
    date: {
      min: ({ min }) => {
        return t('baseYupError:DATE.MIN', { min });
      },
      max: ({ max }) => {
        return t('baseYupError:DATE.MAX', { max });
      },
      required: () => {
        return t('baseYupError:DATE.REQUIRED');
      },
    },
  });
});

const getErrorsFromValidationError = validationError => {
  const FIRST_ERROR = 0;
  return validationError?.inner?.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

export const validate = (getValidationSchema, params = {}) => {
  return values => {
    const validationSchema = getValidationSchema(values, params);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    }
    catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

/**
 * NOTE: The reason for adding this function is,
 * yup request error path different than the CLASSICAL WAY when there is array of something in formik errors.
 *
 * CLASSICAL WAY for path: "additionalPropertyTables.0.sections.0.items.0.unit.tr"
 * YUP WAY for error path: "additionalPropertyTables[0].sections[0].items[0].unit.tr"
 *
 * @example getYupErrorPath(["additionalPropertyTables", 0, "sections", 0, "items", 0, "name", "en"]);
 * @return "additionalPropertyTables[0].sections[0].items[0].value.en"
 *
 * @example getYupErrorPath(["name", "de"]);
 * @return "name.de"
 *
 * @param {Array} path
 * @returns {String}
 */
export const getYupErrorPath = (path = []) => {
  let errorPath = '';
  if (!isArray(path)) return errorPath;

  path.forEach((pathItem, index) => {
    if (index === 0) {
      errorPath += pathItem;
    }
    else if (isNumber(pathItem)) {
      errorPath += `[${pathItem}]`;
    }
    else {
      errorPath += `.${pathItem}`;
    }
  });

  return errorPath;
};
