/* eslint-disable max-len, camelcase */

import { createSelector } from 'reselect';
import { get, uniqueId, pick } from 'lodash';

import { t } from '@shared/i18n';
import { REDUX_KEY, COURIER_TYPE } from '@shared/shared/constants';
import { getStateObject, createMap } from '@shared/utils/common';
import { percentFormat, numberFormat } from '@shared/utils/localization';

import {
  currencyFormat,
  getGroupedFinancialData,
  formatDataForFinancialMonths,
  getVoyagerMaintenanceDataByFleetType,
  getVoyagerFleetFuelSupports,
  getCourierLoyaltyByCourierStatus,
  getFuelDataByVehicleType,
  getMaintenanceDataByVehicleType,
  getAmortizationDataByVehicleType,
  getWarehouseBagSupportBySize,
  getMissedOrderByCourierCompliance,
  getCourierOrderSupportDataByVehicleType,
  getCourierLoyaltyByCourierStatusForVoyager,
  getCouriersExceedingHourDeduction,
} from '../utils';
import { ROW_TEXT_COLORS, FLEET_TYPE } from '../constants';

const reducerKey = REDUX_KEY.FRANCHISE_EARNINGS.LIST;

export const earningsSelector = {
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'earnings'),
    ({ isPending }) => !!isPending
  ),
  getTableData: createSelector(
    state => getStateObject(state, reducerKey, 'earnings'),
    state => getStateObject(state, reducerKey, 'taxType'),
    ({ data = {}, warehouses = [], filter = {} }, { text: taxTypeText }) => {
      const tableData = [];
      const groupedFinancialData = getGroupedFinancialData(data);
      const warehouseMap = createMap(warehouses);
      const warehouseIds = warehouses.map(warehouse => warehouse._id);
      const filteredGroupedFinancialData = pick(groupedFinancialData, warehouseIds);
      Object.entries(filteredGroupedFinancialData).forEach(([warehouseId, financialMonths]) => {
        const missedOrderMap = getMissedOrderByCourierCompliance({ financialMonths, filter, taxTypeText });
        const courierSupportMap = getCourierOrderSupportDataByVehicleType({ financialMonths, filter });
        tableData.push({
          id: uniqueId(),
          title: get(warehouseMap, `${warehouseId}.name`, '-'),
          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(financialMonths, `${month}.total.total.total_earnings_${taxTypeText}`, 0))),
          children: [
            {
              id: uniqueId(),
              title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(filter, month => (
                currencyFormat().format(get(financialMonths, `${month}.total.total.warehouse_total_support_${taxTypeText}`, 0))
              )),
              children: [
                {
                  id: uniqueId(),
                  title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.fixed_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.BASE_FIXED_EXPENSES_SUPPORT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed_support[0].base_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat()
                              .format(get(financialMonths, `${month}.profit.profit_support.cumulative_g10_order_count`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.BASE_FIXED_EXPENSES_SUPPORT.TOTAL_G10_ORDER_COUNT'),
                        },
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat()
                              .format(get(financialMonths, `${month}.profit.profit_support.cumulative_gb_order_count`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.BASE_FIXED_EXPENSES_SUPPORT.TOTAL_GB_ORDER_COUNT'),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.ADDITIONAL_FIXED_EXPENSES_SUPPORT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed_support[0].base_extra_order_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_fixed_support[0].extra_order_count`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.ADDITIONAL_FIXED_EXPENSES_SUPPORT.ADDITIONAL_ORDER_COUNT'),
                        },
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_fixed_support[0].base_extra_per_order_support_${taxTypeText}`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.FIXED_EXPENSES.ADDITIONAL_FIXED_EXPENSES_SUPPORT.ADDITIONAL_FIXED_EXPENSES_PER_SUPPORT'),
                        },
                      ],
                    },
                  ],
                },
                {
                  id: uniqueId(),
                  title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.rent_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.RENT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].rent_amount`, 0))
                      )),
                      children: [
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].rent_amount`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.RENT.RENT_PRICE'),
                        },
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].rent_ratio`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.RENT.RENT_SUPPORT_RATE'),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.STOPPAGE.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].stoppage_amount`, 0))
                      )),
                      children: [
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].stoppage_amount`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.STOPPAGE.STOPPAGE_AMOUNT'),
                        },
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].rent_ratio`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.STOPPAGE.STOPPAGE_SUPPORT_RATE'),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.CAR_PARK.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].car_park_amount`, 0))
                      )),
                      children: [
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].car_park_amount`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.CAR_PARK.CAR_PARK_AMOUNT'),
                        },
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].rent_ratio`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.CAR_PARK.CAR_PARK_SUPPORT_RATE'),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.DUES.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].dues_amount`, 0))
                      )),
                      children: [
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].dues_amount`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.DUES.DUES_AMOUNT'),
                        },
                        {
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat()
                              .format(get(financialMonths, `${month}.warehouse.warehouse_rent_oven_support[0].rent_ratio`, 0))
                          )),
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.RENT.DUES.DUES_SUPPORT_RATE'),
                        },
                      ],
                    },
                  ],
                },
                {
                  id: uniqueId(),
                  title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.warehouse_order_cost_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.BREAD_SUPPORT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat()
                          .format(get(financialMonths, `${month}.warehouse.warehouse_bread_support[0].warehouse_bread_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.BREAD_SUPPORT.SOLD_BREAD_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.warehouse.warehouse_bread_support[0].bread_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.BREAD_SUPPORT.PRICE_PER_BREAD'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_bread_support[0].per_bread_support_${taxTypeText}`, 0))
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.BAG_SUPPORT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat()
                          .format(get(financialMonths, `${month}.total.total.bag_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        ...getWarehouseBagSupportBySize({ financialMonths, filter, taxTypeText }),
                      ],
                    },
                    {
                      id: uniqueId(),
                      title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.CRAFT_SUPPORT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat()
                          .format(get(financialMonths, `${month}.warehouse.warehouse_kraft_support[0].total_kraft_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.CRAFT_SUPPORT.RECOMMENDED_TOTAL_CRAFT_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.warehouse.warehouse_kraft_support[0].kraft_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ORDER_EXPENSES.CRAFT_SUPPORT.PRICE_PER_CRAFT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_kraft_support[0].per_kraft_support_${taxTypeText}`, 0))
                          )),
                        },
                      ],
                    },
                  ],
                },
                {
                  title: t('franchiseEarningsPage:LIST.TABLE.STORAGE.ADDITIONAL_WAREHOUSEMAN_SUPPORT'),
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouseman_support.0.additional_warehouseman_support_${taxTypeText}`, 0))
                  )),
                },
              ],
            },
            {
              id: uniqueId(),
              title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(filter, month => (
                currencyFormat().format(get(financialMonths, `${month}.total.total.distribution_total_support_${taxTypeText}`, 0))
              )),
              children: [
                {
                  id: uniqueId(),
                  title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.courier_total_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.UTILIZED_COURIER.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.courier.courier_support[0].courier_utilized_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.UTILIZED_COURIER.UTILIZED_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.courier_hours[0].utilized_allowed`, 0))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.UTILIZED_COURIER.SUPPORTED_COURIER_PER_HOUR_FEE'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.courier.courier_support[0].man_hour_fee_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.UTILIZED_COURIER.OVERTIME_PAYMENT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.courier.courier_additional_support[0].utilized_additional_support_${taxTypeText}`, 0))
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.IDLE_COURIER.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.courier.courier_support[0].courier_idle_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.IDLE_COURIER.SUPPORTED_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.courier_hours[0].idle_allowed`, 0))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.IDLE_COURIER.NOT_SUPPORTED_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.courier_hours[0].not_supported_idle_surplus_hours`, 0))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.IDLE_COURIER.OVERTIME_PAYMENT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.courier.courier_additional_support[0].idle_additional_support_${taxTypeText}`, 0))
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.BUSY_COURIER.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.courier.courier_support[0].courier_busy_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.BUSY_COURIER.SUPPORTED_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.courier_hours[0].busy_allowed`, 0))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.BUSY_COURIER.NOT_SUPPORTED_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.courier_hours[0].busy_surplus_hours`, 0))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.EXCEEDING_DEDUCTION.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.courier.exceeded_hour_deduction[0].total_exceeding_deduction_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.EXCEEDING_DEDUCTION.TOTAL_EXCEEDING_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.exceeded_hour_deduction[0].exceeded_hours`, 0))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.EXCEEDING_DEDUCTION.COURIER_SUPPORT_FEE_PER_HOUR'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.courier.courier_support[0].man_hour_fee_${taxTypeText}`, 0))
                          )),
                        },
                        ...getCouriersExceedingHourDeduction({ financialMonths, filter }),
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.EFFECTIVITY_DEDUCTION.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.total.total.getir_courier_cost_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.EFFECTIVITY_DEDUCTION.USED_HOURS'),
                          ...formatDataForFinancialMonths(filter, month => (
                            `${numberFormat().format(get(financialMonths, `${month}.courier.getir_courier_cost[0].total_getir_courier_hours`, '0'))} ${t('franchiseEarningsPage:LIST.HOUR')}`
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.EFFECTIVITY_DEDUCTION.EFFECTIVITY_COST_PER_HOUR'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.courier.getir_courier_cost[0].per_hour_getir_manpower_${taxTypeText}`, '0'))
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.total_courier_order_support_${taxTypeText}`, 0))),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.NUMBER_OF_ORDERS_GB'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.g10_order_count`, 0) +
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.gb_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.NUMBER_OF_ORDERS_GY'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.gy_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.NUMBER_OF_ORDERS_GL'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.artisan_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.SUPPORT_PER_ORDER_GB'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.courier_per_g10_order_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.SUPPORT_PER_ORDER_GY'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.courier_per_gy_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.PEDESTRIAN_COURIER_SUPPORT.SUPPORT_PER_ORDER_GL'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.ON_FOOT], `${month}.courier_per_artisan_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                        get(courierSupportMap[COURIER_TYPE.MITU], `${month}.total_courier_order_support_${taxTypeText}`, 0)
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.NUMBER_OF_ORDERS_GB'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.g10_order_count`, 0) +
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.gb_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.NUMBER_OF_ORDERS_GY'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.gy_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.NUMBER_OF_ORDERS_GL'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.artisan_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.SUPPORT_PER_ORDER_GB'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.courier_per_g10_order_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.SUPPORT_PER_ORDER_GY'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.courier_per_gy_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MITU_COURIER_SUPPORT.SUPPORT_PER_ORDER_GL'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MITU], `${month}.courier_per_artisan_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                        get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.total_courier_order_support_${taxTypeText}`, 0)
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.NUMBER_OF_ORDERS_GB'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.g10_order_count`, 0) +
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.gb_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.NUMBER_OF_ORDERS_GY'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.gy_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.NUMBER_OF_ORDERS_GL'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.artisan_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.SUPPORT_PER_ORDER_GB'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.courier_per_g10_order_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.SUPPORT_PER_ORDER_GY'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.courier_per_gy_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.MOTO_COURIER_SUPPORT.SUPPORT_PER_ORDER_GL'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.MOTO], `${month}.courier_per_artisan_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                        get(courierSupportMap[COURIER_TYPE.VAN], `${month}.total_courier_order_support_${taxTypeText}`, 0)
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.NUMBER_OF_ORDERS_GB'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.g10_order_count`, 0) +
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.gb_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.NUMBER_OF_ORDERS_GL'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.artisan_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.NUMBER_OF_ORDERS_GY'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.gy_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.SUPPORT_PER_ORDER_GB'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.courier_per_g10_order_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.SUPPORT_PER_ORDER_GY'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.courier_per_gy_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.CAR_COURIER_SUPPORT.SUPPORT_PER_ORDER_GL'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.VAN], `${month}.courier_per_artisan_order_count_support_${taxTypeText}`, 0)
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.E_BIKE_COURIER_SUPPORT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                        get(courierSupportMap[COURIER_TYPE.E_BIKE], `${month}.total_courier_order_support_${taxTypeText}`, 0)
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.E_BIKE_COURIER_SUPPORT.NUMBER_OF_ORDERS_GB'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(
                            get(courierSupportMap[COURIER_TYPE.E_BIKE], `${month}.g10_order_count`, 0) +
                            get(courierSupportMap[COURIER_TYPE.E_BIKE], `${month}.gb_order_count`, 0)
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.COURIER.E_BIKE_COURIER_SUPPORT.SUPPORT_PER_ORDER_GB'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(
                            get(courierSupportMap[COURIER_TYPE.E_BIKE], `${month}.courier_per_g10_order_support_${taxTypeText}`, 0)
                          )),
                        },
                      ],
                    },
                  ],
                },
                {
                  id: uniqueId(),
                  title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.fleet_total_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.FUEL.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.total.total.fleet_fuel_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        ...getFuelDataByVehicleType({ financialMonths, filter, taxTypeText }),
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.MAINTENANCE.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(financialMonths, `${month}.total.total.fleet_maintenance_support_${taxTypeText}`, 0))),
                      children: [
                        ...getMaintenanceDataByVehicleType({ financialMonths, filter, taxTypeText }),
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.DISTRIBUTION.FUEL_MAINTENANCE_AMORTIZATION.AMORTIZATION.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.total.total.fleet_amortization_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        ...getAmortizationDataByVehicleType({ financialMonths, filter, taxTypeText }),
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: uniqueId(),
              title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(filter, month => (
                currencyFormat().format(get(financialMonths, `${month}.total.total.franchise_income_support_${taxTypeText}`, 0))
              )),
              children: [
                {
                  id: uniqueId(),
                  title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.total_profit_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.fixed_profit_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.PERCENTAGE_IN_PROFIT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat().format(get(financialMonths, `${month}.profit.profit_support.fixed_profit_ratio`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.G10_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.cumulative_g10_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.GB_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.cumulative_gb_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.GY_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.cumulative_gy_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.GL_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.daily_artisan_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.BASE_PROFIT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.base_profit_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.EXTRA_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.getir_extra_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.GB_PROFIT_PER_ORDER'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.getir_per_order_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.GY_PROFIT_PER_ORDER'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.per_gy_order_profit_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_INDEPENDENT_PROFIT.GL_PROFIT_PER_ORDER'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.per_artisan_order_profit_support_${taxTypeText}`, 0))
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.dds_profit_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.PERCENTAGE_IN_PROFIT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat().format(get(financialMonths, `${month}.profit.profit_support.dds_profit_ratio`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.G10_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.cumulative_g10_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.GB_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.cumulative_gb_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.GY_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.cumulative_gy_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.GL_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.daily_artisan_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.BASE_PROFIT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.base_profit_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.EXTRA_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => (
                            numberFormat().format(get(financialMonths, `${month}.profit.profit_support.getir_extra_order_count`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.GB_PROFIT_PER_ORDER'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.getir_per_order_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.GY_PROFIT_PER_ORDER'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.per_gy_order_profit_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.GL_PROFIT_PER_ORDER'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.profit.profit_support.per_artisan_order_profit_support_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.DYS_GRADE'),
                          ...formatDataForFinancialMonths(filter, month => (
                            get(financialMonths, `${month}.profit.warehouse_dds.dds_grade`, '-'))),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.DYS_DEPENDENT_PROFIT.DYS_GRADE_RATIO'),
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat().format(get(financialMonths, `${month}.profit.warehouse_dds.dds_ratio`, 0))
                          )),
                        },
                      ],
                    },
                  ],
                },
                {
                  id: uniqueId(),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.TITLE'),
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.bonus_support_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.CATEGORY_BONUS.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.bonus.oven_category_bonus_support[0].total_oven_category_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.CATEGORY_BONUS.TOTAL_CATEGORY_REVENUE'),
                          ...formatDataForFinancialMonths(filter, month => (
                            currencyFormat().format(get(financialMonths, `${month}.bonus.oven_category_bonus_support[0].total_oven_category_netrevenue_${taxTypeText}`, 0))
                          )),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.CATEGORY_BONUS.SHARE_PERCENTAGE_FROM_REVENUE'),
                          ...formatDataForFinancialMonths(filter, month => (
                            percentFormat().format(get(financialMonths, `${month}.bonus.oven_category_bonus_support[0].category_bonus_percent`, 0))
                          )),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.GETIR_COURIER_PROGRAM_BONUS.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => (
                        currencyFormat().format(get(financialMonths, `${month}.total.total.courier_loyalty_support_${taxTypeText}`, 0))
                      )),
                      children: [
                        ...getCourierLoyaltyByCourierStatus({ financialMonths, filter, taxTypeText }),
                      ],
                    },
                  ],
                },
                {
                  id: uniqueId(),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.TITLE'),
                  ...formatDataForFinancialMonths(filter, month => (
                    currencyFormat().format(get(financialMonths, `${month}.total.total.missed_order_cost_${taxTypeText}`, 0))
                  )),
                  children: [
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.90_BELOW_COURIER_COMPLIANCE.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(missedOrderMap['90_below_courier_compliance'], `${month}.total_fine_${taxTypeText}`, 0))),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.90_BELOW_COURIER_COMPLIANCE.MISSED_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(get(missedOrderMap['90_below_courier_compliance'], `${month}.missed_order`, 0))),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.90_BELOW_COURIER_COMPLIANCE.MISSED_FINE'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(missedOrderMap['90_below_courier_compliance'], `${month}.per_missed_order_fine_${taxTypeText}`, 0))),
                        },
                      ],
                    },
                    {
                      id: uniqueId(),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.70_BELOW_COURIER_COMPLIANCE.TITLE'),
                      ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(missedOrderMap['70_below_courier_compliance'], `${month}.total_fine_${taxTypeText}`, 0))),
                      children: [
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.70_BELOW_COURIER_COMPLIANCE.MISSED_ORDER_COUNT'),
                          ...formatDataForFinancialMonths(filter, month => numberFormat().format(get(missedOrderMap['70_below_courier_compliance'], `${month}.missed_order`, 0))),
                        },
                        {
                          title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.MISSED_ORDER.70_BELOW_COURIER_COMPLIANCE.MISSED_FINE'),
                          ...formatDataForFinancialMonths(filter, month => currencyFormat().format(get(missedOrderMap['70_below_courier_compliance'], `${month}.per_missed_order_fine_${taxTypeText}`, 0))),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });
      });
      return tableData;
    }
  ),
};

