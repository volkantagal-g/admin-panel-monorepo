import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  taskCoverage: {
    cityIds: [],
    domainTypes: [],
    warehouseIds: [],
  },
  personIds: [],
  title: '',
  description: '',
  startDate: null,
  endDate: null,
  goal: {
    comparisonOperator: null,
    kpi: null,
    value: null,
  },
  adminOptions: {
    earlyFail: null,
    earlySuccess: null,
  },
  conditions: [],
  reward: {
    type: '',
    amount: null,
  },
  imageUrl: 'dummy-url',
  thumbnailUrl: 'dummy-url',
};
export const validationSchema = () => {
  return Yup.object().shape({
    adminOptions: Yup.object().shape({
      earlyFail: Yup.boolean().nullable(),
      earlySuccess: Yup.boolean().nullable(),
    }).test(
      'at-least-one-boolean',
      t('error:AT_LEAST_ONE_TRUE_OR_FALSE'),
      function (adminOptions) {
        const { earlyFail, earlySuccess } = adminOptions || {};
        if (earlyFail === null && earlySuccess === null) {
          return this.createError({ path: this.path, message: t('error:REQUIRED') });
        }
        return true;
      },
    ),
    taskCoverage: Yup.object().shape({
      domainTypes: Yup.array()
        .of(Yup.number().required(t('error:REQUIRED')))
        .min(1, t('courierGamificationPage:CREATE.CUSTOM_ERRORS.DOMAIN_TYPE_LENGTH')),
    }),
    title: Yup.string().trim().min(2)
      .max(64)
      .required(t('error:REQUIRED')),
    description: Yup.string().trim().min(2)
      .required(t('error:REQUIRED')),
    startDate: Yup.string()
      .required(t('error:REQUIRED')),
    endDate: Yup.string()
      .required(t('error:REQUIRED')),
    goal: Yup.object().shape({
      comparisonOperator: Yup.string().trim().min(1)
        .required(t('error:REQUIRED')),
      kpi: Yup.string()
        .required(t('error:REQUIRED')),
      value: Yup.number()
        .required(t('error:REQUIRED')),
    }),
    reward: Yup.object().shape({
      type: Yup.string().trim().min(1)
        .required(t('error:REQUIRED')),
      amount: Yup.number()
        .required(t('error:REQUIRED')),
    }),
    imageUrl: Yup.string()
      .required(t('error:REQUIRED')),
    conditions: Yup.array().of(
      Yup.object().shape({
        kpi: Yup.string().trim()
          .nullable()
          .test(
            'is-valid-kpi',
            t('error:REQUIRED'),
            function (value) {
              const { comparisonOperator, value: conditionValue } = this.parent;
              const anyFieldFilled = !!value || !!comparisonOperator || !!conditionValue;

              if (anyFieldFilled) {
                return !!value;
              }
              return true;
            },
          ),
        comparisonOperator: Yup.string().trim()
          .nullable()
          .test(
            'is-valid-comparisonOperator',
            t('error:REQUIRED'),
            function (comparisonOperator) {
              const { kpi, value: conditionValue } = this.parent;
              const anyFieldFilled = !!kpi || !!comparisonOperator || !!conditionValue;

              if (anyFieldFilled) {
                return !!comparisonOperator;
              }
              return true;
            },
          ),
        value: Yup.number()
          .nullable()
          .test(
            'is-valid-value',
            t('error:REQUIRED'),
            function (conditionValue) {
              const { kpi, comparisonOperator } = this.parent;
              const anyFieldFilled = !!kpi || !!comparisonOperator || !!conditionValue;

              if (anyFieldFilled) {
                return !!conditionValue;
              }
              return true;
            },
          ),
      }),
    ),

  });
};
