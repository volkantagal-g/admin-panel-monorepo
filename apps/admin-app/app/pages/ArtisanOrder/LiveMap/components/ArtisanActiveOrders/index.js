import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { GETIR_LOCALS_DOMAIN_TYPE, GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE, ARTISAN_ORDER_STATUSES } from '@shared/shared/constants';
import useStyles from './styles';
import { localsOrderStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const defaultTitles = [
  {
    title: 'TOTAL',
    size: 1,
  },
  {
    title: 'artisanLiveMapPage:DOMAIN_TYPES.6',
    size: 3,
  },
  {
    title: 'artisanLiveMapPage:G10',
    size: 1,
  },
  {
    title: 'artisanLiveMapPage:GMORE',
    size: 1,
  },
];

const ArtisanActiveOrders = props => {
  const classes = useStyles();
  const {
    activeOrders,
    isStatusTotalsVisible,
    setIsStatusTotalsVisible,
  } = props;
  const { t } = useTranslation('artisanLiveMapPage');

  const getDedicatedLocalsCourierOrders = orders => orders.filter(
    ({ courierServiceDomainTypes }) => courierServiceDomainTypes.length === 1 && courierServiceDomainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE),
  );

  const getG10ServingCourierOrders = orders => orders.filter(
    ({ courierServiceDomainTypes }) => courierServiceDomainTypes.includes(GETIR_10_DOMAIN_TYPE) &&
    !courierServiceDomainTypes.includes(GETIR_MARKET_DOMAIN_TYPE),
  );

  const getGMoreServingCourierOrders = orders => orders.filter(({ courierServiceDomainTypes }) => courierServiceDomainTypes.includes(GETIR_MARKET_DOMAIN_TYPE));

  const getQueuedOrders = orders => orders.filter(({ isInQueue }) => isInQueue);

  const calculateStats = orders => {
    const total = orders.filter(x => !!x.courierServiceDomainTypes);
    const locals = getDedicatedLocalsCourierOrders(total);
    const g10 = getG10ServingCourierOrders(total);
    const gMore = getGMoreServingCourierOrders(total);

    return {
      total: total.length,
      locals: locals.length,
      g10: g10.length,
      gMore: gMore.length,
    };
  };

  const renderTotalCounts = () => {
    const totalStats = calculateStats(activeOrders);

    return (
      <Fragment key="totalCounts">
        <td colSpan={1}>{totalStats.total}</td>
        <td colSpan={3}>{totalStats.locals}</td>
        <td colSpan={1}>{totalStats.g10}</td>
        <td colSpan={1}>{totalStats.gMore}</td>
      </Fragment>
    );
  };

  const getStatusList = () => Object.values(ARTISAN_ORDER_STATUSES).map(statusCode => ({
    orderStatus: statusCode,
    title: localsOrderStatuses[statusCode][getLangKey()],
  }));

  const renderTotalCountsByStatuses = ({ orderStatus, title }) => {
    const targetedStatusStats = activeOrders.filter(({ status }) => status === orderStatus);
    const totalStats = orderStatus === ARTISAN_ORDER_STATUSES.IN_QUEUE ? calculateStats(getQueuedOrders(activeOrders)) : calculateStats(targetedStatusStats);
    return (
      <tr className={classes.expandedParentTableRow}>
        <td className={classes.rowName}>{title}</td>
        <td colSpan={1}>{totalStats.total}</td>
        <td colSpan={3}>{totalStats.locals}</td>
        <td colSpan={1}>{totalStats.g10}</td>
        <td colSpan={1}>{totalStats.gMore}</td>
      </tr>
    );
  };

  const handleTotalRowClick = () => {
    setIsStatusTotalsVisible(!isStatusTotalsVisible);
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
              <td className={classes.rowName} key="activeOrders">
                {t('global:ACTIVE_ORDERS')}
              </td>
              {renderTotalCounts()}
            </tr>
            {isStatusTotalsVisible ? getStatusList().map(statusObject => renderTotalCountsByStatuses(statusObject)) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtisanActiveOrders;
