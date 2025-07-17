import { isFinite, isInteger, isNil } from 'lodash';
import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

const validateConditionalNumericField = (value, yupTestContext, requiredMessageKey, invalidFormatMessageKey, t) => {
  const { showUnitCountText } = yupTestContext.options.context || {};
  const isValueFormatValid = val => typeof val === 'number' && isInteger(val) && val >= 1;

  if (showUnitCountText === true) {
    if (isNil(value)) {
      return yupTestContext.createError({
        path: yupTestContext.path,
        message: t(requiredMessageKey),
      });
    }
    if (!isValueFormatValid(value)) {
      return yupTestContext.createError({
        path: yupTestContext.path,
        message: t(invalidFormatMessageKey),
      });
    }
  }

  return true;
};

export const validationSchema = (values, { t, upperLimit, domainUpperLimits }) => {
  return (Yup.object()
    .shape({
      showUnitCountText: Yup.boolean().required(),
      weightInfo: Yup.object().shape({
        initialWeight: Yup.number().when('a', (a, schema) => {
          return schema
            .min(0)
            .test(
              'minimumWeightControl',
              t('WEIGHT_INFO.ERROR.STARTING_WEIGHT_MUST_BE_GREATER_OR_EQUAL_MINIMUM_WEIGHT'),
              initialWeight => {
                return initialWeight >= values.weightInfo.minimumWeight;
              },
            )
            .test(
              'upperLimitControl',
              t('WEIGHT_INFO.ERROR.STARTING_WEIGHT_MUST_BE_LESS_OR_EQUAL_MAX_ORDER_WEIGHT'),
              initialWeight => {
                if (isFinite(upperLimit)) {
                  return initialWeight <= upperLimit;
                }
                return true;
              },
            )
            .test(
              'domainUpperLimitControl',
              t('WEIGHT_INFO.ERROR.STARTING_WEIGHT_MUST_BE_LESS_OR_EQUAL_DOMAIN_BASED_SALE_RESTRICTION'),
              initialWeight => {
                if (domainUpperLimits?.length) {
                  const areSomeLimitsLessThanThanInitialWeight = domainUpperLimits
                    .some(({ upperLimit: domainUpperLimit } = {}) => domainUpperLimit > 0 && initialWeight > domainUpperLimit);
                  return !areSomeLimitsLessThanThanInitialWeight;
                }
                return true;
              },
            )
            .required();
        }),
        amountOfWeightIncrement: Yup.number().when('a', (a, schema) => {
          return schema.min(0).required();
        }),
        minimumWeight: Yup.number().when('a', (a, schema) => {
          return schema.min(0).required();
        }),
        approximatePieceDeviation: Yup.number().nullable()
          .test(
            'showUnitCountTextControlForApproximatePieceDeviation',
            t('WEIGHT_INFO.ERROR.APPROXIMATE_PIECE_DEVIATION_IS_NOT_AVAILABLE'),
            function handleApproximatePieceDeviationLogic(value) {
              return validateConditionalNumericField(
                value,
                this,
                'WEIGHT_INFO.ERROR.APPROXIMATE_PIECE_DEVIATION_REQUIRED_WHEN_SHOW_UNIT_COUNT_TEXT_IS_TRUE',
                'WEIGHT_INFO.ERROR.APPROXIMATE_PIECE_DEVIATION_INVALID_FORMAT_OR_RANGE',
                t,
              );
            },
          ),
        averagePieceGram: Yup.number().nullable()
          .test(
            'showUnitCountTextControlForAveragePieceGram',
            t('WEIGHT_INFO.ERROR.AVERAGE_PIECE_GRAM_IS_NOT_AVAILABLE'),
            function handleAveragePieceGramLogic(value) {
              return validateConditionalNumericField(
                value,
                this,
                'WEIGHT_INFO.ERROR.AVERAGE_PIECE_GRAM_REQUIRED_WHEN_SHOW_UNIT_COUNT_TEXT_IS_TRUE',
                'WEIGHT_INFO.ERROR.AVERAGE_PIECE_GRAM_INVALID_FORMAT_OR_RANGE',
                t,
              );
            },
          ),
      }),
    })
  );
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  const initialValues = {
    showUnitCountText: marketProduct?.showUnitCountText || false,
    weightInfo: {
      ...marketProduct?.weightInfo,
      initialWeight: marketProduct?.weightInfo?.initialWeight,
      amountOfWeightIncrement: marketProduct?.weightInfo?.amountOfWeightIncrement,
      minimumWeight: marketProduct?.weightInfo?.minimumWeight,
      approximatePieceDeviation: marketProduct?.weightInfo?.approximatePieceDeviation || null,
      averagePieceGram: marketProduct?.weightInfo?.averagePieceGram || null,
    },
  };
  return initialValues;
};
