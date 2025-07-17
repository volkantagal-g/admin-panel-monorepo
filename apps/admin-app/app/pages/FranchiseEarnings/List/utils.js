/* eslint-disable max-len, camelcase */

import moment from 'moment';
import { forEach, set, get, isEmpty, isNumber, orderBy, sumBy, uniq, concat, keys, values, flatMap } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { numberFormat, currencyFormat as globalCurrencyFormat } from '@shared/utils/localization';
import {
  FRANCHISE_FINANCIAL_MONTH_START_DAY,
  BAG_ENUM_TYPES,
  FLEET_TYPES,
  FLEET_ENUM_TYPES,
  voyagerFleetTypes,
  VOYAGER_FLEET_TYPES_CONSTANTS,
} from './constants';

export const currencyFormat = () => globalCurrencyFormat({ maxDecimal: 3 });

export const getMaxSelectableFranchiseFinancialDate = () => {
  const dateOfMonth = moment().date();
  const tempDate = moment().endOf('month');
  if (dateOfMonth >= FRANCHISE_FINANCIAL_MONTH_START_DAY) {
    tempDate.add(1, 'month');
  }

  return tempDate;
};

export const getDefaultSelectedDateRange = () => {
  const dateOfMonth = moment().date();
  const startDate = moment().subtract(2, 'months');
  const endDate = moment();
  if (dateOfMonth >= FRANCHISE_FINANCIAL_MONTH_START_DAY) {
    startDate.add(1, 'month');
    endDate.add(1, 'month');
  }

  return [startDate, endDate];
};

export const getSelectedMonthKeys = selectedDateRange => {
  const months = [];
  const diffMounts = selectedDateRange[1].diff(selectedDateRange[0], 'month') || 0;
  const tempDate = selectedDateRange[0].clone().startOf('months');

  for (let i = 0; i <= diffMounts; i += 1) {
    months.push(tempDate.format('YYYY-MM'));
    tempDate.add(1, 'month');
  }

  return months;
};

export const addTaxTypeTextToGivenKey = (key, taxTypeText) => (
  `${key}_${taxTypeText}`
);

export const parseFinancialDataObjectKey = key => {
  const splitKey = key.toString().split(',');
  return {
    warehouse: splitKey[0].trim(),
    financialMonth: splitKey[2].trim(),
  };
};

export const formatDataForFinancialMonths = (filter, execFunc) => {
  const tempMap = {};
  get(filter, 'financialMonths', []).forEach(month => {
    tempMap[month] = execFunc(month);
  });

  return tempMap;
};

export const getGroupedFinancialData = data => {
  const groupedFinancialData = {};
  Object.entries(data).forEach(([key, value]) => {
    const parsedKey = parseFinancialDataObjectKey(key);
    if (isEmpty(groupedFinancialData[parsedKey.warehouse])) {
      groupedFinancialData[parsedKey.warehouse] = {};
    }
    groupedFinancialData[parsedKey.warehouse][parsedKey.financialMonth] = value;
  });
  return groupedFinancialData;
};

export const getFleetTotalKmsByVehicleType = (financialMonths, filter, taxTypeText) => {
  const mapp = {};
  const fleetTypeKeys = flatMap(FLEET_TYPES, object => Object.keys(object));

  formatDataForFinancialMonths(filter, month => {
    fleetTypeKeys.forEach(fleetType => {
      const fleetDataFoo = Object.values(get(financialMonths, [month, 'fleet', fleetType], {}));

      fleetDataFoo.forEach(data => {
        const someKey = data.fleet_support.vehicle_type;
        const perKmMaintenanceKey = `per_km_maintenance_support_${taxTypeText}`;
        const perKmAmortizationKey = `per_km_amortization_support_${taxTypeText}`;

        mapp[someKey] = {
          ...mapp[someKey],
          [month]: {
            km: get(mapp, [someKey, month, 'km'], 0) + data.fleet_support.km,
            [perKmMaintenanceKey]: get(mapp, [someKey, perKmMaintenanceKey], 0) + data.fleet_support[perKmMaintenanceKey],
            [perKmAmortizationKey]: get(mapp, [someKey, perKmAmortizationKey], 0) + data.fleet_support[perKmAmortizationKey],
            financialMonths: get(data, ['fleet_support', 'financial_month'], '-'),
          },
        };
      });
    });
  });
  return mapp;
};

