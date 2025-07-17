import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { financialSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const Financial = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const financial = useSelector(financialSelector.getData);
  const financialIsPending = useSelector(financialSelector.getIsPending);

  const tableData = [
    { key: t('getirDriveDashboardPage:NET_REVENUE'), value: financial?.net_revenue_tax_excluded },
    { key: t('getirDriveDashboardPage:GROSS_REVENUE'), value: financial?.basket_value_tax_excluded },
  ];

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={financialIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(Financial);
