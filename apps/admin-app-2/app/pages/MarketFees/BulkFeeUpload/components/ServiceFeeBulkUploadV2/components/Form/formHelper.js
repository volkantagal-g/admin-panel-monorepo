/* eslint-disable camelcase */
import * as Yup from 'yup';
import { isNil } from 'lodash';

import { feeArrayValidationBulk } from '@app/pages/MarketFees/Detail/components/shared/formHelpers';
import { t } from '@shared/i18n';
import { WAREHOUSE_LIST_MIN } from '@app/pages/MarketFees/BulkFeeUpload/feeSourceConfig';
import { ERROR_TIMEOUT_MS, getirMarketBulkUploadDomainTypes } from '@app/pages/MarketFees/BulkFeeUpload/constants';
import { FEE_SOURCE } from '@shared/shared/constants';
import {
  findStringAndGetKeyFromObject,
  getParsedData,
} from '@app/pages/MarketFees/BulkFeeUpload/utils';
import { filterEmptyFeeArrays } from '../../../DeliveryFeeBulkUploadV2/components/Form/formHelper';

export const defaultValues = { fees: undefined };

export const fixedServiceFeeAmountSchema = (locale, feeType) => {
  return Yup.number().required(locale('ERRORS.FIXED_SERVICE_FEE_AMOUNT_REQUIRED', { feeType })).min(0, locale('ERRORS.NO_NEGATIVE_NUMBER'));
};

export const dynamicServiceFeeSchema = locale => {
  return Yup.object().shape({
    1: feeArrayValidationBulk({ t: locale }),
    2: feeArrayValidationBulk({ t: locale }),
    3: feeArrayValidationBulk({ t: locale }),
    4: feeArrayValidationBulk({ t: locale }),
    5: feeArrayValidationBulk({ t: locale }),
  }).required(locale('ERRORS.ZONE_BASED_LAYERED_SERVICE_FEE_REQUIRED'));
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      fees: Yup.array().of(Yup.object().shape({
        warehouseId: Yup.string().required(),
        domainType: Yup.number(),
        serviceFee: Yup.object().shape({
          serviceFeeSource: Yup.string(),
          fixedServiceFeeAmount: Yup.number(),
          layeredServiceFee: Yup.object().shape({
            regular: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
            peak: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
          }),
          dynamicServiceFee: Yup.object().shape({
            1: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
            2: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
            3: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
            4: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
            5: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
          }),
        }),
      }).required(t('error:REQUIRED'))),
    });
};

