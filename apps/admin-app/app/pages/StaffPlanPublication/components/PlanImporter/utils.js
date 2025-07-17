import _ from 'lodash';
import moment from 'moment-timezone';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const COURIER_REQUIRED_COLUMN_NAMES = ['warehouse_id', 'day', 'hour', 'courier_type', 'courier_plan'];
const COURIER_SLOT_CAPACITY_REQUIRED_COLUMN_NAMES = ['warehouse_id', 'day', 'hour', 'domain_type', 'slot_capacity_count'];
const STORE_ASSISTANT_REQUIRED_COLUMN_NAMES = ['warehouse_id', 'day', 'hour', 'sa_plan'];
const DATE_FORMAT = 'YYYY-MM-DD';
// YYYY-MM-DD also accepts 2 digit year if not strict, when strict => 4 digits only
// So 22-05-2022 parsed with YYYY-MM-DD becomes valid when not strict (which shouldn't be)
const STRICT_PARSE_FORMAT = true;
// see also translation for this error
const ALLOWABLE_PAST_DAY_NUMBER = 30;

const isSubset = (small, big) => small.every(elem => big.includes(elem));

const validateCSV = (csvData, requiredColumns, t) => {
  if (_.isEmpty(csvData)) {
    return { error: true, msg: t('WARNINGS.NO_DATA') };
  }

  const rows = csvData;
  const colNames = Object.keys(rows[0]);
  if (!isSubset(requiredColumns, colNames)) {
    return { error: true, msg: t('WARNINGS.INVALID_COLUMNS') };
  }

  return { error: false };
};

const isValidHour = hour => _.isInteger(hour) && hour >= 0 && hour <= 23;

export const courierCSVToRequestObj = (csvData, checks, t) => {
  const validation = validateCSV(csvData, COURIER_REQUIRED_COLUMN_NAMES, t);
  if (validation.error) {
    return validation;
  }

  // if the date is a past day, confirm if it is not a mistake
  let showConfirmationModal = false;

  const rows = csvData;
  const now = moment();
  let earliestDate = now;
  let earliestDayText = '';

  const arrayOfPlans = [];
  for (let i = 0; i < rows.length; i += 1) {
    const lineNumberOfCSV = i + 1;
    // extract fields from the row
    const {
      warehouse_id: warehouseId,
      day,
      hour,
      forecast,
      courier_type: courierType,
      courier_plan: courierPlan,
      ttp_forecast: ttpForecast,
    } = rows[i];

    if (!checks.warehouseIds[warehouseId]) {
      return { error: true, msg: t('WARNINGS.INVALID_WAREHOUSE_ID') + lineNumberOfCSV };
    }
    const { countryId, cityId, timezone } = checks.warehouseIds[warehouseId];
    const startDate = moment.tz(day, DATE_FORMAT, STRICT_PARSE_FORMAT, timezone).set('hour', hour);
    if (!startDate.isValid()) {
      return { error: true, msg: t('WARNINGS.INVALID_DAY') + lineNumberOfCSV };
    }
    if (now.diff(startDate, 'days') > ALLOWABLE_PAST_DAY_NUMBER) {
      return { error: true, msg: `${t('WARNINGS.DATE_IS_PAST')}${lineNumberOfCSV} => ${day}` };
    }
    if (startDate.isBefore(now) && startDate.isBefore(earliestDate)) {
      earliestDate = startDate;
      earliestDayText = `[ ${lineNumberOfCSV}] : [${day}] : [${now.diff(startDate, 'days')}]`;
    }
    showConfirmationModal = startDate.isBefore(now);

    if (!isValidHour(hour)) {
      return { error: true, msg: t('WARNINGS.INVALID_HOUR') + lineNumberOfCSV };
    }

    if (!checks.courierTypes[courierType]) {
      return { error: true, msg: t('WARNINGS.INVALID_COURIER_TYPE') + lineNumberOfCSV };
    }

    // Can it be 0 planned couriers?
    if (!_.isInteger(courierPlan) || courierPlan < 0) {
      return { error: true, msg: t('WARNINGS.INVALID_COURIER_PLAN') + lineNumberOfCSV };
    }
    const endDate = startDate.clone().add(1, 'hours');

    arrayOfPlans.push({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      warehouseId,
      countryId,
      cityId,
      courierType,
      courierPlan,
      ttpForecast,
      forecast,
    });
  }
  return { courierPlans: arrayOfPlans, showConfirmationModal, confirmationText: earliestDayText };
};

