import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { financialDistributionSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const FinancialDistribution = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const financialDistribution = useSelector(financialDistributionSelector.getData);
  const financialDistributionIsPending = useSelector(financialDistributionSelector.getIsPending);

  const total = (financialDistribution?.base_amount_tax_excluded || 0) +
    (financialDistribution?.package_tax_excluded || 0) +
    (financialDistribution?.additional_km_tax_excluded || 0) +
    (financialDistribution?.additional_min_tax_excluded || 0);
  const tableData = [
    {
      key: t('getirDriveDashboardPage:BASE_AMOUNT'),
      value: financialDistribution?.base_amount_tax_excluded,
      pct: ((financialDistribution?.base_amount_tax_excluded || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:PACKAGE'),
      value: financialDistribution?.package_tax_excluded,
      pct: ((financialDistribution?.package_tax_excluded || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:ADDITIONAL_KM'),
      value: financialDistribution?.additional_km_tax_excluded,
      pct: ((financialDistribution?.additional_km_tax_excluded || 0) / total) * 100,
    },
    {
      key: t('getirDriveDashboardPage:ADDITIONAL_MIN'),
      value: financialDistribution?.additional_min_tax_excluded,
      pct: ((financialDistribution?.additional_min_tax_excluded || 0) / total) * 100,
    },
  ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={financialDistributionIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(FinancialDistribution);
