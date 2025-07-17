import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { getRowClassName } from '../utils';
import useParentStyles from '../styles';
import { npsStatsSelector, npsTimeIntervalSelector } from '../../../redux/selectors';

import { columns } from './config';

function NPSStatsTable() {
  const { t } = useTranslation(['global', 'getirMarketDashboardPage']);
  const parentClasses = useParentStyles();

  const npsStats = useSelector(npsStatsSelector.getNPSStats);
  const npsStatsIsPending = useSelector(npsStatsSelector.getNPSStatsIsPending);
  const npsTimeInterval = useSelector(npsTimeIntervalSelector.getNPSTimeInterval);

  return (
    <AntTableV2
      data={npsStats}
      columns={columns(t, parentClasses, npsTimeInterval)}
      loading={npsStatsIsPending}
      className={`${parentClasses.table} ${parentClasses.rightPaddingForScrollBar}`}
      containerClassName={parentClasses.antTableContainer}
      showFooter={false}
      scroll={{ y: 100 }}
      rowClassName={(_: any, index: number) => getRowClassName(parentClasses, index)}
    />
  );
}

export default NPSStatsTable;
