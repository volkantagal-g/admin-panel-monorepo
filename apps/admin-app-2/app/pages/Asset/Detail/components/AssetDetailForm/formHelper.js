import * as Yup from 'yup';
import { get, isEmpty, isNumber } from 'lodash';

import moment from 'moment';

import { convertSelectOptions } from '@shared/utils/common';
import { newAssetSchema } from '../../../New/components/AssetNewForm/formHelper';
import { ASSET_CATEGORIES } from '@app/pages/Asset/constants';
import { toFakeLocalDate, reverseLocalTime } from '@shared/utils/dateHelper';

export const AssetSchemaV1 = () => {
  return Yup.object()
    .shape({
      name: Yup.string(),
      deviceType: Yup.string(),
      brand: Yup.string(),
      country: Yup.string(),
      city: Yup.string(),
      deviceSerialNumber: Yup.string(),
      invoiceDate: Yup.date(),
      warrantyEndDate: Yup.date().optional(),
      supplier: Yup.string(),
      assignmentStatus: Yup.string(),
      deviceStatus: Yup.string(),
      assignedEmployee: Yup.string(),
      plateNumber: Yup.string(),
      chassis: Yup.string(),
      engineNumber: Yup.string(),
    });
};

export const AssetSchemaV2 = newAssetSchema;

export const getInitialValues = asset => {
  let assignedEmployee;
  if (get(asset, ['assignedEmployee', '_id'])) {
    const fakeSelectOptions = convertSelectOptions([get(asset, ['assignedEmployee'])], { labelKey: 'fullName' });
    assignedEmployee = get(fakeSelectOptions, 0);
  }

  const initialValues = {
    name: get(asset, 'name', ''),
    deviceType: get(asset, 'deviceType', ''),
    brand: get(asset, 'brand', ''),
    barcode: get(asset, 'barcode', ''),
    country: get(asset, 'country', ''),
    supplier: get(asset, 'supplier', ''),
    city: get(asset, 'city', ''),
    deviceSerialNumber: get(asset, 'deviceSerialNumber', ''),
    createdAt: asset.createdAt ? moment.utc(reverseLocalTime(get(asset, 'createdAt'))) : undefined,
    invoiceDate: asset.invoiceDate ? moment.utc((get(asset, 'invoiceDate'))) : undefined,
    warrantyEndDate: asset.warrantyEndDate ? moment.utc((get(asset, 'warrantyEndDate'))) : undefined,
    assignmentStatus: get(asset, 'assignmentStatus', ''),
    deviceStatus: get(asset, 'deviceStatus', ''),
    remarks: get(asset, 'remarks', ''),
    invoiceNumber: get(asset, 'invoiceNumber', ''),
    storage: get(asset, ['deviceConfig', 'storage'], ''),
    deviceModel: get(asset, ['deviceConfig', 'deviceModel'], ''),
    year: get(asset, ['deviceConfig', 'year'], ''),
    displaySize: get(asset, ['deviceConfig', 'displaySize'], undefined),
    imei1: get(asset, ['deviceConfig', 'imei1'], undefined),
    imei2: get(asset, ['deviceConfig', 'imei2'], undefined),
    refreshRate: get(asset, ['deviceConfig', 'refreshRate'], undefined),
    chipType: get(asset, ['deviceConfig', 'chipType'], ''),
    ram: get(asset, ['deviceConfig', 'ram'], undefined),
    resolution: get(asset, ['deviceConfig', 'resolution'], undefined),
    assignedEmployee,
    plateNumber: get(asset, 'plateNumber', ''),
    chassis: get(asset, 'chassis', ''),
    engineNumber: get(asset, 'engineNumber', ''),
    mdmInstalled: get(asset, 'mdmInstalled', false),
    isRental: get(asset, 'isRental', false),
    isBrandNew: get(asset, 'isBrandNew', false),
    latestAssignDate: get(asset, 'latestAssignDate', false),
    rentalStartDate: asset.rentalStartDate ? moment.utc(reverseLocalTime(get(asset, 'rentalStartDate'))) : undefined,
    rentalEndDate: asset.rentalEndDate ? moment.utc(reverseLocalTime(get(asset, 'rentalEndDate'))) : undefined,
    numberOfMacAddresses: get(asset, ['deviceConfig', 'numberOfMacAddresses'], 0),
    macAddresses: get(asset, ['deviceConfig', 'macAddresses'], []),
  };
  return initialValues;
};