export const getFuelDataByVehicleType = ({ financialMonths, filter, taxTypeText }) => {
  const totalKmAndAvgKmFuelSupport = {};
  let fuelDataByVehicleTypeMap = {};

  formatDataForFinancialMonths(filter, month => {
    Object.entries(get(financialMonths, [month, 'fleet'], {})).forEach(value => {
      const [fleetType, fleetValue] = value;
      Object.values(fleetValue).forEach(item => {
        set(totalKmAndAvgKmFuelSupport, [fleetType, month], {
          totalKm: (totalKmAndAvgKmFuelSupport[fleetType]?.[month]?.totalKm || 0) + get(item, ['fleet_support', 'km'], 0),
          avgKmFuelSupport: (totalKmAndAvgKmFuelSupport[fleetType]?.[month]?.avgKmFuelSupport || 0) + get(item, ['fleet_support', `per_km_fuel_support_${taxTypeText}`], 0),
          totalCarCount: totalKmAndAvgKmFuelSupport[fleetType]?.[month]?.totalCarCount + 1 || 1,
        });
      });
    });
  });

  fuelDataByVehicleTypeMap = getFleetTotalKmsByVehicleType(financialMonths, filter, taxTypeText);

  const totalKmAndAvgKmFuelSupportValues = Object.values(totalKmAndAvgKmFuelSupport);

  const children = [...[
    {
      order: 1,
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.TOTAL_KM'),
      ...formatDataForFinancialMonths(filter, month => (
        numberFormat().format(sumBy(totalKmAndAvgKmFuelSupportValues, (obj => obj[month]?.totalKm)) || 0)
      )),
    },
  ]];

  FLEET_TYPES.forEach(fleetType => {
    children.push(
      {
        order: 2,
        title: t(`franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.${values(fleetType)}_KM`),
        ...formatDataForFinancialMonths(filter, month => {
          const financialMonth = get(fuelDataByVehicleTypeMap, [`${keys(fleetType)[0].split('.')[0]}`, month, 'financialMonths'], 0);

          if (financialMonth === month) {
            return (
              numberFormat().format(get(fuelDataByVehicleTypeMap, [`${keys(fleetType)[0].split('.')[0]}`, month, 'km'], 0))
            );
          }
          return 0;
        }),
      },
    );
  });
  children.push(
    {
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.CAR_FUEL_SUPPORT_PER_KM'),
      ...formatDataForFinancialMonths(filter, month => currencyFormat().format((totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.CAR]?.[month]?.avgKmFuelSupport / totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.CAR]?.[month]?.totalCarCount) || 0)),
    },
    {
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.MOTO_FUEL_SUPPORT_PER_KM'),
      ...formatDataForFinancialMonths(filter, month => currencyFormat().format((totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.MOTO]?.[month]?.avgKmFuelSupport / totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.MOTO]?.[month]?.totalCarCount) || 0)),
    },
    {
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.MITU_FUEL_SUPPORT_PER_KM'),
      ...formatDataForFinancialMonths(filter, month => currencyFormat().format((totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.MITU]?.[month]?.avgKmFuelSupport / totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.MITU]?.[month]?.totalCarCount) || 0)),
    },
    {
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.E_BIKE_FUEL_SUPPORT_PER_KM'),
      ...formatDataForFinancialMonths(filter, month => currencyFormat().format((totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.E_BIKE]?.[month]?.avgKmFuelSupport / totalKmAndAvgKmFuelSupport[FLEET_ENUM_TYPES.E_BIKE]?.[month]?.totalCarCount) || 0)),
    },
  );

  return children;
};

