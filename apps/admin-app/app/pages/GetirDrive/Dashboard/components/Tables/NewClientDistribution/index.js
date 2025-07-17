import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { newClientDistributionSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const ClientDistribution = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const newClientDistribution = useSelector(newClientDistributionSelector.getData);
  const newClientDistributionIsPending = useSelector(newClientDistributionSelector.getIsPending);

  const tableData = [
    { key: t('getirDriveDashboardPage:NEW_CLIENT'), value: newClientDistribution?.total },
    { key: t('getirDriveDashboardPage:APPROVED'), value: newClientDistribution?.approved },
    { key: t('getirDriveDashboardPage:REJECTED'), value: newClientDistribution?.rejected },
  ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={newClientDistributionIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(ClientDistribution);