export const manipulateValuesAfterSubmit = (values, assetCategory) => {
  const modifiedValues = {};
  const forbiddenUpdateKeySet = new Set([
    // 'assignmentStatus', // device satus updates assignment status
    'assignedEmployee',
    'latestAssignDate',
    'latestReturnDate',
    'latestAssignmentId',
  ]);
  Object.keys(values).forEach(key => {
    if (
      (!isEmpty(values[key]) || isNumber(values[key]))
      && !forbiddenUpdateKeySet.has(key)
    ) {
      modifiedValues[key] = values[key];
    }
  });
  if (assetCategory === ASSET_CATEGORIES.IT) {
    return {
      ...modifiedValues,
      barcode: values.barcode ? values.barcode : '',
      createdAt: undefined,
      invoiceDate: values.invoiceDate ? toFakeLocalDate(values.invoiceDate).toISOString() : undefined,
      warrantyEndDate: values.warrantyEndDate ? toFakeLocalDate(values.warrantyEndDate).toISOString() : undefined,
      mdmInstalled: values.mdmInstalled,
      isRental: values.isRental,
      isBrandNew: values.isBrandNew,
      ...(values.rentalStartDate ? { rentalStartDate: toFakeLocalDate(values.rentalStartDate).toISOString() } : undefined),
      ...(values.rentalEndDate ? { rentalEndDate: toFakeLocalDate(values.rentalEndDate).toISOString() } : undefined),
      deviceConfig: {
        ...(values.deviceModel ? { deviceModel: values.deviceModel } : undefined),
        ...(values.storage ? { storage: values.storage } : undefined),
        ...(values.year ? { year: values.year } : undefined),
        ...(values.displaySize ? { displaySize: values.displaySize } : undefined),
        ...(values.imei1 ? { imei1: values.imei1 } : undefined),
        ...(values.imei2 ? { imei2: values.imei2 } : undefined),
        ...(values.refreshRate ? { refreshRate: values.refreshRate } : undefined),
        ...(values.chipType ? { chipType: values.chipType } : undefined),
        ...(values.ram !== undefined ? { ram: values.ram } : undefined),
        ...(values.resolution ? { resolution: values.resolution } : undefined),
        ...(values.numberOfMacAddresses ? { numberOfMacAddresses: values.numberOfMacAddresses } : undefined),
        ...(values.macAddresses ? { macAddresses: values.macAddresses.slice(0, values.numberOfMacAddresses) } : undefined),
      },
      numberOfMacAddresses: undefined,
      macAddresses: undefined,
    };
  }
  return {
    ...modifiedValues,
    createdAt: undefined,
    assetCategory,
    assignmentConfirmedByEmployee: values.assignmentConfirmedByEmployee,
    returnConfirmedByEmployee: values.returnConfirmedByEmployee,
    invoiceDate: values.invoiceDate ? toFakeLocalDate(values.invoiceDate).toISOString() : undefined,
    mdmInstalled: values.mdmInstalled,
    isRental: values.isRental,
    isBrandNew: values.isBrandNew,
    ...(values.rentalStartDate ? { rentalStartDate: toFakeLocalDate(values.rentalStartDate).toISOString() } : undefined),
    ...(values.rentalEndDate ? { rentalEndDate: toFakeLocalDate(values.rentalEndDate).toISOString() } : undefined),
  };
};
