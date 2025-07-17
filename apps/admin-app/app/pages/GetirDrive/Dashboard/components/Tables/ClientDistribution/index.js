import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { clientDistributionSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const ClientDistribution = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const clientDistribution = useSelector(clientDistributionSelector.getData);
  const clientDistributionIsPending = useSelector(clientDistributionSelector.getIsPending);

  const tableData = [
    { key: t('getirDriveDashboardPage:TOTAL_CLIENTS'), value: clientDistribution?.total },
    { key: 'AGREEMENT_APPROVED_CLIENTS_SHORT', value: clientDistribution?.approved },
    { key: t('getirDriveDashboardPage:RENTING_CLIENTS'), value: clientDistribution?.renting },
  ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={clientDistributionIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(ClientDistribution);
