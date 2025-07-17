import { Fragment } from 'react';
import { Tooltip } from 'antd';
import { get, find } from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  COUNTRY_CODES,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_DOMAIN_TYPE_CODES,
  VEHICLE_TYPE,
} from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import {
  getActiveOrNonActiveLocalsCourierCountsByVehicleType,
  getCountsBySelectedVehicleTypes,
  numberFormatWithoutDecimal,
} from '../../utils';

const TotalCourierCountsByLocationTable = props => {
  const { t } = useTranslation();

  const classes = useStyles();
  const {
    courierPlanAndCounts,
    warehouses,
    searchTerm,
    expandableKeys,
    setExpandableKeys,
    currentCountryId,
    selectedCourierVehicleTypes,
  } = props;

  const GETIR_FOOD_FIELD = 'food';
  const domainTypes = {
    1: {
      tr: 'G10',
      en: 'G10',
    },
    6: {
      tr: 'GÇ Dedike',
      en: 'GL Dedicated',
    },
    3: {
      tr: 'GB',
      en: 'GM',
    },
    2: {
      tr: 'GÇ-GY',
      en: 'GL-GF',
    },
    food: {
      tr: 'GY Dedike',
      en: 'GF Dedicated',
    },
  };
  const domainTypeList = [
    GETIR_LOCALS_DOMAIN_TYPE,
    GETIR_10_DOMAIN_TYPE,
    GETIR_MARKET_DOMAIN_TYPE,
    GETIR_FOOD_DOMAIN_TYPE,
    GETIR_FOOD_FIELD,
  ];

  const renderTotalCounts = ({ domainType, dataKey: tempDataKey }) => {
    let totalStats;

    const dataKey = tempDataKey.split('.');

    switch (domainType) {
      case 'total':
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'total', 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeLocalsCouriers: 0,
          activeNonLocalsCouriers: 0,
          activeCouriersByVehicleTypes: {
            [VEHICLE_TYPE.MOTO]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
            [VEHICLE_TYPE.MOTO_50CC]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
            [VEHICLE_TYPE.VAN]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
          },
          busy: 0,
          canceled: 0,
          utilization: 0,
          byVehicleType: {},
        });

        return (
          <Fragment key="totalCounts">
            <td>
              <Tooltip title={t('artisanLiveMapPage:PLANNED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'planned', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:REALIZED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'total', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:FREE')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'free', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:ON_ORDER')}>
                {
                  getActiveOrNonActiveLocalsCourierCountsByVehicleType(
                    totalStats,
                    'activeLocalsCouriersByVehicleType',
                    selectedCourierVehicleTypes,
                  )
                }
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:CANCELED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'canceled', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="busy">
              <Tooltip title={t('artisanLiveMapPage:BUSY')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'busy', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="util">
              <Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>
                {
                  numberFormatWithoutDecimal.format(
                    getCountsBySelectedVehicleTypes(totalStats, 'utilization', selectedCourierVehicleTypes),
                  )
                }
              </Tooltip>
            </td>
          </Fragment>
        );
      case GETIR_10_DOMAIN_TYPE:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', GETIR_10_DOMAIN_TYPE, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
          byVehicleType: {},
        });

        return (
          <Fragment key="totalCounts">
            <td>
              <Tooltip title={t('artisanLiveMapPage:PLANNED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'planned', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:REALIZED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'total', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:FREE')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'free', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td />
            <td />
            <td className="busy">
              <Tooltip title={t('artisanLiveMapPage:BUSY')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'busy', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="util">
              <Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>
                -
              </Tooltip>
            </td>
          </Fragment>
        );
      case GETIR_LOCALS_DOMAIN_TYPE:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', GETIR_LOCALS_DOMAIN_TYPE, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeLocalsCouriers: 0,
          activeNonLocalsCouriers: 0,
          activeCouriersByVehicleTypes: {
            [VEHICLE_TYPE.MOTO]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
            [VEHICLE_TYPE.MOTO_50CC]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
            [VEHICLE_TYPE.VAN]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
          },
          busy: 0,
          canceled: 0,
          utilization: 0,
          byVehicleType: {},
        });

        return (
          <Fragment key="totalCounts">
            <td>
              <Tooltip title={t('artisanLiveMapPage:PLANNED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'planned', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:REALIZED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'total', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:FREE')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'free', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:ON_ORDER')}>
                {
                  getActiveOrNonActiveLocalsCourierCountsByVehicleType(
                    totalStats,
                    'activeLocalsCouriersByVehicleType',
                    selectedCourierVehicleTypes,
                  )
                }
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:CANCELED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'canceled', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="busy">
              <Tooltip title={t('artisanLiveMapPage:BUSY')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'busy', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="util">
              <Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>
                {
                  numberFormatWithoutDecimal.format(
                    getCountsBySelectedVehicleTypes(totalStats, 'utilization', selectedCourierVehicleTypes),
                  )
                }
              </Tooltip>
            </td>
          </Fragment>
        );
      case GETIR_MARKET_DOMAIN_TYPE:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', GETIR_MARKET_DOMAIN_TYPE, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
          byVehicleType: {},
        });

        return (
          <Fragment key="totalCounts">
            <td>
              <Tooltip title={t('artisanLiveMapPage:PLANNED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'planned', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:REALIZED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'total', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:FREE')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'free', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td />
            <td />
            <td className="busy">
              <Tooltip title={t('artisanLiveMapPage:BUSY')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'busy', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="util">
              <Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>
                -
              </Tooltip>
            </td>
          </Fragment>
        );
      case GETIR_FOOD_DOMAIN_TYPE:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', GETIR_FOOD_DOMAIN_TYPE, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeLocalsCouriers: 0,
          activeNonLocalsCouriers: 0,
          activeCouriersByVehicleTypes: {
            [VEHICLE_TYPE.MOTO]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
            [VEHICLE_TYPE.MOTO_50CC]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
            [VEHICLE_TYPE.VAN]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
          },
          busy: 0,
          canceled: 0,
          utilization: 0,
          byVehicleType: {},
        });

        return (
          <Fragment key="totalCounts">
            <td>
              <Tooltip title={t('artisanLiveMapPage:PLANNED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'planned', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:REALIZED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'total', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:FREE')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'free', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:ON_ORDER')}>
                {
                  getActiveOrNonActiveLocalsCourierCountsByVehicleType(
                    totalStats,
                    'activeLocalsCouriersByVehicleType',
                    selectedCourierVehicleTypes,
                  )
                }
              </Tooltip>
            </td>
            <td>
              <Tooltip title={t('artisanLiveMapPage:CANCELED')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'canceled', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="busy">
              <Tooltip title={t('artisanLiveMapPage:BUSY')}>
                {getCountsBySelectedVehicleTypes(totalStats, 'busy', selectedCourierVehicleTypes)}
              </Tooltip>
            </td>
            <td className="util">
              <Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>
                {
                  numberFormatWithoutDecimal.format(
                    getCountsBySelectedVehicleTypes(totalStats, 'utilization', selectedCourierVehicleTypes),
                  )
                }
              </Tooltip>
            </td>
          </Fragment>
        );
      case GETIR_FOOD_FIELD:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', GETIR_FOOD_FIELD, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
        });

        return (
          <Fragment key="totalCounts">
            <td><Tooltip title={t('artisanLiveMapPage:PLANNED')}>{totalStats.planned}</Tooltip></td>
            <td><Tooltip title={t('artisanLiveMapPage:REALIZED')}>{totalStats.total}</Tooltip></td>
            <td><Tooltip title={t('artisanLiveMapPage:FREE')}>{totalStats.free}</Tooltip></td>
            <td><Tooltip title={t('artisanLiveMapPage:ON_ORDER')}>{totalStats.activeFoodCouriers}</Tooltip></td>
            <td />
            <td className="busy"><Tooltip title={t('artisanLiveMapPage:BUSY')}>{totalStats.busy}</Tooltip></td>
            <td className="util">
              <Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>{numberFormatWithoutDecimal.format(totalStats.utilization)}</Tooltip>
            </td>
          </Fragment>
        );
      default:
        return null;
    }
  };

  const getWarehouseListByCountry = ({ countryId, domainType }) => {
    const countryCode = COUNTRY_CODES[countryId];

    if (domainType) {
      return Object.keys(get(courierPlanAndCounts, ['data', 'byCountryCodes', countryCode, 'domainType', domainType, 'warehousesMap'], {}));
    }

    return get(courierPlanAndCounts, ['data', 'byCountryCodes', countryCode, 'total', 'warehouses'], []).map(item => {
      return item.warehouseId;
    });
  };

  const warehouseMap = Object.entries(get(courierPlanAndCounts, ['data', 'byCountryCodes'], []))
    .map(item => {
      const mappedWarehouses = get(item, ['1', 'total', 'warehouses'])
        // eslint-disable-next-line no-shadow
        .map(item => {
          return { [item.warehouseId]: item };
        })
        .reduce((prev, next) => {
          return { ...prev, ...next };
        }, {});
      return { [item[0]]: mappedWarehouses };
    })
    .reduce((prev, next) => {
      return { ...prev, ...next };
    }, {});

  const isPlanInconsistency = (planned, realized) => !(realized / planned >= 0.5);

  const renderWarehouseTotalCountsByCountry = ({ countryId, domainType, warehouseId }) => {
    let totalStats;
    const isFoodDomainType = (domainType === GETIR_FOOD_FIELD);
    const countryCode = COUNTRY_CODES[countryId];
    const defaultTotalStats = {
      planned: 0,
      total: 0,
      free: 0,
      activeLocalsCouriers: 0,
      activeNonLocalsCouriers: 0,
      activeCouriersByVehicleTypes: {
        [VEHICLE_TYPE.MOTO]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
        [VEHICLE_TYPE.MOTO_50CC]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
        [VEHICLE_TYPE.VAN]: { activeLocalsCouriers: 0, activeNonLocalsCouriers: 0 },
      },
      busy: 0,
      utilization: 0,
      byVehicleType: {},
    };
    const foodDefaultTotalStats = {
      planned: 0,
      total: 0,
      free: 0,
      activeFoodCouriers: 0,
      activeNonFoodCouriers: 0,
      busy: 0,
      utilization: 0,
    };
    const path = ['data', 'byCountryCodes', countryCode, 'domainType', domainType, 'warehousesMap', warehouseId];

    if (isFoodDomainType) {
      totalStats = get(courierPlanAndCounts, path, foodDefaultTotalStats);
    }
    else if (domainType) {
      totalStats = get(courierPlanAndCounts, path, defaultTotalStats);
    }
    else {
      totalStats = get(warehouseMap, [countryCode, warehouseId], defaultTotalStats);
    }

    const warehouseName = get(find(warehouses, { id: warehouseId }), 'name');
    if (warehouseName && !warehouseName.toLowerCase().includes(searchTerm)) return null;

    const planned = isFoodDomainType ? totalStats.planned : getCountsBySelectedVehicleTypes(totalStats, 'planned', selectedCourierVehicleTypes);
    const realized = isFoodDomainType ? totalStats.total : getCountsBySelectedVehicleTypes(totalStats, 'total', selectedCourierVehicleTypes);
    const free = isFoodDomainType ? totalStats.free : getCountsBySelectedVehicleTypes(totalStats, 'free', selectedCourierVehicleTypes);
    const busy = isFoodDomainType ? totalStats.busy : getCountsBySelectedVehicleTypes(totalStats, 'busy', selectedCourierVehicleTypes);
    const onOrder = isFoodDomainType ? totalStats.activeFoodCouriers :
      getActiveOrNonActiveLocalsCourierCountsByVehicleType(totalStats, 'activeLocalsCouriersByVehicleType', selectedCourierVehicleTypes);
    const utilization = isFoodDomainType ? numberFormatWithoutDecimal.format(totalStats.utilization) : numberFormatWithoutDecimal.format(
      getCountsBySelectedVehicleTypes(totalStats, 'utilization', selectedCourierVehicleTypes),
    );

    return (
      <tr key={warehouseId} className={classes.childTableRow}>
        <td className={`${classes.rowName} ${classes.warehouseName}`} title={warehouseName}>
          <span className={isPlanInconsistency(planned, realized) ? classes.warehouseRedNameSpan : classes.warehouseNameSpan}>
            {warehouseName}
          </span>
        </td>
        <td><Tooltip title={t('artisanLiveMapPage:PLANNED')}>{planned}</Tooltip></td>
        <td><Tooltip title={t('artisanLiveMapPage:REALIZED')}>{realized}</Tooltip></td>
        <td><Tooltip title={t('artisanLiveMapPage:FREE')}>{free}</Tooltip></td>
        <td><Tooltip title={t('artisanLiveMapPage:ON_ORDER')}>{onOrder}</Tooltip></td>
        <td>{GETIR_LOCALS_DOMAIN_TYPE !== domainType && GETIR_DOMAIN_TYPE_CODES.includes(domainType) ? totalStats.activeNonFoodCouriers : '-'}</td>
        <td className="busy"><Tooltip title={t('artisanLiveMapPage:BUSY')}>{busy}</Tooltip></td>
        <td className="util"><Tooltip title={t('artisanLiveMapPage:UTILIZATION')}>{utilization} </Tooltip></td>
      </tr>
    );
  };

  const handleTotalRowClick = key => {
    setExpandableKeys({
      ...expandableKeys,
      [key]: !expandableKeys[key],
    });
  };

  return (
    <table className={classes.parentTable}>
      <tbody>
        <tr
          className={classes.parentTableRow}
          key="parentRow"
          onClick={() => handleTotalRowClick('countryTotal')}
        >
          <td className={classes.rowName}>{t('global:TOTAL')} ({COUNTRY_CODES[currentCountryId]})</td>
          {renderTotalCounts({ domainType: 'total', dataKey: `byCountryCodes.${COUNTRY_CODES[currentCountryId]}` })}
        </tr>
        {expandableKeys.countryTotal ? (
          <tr key="countryTotal">
            <td colSpan={8} className={classes.expandedRow}>
              <table className={classes.expandedTable}>
                {getWarehouseListByCountry({ countryId: currentCountryId }).map(warehouseId => {
                  return renderWarehouseTotalCountsByCountry({
                    countryId: currentCountryId,
                    warehouseId,
                  });
                })}
              </table>
            </td>
          </tr>
        ) : null}
        {domainTypeList.map(domainType => {
          return (
            <Fragment key={domainType}>
              <tr
                className={domainType === GETIR_FOOD_FIELD ? classes.parentTableGFDedicatedRow : classes.parentTableRow}
                onClick={() => {
                  return handleTotalRowClick(`country${domainType}`);
                }}
              >
                <td className={classes.rowName}>{domainTypes[domainType][getLangKey()]} ({COUNTRY_CODES[currentCountryId]})</td>
                {renderTotalCounts({ domainType, dataKey: `byCountryCodes.${COUNTRY_CODES[currentCountryId]}` })}
              </tr>
              {expandableKeys[`country${domainType}`] ? (
                <tr>
                  <td colSpan={8} className={classes.expandedRow}>
                    <table className={classes.expandedTable}>
                      {getWarehouseListByCountry({
                        countryId: currentCountryId,
                        domainType,
                      }).map(warehouseId => {
                        return renderWarehouseTotalCountsByCountry({
                          countryId: currentCountryId,
                          domainType,
                          warehouseId,
                        });
                      })}
                    </table>
                  </td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default TotalCourierCountsByLocationTable;
