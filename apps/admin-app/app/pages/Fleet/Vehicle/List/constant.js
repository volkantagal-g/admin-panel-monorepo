const OWNERSHIP_TYPES = {
  OWN: 1,
  VIRTUAL: 3,
};

// Artisan
const DEFAULT_OWNERSHIP_VALUE = 2;

const BULK_OPERATION_TYPES = {
  CREATION: 1,
  STATUS_UPDATE: 2,
};

const BULK_CREATION_CSV_HEADER = ['vehicleType', 'warehouseId', 'city',
  'firstRegistry', 'plate', 'franchiseId', 'inspectionValidityDate', 'tags', 'ownershipStatus', 'countryId'];
const BULK_CREATION_CSV_CONTENT = ['E-Bike', '5f16cf0e0d13cd303dc60369', '55999ad00000010001000000',
  '2024-03-29', '35BLT212', '5e0d8a1df0f1d572ab399aaa', '2024-03-29', 'ESNAF', '2', '55999ad00000010000000000'];

const BULK_UPLOAD_CSV_HEADER = ['plate', 'active'];
const BULK_UPLOAD_CSV_CONTENT = ['35BLT212', 'true'];

export {
  OWNERSHIP_TYPES,
  BULK_OPERATION_TYPES,
  DEFAULT_OWNERSHIP_VALUE,
  BULK_CREATION_CSV_HEADER,
  BULK_CREATION_CSV_CONTENT,
  BULK_UPLOAD_CSV_HEADER,
  BULK_UPLOAD_CSV_CONTENT,
};