export const getMaintenanceDataByVehicleType = ({ financialMonths, filter, taxTypeText }) => {
  const maintenanceMapByVehicle = getFleetTotalKmsByVehicleType(financialMonths, filter, taxTypeText);

  const totalKm = {};
  const maintenanceKmMap = {};

  formatDataForFinancialMonths(filter, month => {
    Object.entries(get(financialMonths, [month, 'fleet'], {})).forEach(value => {
      const [fleetType, fleetValue] = value;
      Object.values(fleetValue).forEach(item => {
        if (month === get(item, 'fleet_support.financial_month')) {
          totalKm[month] = { value: (totalKm[month]?.value || 0) + get(item, ['fleet_support', 'km_amortization_and_maintanance'], 0) };
          const currentMonthKmAmortizationAndMaintenance = (maintenanceKmMap?.[fleetType]?.[month]?.kmAmortizationAndMaintenance || 0) + get(item, ['fleet_support', 'km_amortization_and_maintanance'], 0);
          maintenanceKmMap[fleetType] = { ...maintenanceKmMap?.[fleetType], [month]: { kmAmortizationAndMaintenance: currentMonthKmAmortizationAndMaintenance } };
        }
      });
    });
  });

  const children = [...[
    {
      order: 1,
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.MAINTENANCE.TOTAL_KM'),
      ...formatDataForFinancialMonths(filter, month => (
        numberFormat().format((totalKm[month]?.value) || 0)
      )),
    },
  ]];

  FLEET_TYPES.forEach(fleetType => {
    children.push(
      {
        title: t(`franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.MAINTENANCE.ADJUSTED_${values(fleetType)}_KM`),
        ...formatDataForFinancialMonths(filter, month => (numberFormat().format(maintenanceKmMap[keys(fleetType)]?.[month]?.kmAmortizationAndMaintenance || 0))),
      },
      {
        title: t(`franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.MAINTENANCE.${values(fleetType)}_PER_KM_MAINTENANCE_SUPPORT`),
        ...formatDataForFinancialMonths(filter, month => {
          const financialMonth = get(maintenanceMapByVehicle, [`${keys(fleetType)[0].split('.')[0]}`, month, 'financialMonths'], 0);
          if (financialMonth === month) {
            return currencyFormat().format(get(maintenanceMapByVehicle, [`${keys(fleetType)[0].split('.')[0]}`, month, `per_km_maintenance_support_${taxTypeText}`], 0));
          }
          return currencyFormat().format(0);
        }),
      },
    );
  });

  return children;
};

export const getAmortizationDataByVehicleType = ({ financialMonths, filter, taxTypeText }) => {
  const totalKm = {};
  const amortizationMapByVehicle = getFleetTotalKmsByVehicleType(financialMonths, filter, taxTypeText);
  const amortizationKmMap = {};

  formatDataForFinancialMonths(filter, month => {
    Object.entries(get(financialMonths, [month, 'fleet'], {})).forEach(value => {
      const [fleetType, fleetValue] = value;
      Object.values(fleetValue).forEach(item => {
        if (month === get(item, 'fleet_support.financial_month')) {
          totalKm[month] = { value: (totalKm[month]?.value || 0) + get(item, ['fleet_support', 'km_amortization_and_maintanance'], 0) };
          const currentMonthKmAmortizationAndMaintenance = (amortizationKmMap?.[fleetType]?.[month]?.kmAmortizationAndMaintenance || 0) + get(item, ['fleet_support', 'km_amortization_and_maintanance'], 0);
          amortizationKmMap[fleetType] = { ...amortizationKmMap?.[fleetType], [month]: { kmAmortizationAndMaintenance: currentMonthKmAmortizationAndMaintenance } };
        }
      });
    });
  });

  const children = [...[
    {
      order: 1,
      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.AMORTIZATION.TOTAL_KM'),
      ...formatDataForFinancialMonths(filter, month => (
        numberFormat().format((totalKm[month]?.value) || 0)
      )),
    },
  ]];

  FLEET_TYPES.forEach(fleetType => {
    children.push(
      {
        order: 2,
        title: t(`franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.AMORTIZATION.ADJUSTED_${values(fleetType)}_KM`),
        ...formatDataForFinancialMonths(filter, month => (numberFormat().format(amortizationKmMap[keys(fleetType)]?.[month]?.kmAmortizationAndMaintenance || 0))),
      },
      {
        order: 3,
        title: t(`franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.AMORTIZATION.${values(fleetType)}_PER_KM_AMORTIZATION_SUPPORT`),
        ...formatDataForFinancialMonths(filter, month => {
          const financialMonth = get(amortizationMapByVehicle, [`${keys(fleetType)[0].split('.')[0]}`, month, 'financialMonths'], 0);
          if (financialMonth === month) {
            return currencyFormat().format(get(amortizationMapByVehicle, [`${keys(fleetType)[0].split('.')[0]}`, month, `per_km_amortization_support_${taxTypeText}`], 0));
          }
          return currencyFormat().format(0);
        }),
      }
    );
  });
  return children;
};

