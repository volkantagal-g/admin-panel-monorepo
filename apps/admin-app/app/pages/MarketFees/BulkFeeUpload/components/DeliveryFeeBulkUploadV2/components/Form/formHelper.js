/* eslint-disable camelcase */
import * as Yup from 'yup';

import { isNil } from 'lodash';

import { t } from '@shared/i18n';

import { feeArrayValidationBulk } from '@app/pages/MarketFees/Detail/components/shared/formHelpers';
import { WAREHOUSE_LIST_MIN } from '@app/pages/MarketFees/BulkFeeUpload/feeSourceConfig';
import { ERROR_TIMEOUT_MS, getirMarketBulkUploadDomainTypes } from '@app/pages/MarketFees/BulkFeeUpload/constants';
import { FEE_SOURCE } from '@shared/shared/constants';
import { findStringAndGetKeyFromObject, getParsedData } from '@app/pages/MarketFees/BulkFeeUpload/utils';

export const filterEmptyFeeArrays = table => {
  const filteredTable = { ...table };
  Object.keys(filteredTable).forEach(key => {
    filteredTable[key] = filteredTable[key].filter(item => !isNil(item.min) && !isNil(item.fee));
  });
  return filteredTable;
};

export const zoneBasedLayeredDeliveryFeeSchema = locale => {
  return Yup.object().shape({
    levelOne: feeArrayValidationBulk({ t: locale }),
    levelTwo: feeArrayValidationBulk({ t: locale }),
    levelThree: feeArrayValidationBulk({ t: locale }),
  }).required(locale('ERRORS.ZONE_BASED_LAYERED_DELIVERY_FEE_REQUIRED'));
};

export const fixedDeliveryFeeAmountSchema = (locale, feeType) => {
  return Yup.number().required(locale('ERRORS.FIXED_DELIVERY_FEE_AMOUNT_REQUIRED', { feeType })).min(0, locale('ERRORS.NO_NEGATIVE_NUMBER'));
};

export const dynamicDeliveryFeeSchema = locale => {
  return Yup.object().shape({
    1: feeArrayValidationBulk({ t: locale }),
    2: feeArrayValidationBulk({ t: locale }),
    3: feeArrayValidationBulk({ t: locale }),
    4: feeArrayValidationBulk({ t: locale }),
    5: feeArrayValidationBulk({ t: locale }),
  }).required(locale('ERRORS.ZONE_BASED_LAYERED_DELIVERY_FEE_REQUIRED'));
};

export const layeredFeeSchema = (locale, feeType) => {
  return Yup.object().shape({
    regular: feeArrayValidationBulk({ t: locale }),
    peak: feeArrayValidationBulk({ t: locale }),
  }).required(locale('ERRORS.LAYERED_FEE_REQUIRED'), { feeType });
};

