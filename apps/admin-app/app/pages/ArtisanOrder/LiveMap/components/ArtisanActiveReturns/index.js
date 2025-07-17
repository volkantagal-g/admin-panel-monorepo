import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GETIR_LOCALS_DOMAIN_TYPE,
  ARTISAN_COURIER_RETURN_STATUSES,
  COURIER_STATUS_TYPES,
} from '@shared/shared/constants';
import useStyles from './styles';
import { courierReturnStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const defaultTitles = [
  {
    title: 'artisanLiveMapPage:DOMAIN_TYPES.6',
    size: 3,
  },
];

const ArtisanActiveOrders = props => {
  const classes = useStyles();
  const {
    couriers,
    isReturnStatusTotalsVisible,
    setIsReturnStatusTotalsVisible,
  } = props;
  const { t } = useTranslation('artisanLiveMapPage');

  const getLocalsCourierReturns = returnCouriers => returnCouriers.filter(
    ({ domainTypes, status }) => {
      return domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) &&
      status >= COURIER_STATUS_TYPES.SLOT_VERIFYING && status < COURIER_STATUS_TYPES.RETURN_CANCELED;
    },
  );

  const calculateStats = returnCouriers => {
    const total = returnCouriers.filter(x => !!x.domainTypes);
    const locals = getLocalsCourierReturns(total);
    return { locals: locals.length };
  };

  const renderTotalCounts = () => {
    const totalStats = calculateStats(couriers);

    return (
      <Fragment key="totalCounts">
        <td colSpan={3}>{totalStats.locals}</td>
      </Fragment>
    );
  };

  const getStatusList = () => Object.values(ARTISAN_COURIER_RETURN_STATUSES).map(statusCode => ({
    returnStatus: statusCode,
    title: courierReturnStatuses[statusCode][getLangKey()],
  }));

  const renderTotalCountsByStatuses = ({ returnStatus, title }) => {
    const targetedStatusStats = couriers.filter(({ status }) => status === returnStatus);
    const totalStats = calculateStats(targetedStatusStats);
    return (
      <tr className={classes.expandedParentTableRow}>
        <td className={classes.rowName}>{title}</td>
        <td colSpan={3}>{totalStats.locals}</td>
      </tr>
    );
  };

  const handleTotalRowClick = () => {
    setIsReturnStatusTotalsVisible(!isReturnStatusTotalsVisible);
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
              <td className={classes.rowName} key="activeReturns">
                {t('global:ACTIVE_RETURNS')}
              </td>
              {renderTotalCounts()}
            </tr>
            {isReturnStatusTotalsVisible ? getStatusList().map(statusObject => renderTotalCountsByStatuses(statusObject)) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtisanActiveOrders;
