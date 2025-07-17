import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { promoDistributionSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const PromoDistribution = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const promoDistribution = useSelector(promoDistributionSelector.getData);
  const promoDistributionIsPending = useSelector(promoDistributionSelector.getIsPending);

  const total = (promoDistribution?.organic || 0) +
    (promoDistribution?.used_promo || 0) +
    (promoDistribution?.featured_vehicle || 0);
  const tableData = [
    {
      key: t('getirDriveDashboardPage:ORGANIC'),
      value: promoDistribution?.organic,
      pct: ((promoDistribution?.organic || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:PROMO'),
      value: promoDistribution?.used_promo,
      pct: ((promoDistribution?.used_promo || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:FEATURED_VEHICLE'),
      value: promoDistribution?.featured_vehicle,
      pct: ((promoDistribution?.featured_vehicle || 0) / total) * 100,
    },
  ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={promoDistributionIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(PromoDistribution);
