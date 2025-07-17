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

import { rentalCountByDistanceSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const RentalCountByDistance = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const rentalCountByDistance = useSelector(rentalCountByDistanceSelector.getData);
  const rentalCountByDistanceIsPending = useSelector(rentalCountByDistanceSelector.getIsPending);

  let totalClient = 0;
  _forEach(rentalCountByDistance, clientCount => {
    totalClient += clientCount;
  });
  let tableData = _map(rentalCountByDistance, (clientCount, distanceRange) => {
    const distanceParts = _split(distanceRange, '-');
    const sortKey = _toNumber(distanceParts[1]) || distanceParts[1];
    return {
      key: distanceRange,
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
          {t('getirDriveDashboardPage:RENT_KM')}
        </div>
      </div>
      <AntTableV2
        data={tableData}
        columns={columns}
        className={classes.table}
        containerClassName={parentClasses.antTableContainer}
        loading={rentalCountByDistanceIsPending}
        headerClassName={classes.smallerPadding}
        showFooter={false}
      />
    </>
  );
};

export default memo(RentalCountByDistance);