export const handleCsvImport = ({ data, mode, dispatch, ToastCreators, setFieldValue, handleSubmit }) => {
  try {
    if (data.length < WAREHOUSE_LIST_MIN) {
      dispatch(ToastCreators.error(
        { message: t('error:INVALID_WAREHOUSE_LIST', { amount: WAREHOUSE_LIST_MIN }), toastOptions: { autoClose: ERROR_TIMEOUT_MS } },
      ));
      return;
    }
    let warehouseIdError = false;
    let warehouseNameError = false;
    let serviceFieldError = false;
    let feeSourceError = false;
    let cityNameError = false;
    let fieldError = false;
    let duplicateWarehouseIdError = false;

    let errorIndex;
    let duplicateWarehouseId;

    const warehouseIds = new Set();

    for (let index = 0; index < data.length; index++) {
      const { warehouse_id, service, service_fee_source, city_name, warehouse_name } = data[index];

      if (!warehouse_id) {
        warehouseIdError = true;
        errorIndex = index;
        break;
      }
      if (!warehouse_name) {
        warehouseNameError = true;
        errorIndex = index;
        break;
      }
      if (mode !== service_fee_source) {
        feeSourceError = true;
        errorIndex = index;
        break;
      }
      if (!Object.keys(getirMarketBulkUploadDomainTypes).includes(service) || service !== data[0].service) {
        serviceFieldError = true;
        errorIndex = index;
        break;
      }
      if (!city_name) {
        cityNameError = true;
        errorIndex = index;
        break;
      }
      if (warehouseIds.has(warehouse_id)) {
        duplicateWarehouseId = warehouse_id;
        duplicateWarehouseIdError = true;
        errorIndex = index;
        break;
      }
      else {
        warehouseIds.add(warehouse_id);
      }

      if (mode === FEE_SOURCE.FIXED_SERVICE_FEE) {
        const { fixed_service_fee } = data[index];

        const stringField = findStringAndGetKeyFromObject({ fixed_service_fee });

        if (stringField) {
          dispatch(ToastCreators.error({
            message: t('error:CSV_FIELD_SPECIAL_ERROR', {
              errorField: stringField,
              errorIndex: index + 1,
              errorMessage: t('ERRORS.NOT_A_NUMBER'),
            }),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          fieldError = true;
          break;
        }

        try {
          fixedServiceFeeAmountSchema(t, 'Service').validateSync(fixed_service_fee);
        }
        catch (error) {
          dispatch(ToastCreators.error({
            message: t('error:CSV_FIELD_SPECIAL_ERROR', {
              errorField: 'fixed_service_fee',
              errorIndex: errorIndex + 1,
              errorMessage: error?.message,
            }),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          fieldError = true;
          break;
        }
      }
    }

    if (warehouseIdError) {
      dispatch(ToastCreators.error({
        message: t('error:CSV_FIELD_ERROR', {
          errorField: 'warehouse_id',
          errorIndex: errorIndex + 1,
        }),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
      return;
    }

    if (duplicateWarehouseIdError) {
      dispatch(ToastCreators.error({
        message: t('error:CSV_FIELD_SPECIAL_ERROR', {
          errorField: 'warehouse_id',
          errorIndex: errorIndex + 1,
          errorMessage: t('ERRORS.DUPLICATE_WAREHOUSE_ID', { warehouseId: duplicateWarehouseId }),
        }),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
      return;
    }

    if (warehouseNameError) {
      dispatch(ToastCreators.error({
        message: t('error:CSV_FIELD_ERROR', {
          errorField: 'warehouse_name',
          errorIndex: errorIndex + 1,
        }),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
      return;
    }

    if (serviceFieldError) {
      dispatch(ToastCreators.error({
        message: t('error:CSV_FIELD_ERROR', {
          errorField: 'service',
          errorIndex: errorIndex + 1,
        }),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
      return;
    }

    if (feeSourceError) {
      dispatch(ToastCreators.error({
        message: t('error:CSV_FIELD_ERROR', {
          errorField: 'service_fee_source',
          errorIndex: errorIndex + 1,
        }),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
      return;
    }

    if (cityNameError) {
      dispatch(
        ToastCreators.error({
          message: t(
            'error:CSV_FIELD_ERROR',
            {
              errorField: 'city_name',
              errorIndex: errorIndex + 1,
            },
          ),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }),
      );
      return;
    }

    if (fieldError) return;

    if (mode === FEE_SOURCE.DYNAMIC_SERVICE_FEE) {
      let dynamicServiceFeeTable = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      };

      const length = Math.min(data.length, 5);

      for (let index = 0; index < length; index++) {
        const {
          level_one,
          level_one_fee,
          level_two,
          level_two_fee,
          level_three,
          level_three_fee,
          level_four,
          level_four_fee,
          level_five,
          level_five_fee,
        } = data[index];

        const stringField = findStringAndGetKeyFromObject({
          level_one,
          level_one_fee,
          level_two,
          level_two_fee,
          level_three,
          level_three_fee,
          level_four,
          level_four_fee,
          level_five,
          level_five_fee,
        });

        if (stringField) {
          dispatch(ToastCreators.error({
            message: t('error:CSV_FIELD_SPECIAL_ERROR', {
              errorField: stringField,
              errorIndex: index + 1,
              errorMessage: t('ERRORS.NOT_A_NUMBER'),
            }),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        dynamicServiceFeeTable = {
          1: (isNil(level_one) && isNil(level_one_fee)) ?
            dynamicServiceFeeTable[1] :
            [...dynamicServiceFeeTable[1], { min: level_one, fee: level_one_fee }],
          2: (isNil(level_two) && isNil(level_two_fee)) ?
            dynamicServiceFeeTable[2] :
            [...dynamicServiceFeeTable[2], { min: level_two, fee: level_two_fee }],
          3: (isNil(level_three) && isNil(level_three_fee)) ?
            dynamicServiceFeeTable[3] :
            [...dynamicServiceFeeTable[3], { min: level_three, fee: level_three_fee }],
          4: (isNil(level_four) && isNil(level_four_fee)) ?
            dynamicServiceFeeTable[4] :
            [...dynamicServiceFeeTable[4], { min: level_four, fee: level_four_fee }],
          5: (isNil(level_five) && isNil(level_five_fee)) ?
            dynamicServiceFeeTable[5] :
            [...dynamicServiceFeeTable[5], { min: level_five, fee: level_five_fee }],
        };
      }

      dynamicServiceFeeTable = filterEmptyFeeArrays(dynamicServiceFeeTable);

      try {
        dynamicServiceFeeSchema(t).validateSync(dynamicServiceFeeTable);
      }
      catch (error) {
        dispatch(ToastCreators.error({
          message: t('error:CSV_FIELD_SPECIAL_ERROR', {
            errorField: 'dynamic_service_fee_table',
            errorMessage: error?.message,
          }),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }));
        return;
      }
    }

    if (mode === FEE_SOURCE.LAYERED_SERVICE_FEE) {
      const allFields = Object.keys(data[0]);

      const feeFields = allFields.filter(key => !['warehouse_id',
        'city_name',
        'warehouse_name',
        'service_fee_source',
        'service',
        'service_fee_segment',
        'peak_service_fee_segment'].includes(key));

      const { serviceFeeArray, minArray } = feeFields.reduce((acc, item) => {
        if (item.endsWith('_service_fee')) {
          acc.serviceFeeArray.push(item);
        }
        else {
          acc.minArray.push(item);
        }
        return acc;
      }, { serviceFeeArray: [], minArray: [] });

      if (serviceFeeArray.length !== minArray.length) {
        dispatch(ToastCreators.error({
          message: t(
            'error:ALL_FEE_FIELDS_SHOULD_HAVE_MIN_AND_FEE',
          ),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }));
        return;
      }

      for (let j = 0; j < minArray.length; j++) {
        if (!serviceFeeArray.includes(`${minArray[j]}_service_fee`)) {
          dispatch(ToastCreators.error({
            message: t(
              'error:ALL_FEE_FIELDS_SHOULD_HAVE_MIN_AND_FEE',
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }
      }

      for (let index = 0; index < data.length; index++) {
        const { service_fee_segment, peak_service_fee_segment } = data[index];

        if (!service_fee_segment || service_fee_segment.startsWith('peak_')) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_ERROR',
              {
                errorField: 'service_fee_segment',
                errorIndex: index + 1,
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        if (!peak_service_fee_segment || !peak_service_fee_segment.startsWith('peak_')) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_ERROR',
              {
                errorField: 'peak_service_fee_segment',
                errorIndex: index + 1,
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        if (!feeFields.includes(service_fee_segment) || !feeFields.includes(`${service_fee_segment}_service_fee`)) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_SPECIAL_ERROR',
              {
                errorField: service_fee_segment,
                errorIndex: index + 1,
                errorMessage: 'service_fee_segment is not in the table',
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        if (!feeFields.includes(peak_service_fee_segment) || !feeFields.includes(`${peak_service_fee_segment}_service_fee`)) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_SPECIAL_ERROR',
              {
                errorField: peak_service_fee_segment,
                errorIndex: index + 1,
                errorMessage: 'peak_service_fee_segment is not in the table',
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }
      }

      const length = Math.min(data.length, 5);

      const allFeesObject = {};

      for (let k = 0; k < length; k++) {
        minArray.forEach(minField => {
          const min = data[k][minField];
          const fee = data[k][`${minField}_service_fee`];

          if (!isNil(min) || !isNil(fee)) {
            if (!allFeesObject[minField]) {
              allFeesObject[minField] = [];
            }
            allFeesObject[minField].push({ key: minField, min, fee });
          }
        });
      }

      const allFees = Object.values(allFeesObject);

      for (let j = 0; j < allFees.length; j++) {
        const fee = allFees[j];

        for (let i = 0; i < fee.length; i++) {
          const { key, min, fee: feeValue } = fee[i];
          const stringField = findStringAndGetKeyFromObject({ min, fee: feeValue });

          if (stringField) {
            dispatch(ToastCreators.error({
              message: t('error:CSV_FIELD_SPECIAL_ERROR', {
                errorField: stringField === 'min' ? key : `${key}_service_fee`,
                errorIndex: i + 1,
                errorMessage: t('ERRORS.NOT_A_NUMBER'),
              }),
              toastOptions: { autoClose: ERROR_TIMEOUT_MS },
            }));
            return;
          }
        }

        try {
          feeArrayValidationBulk({ t }).validateSync(fee);
        }
        catch (error) {
          dispatch(ToastCreators.error({
            message: t('error:CSV_FIELD_SPECIAL_ERROR', {
              errorField: `${fee.key}}`,
              errorIndex: errorIndex + 1,
              errorMessage: error?.message,
            }),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }
      }
    }

    const parsedData = getParsedData(data, mode, t);
    setFieldValue('fees', parsedData);
    handleSubmit();
  }
  catch (error) {
    dispatch(ToastCreators.error({ message: error?.message }));
  }
};
