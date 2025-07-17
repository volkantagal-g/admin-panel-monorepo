import { ASSET_CATEGORIES, ASSET_DEVICE_STATUSES } from '@app/pages/Asset/constants';

export const getInitialValues = ({
  name,
  deviceType,
  deviceSerialNumberAndIMEI,
  deviceMacAddress,
  assignmentStatus,
  barcode,
  assignedEmployee,
  invoiceNumber,
  assetCategory,
  country,
  assignedEmployeeExists,
  isBrandNew,
  deviceStatuses,
}) => {
  const initialValues = {
    name: name ?? undefined,
    deviceType: deviceType ?? undefined,
    deviceSerialNumberAndIMEI: deviceSerialNumberAndIMEI ?? undefined,
    deviceMacAddress: deviceMacAddress ?? undefined,
    assignmentStatus: assignmentStatus ?? undefined,
    barcode: barcode ?? undefined,
    assignedEmployee: assignedEmployee ?? undefined,
    invoiceNumber: invoiceNumber ?? undefined,
    assetCategory: assetCategory ?? ASSET_CATEGORIES.IT,
    country: country ?? undefined,
    assignedEmployeeExists: assignedEmployeeExists ?? undefined,
    isBrandNew: isBrandNew ?? undefined,
    deviceStatuses: deviceStatuses ?? [
      ASSET_DEVICE_STATUSES.JUNK,
      ASSET_DEVICE_STATUSES.OBSOLETE,
      ASSET_DEVICE_STATUSES.LIQUID_DAMAGE,
      ASSET_DEVICE_STATUSES.BROKEN,
      ASSET_DEVICE_STATUSES.IN_GOOD_SHAPE,
      ASSET_DEVICE_STATUSES.STOLEN,
      ASSET_DEVICE_STATUSES.IN_OFFICE_USE,
      ASSET_DEVICE_STATUSES.IN_MAINTENANCE,
    ],
  };
  return initialValues;
};
