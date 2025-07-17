import * as Yup from 'yup';
import { isEmpty, isNumber } from 'lodash';

import {
  ASSET_ASSIGNMENT_STATUSES,
  ASSET_CATEGORIES,
  ASSET_COUNTRIES,
  ASSET_TYPES,
  ASSET_VERSIONS,
  DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES,
} from '@app/pages/Asset/constants';
import { toFakeLocalDate } from '@shared/utils/dateHelper';

export const newAssetSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string().required(),
      deviceType: Yup.string().required(),
      brand: Yup.string().required(),
      country: Yup.string().required(),
      city: Yup.string().required(),
      deviceSerialNumber: Yup.string().required(),
      invoiceNumber: Yup.string().required(),
      invoiceDate: Yup.date().required(),
      warrantyEndDate: Yup.date().required(),
      supplier: Yup.string().required(),
      assignmentStatus: Yup.string(),
      deviceStatus: Yup.string().required(),
      deviceModel: Yup.string().required(),
      mdmInstalled: Yup.boolean(),
      isRental: Yup.boolean(),
      isBrandNew: Yup.boolean(),
      rentalStartDate: Yup.date().nullable().when('isRental', (isRental, schema) => {
        if (isRental) {
          return schema.required();
        }
        return schema;
      }),
      rentalEndDate: Yup.date().nullable().when('isRental', (isRental, schema) => {
        if (isRental) {
          return schema.required();
        }
        return schema;
      }),
      storage: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.storage.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      year: Yup.string(),
      displaySize: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.displaySize.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      imei1: Yup.string().optional().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.imei1.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      imei2: Yup.string().optional().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.imei2.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      refreshRate: Yup.string().optional().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.refreshRate.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      chipType: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.chipType.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      ram: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.ram.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      resolution: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.resolution.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      numberOfMacAddresses: Yup.number(),
      macAddresses: Yup.array().when('numberOfMacAddresses', (numberOfMacAddresses, schema) => {
        if (numberOfMacAddresses > 0) {
          return schema
            .of(Yup.string())
            .min(numberOfMacAddresses);
        }
        return schema;
      }),
    });
};

export const OtherAssetSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string(),
      deviceType: Yup.string(),
      country: Yup.string(),
      city: Yup.string(),
      deviceSerialNumber: Yup.string(),
      invoiceDate: Yup.date().nullable(),
      supplier: Yup.string(),
      plateNumber: Yup.string(),
      chassis: Yup.string(),
      engineNumber: Yup.string(),
    });
};

export const getInitialValues = () => {
  const initialValues = {
    name: '',
    deviceType: ASSET_TYPES.IT,
    brand: '',
    barcode: '',
    country: ASSET_COUNTRIES.Turkey,
    city: '',
    deviceSerialNumber: '',
    invoiceNumber: '',
    invoiceDate: null,
    warrantyEndDate: null,
    supplier: '',
    remarks: '',
    assignmentStatus: '',
    deviceStatus: '',
    storage: '',
    deviceModel: '',
    year: '',
    displaySize: '',
    imei1: 0,
    imei2: 0,
    refreshRate: 0,
    chipType: '',
    ram: '',
    resolution: '',
    mdmInstalled: false,
    isRental: false,
    rentalStartDate: null,
    rentalEndDate: null,
    isBrandNew: true,
    numberOfMacAddresses: 0,
    macAddresses: [],
  };
  return initialValues;
};

export const manipulateValuesAfterSubmit = (values, assetCategory) => {
  const modifiedValues = {};
  Object.keys(values).forEach(key => {
    if (!isEmpty(values[key]) || isNumber(values[key])) {
      modifiedValues[key] = values[key];
    }
  });
  if (assetCategory === ASSET_CATEGORIES.IT) {
    return {
      ...modifiedValues,
      assetCategory,
      invoiceDate: toFakeLocalDate(values.invoiceDate).toISOString(),
      warrantyEndDate: toFakeLocalDate(values.warrantyEndDate).toISOString(),
      ...(values.rentalStartDate ? { rentalStartDate: toFakeLocalDate(values.rentalStartDate).toISOString() } : undefined),
      ...(values.rentalEndDate ? { rentalEndDate: toFakeLocalDate(values.rentalEndDate).toISOString() } : undefined),
      mdmInstalled: values.mdmInstalled,
      isRental: values.isRental,
      isBrandNew: values.isBrandNew,
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
      version: ASSET_VERSIONS.v2,
    };
  }
  return {
    ...modifiedValues,
    assetCategory,
    mdmInstalled: values.mdmInstalled,
    isRental: values.isRental,
    isBrandNew: values.isBrandNew,
    assignmentStatus: ASSET_ASSIGNMENT_STATUSES.ASSIGNABLE,
    invoiceDate: values.invoiceDate ? toFakeLocalDate(values.invoiceDate).toISOString() : undefined,
    ...(values.rentalStartDate ? { rentalStartDate: toFakeLocalDate(values.rentalStartDate).toISOString() } : undefined),
    ...(values.rentalEndDate ? { rentalEndDate: toFakeLocalDate(values.rentalEndDate).toISOString() } : undefined),
    version: ASSET_VERSIONS.v2,
  };
};
