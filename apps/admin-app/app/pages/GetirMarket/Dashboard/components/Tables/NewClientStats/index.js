import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTable';
import { getColumns } from './config';
import { dashboardComparisonStatsSelector } from '../../../redux/selectors';
import useStyles from './styles';
import useParentStyles from '../styles';
import { getRowClassName } from '../utils';

const Header = ({ title, classes }) => <div className={classes.header}>{title && <div className={classes.headerText}>{title}</div>}</div>;

const NewClientStats = () => {
  const dashboardComparisonStatsData = useSelector(dashboardComparisonStatsSelector.getData);
  const isPending = useSelector(dashboardComparisonStatsSelector.getIsPending);
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const { t } = useTranslation('getirMarketDashboardPage');

  const tableColumns = useMemo(() => getColumns(classes, t), [classes, t]);

  return (
    <>
      <Header title={t('NEW_CLIENTS')} classes={classes} />
      <AntTable
        data={dashboardComparisonStatsData}
        columns={tableColumns}
        className={classes.table}
        scroll={false}
        showFooter={false}
        loading={isPending}
        containerClassName={parentClasses.antTableContainer}
        headerClassName={classes.smallerPadding}
        rowClassName={(_, index) => getRowClassName(parentClasses, index)}
      />
    </>
  );
};

export default NewClientStats;
