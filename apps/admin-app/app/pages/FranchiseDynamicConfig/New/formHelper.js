import * as Yup from 'yup';

import { isEmpty } from 'lodash';

import moment from 'moment';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { t } from '@shared/i18n';
import { mandatoryDateFields } from '../constants';

/**
 * Get default validations based on the config type and field name
 *
 * @param {String} type
 * @param {String} name
 * @returns {Array}
 */
const getDefaultTypeValidations = (type, name) => {
  switch (type) {
    case 'objectId':
      return [
        {
          type: 'matches',
          params: [/^[0-9a-fA-F]{24}$/, t('franchiseDynamicConfig:VALIDATION.OBJECT_ID')],
        },
      ];
    case 'integer':
      return [
        {
          type: 'integer',
          params: [
            t('franchiseDynamicConfig:VALIDATION.INTEGER'),
          ],
        },
      ];
    case 'date':
      if (name === mandatoryDateFields.startDate || name === mandatoryDateFields.endDate) {
        return [
          {
            type: 'min',
            params: [
              moment().add(1, 'days').format('YYYY-MM-DD'),
              t('franchiseDynamicConfig:VALIDATION.DATE_MIN'),
            ],
          },
        ];
      }
      return [];
    default:
      return [];
  }
};

/**
 * Create Yup schema based on the config type fields
 *
 * @param {Array} fields
 * @returns {Object}
 * @example
 *
 * const fields = [
 *  {
 *   isRequired: true,
 *   name: 'firstname',
 *   type: 'string',
 *   validations: [
 *    {
 *      type: 'min',
 *      params: [5, 'Min 5 characters'],
 *    },
 *   ],
 *  }
 * ];
 *
 * const schema = createYupSchema(fields);
 * // schema equals to
 * {
 *   firstname: Yup.string().required().min(5, 'Min 5 characters'),
 * }
 */
export const createYupSchema = fields => {
  const schema = {};

  fields.forEach(field => {
    const { isRequired, name, type: fieldType, validations: fieldValidations } = field;

    const validations = getDefaultTypeValidations(fieldType, name);

    // We check for custom validations coming from API and concat them to the schema
    if (!isEmpty(fieldValidations)) {
      fieldValidations.forEach(({ type, params }) => {
        validations.push({
          type,
          params: params || [],
        });
      });
    }

    // If isRequired attirbute is set to true, we add required validation to the schema
    if (isRequired) {
      validations.push({
        type: 'required',
        params: [t('franchiseDynamicConfig:VALIDATION.REQUIRED')],
      });
    }

    // if it's end_date and if we have start_date add a validation
    if (name === mandatoryDateFields.endDate && fields.find(fieldItem => fieldItem.name === mandatoryDateFields.startDate)) {
      validations.push({
        type: 'min',
        params: [Yup.ref('start_date'), t('franchiseDynamicConfig:VALIDATION.END_DATE_MIN')],
      });
    }

    // We create the validator object based on the field type
    let validator = {
      boolean: Yup.boolean(),
      date: Yup.date(),
      integer: Yup.number().integer(),
      objectId: Yup.string(),
      string: Yup.string(),
      translation: YupMultiLanguage.string({ isRequired, max: null }),
      warehouseDomain: Yup.string(),
    }[fieldType];

    if (validator) {
      // We add custom validations to the validator object
      validations.forEach(({ type, params }) => {
        if (!validator[type]) {
          throw new Error(`Unknown validation type: ${type}`);
        }

        validator = validator[type](...params);
      });

      schema[name] = validator;
    }
  });

  return Yup.object(schema);
};

/**
 * Create default values based on the config type fields
 *
 * @param {Array} fields
 * @returns {Object}
 * @example
 * const fields = [
 * {
 *  name: 'firstname',
 *  type: 'string',
 * },
 * {
 *  name: 'explanation',
 *  type: 'translation',
 * }
 * ];
 * const defaultValues = createDefaultValues(fields);
 * // defaultValues equals to
 * {
 *  firstname: '',
 *  explanation: {
 *   tr: '',
 *   en: '',
 *  }
 * }
 */
export const createDefaultValues = fields => {
  const defaultValues = {};

  fields.forEach(field => {
    const { name, type, isRequired } = field;

    if (type === 'translation') {
      // We add this to not break <MultiLanguageInput /> component
      defaultValues[name] = { tr: '', en: '' };
    }
    else if (isRequired) {
      if (type === 'string') {
        defaultValues[name] = '';
      }
    }
  });

  return defaultValues;
};
