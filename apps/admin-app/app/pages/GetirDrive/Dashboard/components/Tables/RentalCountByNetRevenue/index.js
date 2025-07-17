import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  forEach as _forEach,
  map as _map,
  split as _split,
  toNumber as _toNumber,
  sortBy as _sortBy,
} from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { rentalCountByNetRevenueSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const RentalCountByNetRevenue = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const rentalCountByNetRevenue = useSelector(rentalCountByNetRevenueSelector.getData);
  const rentalCountByNetRevenueIsPending = useSelector(rentalCountByNetRevenueSelector.getIsPending);

  let totalClient = 0;
  _forEach(rentalCountByNetRevenue, clientCount => {
    totalClient += clientCount;
  });
  let tableData = _map(rentalCountByNetRevenue, (clientCount, amountRange) => {
    const amountParts = _split(amountRange, '-');
    const sortKey = _toNumber(amountParts[1]) || amountParts[1];
    return {
      key: amountRange,
      value: clientCount,
      pct: (clientCount / totalClient) * 100,
      sortKey,
    };
  });
  tableData = _sortBy(tableData, 'sortKey');

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerText}>
          {t('getirDriveDashboardPage:RENT')}
        </div>
      </div>
      <AntTableV2
        data={tableData}
        columns={columns}
        className={classes.table}
        containerClassName={parentClasses.antTableContainer}
        loading={rentalCountByNetRevenueIsPending}
        headerClassName={classes.smallerPadding}
        showFooter={false}
      />
    </>
  );
};

export default memo(RentalCountByNetRevenue);
