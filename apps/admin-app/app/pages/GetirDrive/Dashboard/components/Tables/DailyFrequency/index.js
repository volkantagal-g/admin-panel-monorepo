import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { map as _map } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { dailyFrequencySelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const DailyFrequency = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const dailyFrequency = useSelector(dailyFrequencySelector.getData);
  const dailyFrequencyIsPending = useSelector(dailyFrequencySelector.getIsPending);

  const tableData = _map(dailyFrequency, item => ({
    key: `${item?.frequency}${t('getirDriveDashboardPage:RENT_SUFFIX')}`,
    value: item?.client,
  }));

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={dailyFrequencyIsPending}
      headerClassName={classes.smallerPadding}
      showFooter={false}
    />
  );
};

export default memo(DailyFrequency);