export const getCourierLoyaltyByCourierStatus = ({ financialMonths, filter, taxTypeText }) => {
  const courierStatusMap = {};
  const children = [];
  formatDataForFinancialMonths(filter, month => {
    get(financialMonths, `${month}.bonus.courier_loyalty_support`, []).forEach(courierLoyaltySupport => {
      const courierStatus = get(courierLoyaltySupport, 'courier_status', '');
      if (!courierStatusMap[courierStatus]) {
        courierStatusMap[courierStatus] = {};
      }
      courierStatusMap[courierStatus] = {
        ...courierStatusMap[courierStatus],
        [month]: courierLoyaltySupport,
        courierStatus: courierLoyaltySupport?.courier_status,
      };
    });
  });
  Object.values(courierStatusMap).forEach(courier => {
    children.push(
      {
        title: t(`franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.TOTAL_${courier.courierStatus.toUpperCase()}_COURIER_COUNT`),
        ...formatDataForFinancialMonths(filter, month => numberFormat().format(get(courier, `${month}.courier_count`, 0))),
      },
      {
        title: t(`franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.${courier.courierStatus.toUpperCase()}_COURIER_BONUS`),
        ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(courier, `${month}.total_courier_loyalty_support_${taxTypeText}`, 0))),
      },
      {
        title: t(`franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.PER_${courier.courierStatus.toUpperCase()}_COURIER_BONUS`),
        ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(courier, `${month}.per_courier_loyalty_support_${taxTypeText}`, 0))),
      }
    );
  });
  return children;
};

export const getCourierLoyaltyByCourierStatusForVoyager = ({ financialMonths, filter, taxTypeText }) => {
  const courierStatusMap = {};
  const total = {};
  const children = [];
  formatDataForFinancialMonths(filter, month => {
    get(financialMonths, `${month}.franchise_income.courier_loyalty`, []).forEach(courierLoyaltySupport => {
      const courierStatus = get(courierLoyaltySupport, 'courier_status', '');
      if (!courierStatusMap[courierStatus]) {
        courierStatusMap[courierStatus] = {};
      }
      courierStatusMap[courierStatus] = {
        ...courierStatusMap[courierStatus],
        [month]: courierLoyaltySupport,
        courierStatus: courierLoyaltySupport?.courier_status,
      };
      if (!total[month]) {
        total[month] = { [taxTypeText]: 0 };
      }
      total[month] = { [taxTypeText]: total[month][taxTypeText] + courierLoyaltySupport[`total_courier_loyalty_support_${taxTypeText}`] };
    });
  });
  Object.values(courierStatusMap).forEach(courier => {
    children.push(
      {
        ...formatDataForFinancialMonths(
          filter,
          month => (numberFormat().format(get(courier, `${month}.courier_count`, 0)))
        ),
        title: t(`franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.TOTAL_${courier.courierStatus.toUpperCase()}_COURIER_COUNT`),
      },
      {
        ...formatDataForFinancialMonths(
          filter,
          month => (currencyFormat().format(get(courier, `${month}.total_courier_loyalty_support_${taxTypeText}`, 0)))
        ),
        title: t(`franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.${courier.courierStatus.toUpperCase()}_COURIER_BONUS`),
      },
      {
        ...formatDataForFinancialMonths(
          filter,
          month => (currencyFormat().format(get(courier, `${month}.per_courier_loyalty_support_${taxTypeText}`, 0)))
        ),
        title: t(`franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.PER_${courier.courierStatus.toUpperCase()}_COURIER_BONUS`),
      },
    );
  });
  return {
    ...formatDataForFinancialMonths(
      filter,
      month => (currencyFormat().format(get(total, `${month}.${taxTypeText}`, 0)))
    ),
    children,
  };
};

