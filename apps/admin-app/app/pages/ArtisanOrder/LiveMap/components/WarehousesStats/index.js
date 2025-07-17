import { Fragment, useState } from 'react';
import { get, find, uniq } from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  COURIER_STATUS_FREE,
} from '@shared/shared/constants';
import useStyles from './styles';

const defaultTitles = [
  {
    title: 'TOTAL',
    size: 1,
  },
  {
    title: 'G10&GMORE',
    size: 3,
  },
  {
    title: 'POOL',
    size: 1,
  },
  {
    title: `artisanLiveMapPage:DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`,
    size: 1,
  },
  {
    title: `artisanLiveMapPage:DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`,
    size: 1,
  },
];

const WarehousesStats = props => {
  const classes = useStyles();
  const { couriers, warehouses } = props;
  const [warehousesVisibility, setWarehousesVisibility] = useState(false);
  const { t } = useTranslation('artisanLiveMapPage');

  const getTotals = courierData => courierData.filter(({ domainTypes }) => domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) && domainTypes.length > 1);

  const calculateStats = courierData => {
    const pool = getTotals(courierData);
    const gLocals = pool.filter(({ artisanOrder }) => !!artisanOrder);
    const gFood = pool.filter(({ foodOrder }) => !!foodOrder);
    const availablePool = pool.filter(({ status }) => status === COURIER_STATUS_FREE);
    const onOrder = pool.filter(({ marketOrder }) => !!marketOrder);
    return {
      total: pool.length,
      onOrder: onOrder.length,
      pool: availablePool.length,
      [GETIR_LOCALS_DOMAIN_TYPE]: gLocals.length,
      [GETIR_FOOD_DOMAIN_TYPE]: gFood.length,
    };
  };

  const renderTotalCounts = () => {
    const totalStats = calculateStats(couriers);

    return (
      <Fragment key="totalCounts">
        <td colSpan={1}>{totalStats.total}</td>
        <td colSpan={3}>{totalStats.onOrder}</td>
        <td colSpan={1}>{totalStats.pool}</td>
        <td colSpan={1}>{totalStats[GETIR_LOCALS_DOMAIN_TYPE]}</td>
        <td colSpan={1}>{totalStats[GETIR_FOOD_DOMAIN_TYPE]}</td>
      </Fragment>
    );
  };

  const getWarehouseList = () => {
    return uniq(
      getTotals(couriers).map(item => {
        return item.warehouse;
      }),
    );
  };

  const renderWarehouseTotalCountsByCity = ({ warehouseId }) => {
    const targetedWarehouseStats = couriers.filter(({ warehouse }) => warehouse === warehouseId);
    const totalStats = calculateStats(targetedWarehouseStats);
    const warehouseName = get(find(warehouses, { id: warehouseId }), 'name');
    return (
      <tr key={warehouseId} className={classes.expandedParentTableRow}>
        <td className={classes.rowName}>{warehouseName}</td>
        <td colSpan={1}>{totalStats.total}</td>
        <td colSpan={3}>{totalStats.onOrder}</td>
        <td colSpan={1}>{totalStats.pool}</td>
        <td colSpan={1}>{totalStats[GETIR_LOCALS_DOMAIN_TYPE]}</td>
        <td colSpan={1}>{totalStats[GETIR_FOOD_DOMAIN_TYPE]}</td>
      </tr>
    );
  };

  const handleTotalRowClick = () => {
    setWarehousesVisibility(!warehousesVisibility);
  };

  const renderTitles = () => {
    return (
      <tr className={classes.parentTableRow}>
        <th className={classes.rowName}> </th>
        {defaultTitles.map(x => (
          <th className={classes.rowName} key={x.title} colSpan={x.size}>
            {t(x.title)}
          </th>
        ))}
      </tr>
    );
  };
  return (
    <div className={classes.courierCountsWrapper}>
      <div>
        <table>
          <thead>{renderTitles()}</thead>
          <tbody>
            <tr className={classes.parentTableRow} onClick={handleTotalRowClick}>
              <td className={classes.rowName} key="row">
                {t('G10')}&{t('GMORE')}
              </td>
              {renderTotalCounts()}
            </tr>
            {warehousesVisibility ? getWarehouseList().map(warehouseId => renderWarehouseTotalCountsByCity({ warehouseId })) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehousesStats;