export const voyagerEarningsSelector = {
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'voyagerEarnings'),
    ({ isPending }) => !!isPending
  ),
  getTableData: createSelector(
    state => getStateObject(state, reducerKey, 'voyagerEarnings'),
    state => getStateObject(state, reducerKey, 'taxType'),
    ({ data = {}, warehouses = [], filter = {} }, { text: taxTypeText }) => {
      const tableData = [];
      const groupedFinancialData = getGroupedFinancialData(data);
      const warehouseMap = createMap(warehouses);
      const warehouseIds = warehouses.map(warehouse => warehouse._id);
      const filteredGroupedFinancialData = pick(groupedFinancialData, warehouseIds);
      Object.entries(filteredGroupedFinancialData).forEach(([warehouseId, financialMonths]) => {
        tableData.push({
          id: warehouseId,
          title: get(warehouseMap, `${warehouseId}.name`, '-'),
          ...formatDataForFinancialMonths(
            filter,
            month => currencyFormat().format(get(financialMonths, `${month}.total.total.total_earnings_${taxTypeText}`, 0))
          ),
          children: [
            {
              id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS`,
              title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(
                filter,
                month => currencyFormat().format(get(financialMonths, `${month}.total.total.warehouse_total_support_${taxTypeText}`, 0))
              ),
              children: [
                {
                  id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed.warehouse_fixed_support_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.WAREHOUSEMAN_COUNT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed.supported_warehouseman_count`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.WAREHOUSEMAN_COUNT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.PER_WAREHOUSEMAN_SUPPORT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed.per_warehouseman_support_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.PER_WAREHOUSEMAN_SUPPORT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.WAREHOUSE_UTILITIES_SUPPORT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed.warehouse_utilities_support_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.WAREHOUSE_UTILITIES_SUPPORT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.WORKED_DAYS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.warehouse.warehouse_fixed.worked_day_count`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_FIXED_SUPPORTS.WORKED_DAYS'),
                    },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent.warehouse_rent_support_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.RENT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent.rent_amount_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.RENT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.STOPPAGE`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent.stoppage_amount_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.STOPPAGE'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.RENT_RATIO`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (percentFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent.rent_ratio`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.RENT_RATIO'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.WORKED_DAYS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.warehouse.warehouse_rent.worked_day_count`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_WAREHOUSE_SUPPORTS.WAREHOUSE_RENT_SUPPORTS.WORKED_DAYS'),
                    },
                  ],
                },
              ],
            },
            {
              id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS`,
              title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(
                filter,
                month => currencyFormat().format(get(financialMonths, `${month}.total.total.courier_total_support_${taxTypeText}`, 0))
              ),
              children: [
                {
                  id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_UTILIZED_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_UTILIZED_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_support.courier_utilized_support_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_UTILIZED_SUPPORTS.UTILIZED_ALLOWED_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_hours.utilized_allowed`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_UTILIZED_SUPPORTS.UTILIZED_ALLOWED_HOURS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_UTILIZED_SUPPORTS.MANHOUR_FEE`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_support.man_hour_fee_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_UTILIZED_SUPPORTS.MANHOUR_FEE'),
                    },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_support.courier_idle_support_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.MANHOUR_FEE`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_support.man_hour_fee_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.MANHOUR_FEE'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.UTILIZED_ALLOWED_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_hours.idle_allowed`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.UTILIZED_ALLOWED_HOURS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.UNSUPPORTED_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(
                          get(financialMonths, `${month}.courier.courier_hours.idle_hours`, 0) -
                          get(financialMonths, `${month}.courier.courier_hours.idle_allowed`, 0)
                        ))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.UNSUPPORTED_HOURS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.UNSUPPORTED_AMOUNT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(
                          (
                            get(financialMonths, `${month}.courier.courier_hours.idle_hours`, 0) -
                            get(financialMonths, `${month}.courier.courier_hours.idle_allowed`, 0)
                          ) *
                          get(financialMonths, `${month}.courier.courier_support.man_hour_fee_${taxTypeText}`, 0)
                        ))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_IDLE_SUPPORTS.UNSUPPORTED_AMOUNT'),
                    },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_support.courier_busy_support_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.MANHOUR_FEE`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_support.man_hour_fee_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.MANHOUR_FEE'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.REFILL_BUSY_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_hours.refill_busy_hours`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.REFILL_BUSY_HOURS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.ALLOWED_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_hours.busy_allowed`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.ALLOWED_HOURS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.UNSUPPORTED_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(
                          get(financialMonths, `${month}.courier.courier_hours.busy_hours`, 0) -
                          get(financialMonths, `${month}.courier.courier_hours.busy_allowed`, 0)
                        ))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.UNSUPPORTED_HOURS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.UNSUPPORTED_AMOUNT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(
                          (
                            get(financialMonths, `${month}.courier.courier_hours.busy_hours`, 0) -
                            get(financialMonths, `${month}.courier.courier_hours.busy_allowed`, 0)
                          ) *
                          get(financialMonths, `${month}.courier.courier_support.man_hour_fee_${taxTypeText}`, 0)
                        ))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BUSY_SUPPORTS.UNSUPPORTED_AMOUNT'),
                    },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.GETIR_COURIERS_DEDUCTIONS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.GETIR_COURIERS_DEDUCTIONS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_getir_cost.getir_courier_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.GETIR_COURIERS_DEDUCTIONS.MANHOUR_FEE`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_getir_cost.per_hour_getir_manpower_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.GETIR_COURIERS_DEDUCTIONS.MANHOUR_FEE'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.GETIR_COURIERS_DEDUCTIONS.TOTAL_GETIR_COURIER_HOURS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.getir_courier_cost[0].total_getir_courier_hours`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.GETIR_COURIERS_DEDUCTIONS.TOTAL_GETIR_COURIER_HOURS'),
                    },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.warehouse_carboy_bonus_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.FIRST_CARBOY_COUNT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.first_carboy_count`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.FIRST_CARBOY_COUNT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.FIRST_CARBOY_BONUS_COEF`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.first_carboy_bonus_coef_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.FIRST_CARBOY_BONUS_COEF'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TOTAL_CARBOY_BONUS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.warehouse_carboy_bonus_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TOTAL_CARBOY_BONUS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.REMAINING_CARBOY_COUNT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.remaining_carboy_count`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.REMAINING_CARBOY_COUNT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.REMAINING_CARBOY_BONUS_COEF`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.remaining_carboy_bonus_coef_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.REMAINING_CARBOY_BONUS_COEF'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TOTAL_REMAINING_CARBOY_BONUS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.remaining_carboy_bonus_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TOTAL_REMAINING_CARBOY_BONUS'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.BUNDLE_PET_COUNT`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (numberFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.bundle_pet_count`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.BUNDLE_PET_COUNT'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.BUNDLE_PET_COEF`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.remaining_carboy_bonus_coef_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.BUNDLE_PET_COEF'),
                    },
                    {
                      id: `${warehouseId}_VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TOTAL_BUNDLE_PET_BONUS`,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.courier.courier_carboy_bonus.bundle_pet_bonus_${taxTypeText}`, 0)))
                      ),
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_DISTRIBUTION_SUPPORTS.COURIER_BONUS.TOTAL_BUNDLE_PET_BONUS'),
                    },
                  ],
                },
              ],
            },
            {
              id: `${warehouseId}_VOYAGER_FLEET_SUPPORTS`,
              title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(
                filter,
                month => currencyFormat().format(get(financialMonths, `${month}.total.total.total_fleet_support_${taxTypeText}`, 0))
              ),
              children: [
                {
                  id: `${warehouseId}_VOYAGER_FLEET_SUPPORTS.FLEET_MAINTENANCE_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_MAINTENANCE_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...getVoyagerMaintenanceDataByFleetType({ financialMonths, filter, fleetType: FLEET_TYPE.VAN, fleetTypeKey: 'VAN', taxTypeText }),
                },
                {
                  id: `${warehouseId}_VOYAGER_FLEET_SUPPORTS.FLEET_GENERAL_EXPENSES_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_GENERAL_EXPENSES_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => currencyFormat().format(get(financialMonths, `${month}.fleet.${FLEET_TYPE.VAN}.1.fleet_fixed.fleet_general_expense_support_${taxTypeText}`, 0))
                  ),
                  children: [{
                    id: `${warehouseId}_VOYAGER_FLEET_SUPPORTS.FLEET_GENERAL_EXPENSES_SUPPORTS.VEHICLE_COUNT`,
                    title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_GENERAL_EXPENSES_SUPPORTS.VEHICLE_COUNT'),
                    ...formatDataForFinancialMonths(
                      filter,
                      month => numberFormat().format(get(financialMonths, `${month}.fleet.${FLEET_TYPE.VAN}.1.fleet_fixed.vehicle_count`, 0))
                    ),
                  },
                  {
                    id: `${warehouseId}_VOYAGER_FLEET_SUPPORTS.FLEET_GENERAL_EXPENSES_SUPPORTS.PER_VEHICLE_GENERAL_EXPENSE_SUPPORT`,
                    title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_GENERAL_EXPENSES_SUPPORTS.PER_VEHICLE_GENERAL_EXPENSE_SUPPORT'),
                    ...formatDataForFinancialMonths(
                      filter,
                      month => currencyFormat().format(get(financialMonths, `${month}.fleet.${FLEET_TYPE.VAN}.1.fleet_fixed.per_vehicle_general_expense_${taxTypeText}`, 0))
                    ),
                  },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_FLEET_SUPPORTS.FLEET_FUEL_SUPPORTS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_FLEET_SUPPORTS.FLEET_FUEL_SUPPORTS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => currencyFormat().format(get(financialMonths, `${month}.total.total.fleet_fuel_support_${taxTypeText}`, 0))
                  ),
                  children: [
                    ...getVoyagerFleetFuelSupports({ financialMonths, filter, taxTypeText }),
                  ],
                },
              ],
            },
            {
              id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS`,
              title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.TITLE'),
              textColor: ROW_TEXT_COLORS.FIRST_EXPANDABLE_ROW,
              ...formatDataForFinancialMonths(
                filter,
                month => (currencyFormat().format(get(financialMonths, `${month}.total.total.franchise_income_support_${taxTypeText}`, 0)))
              ),
              children: [
                {
                  id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT`,
                  title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...formatDataForFinancialMonths(
                    filter,
                    month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].franchise_total_profit_support_${taxTypeText}`, 0)))
                  ),
                  children: [
                    {
                      id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT`,
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].profit_not_dependent_on_dys_${taxTypeText}`, 0)))
                      ),
                      children: [
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.PROFIT_COEF`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (percentFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].dys_not_dependent_profit_coeff`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.PROFIT_COEF'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.GW_ORDER_COUNT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].gwater_order_count`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.GW_ORDER_COUNT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.EXTRA_ORDER_COUNT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].earned_order_count`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.EXTRA_ORDER_COUNT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.BASE_BONUS`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].base_bonus`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.BASE_BONUS'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.WORKING_DAY_COUNT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].working_day_count`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.WORKING_DAY_COUNT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.THROUGHPUT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].throughput`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.THROUGHPUT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.THROUGHPUT_BONUS`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].throughput_bonus`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_INDEPENDENT_PROFIT.THROUGHPUT_BONUS'),
                        },
                      ],
                    },
                    {
                      id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT`,
                      title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.TITLE'),
                      textColor: ROW_TEXT_COLORS.THIRD_EXPANDABLE_ROW,
                      ...formatDataForFinancialMonths(
                        filter,
                        month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].profit_dependent_on_dys_${taxTypeText}`, 0)))
                      ),
                      children: [
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.PROFIT_COEF`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (percentFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].dys_dependent_profit_coeff`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.PROFIT_COEF'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.DDS_RATIO`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].dds_ratio`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.DDS_RATIO'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.DDS_COEF`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].dds_coeff`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.DDS_COEF'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.GW_ORDER_COUNT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].gwater_order_count`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.GW_ORDER_COUNT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.EARNED_ORDER_COUNT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].earned_order_count`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.EARNED_ORDER_COUNT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.BASE_BONUS`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].base_bonus`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.BASE_BONUS'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.WORKING_DAY_COUNT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].working_day_count`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.WORKING_DAY_COUNT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.THROUGHPUT`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (numberFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].throughput`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.THROUGHPUT'),
                        },
                        {
                          id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.THROUGHPUT_BONUS`,
                          ...formatDataForFinancialMonths(
                            filter,
                            month => (currencyFormat().format(get(financialMonths, `${month}.franchise_income.profit_support[0].throughput_bonus`, 0)))
                          ),
                          title: t('franchiseEarningsPage:LIST.TABLE.VOYAGER_PROFIT_AND_BONUS_SUPPORTS.PROFIT.DYS_DEPENDENT_PROFIT.THROUGHPUT_BONUS'),
                        },
                      ],
                    },
                  ],
                },
                {
                  id: `${warehouseId}_VOYAGER_PROFIT_AND_BONUS_SUPPORTS.BONUS`,
                  title: t('franchiseEarningsPage:LIST.TABLE.FRANCHISE_INCOME.PROFIT.BONUS.TITLE'),
                  textColor: ROW_TEXT_COLORS.SECOND_EXPANDABLE_ROW,
                  ...getCourierLoyaltyByCourierStatusForVoyager({ financialMonths, filter, taxTypeText }),
                },
              ],
            },
          ],
        });
      });
      return tableData;
    }
  ),
};