export const getWarehouseBagSupportBySize = ({ financialMonths, filter, taxTypeText }) => {
  const bagSizeMap = {};
  const children = [];
  formatDataForFinancialMonths(filter, month => {
    get(financialMonths, `${month}.warehouse.warehouse_bag_support`, []).forEach(bagSupport => {
      const bagSize = get(bagSupport, 'bag_type', '');
      if (!bagSizeMap[bagSize]) {
        bagSizeMap[bagSize] = {};
      }
      bagSizeMap[bagSize] = {
        ...bagSizeMap[bagSize],
        bagType: bagSupport?.bag_type.split(' ')[0],
        [month]: bagSupport,
      };
    });
  });

  Object.values(bagSizeMap).forEach(bagSizeItem => {
    const { bagType } = bagSizeItem;
    children.push(
      {
        size: BAG_ENUM_TYPES[bagType],
        order: 1,
        title: t(`franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.BAG_SUPPORT.SUGGESTED_${bagSizeItem?.bagType}_BAG_COUNT`),
        ...formatDataForFinancialMonths(filter, month => numberFormat().format(get(bagSizeItem, `${month}.bag_count`, 0))),
      },
      {
        size: BAG_ENUM_TYPES[bagType],
        order: 2,
        title: t(`franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.BAG_SUPPORT.${bagSizeItem?.bagType}_BAG_PRICE`),
        ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(bagSizeItem, `${month}.per_bag_support_${taxTypeText}`, 0))),
      }
    );
  });
  return orderBy(children, ['size'], ['asc']);
};

export const getMissedOrderByCourierCompliance = ({ financialMonths, filter }) => {
  const missedOrderCostByCourierComplianceMap = {};
  formatDataForFinancialMonths(filter, month => {
    get(financialMonths, `${month}.missed_order.missed_order_cost`, []).forEach(missedOrderCostByCourierCompliance => {
      const missedOrderCase = missedOrderCostByCourierCompliance.case;
      if (!missedOrderCostByCourierComplianceMap) {
        missedOrderCostByCourierComplianceMap[missedOrderCase] = {};
      }
      missedOrderCostByCourierComplianceMap[missedOrderCase] = {
        ...missedOrderCostByCourierComplianceMap[missedOrderCase],
        [month]: missedOrderCostByCourierCompliance,
      };
    });
  });
  return missedOrderCostByCourierComplianceMap;
};

export const getCourierOrderSupportDataByVehicleType = ({ financialMonths, filter }) => {
  const courierOrderSupportMap = {};
  formatDataForFinancialMonths(filter, month => {
    get(financialMonths, `${month}.courier.courier_order_support`, []).forEach(courierSupport => {
      const vehicleType = get(courierSupport, 'vehicle_type', '');
      if (!courierOrderSupportMap[vehicleType]) {
        courierOrderSupportMap[vehicleType] = {};
      }
      courierOrderSupportMap[vehicleType] = {
        ...courierOrderSupportMap[vehicleType],
        [month]: courierSupport,
      };
    });
  });
  return courierOrderSupportMap;
};

