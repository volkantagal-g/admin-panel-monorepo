/* eslint-disable func-names */
import { TFunction } from 'i18next';
import * as Yup from 'yup';

interface IFeeArrayValidation {
  t: TFunction;
  required?: boolean;
}

export const feeArrayValidation = ({ t, required = false }: IFeeArrayValidation) => {
  let schema = Yup.array().of(
    Yup.object().shape({
      min: Yup.number().required().defined(),
      fee: Yup.number().required().defined(),
    }),
  )
    .min(2, t('ERRORS.MINIMUM_2_ITEMS'))
    .max(5, t('ERRORS.MAXIMUM_5_ITEMS'))
    .test(
      'first-item-min-should-be-0',
      t('ERRORS.FIRST_ITEM_MIN_SHOULD_BE_0'),
      function (value) {
        if (!value || value.length === 0) return true;
        if (value[0].min !== 0) {
          return this.createError({
            path: `${this.path}[0].min`,
            message: t('ERRORS.FIRST_ITEM_MIN_SHOULD_BE_0'),
          });
        }
        return true;
      },
    )
    .test(
      'no-negative-number',
      t('ERRORS.NO_NEGATIVE_NUMBER'),
      function (value) {
        if (!value) return true;
        for (let i = 0; i < value.length; i++) {
          if (value[i].min < 0) {
            return this.createError({
              path: `${this.path}[${i}].min`,
              message: t('ERRORS.NO_NEGATIVE_NUMBER'),
            });
          }
          if (value[i].fee < 0) {
            return this.createError({
              path: `${this.path}[${i}].fee`,
              message: t('ERRORS.NO_NEGATIVE_NUMBER'),
            });
          }
        }
        return true;
      },
    )
    .test(
      'min-values-not-increasing',
      t('ERRORS.MIN_VALUES_NOT_INCREASING'),
      function (value) {
        if (!value || value.length <= 1) return true;
        for (let i = 1; i < value.length; i++) {
          if (value[i].min <= value[i - 1].min) {
            return this.createError({
              path: `${this.path}[${i}].min`,
              message: t('ERRORS.MIN_VALUES_NOT_INCREASING'),
            });
          }
        }
        return true;
      },
    )
    .test(
      'fee-values-not-decreasing',
      t('ERRORS.FEE_VALUES_NOT_DECREASING'),
      function (value) {
        if (!value || value.length <= 1) return true;
        for (let i = 1; i < value.length; i++) {
          if (value[i].fee >= value[i - 1].fee) {
            return this.createError({
              path: `${this.path}[${i}].fee`,
              message: t('ERRORS.FEE_VALUES_NOT_DECREASING'),
            });
          }
        }
        return true;
      },
    )
    .test(
      'fifth-item-fee-should-be-0',
      t('ERRORS.LAST_ITEM_FEE_SHOULD_BE_0'),
      function (value) {
        const context = this.options.context as { isOnSubmit?: boolean };
        if (context && context.isOnSubmit) {
          return true;
        }
        if (!value || value.length < 5) return true;
        if (value[4].fee !== 0) {
          return this.createError({
            path: `${this.path}[4].fee`,
            message: t('ERRORS.LAST_ITEM_FEE_SHOULD_BE_0'),
          });
        }
        return true;
      },
    )
    .test(
      'last-item-fee-should-be-0',
      t('ERRORS.LAST_ITEM_FEE_SHOULD_BE_0'),
      function (value) {
        const context = this.options.context as { isOnSubmit?: boolean };
        if (!context || !context.isOnSubmit) {
          return true;
        }
        if (!value || value.length <= 1) return true;
        const index = value.length - 1;
        if (value[index].fee !== 0) {
          return this.createError({
            path: `${this.path}[${index}].fee`,
            message: t('ERRORS.LAST_ITEM_FEE_SHOULD_BE_0'),
          });
        }
        return true;
      },
    );

  if (required) {
    schema = schema.required();
  }

  return schema;
};

export const feeArrayValidationBulk = ({ t }: IFeeArrayValidation) => {
  return Yup.array().of(
    Yup.object().shape({
      min: Yup.number().required().defined(),
      fee: Yup.number().required().defined(),
    }),
  )
    .min(2, t('ERRORS.MINIMUM_2_ITEMS'))
    .max(5, t('ERRORS.MAXIMUM_5_ITEMS'))
    .test(
      'first-item-min-should-be-0',
      t('ERRORS.FIRST_ITEM_MIN_SHOULD_BE_0'),
      function (value) {
        if (!value || value.length === 0) return true;
        if (value[0].min !== 0) {
          return this.createError({
            path: `${this.path}[0].min`,
            message: t('ERRORS.FIRST_ITEM_MIN_SHOULD_BE_0'),
          });
        }
        return true;
      },
    )
    .test(
      'no-negative-number',
      t('ERRORS.NO_NEGATIVE_NUMBER'),
      function (value) {
        if (!value) return true;
        for (let i = 0; i < value.length; i++) {
          if (value[i].min < 0) {
            return this.createError({
              path: `${this.path}[${i}].min`,
              message: t('ERRORS.NO_NEGATIVE_NUMBER'),
            });
          }
          if (value[i].fee < 0) {
            return this.createError({
              path: `${this.path}[${i}].fee`,
              message: t('ERRORS.NO_NEGATIVE_NUMBER'),
            });
          }
        }
        return true;
      },
    )
    .test(
      'min-values-not-increasing',
      t('ERRORS.MIN_VALUES_NOT_INCREASING'),
      function (value) {
        if (!value || value.length <= 1) return true;
        for (let i = 1; i < value.length; i++) {
          if (value[i].min <= value[i - 1].min) {
            return this.createError({
              path: `${this.path}[${i}].min`,
              message: t('ERRORS.MIN_VALUES_NOT_INCREASING'),
            });
          }
        }
        return true;
      },
    )
    .test(
      'fee-values-not-decreasing',
      t('ERRORS.FEE_VALUES_NOT_DECREASING'),
      function (value) {
        if (!value || value.length <= 1) return true;
        for (let i = 1; i < value.length; i++) {
          if (value[i].fee >= value[i - 1].fee) {
            return this.createError({
              path: `${this.path}[${i}].fee`,
              message: t('ERRORS.FEE_VALUES_NOT_DECREASING'),
            });
          }
        }
        return true;
      },
    )
    .test(
      'last-item-fee-should-be-0',
      t('ERRORS.LAST_ITEM_FEE_SHOULD_BE_0'),
      function (value) {
        if (!value || value.length <= 1) return true;
        const index = value.length - 1;
        if (value[index].fee !== 0) {
          return this.createError({
            path: `${this.path}[${index}].fee`,
            message: t('ERRORS.LAST_ITEM_FEE_SHOULD_BE_0'),
          });
        }
        return true;
      },
    );
};
