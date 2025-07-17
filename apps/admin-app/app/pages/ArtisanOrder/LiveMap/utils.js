import { sum } from 'lodash';
import moment from 'moment';

import {
  VEHICLE_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  COURIER_RETURN_STATUS_SLOT_VERIFY,
  COURIER_RETURN_STATUS_CANCELED,
  COURIER_STATUS_FREE,
  COURIER_STATUS_BUSY,
  COURIER_STATUS_PREPARING,
  COURIER_STATUS_BEFORE_PREPARING,
  COURIER_STATUS_CANCELED,
} from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';
import {
  VISIBLE_VEHICLE_TYPES,
  COURIER_LONG_AVAILABLE_TIME_DURATION,
  COURIER_LONG_BUSY_TIME_DURATION,
  COURIER_LONG_CANCELLED_TIME_DURATION,
  COURIER_SLOT_CANCELLED_ALERT_TIME,
  LOCALS_LIVEMAP_COURIER_ALERT_THRESHOLDS_BY_STATUS,
} from './constants';

export const getActiveOrNonActiveLocalsCourierCountsByVehicleType = (stats, key, selectedVehicleTypes) => {
  if (selectedVehicleTypes.length === 0 || selectedVehicleTypes.length === VISIBLE_VEHICLE_TYPES.length) {
    return sum(Object.values(stats?.[key] || {}));
  }

  let total = 0;
  selectedVehicleTypes?.forEach(vehicleType => {
    if (vehicleType === VEHICLE_TYPE.MOTO) {
      total += stats?.[key]?.[VEHICLE_TYPE.MOTO] || 0;
    }

    if (vehicleType === VEHICLE_TYPE.MOTO_50CC) {
      total += stats?.[key]?.[VEHICLE_TYPE.MOTO_50CC] || 0;
    }

    if (vehicleType === VEHICLE_TYPE.VAN) {
      total += stats?.[key]?.[VEHICLE_TYPE.VAN] || 0;
    }
  });

  return total;
};

export const getCountsBySelectedVehicleTypes = (stats, key, selectedVehicleTypes) => {
  if (selectedVehicleTypes.length === 0 || selectedVehicleTypes.length === VISIBLE_VEHICLE_TYPES.length) {
    return stats[key];
  }

  let total = 0;
  selectedVehicleTypes?.forEach(vehicleType => {
    if (vehicleType === VEHICLE_TYPE.MOTO) {
      total += stats?.byVehicleType[VEHICLE_TYPE.MOTO]?.[key] || 0;
    }

    if (vehicleType === VEHICLE_TYPE.MOTO_50CC) {
      total += stats?.byVehicleType[VEHICLE_TYPE.MOTO_50CC]?.[key] || 0;
    }

    if (vehicleType === VEHICLE_TYPE.VAN) {
      total += stats?.byVehicleType[VEHICLE_TYPE.VAN]?.[key] || 0;
    }
  });

  return total;
};

export const numberFormatWithoutDecimal = numberFormat({ maxDecimal: 0 });

export const getDiffFromNow = time => {
  const currentTime = moment.now();
  return moment.duration(moment(currentTime).diff(time));
};

export const checkIsStatusLongBusy = (status, statusTime) => {
  if (status === COURIER_STATUS_BUSY && getDiffFromNow(statusTime).asMinutes() >= COURIER_LONG_BUSY_TIME_DURATION) {
    return true;
  }
  return false;
};

export const checkIsCourierStatusLongCancelled = (status, statusTime) => {
  if (status === COURIER_STATUS_CANCELED &&
  getDiffFromNow(statusTime).asMinutes() >= COURIER_LONG_CANCELLED_TIME_DURATION) {
    return true;
  }
  if (status === COURIER_RETURN_STATUS_CANCELED &&
    getDiffFromNow(statusTime).asMinutes() >= COURIER_SLOT_CANCELLED_ALERT_TIME) {
    return true;
  }
  return false;
};

export const checkIsStatusSteady = (status, statusTime, courierVerifyAfterCheckoutDate, foodOrder) => {
  if (status === COURIER_STATUS_PREPARING && courierVerifyAfterCheckoutDate) {
    const verifyAfterCheckoutDate = moment(courierVerifyAfterCheckoutDate);
    return getDiffFromNow(verifyAfterCheckoutDate).asMinutes() > LOCALS_LIVEMAP_COURIER_ALERT_THRESHOLDS_BY_STATUS[status];
  }
  if (status === COURIER_STATUS_PREPARING && !foodOrder) {
    return getDiffFromNow(statusTime).asMinutes() > LOCALS_LIVEMAP_COURIER_ALERT_THRESHOLDS_BY_STATUS[COURIER_STATUS_BEFORE_PREPARING];
  }
  return getDiffFromNow(statusTime).asMinutes() > LOCALS_LIVEMAP_COURIER_ALERT_THRESHOLDS_BY_STATUS[status];
};

export const checkIsStatusLongAvailable = (status, statusTime) => {
  if (status === COURIER_STATUS_FREE && getDiffFromNow(statusTime).asMinutes() >= COURIER_LONG_AVAILABLE_TIME_DURATION) {
    return true;
  }
  return false;
};

export const checkIsDedicatedLocalWarehouse = domainTypes => {
  if (
    (domainTypes.length === 1 && domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE)) ||
    (domainTypes.length === 1 && domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE)) ||
    (domainTypes.length === 2 && domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) && domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE))) {
    return true;
  }
  return false;
};

export const checkIsLocalsWarehouse = domainTypes => {
  if (domainTypes.length === 1 && domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE)) {
    return true;
  }
  return false;
};

export const checkIsFoodWarehouse = domainTypes => {
  if (domainTypes.length === 1 && domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE)) {
    return true;
  }
  return false;
};

export const checkIsFoodLocalsWarehouse = domainTypes => {
  if ((domainTypes.length === 2 && domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) && domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE))) {
    return true;
  }
  return false;
};

export const checkIsReturnCourier = status => {
  if (status >= COURIER_RETURN_STATUS_SLOT_VERIFY && status <= COURIER_RETURN_STATUS_CANCELED) {
    return true;
  }
  return false;
};