export const getVoyagerMaintenanceDataByFleetType = ({ financialMonths, filter, fleetType, fleetTypeKey, taxTypeText }) => {
  let ages = [];
  const maintenanceSupportTotal = {};

  const children = [
    {
      age: Number.MAX_SAFE_INTEGER,
      order: 1,
      title: t(`franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_MAINTENANCE_SUPPORTS.UNSUPPORTED_${fleetTypeKey}_KM`),
      ...formatDataForFinancialMonths(filter, month => (
        numberFormat().format(sumBy(
          Object.values(get(financialMonths, `${month}.fleet.${fleetType}`, {})),
          ({ fleet_variable: { total_km } = {}, fleet_variable: { is_maintenance_supported } = {} }) => (
            !is_maintenance_supported && isNumber(total_km) ? total_km : 0
          )
        ))
      )),
    },
  ];

  forEach(financialMonths, financialMonth => {
    ages = concat(ages, Object.keys(get(financialMonth, `fleet.${fleetType}`, {})));
  });

  forEach(uniq(ages), age => {
    children.push(
      {
        age,
        order: 1,
        title: t(`franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_MAINTENANCE_SUPPORTS.X_YEARS_OLD_${fleetTypeKey}_KM`, { age }),
        ...formatDataForFinancialMonths(
          filter,
          month => numberFormat().format(get(financialMonths, `${month}.fleet.${fleetType}.${age}.fleet_variable.total_km`, 0)),
        ),
      },
      {
        age,
        order: 2,
        title: t(`franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_MAINTENANCE_SUPPORTS.X_YEARS_OLD_${fleetTypeKey}_PER_KM_MAINTENANCE_SUPPORT`, { age }),
        ...formatDataForFinancialMonths(
          filter,
          month => numberFormat({ minDecimal: 3 }).format(get(financialMonths, `${month}.fleet.${fleetType}.${age}.fleet_variable.per_km_maintenance_support_${taxTypeText}`, 0)),
        ),
      },
      {
        age,
        order: 3,
        title: t(`franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_MAINTENANCE_SUPPORTS.X_YEARS_OLD_${fleetTypeKey}_MAINTENANCE_SUPPORT`, { age }),
        ...formatDataForFinancialMonths(
          filter,
          month => currencyFormat().format(get(financialMonths, `${month}.fleet.${fleetType}.${age}.fleet_variable.fleet_maintenance_support_${taxTypeText}`, 0))),
      },
    );
    formatDataForFinancialMonths(filter, month => {
      const fleetMaintenanceSupport = get(financialMonths, `${month}.fleet.${fleetType}.${age}.fleet_variable.fleet_maintenance_support_${taxTypeText}`, 0);

      if (Object.prototype.hasOwnProperty.call(maintenanceSupportTotal, month)) {
        maintenanceSupportTotal[month] += fleetMaintenanceSupport;
      }
      else {
        maintenanceSupportTotal[month] = fleetMaintenanceSupport;
      }
    });
  });

  return {
    ...formatDataForFinancialMonths(filter, month => currencyFormat().format(maintenanceSupportTotal[month] ? maintenanceSupportTotal[month] : 0)),
    children: orderBy(children, ['age', 'order']),
  };
};

export const fleetFuelSupportByVehicleType = (financialMonths, filter, taxTypeText) => {
  const voyagerFleetFuelMap = {};
  const fleetVehicleTypes = flatMap(voyagerFleetTypes, object => Object.keys(object));

  formatDataForFinancialMonths(filter, month => {
    fleetVehicleTypes.forEach(fleetType => {
      const fleetTypedData = Object.values(get(financialMonths, [month, 'fleet', fleetType], {}));

      fleetTypedData.forEach(data => {
        const key = data?.fleet_variable?.vehicle_type;

        if (key) {
          voyagerFleetFuelMap[key] = {
            ...voyagerFleetFuelMap[key],
            [month]: {
              totalKm: get(voyagerFleetFuelMap, [key, month, 'totalKm'], 0) + data?.fleet_variable?.total_km,
              orderKm: get(voyagerFleetFuelMap, [key, month, 'orderKm'], 0) + data?.fleet_variable?.order_km,
              refillKm: get(voyagerFleetFuelMap, [key, month, 'refillKm'], 0) + data?.fleet_variable?.refill_km,
              perKmFuelSupport: data?.fleet_variable[`per_km_fuel_support_${taxTypeText}`],
              financialMonths: get(data, ['fleet_variable', 'financial_month'], '-'),
            },
          };
        }
      });
    });
  });
  return voyagerFleetFuelMap;
};

