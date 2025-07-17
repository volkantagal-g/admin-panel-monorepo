import { VEHICLE_TYPE } from '@shared/shared/constants';

export const SELECTABLE_VEHICLE_TYPES = [VEHICLE_TYPE.MOTO, VEHICLE_TYPE.MOTO_50CC, VEHICLE_TYPE.VAN];

export const SELECTABLE_VEHICLE_TYPE_OPTIONS = [
  {
    label: VEHICLE_TYPE.MOTO,
    value: VEHICLE_TYPE.MOTO,
  },
  {
    label: VEHICLE_TYPE.MOTO_50CC,
    value: VEHICLE_TYPE.MOTO_50CC,
  },
  {
    label: VEHICLE_TYPE.VAN,
    value: VEHICLE_TYPE.VAN,
  },
];

export const TOTAL_COLUMN_NAME = 'TOTAL';

export const REQUEST_INTERVAL_MS = 60_000;
