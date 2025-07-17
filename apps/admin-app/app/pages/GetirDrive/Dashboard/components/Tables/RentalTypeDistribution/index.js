import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { rentalTypeDistributionSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const RentalTypeDistribution = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const rentalTypeDistribution = useSelector(rentalTypeDistributionSelector.getData);
  const rentalTypeDistributionIsPending = useSelector(rentalTypeDistributionSelector.getIsPending);

  const total = (rentalTypeDistribution?.minutes || 0) +
    (rentalTypeDistribution?.daily || 0) +
    (rentalTypeDistribution?.package_minutes || 0) +
    (rentalTypeDistribution?.package_daily || 0);
  const tableData = [
    {
      key: t('getirDriveDashboardPage:MINUTES'),
      value: rentalTypeDistribution?.minutes,
      pct: ((rentalTypeDistribution?.minutes || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:DAILY'),
      value: rentalTypeDistribution?.daily,
      pct: ((rentalTypeDistribution?.daily || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:PACKAGE_MINUTES'),
      value: rentalTypeDistribution?.package_minutes,
      pct: ((rentalTypeDistribution?.package_minutes || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:PACKAGE_DAILY'),
      value: rentalTypeDistribution?.package_daily,
      pct: ((rentalTypeDistribution?.package_daily || 0) / total) * 100,
    },
  ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={rentalTypeDistributionIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(RentalTypeDistribution);
