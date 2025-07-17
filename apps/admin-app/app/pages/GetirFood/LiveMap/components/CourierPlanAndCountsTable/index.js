import { useCallback, useMemo, useState } from 'react';
import { get, find, orderBy, toPairs } from 'lodash';
import { Button } from 'antd';
import { DeleteTwoTone, CaretUpOutlined, CaretDownOutlined, MinusOutlined } from '@ant-design/icons';

import {
  COUNTRY_CODES,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_DOMAIN_TYPE_CODES,
  DELETE_COLOR,
} from '@shared/shared/constants';
import { isNullOrEmpty } from '@shared/utils/common';
import { getLangKey, t } from '@shared/i18n';
import useStyles from './styles';
import { FOOD_LIVE_MAP_STATS_COLUMNS, DOMAIN_TYPES, DOMAIN_TYPE_LIST } from './constants';
import WarehouseListByCountry from './WarehouseListByCountry';

const CourierPlanAndCountsTable = ({
  warehouseMarkerFilterArray,
  courierMarkerFilterArray,
  onWarehouseFilterButtonClicked,
  deleteWarehouseFiltersButtonClicked,
  onCourierFilterButtonClicked,
  deleteCourierFiltersButtonClicked,
  currentCountryId,
  courierPlanAndCounts,
  warehouses,
  currentCityId,
  currentCountry,
  currentCity,
}) => {
  const classes = useStyles();
  const [expandableKeys, setExpandableKeys] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortStates, setSortStates] = useState({});

  const renderTotalCounts = ({ domainType, dataKey: tempDataKey }) => {
    let totalStats;

    const dataKey = tempDataKey.split('.');

    switch (domainType) {
      case 'total':
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'total', 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
        });

        return (
          <>
            <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned.toFixed(0)}</td>
            <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
            <td title={t('foodLiveMapPage:FREE')}>{totalStats.free}</td>
            <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
            <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>-</td>
            <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
            <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
          </>
        );
      case 1:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', 1, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
        });

        return (
          <>
            <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned}</td>
            <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
            <td title={t('foodLiveMapPage:FREE')}>{totalStats.free}</td>
            <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
            <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>{totalStats.activeNonFoodCouriers}</td>
            <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
            <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
          </>
        );
      case 2:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', 2, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
        });

        return (
          <>
            <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned}</td>
            <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
            <td title={t('foodLiveMapPage:FREE')}>{totalStats.free}</td>
            <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
            <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>-</td>
            <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
            <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
          </>
        );
      case 3:
        totalStats = get(courierPlanAndCounts, ['data', ...dataKey, 'domainType', 3, 'total'], {
          planned: 0,
          total: 0,
          free: 0,
          activeFoodCouriers: 0,
          activeNonFoodCouriers: 0,
          busy: 0,
          utilization: 0,
        });

        return (
          <>
            <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned}</td>
            <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
            <td title={t('foodLiveMapPage:FREE')}>{totalStats.free}</td>
            <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
            <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>{totalStats.activeNonFoodCouriers}</td>
            <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
            <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
          </>
        );
      default:
        return null;
    }
  };

  const getWarehouseListByCity = useCallback(
    ({ cityId, domainType, domainTypeForSort }) => {
      const lodashSortOpt = get(sortStates, [domainTypeForSort, 'option']);
      const lodashSortBy = get(sortStates, [domainTypeForSort, 'sortBy']);
      const getWarehousesMapsByCityId = get(courierPlanAndCounts, ['data', cityId, 'domainType', domainType, 'warehousesMap'], {});
      const getWarehousesByCityId = get(courierPlanAndCounts, ['data', cityId, 'total', 'warehouses'], []);

      if (domainType) {
        if (!isNullOrEmpty(lodashSortOpt)) {
          return orderBy(toPairs(getWarehousesMapsByCityId), [warehouse => warehouse[1][lodashSortBy]], [lodashSortOpt]).map(
            warehouse => warehouse[0],
          );
        }
        return Object.keys(getWarehousesMapsByCityId);
      }

      if (!isNullOrEmpty(lodashSortOpt)) {
        return orderBy(getWarehousesByCityId, [lodashSortBy], [lodashSortOpt]).map(item => {
          return item.warehouseId;
        });
      }
      return getWarehousesByCityId.map(item => {
        return item.warehouseId;
      });
    },
    [sortStates, courierPlanAndCounts],
  );

  const getWarehouseListByCountry = useCallback(
    ({ countryId, domainType, domainTypeForSort }) => {
      const countryCode = COUNTRY_CODES[countryId];
      const lodashSortOpt = get(sortStates, [domainTypeForSort, 'option']);
      const lodashSortBy = get(sortStates, [domainTypeForSort, 'sortBy']);
      const getWarehousesMapByCountryCode = get(
        courierPlanAndCounts,
        ['data', 'byCountryCodes', countryCode, 'domainType', domainType, 'warehousesMap'],
        {},
      );
      const getWarehousesByCountryCode = get(courierPlanAndCounts, ['data', 'byCountryCodes', countryCode, 'total', 'warehouses'], []);

      if (domainType) {
        if (!isNullOrEmpty(lodashSortOpt)) {
          return orderBy(toPairs(getWarehousesMapByCountryCode), [warehouse => warehouse[1][lodashSortBy]], [lodashSortOpt]).map(
            warehouse => warehouse[0],
          );
        }
        return Object.keys(getWarehousesMapByCountryCode);
      }

      if (!isNullOrEmpty(lodashSortOpt)) {
        return orderBy(getWarehousesByCountryCode, [lodashSortBy], [lodashSortOpt]).map(item => {
          return item.warehouseId;
        });
      }
      return getWarehousesByCountryCode.map(item => {
        return item.warehouseId;
      });
    },
    [sortStates, courierPlanAndCounts],
  );

  const renderWarehouseTotalCountsByCity = ({ cityId, domainType, warehouseId }) => {
    let totalStats;

    if (domainType) {
      totalStats = get(courierPlanAndCounts, ['data', cityId, 'domainType', domainType, 'warehousesMap', warehouseId], {
        planned: 0,
        total: 0,
        free: 0,
        activeFoodCouriers: 0,
        activeNonFoodCouriers: 0,
        busy: 0,
        utilization: 0,
      });
    }
    else {
      totalStats = find(get(courierPlanAndCounts, ['data', cityId, 'total', 'warehouses']), { warehouseId }) || {
        planned: 0,
        total: 0,
        free: 0,
        activeFoodCouriers: 0,
        activeNonFoodCouriers: 0,
        busy: 0,
        utilization: 0,
      };
    }

    const warehouseName = get(find(warehouses, { id: warehouseId }), 'name');

    if (searchTerm.length > 2 && warehouseName && !warehouseName.toLowerCase().includes(searchTerm)) {
      return null;
    }

    return (
      <tr className={classes.parentTableRow}>
        <td className={classes.rowName}>{warehouseName}</td>
        <td title={t('foodLiveMapPage:PLANNED')}>{totalStats.planned}</td>
        <td title={t('foodLiveMapPage:ACTUAL')}>{totalStats.total}</td>
        <td>{totalStats.free}</td>
        <td title={t('foodLiveMapPage:ACTIVE')}>{totalStats.activeFoodCouriers}</td>
        <td title={t('foodLiveMapPage:ACTIVE_NON_FOOD_COURIERS')}>
          {GETIR_FOOD_DOMAIN_TYPE !== domainType && GETIR_DOMAIN_TYPE_CODES.includes(domainType) ? totalStats.activeNonFoodCouriers : '-'}
        </td>
        <td title={t('foodLiveMapPage:BUSY')}>{totalStats.busy}</td>
        <td title={t('foodLiveMapPage:UTILIZATION')}>{totalStats.utilization.toFixed(0)}%</td>
      </tr>
    );
  };

  const getWarehouseDomainTypeColor = domainType => (warehouseMarkerFilterArray.includes(domainType) ? 'primary' : 'default');
  const courierDomainTypeColor = domainType => (courierMarkerFilterArray.includes(domainType) ? 'primary' : 'default');

  const handleTotalRowClick = key => {
    setExpandableKeys({
      ...expandableKeys,
      [key]: !expandableKeys[key],
    });

    setSortStates({
      ...sortStates,
      [key]: { sortBy: '', option: '' },
    });
  };

  const handleSortButtonClick = useCallback((sortBy, option, domainType) => {
    if (isNullOrEmpty(option)) {
      setSortStates({
        ...sortStates,
        [domainType]: { sortBy, option: 'desc' },
      });
    }
    else if (option === 'desc') {
      setSortStates({
        ...sortStates,
        [domainType]: { sortBy, option: 'asc' },
      });
    }
    else {
      setSortStates({
        ...sortStates,
        [domainType]: { sortBy: '', option: '' },
      });
    }
  }, [sortStates]);

  const renderSortIcons = useCallback(
    domainType => {
      return (
        <tr>
          <td />
          {FOOD_LIVE_MAP_STATS_COLUMNS.map(column => (
            <td>
              { /* eslint-disable-next-line no-nested-ternary */ }
              {get(sortStates, [domainType, 'sortBy']) === column ? (
                get(sortStates, [domainType, 'option']) === 'asc' ? (
                  <CaretUpOutlined onClick={() => handleSortButtonClick(column, 'asc', domainType)} />
                ) : (
                  <CaretDownOutlined onClick={() => handleSortButtonClick(column, 'desc', domainType)} />
                )
              ) : (
                <MinusOutlined onClick={() => handleSortButtonClick(column, '', domainType)} />
              )}
            </td>
          ))}
        </tr>
      );
    },
    [handleSortButtonClick, sortStates],
  );

  const handleTermChange = event => {
    setSearchTerm(event.target.value.trim());
  };

  const warehouseMap = useMemo(() => get(
    courierPlanAndCounts,
    ['data', 'byCountryCodes', COUNTRY_CODES[currentCountryId], 'total', 'warehouses'],
    [],
  )
    .map(item => {
      return { [item.warehouseId]: { ...item, name: get(find(warehouses, { id: item.warehouseId }), 'name', '') } };
    })
    .reduce((prev, next) => {
      return { ...prev, ...next };
    }, {}), [courierPlanAndCounts, warehouses, currentCountryId]);

  return (
    <div className={classes.courierCountsWrapper}>
      <div>
        <span className={classes.headerTitle}>{t('foodLiveMapPage:COURIER_COUNTS_TABLE_TITLE')}</span>
      </div>
      <div>
        <input
          className={classes.searchBox}
          placeholder={t('foodLiveMapPage:WAREHOUSE')}
          type="text"
          value={searchTerm}
          onInput={handleTermChange}
        />
      </div>
      <div className={classes.tableHeaderDiv}>
        <Button classname={classes.tableHeaderInfoButton} disabled variant="contained" shape="round" size="small">
          {get(currentCity, ['name', getLangKey()])}
        </Button>
      </div>
      <table>
        <tr
          className={classes.parentTableRow}
          onClick={() => {
            return handleTotalRowClick('cityTotal');
          }}
        >
          <td className={classes.rowName}> {t('foodLiveMapPage:TOTAL')}</td>
          {renderTotalCounts({ domainType: 'total', dataKey: currentCityId })}
        </tr>
        {expandableKeys.cityTotal ? (
          <tr>
            <td colSpan={8} className={classes.expandedRow}>
              <table className={classes.expandedTable}>
                {renderSortIcons('cityTotal')}
                {getWarehouseListByCity({ cityId: currentCityId, domainTypeForSort: 'cityTotal' }).map(warehouseId => {
                  return renderWarehouseTotalCountsByCity({
                    cityId: currentCityId,
                    warehouseId,
                  });
                })}
              </table>
            </td>
          </tr>
        ) : null}
        {DOMAIN_TYPE_LIST.map(domainType => {
          return (
            <>
              <tr
                className={classes.parentTableRow}
                onClick={() => {
                  return handleTotalRowClick(`city${domainType}`);
                }}
              >
                <td className={classes.rowName}>{DOMAIN_TYPES[domainType][getLangKey()]}</td>
                {renderTotalCounts({ domainType, dataKey: currentCityId })}
              </tr>
              {expandableKeys[`city${domainType}`] ? (
                <tr>
                  <td colSpan={8} className={classes.expandedRow}>
                    <table className={classes.expandedTable}>
                      {renderSortIcons(`city${domainType}`)}
                      {getWarehouseListByCity({
                        cityId: currentCityId,
                        domainType,
                        domainTypeForSort: `city${domainType}`,
                      }).map(warehouseId => {
                        return renderWarehouseTotalCountsByCity({
                          cityId: currentCityId,
                          domainType,
                          warehouseId,
                        });
                      })}
                    </table>
                  </td>
                </tr>
              ) : null}
            </>
          );
        })}
      </table>
      <hr />
      <div>
        <span className={classes.warehouseFilterTitle}>{t('foodLiveMapPage:WAREHOUSE_FILTER')}</span>
      </div>
      <div className={classes.domainFilterButtonsParentDiv}>
        <Button
          type={getWarehouseDomainTypeColor(GETIR_FOOD_DOMAIN_TYPE)}
          size="small"
          onClick={() => onWarehouseFilterButtonClicked(GETIR_FOOD_DOMAIN_TYPE)}
          className={classes.domainFilterButtons}
          variant="contained"
        >
          {t('foodLiveMapPage:GF-DEDICATED')}
        </Button>
        <Button
          type={getWarehouseDomainTypeColor(GETIR_10_DOMAIN_TYPE)}
          onClick={() => onWarehouseFilterButtonClicked(GETIR_10_DOMAIN_TYPE)}
          className={classes.domainFilterButtons}
          size="small"
          variant="contained"
        >
          {t('foodLiveMapPage:G10')}
        </Button>
        <Button
          type={getWarehouseDomainTypeColor(GETIR_MARKET_DOMAIN_TYPE)}
          onClick={() => onWarehouseFilterButtonClicked(GETIR_MARKET_DOMAIN_TYPE)}
          className={classes.domainFilterButtons}
          size="small"
          variant="contained"
        >
          {t('foodLiveMapPage:GM')}
        </Button>
        <Button
          onClick={() => deleteWarehouseFiltersButtonClicked()}
          danger
          shape="circle"
          size="small"
          icon={<DeleteTwoTone twoToneColor={DELETE_COLOR} />}
        />
      </div>

      <hr />

      <div>
        <span className={classes.warehouseFilterTitle}>{t('foodLiveMapPage:COURIER_FILTER')}</span>
      </div>
      <div className={classes.domainFilterButtonsParentDiv}>
        <Button
          type={courierDomainTypeColor(GETIR_FOOD_DOMAIN_TYPE)}
          size="small"
          onClick={() => onCourierFilterButtonClicked(GETIR_FOOD_DOMAIN_TYPE)}
          className={classes.domainFilterButtons}
          variant="contained"
        >
          {t('foodLiveMapPage:GF-DEDICATED')}
        </Button>
        <Button
          type={courierDomainTypeColor(GETIR_10_DOMAIN_TYPE)}
          onClick={() => onCourierFilterButtonClicked(GETIR_10_DOMAIN_TYPE)}
          className={classes.domainFilterButtons}
          size="small"
          variant="contained"
        >
          {t('foodLiveMapPage:G10')}
        </Button>
        <Button
          type={courierDomainTypeColor(GETIR_MARKET_DOMAIN_TYPE)}
          onClick={() => onCourierFilterButtonClicked(GETIR_MARKET_DOMAIN_TYPE)}
          className={classes.domainFilterButtons}
          size="small"
          variant="contained"
        >
          {t('foodLiveMapPage:GM')}
        </Button>
        <Button
          onClick={() => deleteCourierFiltersButtonClicked()}
          danger
          shape="circle"
          size="small"
          icon={<DeleteTwoTone twoToneColor={DELETE_COLOR} />}
        />
      </div>
      <hr />
      <div className={classes.tableHeaderDiv}>
        <Button classname={classes.tableHeaderInfoButton} disabled variant="contained" shape="round" size="small">
          {get(currentCountry, ['name', getLangKey()])}
        </Button>
      </div>
      <table>
        <tr
          className={classes.parentTableRow}
          onClick={() => {
            return handleTotalRowClick('countryTotal');
          }}
        >
          <td className={classes.rowName}> {t('foodLiveMapPage:TOTAL')} (TR)</td>
          {renderTotalCounts({ domainType: 'total', dataKey: 'byCountryCodes.TR' })}
        </tr>
        {expandableKeys.countryTotal ? (
          <tr>
            <td colSpan={8} className={classes.expandedRow}>
              <table className={classes.expandedTable}>
                {renderSortIcons('countryTotal')}
                <WarehouseListByCountry
                  getWarehouseListByCountry={getWarehouseListByCountry}
                  handleSortButtonClick={handleSortButtonClick}
                  sortStates={sortStates}
                  warehouseMap={warehouseMap}
                  courierPlanAndCounts={courierPlanAndCounts}
                  searchTerm={searchTerm}
                  countryId={currentCountryId}
                  domainTypeForSort="countryTotal"
                  classes={classes}
                />
              </table>
            </td>
          </tr>
        ) : null}
        {DOMAIN_TYPE_LIST.map(domainType => {
          return (
            <>
              <tr
                className={classes.parentTableRow}
                onClick={() => {
                  return handleTotalRowClick(`country${domainType}`);
                }}
              >
                <td className={classes.rowName}>{DOMAIN_TYPES[domainType][getLangKey()]} (TR)</td>
                {renderTotalCounts({ domainType, dataKey: 'byCountryCodes.TR' })}
              </tr>
              {expandableKeys[`country${domainType}`] ? (
                <tr>
                  <td colSpan={8} className={classes.expandedRow}>
                    <table className={classes.expandedTable}>
                      {renderSortIcons(`country${domainType}`)}
                      <WarehouseListByCountry
                        getWarehouseListByCountry={getWarehouseListByCountry}
                        warehouseMap={warehouseMap}
                        courierPlanAndCounts={courierPlanAndCounts}
                        searchTerm={searchTerm}
                        countryId={currentCountryId}
                        domainType={domainType}
                        domainTypeForSort={`country${domainType}`}
                        classes={classes}
                      />
                    </table>
                  </td>
                </tr>
              ) : null}
            </>
          );
        })}
      </table>
    </div>
  );
};

export default CourierPlanAndCountsTable;