export const courierSlotCapacityCSVToRequestObj = (csvData, checks, t) => {
  const validation = validateCSV(csvData, COURIER_SLOT_CAPACITY_REQUIRED_COLUMN_NAMES, t);
  if (validation.error) {
    return validation;
  }

  // if the date is a past day, confirm if it is not a mistake
  let showConfirmationModal = false;

  const rows = csvData;
  const now = moment();
  let earliestDate = now;
  let earliestDayText = '';

  const arrayOfPlans = [];
  for (let i = 0; i < rows.length; i += 1) {
    const lineNumberOfCSV = i + 1;
    // extract fields from the row
    const {
      warehouse_id: warehouseId,
      day,
      hour,
      domain_type: domainType,
      slot_capacity_count: orderCapacity,
    } = rows[i];

    if (!checks.warehouseIds[warehouseId]) {
      return { error: true, msg: t('WARNINGS.INVALID_WAREHOUSE_ID') + lineNumberOfCSV };
    }
    const { timezone } = checks.warehouseIds[warehouseId];

    const startDate = moment.tz(day, DATE_FORMAT, STRICT_PARSE_FORMAT, timezone).set('hour', hour);
    if (!startDate.isValid()) {
      return { error: true, msg: t('WARNINGS.INVALID_DAY') + lineNumberOfCSV };
    }
    if (now.diff(startDate, 'days') > ALLOWABLE_PAST_DAY_NUMBER) {
      return { error: true, msg: `${t('WARNINGS.DATE_IS_PAST')}${lineNumberOfCSV} => ${day}` };
    }
    if (startDate.isBefore(now) && startDate.isBefore(earliestDate)) {
      earliestDate = startDate;
      earliestDayText = `[ ${lineNumberOfCSV}] : [${day}] : [${now.diff(startDate, 'days')}]`;
    }
    showConfirmationModal = startDate.isBefore(now);

    if (!isValidHour(hour)) {
      return { error: true, msg: t('WARNINGS.INVALID_HOUR') + lineNumberOfCSV };
    }

    if (!checks.domainTypes[domainType]) {
      return { error: true, msg: t('WARNINGS.INVALID_DOMAIN_TYPE') + lineNumberOfCSV };
    }

    if (!_.isInteger(orderCapacity) || orderCapacity < 0) {
      return { error: true, msg: t('WARNINGS.INVALID_SLOT_CAPACITY') + lineNumberOfCSV };
    }

    const endDate = startDate.clone().add(1, 'hours');

    const startDateL = moment(startDate).add(startDate.utcOffset(), 'minutes').toISOString();
    const endDateL = moment(endDate).add(endDate.utcOffset(), 'minutes').toISOString();

    arrayOfPlans.push({
      warehouseId,
      startDate: startDateL,
      endDate: endDateL,
      domainType,
      orderCapacity,
    });
  }
  return { courierPlans: arrayOfPlans, showConfirmationModal, confirmationText: earliestDayText };
};

export const storeAssistantCSVToRequestObj = (csvData, checks, t) => {
  const validation = validateCSV(csvData, STORE_ASSISTANT_REQUIRED_COLUMN_NAMES, t);
  if (validation.error) {
    return validation;
  }

  // if the date is a past day, confirm if it is not a mistake
  let showConfirmationModal = false;

  const rows = csvData;
  const now = moment();
  let earliestDate = now;
  let earliestDayText = '';

  const arrayOfPlans = [];
  for (let i = 0; i < rows.length; i += 1) {
    const lineNumberOfCSV = i + 1;
    // extract fields from the row
    const {
      warehouse_id: warehouseId,
      day,
      hour,
      sa_plan: saPlan,
    } = rows[i];

    if (!checks.warehouseIds[warehouseId]) {
      return { error: true, msg: t('WARNINGS.INVALID_WAREHOUSE_ID') + lineNumberOfCSV };
    }

    const { timezone } = checks.warehouseIds[warehouseId];
    const startDate = moment.tz(day, DATE_FORMAT, STRICT_PARSE_FORMAT, timezone).add(hour, 'hours');
    if (!startDate.isValid()) {
      return { error: true, msg: t('WARNINGS.INVALID_DAY') + lineNumberOfCSV };
    }

    if (now.diff(startDate, 'days') > ALLOWABLE_PAST_DAY_NUMBER) {
      return { error: true, msg: `${t('WARNINGS.DATE_IS_PAST')}${lineNumberOfCSV} => ${day}` };
    }

    if (startDate.isBefore(now) && startDate.isBefore(earliestDate)) {
      earliestDate = startDate;
      earliestDayText = `[ ${lineNumberOfCSV}] : [${day}] : [${now.diff(startDate, 'days')}]`;
    }
    showConfirmationModal = startDate.isBefore(now);

    if (!isValidHour(hour)) {
      return { error: true, msg: t('WARNINGS.INVALID_HOUR') + lineNumberOfCSV };
    }

    if (!_.isInteger(saPlan) || saPlan < 0) {
      return { error: true, msg: t('WARNINGS.INVALID_COURIER_PLAN') + lineNumberOfCSV };
    }
    const endDate = startDate.clone().add(1, 'hours');

    const startDateL = moment(startDate).add(startDate.utcOffset(), 'minutes').toISOString();
    const endDateL = moment(endDate).add(endDate.utcOffset(), 'minutes').toISOString();

    arrayOfPlans.push({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      startDateL,
      endDateL,
      warehouseId,
      pickerPlan: saPlan,
    });
  }
  return { pickerPlan: arrayOfPlans, showConfirmationModal, confirmationText: earliestDayText };
};

export function arrayToIdMap(warehouses) {
  const selectedCountry = getSelectedCountry();
  const selectedCountryTimezone = selectedCountry?.timezones?.[0].timezone;

  const result = {};

  warehouses.forEach(warehouse => {
    result[warehouse._id] = {
      countryId: warehouse?.country,
      cityId: warehouse?.city,
      timezone: selectedCountryTimezone,
    };
  });

  return result;
}
