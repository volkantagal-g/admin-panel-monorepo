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

import { rentalCountByDurationSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const RentalCountByDuration = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const rentalCountByDuration = useSelector(rentalCountByDurationSelector.getData);
  const rentalCountByDurationIsPending = useSelector(rentalCountByDurationSelector.getIsPending);

  let totalClient = 0;
  _forEach(rentalCountByDuration, clientCount => {
    totalClient += clientCount;
  });
  let tableData = _map(rentalCountByDuration, (clientCount, durationRange) => {
    const durationParts = _split(durationRange, '-');
    const sortKey = _toNumber(durationParts[1]) || durationParts[1];
    return {
      key: durationRange,
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
          {t('getirDriveDashboardPage:RENT_MIN')}
        </div>
      </div>
      <AntTableV2
        data={tableData}
        columns={columns}
        className={classes.table}
        containerClassName={parentClasses.antTableContainer}
        loading={rentalCountByDurationIsPending}
        headerClassName={classes.smallerPadding}
        showFooter={false}
      />
    </>
  );
};

export default memo(RentalCountByDuration);