export const defaultValues = { fees: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      fees: Yup.array().of(Yup.object().shape({
        warehouseId: Yup.string().required(),
        domainType: Yup.number(),
        deliveryFee: Yup.object().shape({
          deliveryFeeSource: Yup.string(),
          fixedDeliveryFeeAmount: Yup.number(),
          freeDeliveryOrderNumber: Yup.number(),
          layeredDeliveryFee: Yup.object().shape({
            regular: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
            peak: Yup.array().of(Yup.object().shape({
              min: Yup.number(),
              fee: Yup.number(),
            })),
          }),
          dynamicDeliveryFee: Yup.object().shape({
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
      const { warehouse_id, service, del_fee_source, city_name, warehouse_name } = data[index];

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
      if (mode !== del_fee_source) {
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

      if (mode === FEE_SOURCE.FIXED_DELIVERY_FEE) {
        const { fixed_del_fee } = data[index];

        const stringField = findStringAndGetKeyFromObject({ fixed_del_fee });

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
          fixedDeliveryFeeAmountSchema(t, 'Delivery').validateSync(fixed_del_fee);
        }
        catch (error) {
          dispatch(ToastCreators.error({
            message: t('error:CSV_FIELD_SPECIAL_ERROR', {
              errorField: 'fixed_del_fee',
              errorIndex: errorIndex + 1,
              errorMessage: error?.message,
            }),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          fieldError = true;
          break;
        }
      }

      if (mode === FEE_SOURCE.ZONE_BASED_FIXED_DELIVERY_FEE) {
        const { zone_one_fee, zone_two_fee, zone_three_fee } = data[index];

        const stringField = findStringAndGetKeyFromObject({ zone_one_fee, zone_two_fee, zone_three_fee });

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
          fixedDeliveryFeeAmountSchema(t, 'Delivery').validateSync(zone_one_fee);
          fixedDeliveryFeeAmountSchema(t, 'Delivery').validateSync(zone_two_fee);
          fixedDeliveryFeeAmountSchema(t, 'Delivery').validateSync(zone_three_fee);
        }
        catch (error) {
          dispatch(ToastCreators.error({
            message: t('error:CSV_FIELD_SPECIAL_ERROR', {
              errorField: 'zone_based_fixed_del_fee_zones',
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
          errorField: 'del_fee_source',
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

    if (mode === FEE_SOURCE.ZONE_BASED_LAYERED_DELIVERY_FEE) {
      let zoneBasedLayeredDeliveryFeeTable = {
        levelOne: [],
        levelTwo: [],
        levelThree: [],
      };

      const length = Math.min(data.length, 5);

      for (let index = 0; index < length; index++) {
        const { zone_one, zone_one_fee, zone_two, zone_two_fee, zone_three, zone_three_fee } = data[index];

        const stringField = findStringAndGetKeyFromObject({ zone_one, zone_one_fee, zone_two, zone_two_fee, zone_three, zone_three_fee });

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

        zoneBasedLayeredDeliveryFeeTable = {
          levelOne: (isNil(zone_one) && isNil(zone_one_fee)) ?
            zoneBasedLayeredDeliveryFeeTable.levelOne :
            [...zoneBasedLayeredDeliveryFeeTable.levelOne, { min: zone_one, fee: zone_one_fee }],
          levelTwo: (isNil(zone_two) && isNil(zone_two_fee)) ?
            zoneBasedLayeredDeliveryFeeTable.levelTwo :
            [...zoneBasedLayeredDeliveryFeeTable.levelTwo, { min: zone_two, fee: zone_two_fee }],
          levelThree: (isNil(zone_three) && isNil(zone_three_fee)) ?
            zoneBasedLayeredDeliveryFeeTable.levelThree :
            [...zoneBasedLayeredDeliveryFeeTable.levelThree, { min: zone_three, fee: zone_three_fee }],
        };
      }

      zoneBasedLayeredDeliveryFeeTable = filterEmptyFeeArrays(zoneBasedLayeredDeliveryFeeTable);

      try {
        zoneBasedLayeredDeliveryFeeSchema(t).validateSync(zoneBasedLayeredDeliveryFeeTable);
      }
      catch (error) {
        dispatch(ToastCreators.error({
          message: t('error:CSV_FIELD_SPECIAL_ERROR', {
            errorField: 'zone_one',
            errorMessage: error?.message,
          }),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }));
        return;
      }
    }

    if (mode === FEE_SOURCE.DYNAMIC_DELIVERY_FEE) {
      let dynamicDeliveryFeeTable = {
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

        dynamicDeliveryFeeTable = {
          1: (isNil(level_one) && isNil(level_one_fee)) ?
            dynamicDeliveryFeeTable[1] :
            [...dynamicDeliveryFeeTable[1], { min: level_one, fee: level_one_fee }],
          2: (isNil(level_two) && isNil(level_two_fee)) ?
            dynamicDeliveryFeeTable[2] :
            [...dynamicDeliveryFeeTable[2], { min: level_two, fee: level_two_fee }],
          3: (isNil(level_three) && isNil(level_three_fee)) ?
            dynamicDeliveryFeeTable[3] :
            [...dynamicDeliveryFeeTable[3], { min: level_three, fee: level_three_fee }],
          4: (isNil(level_four) && isNil(level_four_fee)) ?
            dynamicDeliveryFeeTable[4] :
            [...dynamicDeliveryFeeTable[4], { min: level_four, fee: level_four_fee }],
          5: (isNil(level_five) && isNil(level_five_fee)) ?
            dynamicDeliveryFeeTable[5] :
            [...dynamicDeliveryFeeTable[5], { min: level_five, fee: level_five_fee }],
        };
      }

      dynamicDeliveryFeeTable = filterEmptyFeeArrays(dynamicDeliveryFeeTable);

      try {
        dynamicDeliveryFeeSchema(t).validateSync(dynamicDeliveryFeeTable);
      }
      catch (error) {
        dispatch(ToastCreators.error({
          message: t('error:CSV_FIELD_SPECIAL_ERROR', {
            errorField: 'dynamic_delivery_fee_table',
            errorMessage: error?.message,
          }),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }));
        return;
      }
    }

    if (mode === FEE_SOURCE.LAYERED_DELIVERY_FEE) {
      const allFields = Object.keys(data[0]);

      const feeFields = allFields.filter(key => !['warehouse_id',
        'city_name',
        'warehouse_name',
        'del_fee_source',
        'service',
        'delfee_segment',
        'peak_delfee_segment'].includes(key));

      const { delfeeArray, minArray } = feeFields.reduce((acc, item) => {
        if (item.endsWith('_delfee')) {
          acc.delfeeArray.push(item);
        }
        else {
          acc.minArray.push(item);
        }
        return acc;
      }, { delfeeArray: [], minArray: [] });

      if (delfeeArray.length !== minArray.length) {
        dispatch(ToastCreators.error({
          message: t(
            'error:ALL_FEE_FIELDS_SHOULD_HAVE_MIN_AND_FEE',
          ),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }));
        return;
      }

      for (let j = 0; j < minArray.length; j++) {
        if (!delfeeArray.includes(`${minArray[j]}_delfee`)) {
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
        const { delfee_segment, peak_delfee_segment } = data[index];

        if (!delfee_segment || delfee_segment.startsWith('peak_')) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_ERROR',
              {
                errorField: 'delfee_segment',
                errorIndex: index + 1,
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        if (!peak_delfee_segment || !peak_delfee_segment.startsWith('peak_')) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_ERROR',
              {
                errorField: 'peak_delfee_segment',
                errorIndex: index + 1,
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        if (!feeFields.includes(delfee_segment) || !feeFields.includes(`${delfee_segment}_delfee`)) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_SPECIAL_ERROR',
              {
                errorField: delfee_segment,
                errorIndex: index + 1,
                errorMessage: 'delfee_segment is not in the table',
              },
            ),
            toastOptions: { autoClose: ERROR_TIMEOUT_MS },
          }));
          return;
        }

        if (!feeFields.includes(peak_delfee_segment) || !feeFields.includes(`${peak_delfee_segment}_delfee`)) {
          dispatch(ToastCreators.error({
            message: t(
              'error:CSV_FIELD_SPECIAL_ERROR',
              {
                errorField: peak_delfee_segment,
                errorIndex: index + 1,
                errorMessage: 'peak_delfee_segment is not in the table',
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
          const fee = data[k][`${minField}_delfee`];

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
                errorField: stringField === 'min' ? key : `${key}_delfee`,
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
    dispatch(ToastCreators.error({ message: error?.message, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
  }
};
