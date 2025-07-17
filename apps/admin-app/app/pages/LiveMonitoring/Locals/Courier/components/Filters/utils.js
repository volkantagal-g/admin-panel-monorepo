import { SELECTABLE_VEHICLE_TYPES } from '../../constants';

export const getVehicleTypesSelectOptions = t => {
  return SELECTABLE_VEHICLE_TYPES.map(vehicleType => ({
    label: t(`MARKET_VEHICLE_TYPES.${vehicleType.toString()}`),
    value: vehicleType,
  }));
};