export const getVoyagerFleetFuelSupports = ({ financialMonths, filter, taxTypeText }) => {
  const children = [];
  const fleetSupportDataByVehicle = fleetFuelSupportByVehicleType(financialMonths, filter, taxTypeText);
  const currentFleetTypes = Object.keys(fleetSupportDataByVehicle);

  if (fleetSupportDataByVehicle) {
    currentFleetTypes.forEach(fleetType => {
      children.push(
        {
          title: `${t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_FUEL_SUPPORTS.ORDER_KM')} (${VOYAGER_FLEET_TYPES_CONSTANTS[fleetType]?.[getLangKey()]})`,
          ...formatDataForFinancialMonths(filter, month => {
            const financialMonth = get(fleetSupportDataByVehicle, [fleetType, month, 'financialMonths']);

            if (financialMonth === month) {
              return (
                numberFormat().format(get(fleetSupportDataByVehicle, [fleetType, month, 'orderKm']))
              );
            }
            return 0;
          }),
        },
        {
          title: `${t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_FUEL_SUPPORTS.REFILL_KM')} (${VOYAGER_FLEET_TYPES_CONSTANTS[fleetType][getLangKey()]})`,
          ...formatDataForFinancialMonths(filter, month => {
            const financialMonth = get(fleetSupportDataByVehicle, [fleetType, month, 'financialMonths']);

            if (financialMonth === month) {
              return (
                numberFormat().format(get(fleetSupportDataByVehicle, [fleetType, month, 'refillKm']))
              );
            }
            return 0;
          }),
        },
        {
          title: `${t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_FUEL_SUPPORTS.TOTAL_KM')} (${VOYAGER_FLEET_TYPES_CONSTANTS[fleetType][getLangKey()]})`,
          ...formatDataForFinancialMonths(filter, month => {
            const financialMonth = get(fleetSupportDataByVehicle, [fleetType, month, 'financialMonths']);

            if (financialMonth === month) {
              return (
                numberFormat().format(get(fleetSupportDataByVehicle, [fleetType, month, 'totalKm']))
              );
            }
            return 0;
          }),
        },
        {
          title: `${t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_FUEL_SUPPORTS.PER_KM_FUEL_FEE')} (${VOYAGER_FLEET_TYPES_CONSTANTS[fleetType][getLangKey()]})`,
          ...formatDataForFinancialMonths(filter, month => {
            const financialMonth = get(fleetSupportDataByVehicle, [fleetType, month, 'financialMonths']);

            if (financialMonth === month) {
              return (
                currencyFormat().format(get(fleetSupportDataByVehicle, [fleetType, month, 'perKmFuelSupport']))
              );
            }
            return 0;
          }),
        },
      );
    });
  }
  return children;
};

export const getCouriersExceedingHourDeduction = ({ financialMonths, filter }) => {
  const couriers = {};
  const courierDeductionMap = {};

  filter?.financialMonths?.forEach(month => {
    courierDeductionMap[month] = currencyFormat().format(0);
  });

  formatDataForFinancialMonths(
    filter, month => get(financialMonths, `${month}.courier.courier_exceeded_hour_deduction`, [])
      .forEach(courier => {
        if (!couriers[courier?.courier_id]) {
          couriers[courier?.courier_id] = courierDeductionMap;
        }
        couriers[courier?.courier_id] = {
          ...couriers[courier?.courier_id],
          id: courier?.courier_id,
          title: courier?.courier_name,
          [month]: currencyFormat().format(courier?.total_exceeding_deduction_tax_excluded),
        };
        return null;
      })
  );

  return Object.values(couriers);
};
